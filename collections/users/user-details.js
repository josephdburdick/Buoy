UserDetails = new Meteor.Collection( 'UserDetails' );

UserDetails.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

UserDetails.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let UserDetailsSchema = new SimpleSchema({
  "userId": {
    type: String,
    label: "The ID of the owner of this document."
  },
	"profile": {
		type: Object
	},
	"profile.username": {
		type: String
	},
	"profile.firstName": {
		type: String,
		optional: true
	},
	"profile.lastName": {
		type: String,
		optional: true
	},
	"profile.fullName": {
		type: String,
		optional: true,
		autoValue: function() {
      let firstName = this.siblingField("profile.firstName"),
					lastName = this.siblingField("profile.lastName");
      return firstName + ' ' + lastName;
    }
	},
	"profile.biography": {
		type: String
	},
	"preferences": {
		type: Object
	}
});

UserDetails.attachSchema( UserDetailsSchema );
