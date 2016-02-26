Channels = new Mongo.Collection( 'channels' );

Channels.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Channels.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

ChannelsSchema = new SimpleSchema({
  ownerId: {
    type: String
  },
	public: {
		type: Boolean
	},
	name: {
		type: String
	},
	createdAt: {
    type: Date,
    label: "Date created",
    optional: true,
    autoValue: function () {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  },
	updatedAt: {
    type: Date,
    label: "Date created",
    optional: true,
    autoValue: function () {
      if ( this.isUpdated ) {
        return new Date();
      }
    }
  }
});

Channels.attachSchema( ChannelsSchema );
Schema.Channels = ChannelsSchema;
