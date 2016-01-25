Meteor.methods({
  upsertPlaceLocation( location ) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
		if (Meteor.isServer){
	    check( location, Object );

	    try {
				var documentId;
				if (!!location.placeId){
					documentId = Locations.update( {
						placeId: location.placeId
					}, {
						$set: location
					});
					return documentId.insertedId;
				} else {
					documentId = Locations.insert(location);
					return documentId;
				}
	    } catch( exception ) {
	      return exception;
	    }
		}
  }
});
