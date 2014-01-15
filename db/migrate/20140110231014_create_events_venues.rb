class CreateEventsVenues < ActiveRecord::Migration
  def change
    create_table :events_venues do |t|
      t.integer :event_id
      t.integer :venue_id
    end
  end
end
