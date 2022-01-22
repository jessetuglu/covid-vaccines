class VaccinesController < ApplicationController
  require 'nokogiri'
  require 'open-uri'
  require 'json'
  def cvs_vaccines
    @report = Report.order("created_at").last
    data = JSON.parse(@report&.data).to_a
    render json: {status: 200, data: data, created_at: @report&.created_at}
  end

  def all_vaccine_locations
    url = "https://api.us.castlighthealth.com/vaccine-finder/v1/provider-locations/search?medicationGuids=#{params[:medicationGuids].join(',')}&lat=#{params[:lat]}&long=#{params[:long]}&radius=10"
    return_json = JSON.parse(Nokogiri::HTML(URI.open(url)))
    available_locations = []
    return_json['providers'].each do |provider|
      if provider["in_stock"]
        available_locations.append(provider)
      end
    end

    render json: {status: 200, data: available_locations}
  end

end