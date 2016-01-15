UserMessages = new Meteor.Collection( 'userMessages' );

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
	"messageId": {
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
    label: "Date updated",
    optional: true,
    autoValue: function () {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  }
});

UserMessages.attachSchema( UserMessagesSchema );
