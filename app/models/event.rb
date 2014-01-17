class Event < ActiveRecord::Base
	has_and_belongs_to_many :venues 
	has_many :attendees, 
    :dependent => :destroy
	has_many :people, 
    through: :attendees
	accepts_nested_attributes_for :venues
  

  def owner
    Person.joins(:event).where(people: {owner_id: self.id})
  end
	def admins
  	Person.joins(:attendees).where(attendees: {is_admin: true, event_id: self.id})
	end
  def definites
    Person.joins(:attendees).where(attendees: {is_admin: false, event_id: self.id, rsvp_status: "attending"})  
  end
	def maybes
  	Person.joins(:attendees).where(attendees: {is_admin: false, event_id: self.id, rsvp_status: "unsure"})
	end
  def maybes
    Person.joins(:attendees).where(attendees: {is_admin: false, event_id: self.id, rsvp_status: "declined"})
  end


  def sort_ascending_by_id
    self.venues.sort.reverse!
  end

  def self.formatted_facebook_event(event)
    fb_hash = {
      fb_id:          event["id"],
      name:           event["name"],
      description:    event["description"],
      start_time:     event["start_time"],
      end_time:       event["end_time"],
      privacy:        event["privacy"],
      updated_time:   event["updated_time"],
      created_at:     event["created_at"],
      updated_at:     event["updated_at"],
      owner_id:       event["owner"]["id"]
    }

    if event["cover"]
      fb_hash.merge!({
        cover_url: event["cover"]["source"],
        cover_url_y: event["cover"]["offset_y"]
      }) 
    end

    fb_hash
  end

	
end
