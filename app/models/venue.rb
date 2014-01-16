class Venue < ActiveRecord::Base
  has_and_belongs_to_many :events  
  # validates :name, :street, presence: true


  def address
    [street,city,state,country,zip].compact.join(", ")
  end

  # geocoded_by :address
  # after_validation :geocode #, :if => :address_changed?

  def self.formatted_facebook_venue(venue)
    fb_hash = {
      latitude:     event["venue"]["latitude"],
      longitude:    event["venue"]["longitude"],
      city:         event["venue"]["city"],
      state:        event["venue"]["state"],
      country:      event["venue"]["country"],
      street:       event["venue"]["street"],
      zip:          event["venue"]["zip"]
    }
    fb_hash
  end
end
