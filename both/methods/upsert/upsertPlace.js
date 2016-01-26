Meteor.methods({
  upsertPlace( place ) {
		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		check( place, Object );
		if (Meteor.isServer){
			var documentId;
			try {
				if (place._id){
					documentId = Places.upsert( {
						eventId: place.eventId
					}, {
						$set: place,
						$addToSet: { 'events': { $each: place.events } }
					});
					return documentId.insertedId;
				}
				else {
					if (!!place.fbId){
						documentId = Places.upsert({
							fbId: place.fbId
						}, {
							$set: place
						});
						return documentId.insertedId;
					} else {
						documentId = Places.insert(place);
						return documentId;
					}
				}
			} catch( exception ) {
				return exception;
			}
		}
	}
});
