class Person < ActiveRecord::Base
  belongs_to :user
	has_many :attendees
	has_many :events, through: :attendees

  def admins
    Person.joins(:attendees).where(attendees: {is_admin: true, event_id: self.id})
  end

  def friends
    Person.where(is_friend:true)
  end

end
