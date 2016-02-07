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
UserSchema.User = new SimpleSchema({
  // Basic User
  _id: {
    type: String,
    label: "The ID of the owner of this document",
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


  // User Profile
  profile: {
    type: Object,//UserSchema.UserProfile,
    optional: true
  },
  'profile.name': {
    type: Object,
    optional: true
  },
  'profile.name.first': {
    type: String,
    optional: true
  },
  'profile.name.last': {
    type: String,
    optional: true
  },
  'profile.name.full': {
    type: String,
    optional: true,
    autoValue: function() {
      let
        firstName = this.siblingField('first').value,
        lastName = this.siblingField('last').value,
        fullName = `${firstName} ${lastName}`;

      if (this.isInsert) {
        return fullName;
      } else if (this.isUpsert) {
        return {$setOnInsert: fullName };
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  'profile.picture': {
    type: String,
    optional: true
  },
  'profile.gender': {
    type: String,
    allowedValues: ['male', 'female'],
    optional: true
  },
  'profile.locale': {
    type: String,
    optional: true
  },
  'profile.age_range': {
    type: Object,
    optional: true
  },
  'profile.biography': {
    type: String,
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


Meteor.users.attachSchema(UserSchema.User);
Schema.User = UserSchema.User;
