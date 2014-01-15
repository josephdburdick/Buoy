class ChangeAttendeeFbIdToBigInt < ActiveRecord::Migration
  def change
  	change_column :attendees, :fb_id, :string
  end
end
