Friendships = new Meteor.Collection( 'friendships' );

Friendships.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Friendships.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});


// Friendship collection, where _id is calculated by sorting and
// and joining two friends user.Id
//
// Note: friending and unfriending is a one step operation in this
let FriendshipsSchema = new SimpleSchema({
	"userIds": {
		type: [String],
		min: 2,
		max: 2
	},
	"userIds.$": {
		optional: false
	}
});

Friendships.attachSchema( FriendshipsSchema );
