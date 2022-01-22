uri = ENV["REDIS_URL"]
REDIS = Redis.new(:url => uri)