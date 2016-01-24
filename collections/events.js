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

EventsSchema = new SimpleSchema({
	ownerId: {
		type: String,
		optional: false
	},
  fbId: {
    type: String,
    optional: false
  },
	name: {
		type: String,
		optional: false
	},
  description: {
    type: String,
  	optional: false
  },
  place:{
    type: Object,
    optional: true
  },
  itineraryId: {
    type: String,
  	optional: true //will want to create an itinerary first and push Id or array here...
  },
  picture: {
    type: String,
  	optional: true
  },
  privacy: {
    type: String,
  	optional: true
  },
  "ticket_uri": {
    type: String,
  	optional: true
  },
	"start_datetime": {
		type: String,
		optional: true
	},
	"end_datetime": {
		type: String,
		optional: true
	},
  "updated_datetime": {
    type: String,
  	optional: true
  },
  eventChannel: {
    type: Object,
    optional: true //will want to create an channel first and push Id or array here...
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

Events.attachSchema(EventsSchema);
Schema.Events = EventsSchema;
