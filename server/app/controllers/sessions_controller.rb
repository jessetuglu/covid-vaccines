class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    @user = User.find_by(email: params[:user][:email])&.try(:authenticate, params[:user][:password])
    if @user
      session[:user_id] = @user.id
      render json: {
        status: 200,
        user: @user
      }
    else
      render json: { status: 400, user:nil, errors:"Invalid email or password."}
    end
  end

  def logged_in
    if @current_user
      render json: {
        status: 200,
        logged_in: true,
        user: @current_user
      }
    else
      render json: { status: 400, logged_in: false }
    end
  end

  def logout
    reset_session
    render json: { status: 200, logged_out: true }
  end

  def explore
    if @current_user
      @users = User.all.where("id != ?", @current_user.id).select(:email)
      render json: { users: @users }
    else
      render json: { status: 401 }
    end
  end
end
