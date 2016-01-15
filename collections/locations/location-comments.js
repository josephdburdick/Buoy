locationComments = new Meteor.Collection( 'locationMessages' );

locationComments.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

locationComments.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let locationCommentsSchema = new SimpleSchema({
	"locationId": {
		type: String
	},
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

locationComments.attachSchema( locationCommentsSchema );
