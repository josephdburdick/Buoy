class AddDefaultToAttendees < ActiveRecord::Migration
  def change
  	change_column :attendees, :is_admin, :boolean, :default => false
  end
end
