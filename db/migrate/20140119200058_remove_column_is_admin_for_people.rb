class RemoveColumnIsAdminForPeople < ActiveRecord::Migration
  def change
    remove_column :people, :is_admin
  end
end
