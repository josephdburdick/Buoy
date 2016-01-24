Places = new Meteor.Collection( 'places' );

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
  ownerId: {
    type: String,
    label: "The ID of the owner of this document"
  },
  eventId: {
    type: String,
    label: "The ID of the owner of this document"
  },
  fbId: {
    type: String,
    label: "The Facebook ID of this place",
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

Places.attachSchema( PlacesSchema );
Schema.Places = PlacesSchema;
