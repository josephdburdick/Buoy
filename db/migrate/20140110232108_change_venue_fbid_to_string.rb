class ChangeVenueFbidToString < ActiveRecord::Migration
  def change
  	change_column :venues, :fb_id, :string
  end
end
