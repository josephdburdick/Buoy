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

ActiveRecord::Schema.define(version: 20140115163844) do

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
  end

  create_table "events_venues", force: true do |t|
    t.integer "event_id"
    t.integer "venue_id"
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
  end

  create_table "users", force: true do |t|
    t.string   "fb_id"
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
