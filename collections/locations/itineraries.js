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

let ItinerariesSchema = new SimpleSchema({
  "ownerId": {
    type: String,
    label: "The ID of the owner of this document"
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
  "locations.items": {
    type: [String]
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

Itineraries.attachSchema(ItinerariesSchema);

if (Meteor.isServer) {
  Itineraries._ensureIndex({
    "coordinates": "2dsphere"
  });
}
