class Venue < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :events  

  validates :name, :street, presence: true


  def address
    [street,city,state,country,zip].compact.join(", ")
  end

  def self.formatted_facebook_venue(venue)
    fb_hash = {
      latitude:     venue["latitude"],
      longitude:    venue["longitude"],
      city:         venue["city"],
      state:        venue["state"],
      country:      venue["country"],
      street:       venue["street"],
      zip:          venue["zip"]
    }
    fb_hash
  end
end
