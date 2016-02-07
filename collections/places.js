Places = new Mongo.Collection( 'places' );

Places.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Places.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let Schema = Schema || {};

PlacesSchema = new SimpleSchema({
  events: {
    type: [Object],
    label: "The event IDs of that contain this place",
		optional: true
  },
	"events.$._id": {
		type: String,
		optional: true
	},
	"events.$.name": {
		type: String,
		optional: true
	},
	"events.$.ownerId": {
		type: String,
		optional: true
	},
  fbId: {
    type: String,
    label: "The Facebook ID of this place",
    optional: true
  },
	name: {
		type: String,
		label: "The name of this place"
	},
	locations : {
		type: [String],
		optional: true
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

// Places.attachSchema( PlacesSchema );
// Schema.Places = PlacesSchema;
