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

let Schema = Schema || {};

Schema.Events = new SimpleSchema({
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
  eventChannel: {
    type: Object,
    optional: false
  },
	createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});

Events.attachSchema(Events.Schema);
