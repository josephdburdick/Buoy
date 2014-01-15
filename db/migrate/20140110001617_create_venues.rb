class CreateVenues < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.integer :fb_id
      t.float :latitude
      t.float :longitude
      t.string :city
      t.string :state
      t.string :country
      t.string :street
      t.string :zip
      t.string :name

      t.timestamps
    end
  end
end
