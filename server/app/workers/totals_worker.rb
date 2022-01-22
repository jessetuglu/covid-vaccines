class TotalsWorker
  include Sidekiq::Worker
  require 'nokogiri'
  require 'open-uri'
  require 'json'



  def perform
    puts "STARTED TOTALS JOB"
    responses = []
    states_abbr = %w[AK AL AR AZ CA CO CT DC DE FL GA GU HI IA ID IL IN KS KY LA MA MD ME MH MI MN MO MS MT NC ND NE NH NJ NM NV NY OH OK OR PA PR PW RI SC SD TN TX UT VA VI VT WA WI WV WY]
    states_abbr.each  do |state|
      testing_state_info = JSON.parse(Nokogiri::HTML(URI.open("https://www.cvs.com/immunizations/covid-19-vaccine/immunizations/covid-19-vaccine.vaccine-status.#{state}.json?vaccineinfo")))
      testing_state_info = testing_state_info['responsePayloadData']['data'][state]
      if testing_state_info == nil
        next
      else
        responses.append(testing_state_info)
      end
    end
    @new_report = Report.new(data:responses.to_json)
    if @new_report.save
      puts "COMPLETED TOTALS JOB"
    else
      puts "FAILED TOTALS JOB"
    end
  end
end