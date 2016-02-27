LocationComments = new Mongo.Collection( 'locationMessages' );

LocationComments.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

LocationComments.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let LocationCommentsSchema = new SimpleSchema({
	locationId: {
		type: String
	},
	channelId: {
    type: String
  },
	comments: {
		type: [Object]
	},
	"comments.$.name": {
		type: String
	},
	"comments.$.userId": {
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

LocationComments.attachSchema( LocationCommentsSchema );
Schema.LocationComments = LocationCommentsSchema;
