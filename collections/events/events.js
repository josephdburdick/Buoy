Events = new Meteor.Collection('events');

Events.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Events.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let EventsSchema = new SimpleSchema({
	"ownerId": {
		type: String,
		optional: false
	},
	"name": {
		type: String,
		optional: false
	},
  "description": {
    type: String,
  	optional: false
  },
	"start_time": {
		type: String,
		optional: true
	},
  "end_time": {
    type: String,
  	optional: true
  },
  "itineraryId": {
    type: String,
  	optional: false
  },
  "picture": {
    type: String,
  	optional: false
  },
  "privacy": {
    type: String,
  	optional: false
  },
  "ticket_uri": {
    type: String,
  	optional: false
  },
  "updated_time": {
    type: String,
  	optional: false
  },
  "venue": {
    type: String,
  	optional: false
  },
  eventChannel: {
    type: Object,
    optional: false
  },
  "location_id": {
    type: String,
  	optional: false
  }
});

Events.attachSchema(EventsSchema);
