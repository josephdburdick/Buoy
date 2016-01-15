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

Friendships.attachSchema( FriendshipsSchema );
