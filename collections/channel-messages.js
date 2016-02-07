ChannelMessages = new Mongo.Collection( 'channelMessages' );

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
	channelId: {
    type: String
  },
	messages: {
    type: [Object]
  },
	"messages.$.name": {
		type: String
	},
	"messages.$.userId": {
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

ChannelMessages.attachSchema( ChannelMessagesSchema );
Schema.ChannelMessages = ChannelMessagesSchema;
