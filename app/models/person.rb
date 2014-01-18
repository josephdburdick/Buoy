class Person < ActiveRecord::Base
  has_many :users, 
    :through => :friends
	has_many :attendees
	has_many :events, through: :attendees

  def admins
    Person.joins(:attendees).where(attendees: {is_admin: true, event_id: self.id})
  end

  def friends
    Person.joins(:friends)
  end
end
