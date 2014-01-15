class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.integer :fb_id
      t.string :name
      t.string :picture_url
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :location
      t.string :gender
      t.string :username

      t.timestamps
    end
  end
end
