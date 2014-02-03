class ChangeOwnerIdInEventsToString < ActiveRecord::Migration
  def change
    change_column :events, :owner_id, :string
  end
end
