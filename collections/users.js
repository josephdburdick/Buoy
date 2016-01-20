Meteor.users.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Meteor.users.allow({
  insert: () => true,
  update: (userId, user, fields, modifier) => {
    // can only change your own documents
    if(user._id === userId)
    {
      Meteor.users.update({_id: userId}, modifier);
      return true;
    }
    else return false;
  },
  remove: () => true
});

let UserSchema = {};

// This is the schema for the basic user collection
UserSchema.User = new SimpleSchema({
  userId: {
    type: String,
    label: "The ID of the owner of this document.",
		optional: true
  },
  username: {
    type: String,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true
  },
  emails: {
    type: Array,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  // Here we add the schema for the additional informations
  profile: {
    type: UserSchema.UserProfile,
    optional: true
  },
  preferences: {
    type: Object,
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
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  heartbeat: {
    type: Date,
    optional: true
  },

	// Friends abstraction
	friends: {
		type: [Object],
		optional: true
	},
	"friends.$.name": {
		type: String
	},
	"friends.$.userId": {
		type: String
	},

	// Followers abstraction
	followers: {
		type: [Object],
		optional: true
	},
	"followers.$.name": {
		type: String
	},
	"followers.$.userId": {
		type: String
	},

	// Following abstraction
	following: {
		type: [Object],
		optional: true
	},
	"following.$.name": {
		type: String
	},
	"following.$.userId": {
		type: String
	}
});

// Additional user informations
UserSchema.UserProfile = {
  firstName: {
    type: String,
    optional: true
  },
  lastName: {
    type: String,
    optional: true
  },
  fullName: {
    type: String,
    optional: true,
    autoValue: function() {
      let firstName = this.siblingField("firstName"),
      lastName = this.siblingField("lastName");
      return firstName + ' ' + lastName;
    }
  },
	gender: {
    type: String,
    allowedValues: ['Male', 'Female'],
    optional: true
  },
  biography: {
    type: String,
		optional: true
  }
};

Meteor.users.attachSchema(UserSchema.User);
Schema.User = UserSchema.User;
