Meteor.methods({
  upsertUserEvent( event ) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    check( event, Object );
		if (Meteor.isServer){
			var documentId;
	    try {
				if (!!event._id){
					if (!event.places.length){
						Events.update( {
							_id: event._id,
						}, {
							$set: event,
						});
					} else {
						Events.update( {
							_id: event._id
						}, {
							$addToSet: { 'places': { $each: event.places }}
						});
					}
					return event._id;
				}
				else {
					if (!!event.fbId) {
						documentId = Events.upsert( {
							fbId: event.fbId,
							ownerId: event.ownerId
						}, {
							$set: event,
						});
					} else {
						documentId = Events.insert(event);
					}
					return documentId;
				}
	    } catch( exception ) {
	      return exception;
	    }
		}
  }
});
