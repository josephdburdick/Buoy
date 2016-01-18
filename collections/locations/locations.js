Locations = new Meteor.Collection( 'locations' );

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

Schema.Locations = new SimpleSchema({
  ownerId: {
    type: String,
    label: "The ID of the owner of this document."
  },
	markerId: {
		type: String
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

Locations.attachSchema( Schema.Locations );
