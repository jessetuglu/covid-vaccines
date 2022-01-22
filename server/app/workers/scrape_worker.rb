class ScrapeWorker
  include Sidekiq::Worker
  require 'nokogiri'
  require 'open-uri'
  require 'json'

  def get_states_for_each_user
    states_abbr = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]
    states_per_user = User.pluck(:state)
    return states_abbr & states_per_user
  end

  def cities_available(state_testing_info)
    cities_available = []
    cities = state_testing_info
    cities.each do |city|
      if city['status'] == "Available"
        cities_available.append(city["city"])
      end
    end
    return cities_available
  end

  def perform
    puts "STARTED JOB"
    states = get_states_for_each_user
    states.each do |state|
      begin
        testing_state_info = JSON.parse(Nokogiri::HTML(URI.open("https://www.cvs.com/immunizations/covid-19-vaccine/immunizations/covid-19-vaccine.vaccine-status.#{state}.json?vaccineinfo")))
        testing_state_info = testing_state_info['responsePayloadData']['data'][state]
        cities_avail = cities_available(testing_state_info)
        if cities_avail != []
          send_email(cities_avail,state)
        end
        puts "COMPLETED SEND FOR #{state}"
      rescue
        puts "FAILED TO SEND FOR #{state}"
      end
    end
    puts "JOB COMPLETED SUCCESSFULLY"
  end

  def send_email(cities,state)
    @users = User.where(:state => state)
    @users.each do |user|
      # Check to make sure we are not spamming the user. This literal comp is a little jank, thinking I might just hashmap
      if ((cities == user.latest_city&.split(",")) and (user.updated_at&.between?(Time.zone.now.beginning_of_day,Time.zone.now.end_of_day)) or user.wants_mail == false)
        puts "THE USER #{user.first_name} HAS BEEN UPDATED TODAY ALREADY"
        next
      else
        UserMailer.with(user: user, cities: cities).update_email.deliver
        user.update(latest_city: cities.join(","))
        puts "UPDATED USER CITY LIST: #{user.latest_city}"
      end
    end
  end
end