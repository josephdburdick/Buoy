class AddFriendColumnToPeople < ActiveRecord::Migration
  def change
    add_column :people, :is_friend, :boolean
  end
end
