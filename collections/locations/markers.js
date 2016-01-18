Markers = new Meteor.Collection( 'markers' );

Markers.allow( {
  insert: () => false,
  update: () => false,
  remove: () => false
} );

Markers.deny( {
  insert: () => true,
  update: () => true,
  remove: () => true
} );

let Schema = Schema || {};

Schema.Markers = new SimpleSchema( {
  ownerId: {
    type: String,
    label: "The ID of the owner of this document"
  },
  type: {
    type: String,
    label: "The kind of marker (user, venue, etc)"
  },
  lat: {
    type: Number,
    decimal: true,
    label: "Marker Latitude"
  },
  lng: {
    type: Number,
    decimal: true,
    label: "Marker Longitude"
  },
  coordinates: {
    type: Array,
		min: 2,
		max: 2
  },
  "coordinates.$": {
    type: Number,
    decimal: true,
    label: "Marker coordinate"
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
} );

Markers.attachSchema( Schema.Markers );

if (Meteor.isServer){
  Markers._ensureIndex({
    "coordinates": "2dsphere"
  });
}
