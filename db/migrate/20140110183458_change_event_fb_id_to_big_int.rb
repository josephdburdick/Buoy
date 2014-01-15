class ChangeEventFbIdToBigInt < ActiveRecord::Migration
  def change
  	change_column :events, :fb_id, :string
  end
end
