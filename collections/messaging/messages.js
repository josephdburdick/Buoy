Messages = new Meteor.Collection( 'messages' );

Messages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Messages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let MessagesSchema = new SimpleSchema({
	"channelId": {
		type: String,
		optional: false
	},
	"senderId": {
    type: String,
		optional: false
  },
	"body": {
		type: String,
		optional: false
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

Messages.attachSchema( MessagesSchema );
