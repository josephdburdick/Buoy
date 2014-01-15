class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.integer :fb_id
      t.text :description
      t.datetime :start_time
      t.datetime :end_time
      t.string :privacy
      t.datetime :updated_time
      t.integer :owner_id

      t.timestamps
    end
  end
end
