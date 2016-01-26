if (Meteor.isServer){
	Meteor.methods({
	  upsertUserFacebookEvent( event ) {
	    if (!Meteor.userId())
	      throw new Meteor.Error("not-authorized");

	    check( event, Object );
			console.log(event);
			let documentId;
			try {
				if (!!event._id) {
					documentId = FacebookEvents.upsert( {
						fbId: event.fbId,
						ownerId: Meteor.userId()
					}, {
						$set: event
					});
					return documentId.insertedId;
				} else {
					documentId = FacebookEvents.insert(event);
					return documentId;
				}
			} catch( exception ) {
				return exception;
			}
		}
	});
}
