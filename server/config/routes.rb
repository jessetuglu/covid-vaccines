require 'sidekiq/web'
require 'sidekiq-scheduler/web'
Rails.application.routes.draw do
  post "/user/login", to: "sessions#create"
  delete "/user/logout", to: "sessions#logout"
  get "/user/logged_in", to: "sessions#logged_in"

  post "/user/register", to: "users#create"
  post "/user/remove", to: "users#delete"
  post "/user/update", to: "users#update"
  get "/test", to: "users#test"

  get "/vaccines/cvs", to: "vaccines#cvs_vaccines"
  get "/vaccines/locations", to: "vaccines#all_vaccine_locations"
  mount Sidekiq::Web => '/sidekiq'
end
