class UsersController < ApplicationController
  require 'nokogiri'
  require 'open-uri'
  require 'json'
  include CurrentUserConcern

  def update
    @user = User.find_by(email: user_params[:email])
    if @user
      @user.update!(user_params)
      @user.save
      render json: {status: 200, user: @user.as_json, errors: nil}
    else
      render json:{status: 400, user: nil, errors: @user.errors.full_messages}
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      UserMailer.with(user: user).welcome_email.deliver_now
      session[:user_id] = user.id
      render json: {status: 200, user: user.as_json, errors: nil}
    else
      render json: {status: 400, user: nil, errors: user.errors.full_messages}
    end
  end

  def delete
    @user = User.find_by(email: user_params[:email])
    if @user
      UserMailer.with(user: @user).deletion_email.deliver_now
      reset_session
      @user.destroy
      render json: {status: 200, user:@user.as_json, errors: nil}
    else
      render json: {status: 400, user:nil, errors:@user.errors.full_messages}
    end
  end

  def test
    @user = User.find_by(:email => "tuglu@bc.edu")
    cities = ["HOWELL"]
    if (cities == @user.latest_city&.split(",")) and (@user.updated_at&.between?(Time.zone.now.beginning_of_day,Time.zone.now.end_of_day))
    else
      UserMailer.with(user: @user, cities: cities).update_email.deliver
      @user.update_attribute(:latest_city, cities.join(","))
    end
    render json:{status: "s"}
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :state, :wants_mail, :password, :password_confirmation, :zip)
  end
end