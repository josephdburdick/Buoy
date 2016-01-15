Channels = new Meteor.Collection( 'channels' );

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

let ChannelsSchema = new SimpleSchema({
  "ownerId": {
    type: String
  },
	"public": {
		type: Boolean
	},
	"name": {
		type: String
	},
	"participants": {
    type: Object,
    optional: false
  },
	"participants.count": {
    type: Number,
    optional: false,
		autoValue: function() {
      console.log('counting participants...');
      let items = this.siblingField("participants.items");
      return items.length;
    }
	},
	"participants.items": {
    type: Array,
    optional: false
	},
	"participants.items.$": {
		type: Object
	},
	"participants.items.$._id": {
		type: String,
		optional: false
	},
	"participants.items.$.name": {
		type: String,
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

Channels.attachSchema( ChannelsSchema );
