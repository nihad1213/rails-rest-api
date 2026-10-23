class JsonWebToke
  SECRET = Rails.application.secret_key_base

  def self.encode(payload, exp = 24.hours.from_now)
    JWT.encode(payload.merge(exp: exp.to_i), SECRET, "HS256")
  end

  def self.decode(token)
    JWT.decode(token, SECRET, true, algorithm: "HS256").first.with_indifferent_access
  end
end
