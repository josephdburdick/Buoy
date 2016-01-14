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
	}
});

Locations.attachSchema( LocationsSchema );
