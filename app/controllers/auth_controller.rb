class AuthController < ApplicationController
  skip_before_action :authenticate_request!, only: %i[signup login]

  def signup
    user = User.new(params.permit(:email, :password, :password_confirmation))
    if user.save
      render json: auth_response(user), status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email]&.downcase)
    if user&.authenticate(params[:password])
      render json: auth_response(user)
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def me
    render json: current_user.as_json(only: %i[id email])
  end

  private

  def auth_response(user)
    { token: JsonWebToken.encode(user_id: user.id),
      user: user.as_json(only: %i[id email]) }
  end
end
