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
	isImportedEvent: {
		type: Boolean,
		optional: false,
		defaultValue: false
	},
	name: {
		type: String,
		optional: true,
		defaultValue: function(){
			let
				time = this.siblingField('start_time'),
				dayPeriod = Modules.both.getDayPeriod(time),
				humanizedDate = `${moment(time).format('dddd')} ${dayPeriod}, ${moment(time).format('MMMM Do YYYY, h:mm:ss')}`;
				console.log(humanizedDate);
			return humanizedDate;
		}
	},
  description: {
    type: String,
  	optional: true
  },

  places: {
    type: Array,
    optional: true
  },
	'places.$': {
		type: Object
	},
	'places.$._id': {
		type: String,
		optional: true,
		autoform: {
    	omit: true
    }
	},
	'places.$.ownerId': {
		type: String,
		optional: true,
		autoform: {
    	omit: true
    }
	},
	'places.$.name': {
		type: String,
		optional: true,
		autoform: {
			placeholder: 'Place Name'
		}
	},
	'places.$.address': {
		type: String,
		optional: true,
		autoform: {
			placeholder: 'Street Address'
		}
	},
	'places.$.coords': {
		type: [Number],
    decimal: true,
    minCount: 2,
    maxCount: 2,
		optional: true
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
