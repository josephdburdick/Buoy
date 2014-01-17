OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV["BUOY_PRO_FACEBOOK_APP_ID"], ENV["BUOY_PRO_FACEBOOK_SECRET"], scope: "create_event, photo_upload, publish_actions, publish_stream, rsvp_event, user_about_me, user_activities, user_checkins, user_events, user_friends, user_location, user_photos, video_upload, read_stream"
end