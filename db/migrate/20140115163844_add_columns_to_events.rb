class AddColumnsToEvents < ActiveRecord::Migration
  def change
    add_column :events, :cover_url, :string
    add_column :events, :cover_url_y, :integer
  end
end
