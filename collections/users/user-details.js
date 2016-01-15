UserDetails = new Meteor.Collection( 'userDetails' );

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

UserDetails.attachSchema( UserDetailsSchema );
