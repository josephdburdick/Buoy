class Person < ActiveRecord::Base
	has_many :attendees
	has_many :events, through: :attendees
	#has_one :event

	# def owner
  #    Person.joins(:people).where(events: {owner_id: self.id})
  #  end
end
