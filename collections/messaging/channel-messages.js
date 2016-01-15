ChannelMessages = new Meteor.Collection( 'channelMessages' );

ChannelMessages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

ChannelMessages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let ChannelMessagesSchema = new SimpleSchema({
  "senderId": {
    type: String
  },
	"channelId": {
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

ChannelMessages.attachSchema( ChannelMessagesSchema );
