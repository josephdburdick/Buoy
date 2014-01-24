class AddDefaultFalseToFriends < ActiveRecord::Migration
  def change
    change_column :people, :is_friend, :boolean, :default => false
  end
end
