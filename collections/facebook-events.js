FacebookEvents = new Mongo.Collection('facebookEvents');

FacebookEvents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

FacebookEvents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

FacebookEventsSchema = new SimpleSchema({
	ownerId: {
		type: String,
		optional: false
	},
  fbId: {
    type: String,
    optional: true
  },
	name: {
		type: String,
		optional: true,
		defaultValue: function(){
			let
				time = this.siblingField('start_time'),
				dayPeriod = Modules.both.getDayPeriod(time),
				humanizedDate = `${moment(time).format("dddd")} ${dayPeriod}, ${moment(time).format("MMMM Do YYYY, h:mm:ss")}`;
				console.log(humanizedDate);
			return humanizedDate;
		}
	},
  description: {
    type: String,
  	optional: true
  },
  places: {
    type: [Object],
    optional: true,
		label: "The place IDs for this event",
  },
	"places.$._id": {
		type: String,
		optional: true
	},
	"places.$.ownerId": {
		type: String,
		optional: true
	},
	"places.$.name": {
		type: String,
		optional: true,
		defaultValue: function() {
			return "Default Event Name";
		}
	},
	"places.$.address": {
		type: String,
		optional: true
	},
	"places.$.coords": {
		type: [Number],
		optional: true,
		defaultValue: [],
		min: 0,
		max: 2
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
  'ticket_uri': {
    type: String,
  	optional: true
  },
	'start_time': {
		type: String,
		optional: true
	},
	'end_time': {
		type: String,
		optional: true
	},
  'updated_time': {
    type: String,
  	optional: true
  },
  eventChannel: {
    type: Object,
    optional: true //will want to create an channel first and push Id or array here...
  },
	createdAt: {
    type: Date,
		optional: true,
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

// FacebookEvents.attachSchema(FacebookEventsSchema);
// Schema.FacebookEvents = FacebookEventsSchema;
