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
		type: [String]
	}
});

Friends.attachSchema( FriendsSchema );
