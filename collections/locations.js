Locations = new Mongo.Collection( 'locations' );

Locations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Locations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let Schema = Schema || {};

LocationsSchema = new SimpleSchema({
  placeId: {
    type: String,
    label: "The ID of the owner of this document."
  },
	city: {
		type: String,
		optional: true
	},
	country: {
		type: String,
		optional: true
	},
	state: {
		type: String,
		optional: true
	},
	street: {
		type: String,
		optional: true
	},
	zip: {
		type: String,
		optional: true
	},
	markerId: {
		type: String,
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

Locations.attachSchema( LocationsSchema );
Schema.Locations = LocationsSchema;
