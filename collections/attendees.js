Attendees = new Mongo.Collection( 'attendees' );

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
  eventId: {
    type: String
  },
	users: {
		type: [Object]
	},
	"users.$.name": {
		type: String
	},
	"users.$.userId": {
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

Attendees.attachSchema( AttendeesSchema );
Schema.Attendees = AttendeesSchema;
