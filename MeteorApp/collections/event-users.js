EventUsers = new Mongo.Collection( 'eventUsers' );

EventUsers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

EventUsers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let EventUsersSchema = new SimpleSchema({
  eventId: {
    type: String
  },
	users: {
		type: [Object]
	},
	"users.$._id": {
		type: String
	},
	"users.$.username": {
		type: String
	},
	"users.$.rsvpStatus":{
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

EventUsers.attachSchema( EventUsersSchema );
Schema.EventUsers = EventUsersSchema;
