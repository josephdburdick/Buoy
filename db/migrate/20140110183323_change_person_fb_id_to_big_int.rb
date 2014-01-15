class ChangePersonFbIdToBigInt < ActiveRecord::Migration
  def change
  	change_column :people, :fb_id, :string
  end
end
