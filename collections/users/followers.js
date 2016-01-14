Followers = new Meteor.Collection( 'followers' );

Followers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Followers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let FollowersSchema = new SimpleSchema({
	"userId": {
		type: String
	},
	"followers": {
		type: Object
	},
	"followers.count": {
		type: Number,
		autoValue: function() {
      console.log('counting followers...');
      let items = this.siblingField("followers.items");
      return items.length;
    }
	},
	"followers.items": {
		type: [String]
	}
});

Followers.attachSchema( FollowersSchema );
