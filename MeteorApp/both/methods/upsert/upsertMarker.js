Meteor.methods({
  upsertMarker( marker ) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    check( marker, Object );
    console.log(marker);
		if (Meteor.isServer){
			try {
				var documentId;
				if (!!marker.locationId){
		      documentId = Markers.update( {
		        locationId: marker.locationId
		      }, {
		        $set: marker
		      });
					return documentId.insertedId;
				} else {
					documentId = Markers.insert(marker);
					return documentId;
				}
	      return documentId;
	    } catch( exception ) {
	      return exception;
	    }
		}
  }
});
