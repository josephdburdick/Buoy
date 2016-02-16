Meteor.methods({
  upsertUserFacebookEvent( event ) {
    if (!Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
    check( event, Object );
		let documentId;
		try {
			FacebookEvents.upsert( {
				fbId: event.fbId
			}, {
				$set: event
			});
		} catch( exception ) {
			return exception;
		}
	},
	updateFacebookEventImportStatus( event ) {
		if (Meteor.isServer) {
		  if (!Meteor.userId()) {
		    throw new Meteor.Error("not-authorized");
		  }
		  check(event, Object);
			console.log(event);
		  try {
		    let response = FacebookEvents.upsert({
					_id: event._id,
		      fbId: event.fbId
		    }, {
		      $set: {
		        isImported: event.isImported
		      }
		    });
		    return {
		      _id: event._id,
		      response: response
		    }
		  } catch (exception) {
		    return exception;
		  }
		}
	}
});
