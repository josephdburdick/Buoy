class Venue < ActiveRecord::Base
  has_and_belongs_to_many :events  
  # validates :name, :street, presence: true


  def address
    [street,city,state,country,zip].compact.join(", ")
  end

  # geocoded_by :address
  # after_validation :geocode #, :if => :address_changed?
end
