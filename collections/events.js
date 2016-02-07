Events = new Mongo.Collection('events');

Events.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Events.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

// SimpleSchema.messages({
//   lonOutOfRange: '[label] longitude should be between -90 and 90',
//   latOutOfRange: '[label] latitude should be between -180 and 180'
// })
EventsSchema = new SimpleSchema({
	ownerId: {
		type: String,
		optional: true,
		autoform: {
    	omit: true
    }
	},
  fbId: {
    type: String,
    optional: true,
		autoform: {
    	omit: true
    }
  },
	name: {
		type: String,
		optional: true,
		autoform: {
			placeholder: "Event Name"
		}
	},
  description: {
    type: String,
  	optional: true,
		autoform: {
      afFieldInput: {
        type: "textarea"
      },
			placeholder: "Event Description"
    }
  },
  places: {
    type: Array,
    optional: true
  },
	"places.$": {
		type: Object
	},
	"places.$._id": {
		type: String,
		optional: true,
		autoform: {
    	omit: true
    }
	},
	"places.$.ownerId": {
		type: String,
		optional: true,
		autoform: {
    	omit: true
    }
	},
	"places.$.name": {
		type: String,
		optional: true,
		autoform: {
			placeholder: "Place Name"
		}
	},
	"places.$.address": {
		type: String,
		optional: true,
		autoform: {
			placeholder: "Street Address"
		}
	},
	"places.$.coords": {
		type: [Number],
    decimal: true,
    minCount: 2,
    maxCount: 2
	},
  itineraryId: {
    type: String,
  	optional: true, //will want to create an itinerary first and push Id or array here...
		autoform: {
    	omit: true
    }
  },
  picture: {
    type: String,
  	optional: true,
		autoform: {
    	omit: true
    }
  },
  privacy: {
    type: String,
  	optional: true,
		autoform: {
			placeholder: "true"
		}
  },
  'ticket_uri': {
    type: String,
  	optional: true,
		autoform: {
    	omit: true
    }
  },
	'start_time': {
		type: Date,
		optional: true,
		autoValue: function() { return new Date() }
	},
	'end_time': {
		type: Date,
		optional: true,
		autoValue: function() { return new Date() }
	},
  'updated_time': {
    type: String,
  	optional: true,
		autoform: {
    	omit: true
    }
  },
  eventChannel: {
    type: Object,
    optional: true, //will want to create an channel first and push Id or array here...
		autoform: {
    	omit: true
    }
  },
	createdAt: {
    type: Date,
		optional: true,
		autoform: {
			omit: true
		},
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
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
    optional: true,
		autoform: {
    	omit: true
    }
  }
});

Events.attachSchema(EventsSchema);
SimpleSchema.debug = true;
Schema.Events = EventsSchema;
