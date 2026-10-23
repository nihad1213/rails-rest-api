module Authenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request!
  end

  private

  def authenticate_request!
    token = request.headers["Authorization"]&.split(" ")&.last
    payload = JsonWebToken.decode(token)
    @current_user = User.find(payload[:user_id])
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    render json: { error: "Unauthorized" }, status: :unauthorized
  end

  def current_user = @current_user
end
