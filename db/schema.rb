# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140119213438) do

  create_table "attendees", force: true do |t|
    t.boolean  "is_admin",    default: false
    t.integer  "person_id"
    t.integer  "event_id"
    t.string   "rsvp_status"
    t.string   "fb_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", force: true do |t|
    t.string   "name"
    t.string   "fb_id"
    t.text     "description"
    t.datetime "start_time"
    t.datetime "end_time"
    t.string   "privacy"
    t.datetime "updated_time"
    t.integer  "owner_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "hash_tag"
    t.string   "cover_url"
    t.integer  "cover_url_y"
    t.integer  "user_id"
  end

  add_index "events", ["user_id"], name: "index_events_on_user_id"

  create_table "events_venues", force: true do |t|
    t.integer "event_id"
    t.integer "venue_id"
  end

  create_table "friends", force: true do |t|
    t.integer  "person_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "people", force: true do |t|
    t.string   "fb_id"
    t.string   "name"
    t.string   "picture_url"
    t.string   "email"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "location"
    t.string   "gender"
    t.string   "username"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_friend"
  end

  create_table "people_users", id: false, force: true do |t|
    t.integer "user_id",   null: false
    t.integer "person_id", null: false
  end

  add_index "people_users", ["person_id", "user_id"], name: "index_people_users_on_person_id_and_user_id"
  add_index "people_users", ["user_id", "person_id"], name: "index_people_users_on_user_id_and_person_id"

  create_table "users", force: true do |t|
    t.string   "uid"
    t.string   "provider"
    t.string   "name"
    t.text     "oauth_token"
    t.datetime "oauth_expires_at"
    t.string   "picture_url"
    t.string   "email"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "location"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "venues", force: true do |t|
    t.string   "fb_id"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "city"
    t.string   "state"
    t.string   "country"
    t.string   "street"
    t.string   "zip"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
