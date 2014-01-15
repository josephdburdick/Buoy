class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :fb_id
      t.string :provider
      t.string :name
      t.text :oauth_token
      t.datetime :oauth_expires_at
      t.string :picture_url
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :location
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
