class CreateAttendees < ActiveRecord::Migration
  def change
    create_table :attendees do |t|
      t.boolean :is_admin
      t.integer :person_id
      t.integer :event_id
      t.string :rsvp_status
      t.integer :fb_id

      t.timestamps
    end
  end
end
