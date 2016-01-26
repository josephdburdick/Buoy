Meteor.methods({
  upsertEvent( event ) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    check( event, Object );
		if (Meteor.isServer){
			var documentId;
	    try {
				if (!!event._id){
					if (event.places.length){
						Events.upsert( {
							_id: event._id
						}, {
							$addToSet: { 'places': { $each: event.places }}
						});
					} else {
						Events.upsert( {
							_id: event._id,
						}, {
							$set: event,
						});
					}
					return event._id;
				} else {
					documentId = Events.insert(event);
					return documentId;
				}
	    } catch( exception ) {
	      return exception;
	    }
		}
  }
});
