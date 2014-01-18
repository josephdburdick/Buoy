class RenameFbIdToUidForUsers < ActiveRecord::Migration
  def change
    rename_column :users, :fb_id, :uid
  end
end
