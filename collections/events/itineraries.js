Itineraries = new Meteor.Collection('itineraries');

Itineraries.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Itineraries.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

// Itineraries.insert({
//   "ownerId": Meteor.userId(),
//   "type": "Outdoors",
//   "channelId": Meteor.userId(),
//   "isPublic": true,
//   "locations": {
//     "items": ['sjdflkjlkdf', 'qweqwjelqwjel', 'qlwkejlqkwjelqkw']
//   }
// });

let Schema = Schema || {};

Schema.Itineraries = new SimpleSchema({
  "ownerId": {
    type: String,
    label: "The ID of the owner of this document"
  },
	"eventId": {
		type: String
	},
  "type": {
    type: String,
  },
  "channelId": {
    type: String
  },
  "isPublic": {
    type: Boolean
  },
  "locations": {
    type: Object
  },
  "locations.count": {
    type: Number,
    optional: true,
    autoValue: function () {
      console.log('counting locations...');
      let items = this.siblingField("locations.items");
      return items.length;
    }
  },
	"locations.items":{
		type: Array
	},
	"locations.items.$":{
		type: Object
	},
	"locations.items.$.name": {
		type: String
	},
	"locations.items.$._id": {
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

Itineraries.attachSchema(Schema.Itineraries);
