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
		type: [Object]
	},
	"followers.items.$": {
		type: Object
	},
	"followers.items.name": {
		type: String
	},
	"followers.items._id": {
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

Followers.attachSchema( FollowersSchema );
