Friends = new Meteor.Collection( 'friends' );

Friends.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Friends.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

// Friend collection, where _id is a user.Id and Friends is a list, of user.Id.
// Note: friending and unfriending is a two step operation in this scheme:
let FriendsSchema = new SimpleSchema({
	"userId": {
		type: String
	},
	"friends": {
		type: Object
	},
	"friends.count": {
		type: Number,
		autoValue: function() {
      console.log('counting friends...');
      let items = this.siblingField("friends.items");
      return items.length;
    }
	},
	"friends.items": {
		type: [Object]
	},
	"friends.items.$": {
		type: Object
	},
	"friends.items.name": {
		type: String
	},
	"friends.items._id": {
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
    label: "Date created",
    optional: true,
    autoValue: function () {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  }
});

Friends.attachSchema( FriendsSchema );
