Attendees = new Meteor.Collection( 'userMessages' );

Attendees.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Attendees.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let AttendeesSchema = new SimpleSchema({
  "senderId": {
    type: String
  },
	"recieverId": {
    type: String
  },
	"messageId": {
    type: String
  },
	"created": {
    type: Date,
    label: "Date created",
    optional: true,
    autoValue: function () {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  },
  "updated": {
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

Attendees.attachSchema( AttendeesSchema );
