class User < ActiveRecord::Base
  has_many :people

  def self.from_omniauth(auth)
    where(auth.slice(:provider, :fb_id)).first_or_initialize.tap do |user|
      user.provider          = auth.provider
      user.fb_id             = auth.uid
      user.name              = auth.info.name
      user.first_name        = auth["info"]["first_name"] unless auth["info"].blank?
      user.last_name         = auth["info"]["last_name"] unless auth["info"].blank?
      user.picture_url       = auth.info.image
      user.email             = auth.info.email
      user.oauth_token       = auth.credentials.token unless auth["info"].blank?
      user.location          = auth.info.location unless auth["info"].blank?
      #user.gender            = auth.info.gender unless auth["info"].blank?
      #user.link              = auth.info.link unless auth["info"].blank?
      #user.username          = auth.info.username unless auth["info"].blank?
      #user.age_range         = auth.info.age_range unless auth["info"].blank?
      #user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end


  def facebook
    @facebook ||= Koala::Facebook::API.new(oauth_token)    
    block_given? ? yield(@facebook) : @facebook
  rescue Koala::Facebook::APIError => e
    logger.info e.to_s
    nil
  end

  def api_call
    query = "Me?fields=picture.type(large),location,events.fields(name,location,end_time,privacy,updated_time,description,rsvp_status,venue,start_time,id,ticket_uri,picture.type(large),cover,owner,admins.fields(picture.type(large),name,location),attending.fields(picture.type(large),name,rsvp_status,first_name,last_name,email,location),maybe.fields(rsvp_status,picture.type(large),name,first_name,last_name,email,age_range,location)),friends.fields(cover,id,gender,location,username,email,first_name,last_name,picture.type(large))"
  end

  def generate_user_events
    fb_call = facebook { |fb| fb.graph_call(api_call)}
    
    unless fb_call["friends"].nil?
      friends = fb_call["friends"]["data"]
      friends.each do |friend|
        @new_person = Person.where(fb_id: friend["id"]).first_or_create(
          name:           friend["name"],
          first_name:     friend["first_name"],
          last_name:      friend["last_name"],
          username:       friend["username"] || friend["fb_id"],
          gender:         friend["gender"] || "Unknown",
          picture_url:    friend["picture"]["data"]["url"]
        )
        if @new_person.name.nil?
          @new_person.name = friend["first_name"] + " " + friend["last_name"]
          @new_person.save!
        elsif @new_person.first_name.nil? && @new_person.last_name.nil?
          @new_person.name.split
          @new_person.first_name = friend["name"].first
          @new_person.last_name = friend["name"].last
          @new_person.save!
        end
      end
    end
    unless fb_call["events"].nil?
      events = fb_call["events"]["data"]
      events.each do |event|
        if event["admins"]
          event_admins = event["admins"]["data"]
          if true #(is_admin_for_event? event_admins)

            event_hash = Event.formatted_facebook_event(event)
            if Event.where(fb_id: event["id"]).present?
              #binding.pry
              @new_event = Event.where(fb_id: event["id"]).update_all(event_hash)
            else
              @new_event = Event.where(fb_id: event['id']).first_or_create(Event.formatted_facebook_event(event))
            end
            unless event["venue"].nil?
              if Venue.where(fb_id: event["venue"]["id"]).present?
                @new_venue = Venue.find_by(fb_id: event["venue"]["id"])
                unless @new_event.venues.include?(@new_venue)
                  @new_event.venues << @new_venue
                end
              else # If a venue doesn't already exist, create or reference the one that does.
                @new_venue = Venue.where(fb_id: event["venue"]["id"]).first_or_create(
                  latitude:     event["venue"]["latitude"],
                  longitude:    event["venue"]["longitude"],
                  city:         event["venue"]["city"],
                  state:        event["venue"]["state"],
                  country:      event["venue"]["country"],
                  street:       event["venue"]["street"],
                  zip:          event["venue"]["zip"]
                )
                unless @new_event.venues.include?(@new_venue)
                  @new_event.venues << @new_venue
                end
              end
            end # Check to see if there are any venues for this event.

            if event["maybe"].present?
              event["maybe"]["data"].each do |maybe|
                if Person.where(fb_id: maybe["id"]).present?
                  @new_maybe = Person.find_by(fb_id: maybe["id"])
                  unless @new_event.maybes.include?(@new_maybe.id)
                    @new_event.attendees.where(person_id: @new_maybe.id, fb_id: @new_maybe.fb_id).first_or_create(
                      is_admin: false, 
                      rsvp_status: "attending"
                    )
                  end
                else
                  @new_maybe = Person.new(
                    name:        maybe["name"],
                    fb_id:       maybe["id"],
                    first_name:  maybe["first_name"],
                    last_name:   maybe["last_name"],
                    username:    maybe["username"] || maybe["fb_id"],
                    gender:      maybe["gender"] || "Unknown",
                    picture_url: maybe["picture"]["data"]["url"]
                  )
                  if @new_maybe.name.nil?
                    @new_maybe.name = maybe["first_name"] + " " + maybe["last_name"]
                  elsif @new_maybe.first_name.nil? && @new_maybe.last_name.nil?
                    @new_maybe.name.split
                    @new_maybe.first_name = maybe["name"].first
                    @new_maybe.last_name =  maybe["name"].last
                  end
                  @new_maybe.save!
                  @new_event.attendees.where(person_id: @new_maybe.id, fb_id: @new_maybe.fb_id).first_or_create(
                    is_admin: false, 
                    rsvp_status: "unsure"
                  )
                end
              end
            end

            event["attending"]["data"].each do |attendee|
              if Person.where(fb_id: attendee["id"]).present?
                @new_attendee = Person.find_by(fb_id: attendee["id"])
                unless @new_event.attendees.include?(@new_attendee.id)
                  @new_event.attendees.where(person_id: @new_attendee.id, fb_id: @new_attendee.fb_id).first_or_create(
                    is_admin: false, 
                    rsvp_status: "attending"
                  )
                end
              else
                @new_attendee = Person.new(
                  name:        attendee["name"],
                  fb_id:       attendee["id"],
                  first_name:  attendee["first_name"],
                  last_name:   attendee["last_name"],
                  username:    attendee["username"] || attendee["fb_id"],
                  gender:      attendee["gender"] || "Unknown",
                  picture_url: attendee["picture"]["data"]["url"]
                )
                if @new_attendee.name.nil?
                  @new_attendee.name = attendee["first_name"] + " " + attendee["last_name"]
                elsif @new_attendee.first_name.nil? && @new_attendee.last_name.nil?
                  @new_attendee.name.split
                  @new_attendee.first_name = attendee["name"].first
                  @new_attendee.last_name  =  attendee["name"].last
                end
                @new_attendee.save!
                @new_event.attendees.where(person_id: @new_attendee.id, fb_id: @new_attendee.fb_id).first_or_create(
                  is_admin: false, 
                  rsvp_status: "attending"
                )
              end
            end #/ attendee collection

            event["admins"]["data"].each do |admin|                            
              if Person.where(fb_id: admin["id"]).present?
                @new_admin = Person.find_by(fb_id: admin["id"]) 
                unless @new_event.admins.include?(@new_admin.id)    
                  @new_event.attendees.where(fb_id: @new_admin.fb_id, is_admin: false).update_all(
                    is_admin: true, 
                    rsvp_status: "attending"
                  )
                end 
              end 
            end #/ admin collection
          end #/ is_admin_for_event?
        end #/ event[admins]
      end #/ each do |event|
    end #/ check to see if user has events
  end

end


private 
def is_admin_for_event? admins
  @admin_names = []
  admins.each do |admin|
    @admin_names << admin["name"]
  end
  @admin_names.include?(name) ? true : false
end









