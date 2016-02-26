UserMessages = new Mongo.Collection( 'userMessages' );

UserMessages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

UserMessages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let UserMessagesSchema = new SimpleSchema({
  "senderId": {
    type: String
  },
	"recieverId": {
    type: String
  },
	messages: {
    type: [Object]
  },
	"messages.$.userId": {
		type: String
	},
	"messages.$.username": {
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

UserMessages.attachSchema( UserMessagesSchema );
Schema.UserMessages = UserMessagesSchema;
