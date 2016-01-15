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

let MarkersSchema = new SimpleSchema( {
  "ownerId": {
    type: String,
    label: "The ID of the owner of this document"
  },
  "type": {
    type: String,
    label: "The kind of marker (user, venue, etc)"
  },
  "lat": {
    type: Number,
    decimal: true,
    label: "Marker Latitude"
  },
  "lng": {
    type: Number,
    decimal: true,
    label: "Marker Longitude"
  },
  "coordinates": {
    type: [ Number ]
  },
  "coordinates.$": {
    type: Number,
    decimal: true,
    label: "Marker coordinate"
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
    label: "Date updated Marker in System",
    optional: true,
    autoValue: function () {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  }
} );

Markers.attachSchema( MarkersSchema );

if (Meteor.isServer){
  Markers._ensureIndex({
    "coordinates": "2dsphere"
  });
}
