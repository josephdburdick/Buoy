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

let LocationsSchema = new SimpleSchema({
  "ownerId": {
    type: String,
    label: "The ID of the owner of this document."
  },
	"markerId": {
		type: String
	},
	"createdAt": {
    type: Date,
    label: "Date created",
    optional: true,
    autoValue: function () {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  },
	"updatedAt": {
    type: Date,
    label: "Date created",
    optional: true,
    autoValue: function () {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  }
});

Locations.attachSchema( LocationsSchema );
