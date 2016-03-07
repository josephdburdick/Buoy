Itineraries = new Mongo.Collection('itineraries');

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

ItinerariesSchema = new SimpleSchema({
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
		type: [Object]
	},
	"locations.items.$.name": {
		type: String
	},
	"locations.items.$.locationId": {
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

Itineraries.attachSchema(ItinerariesSchema);
Schema.Itineraries = ItinerariesSchema;
