class AddHashTagToEvents < ActiveRecord::Migration
  def change
    add_column :events, :hash_tag, :string
  end
end
