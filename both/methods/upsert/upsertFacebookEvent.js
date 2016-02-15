Meteor.methods({
  upsertUserFacebookEvent( event ) {
    if (!Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
    check( event, Object );
		let documentId;
		try {
			if (!!event._id) {
				FacebookEvents.upsert( {
					_id: event._id
				}, {
					$set: event
				});
				return event._id;
			} else {
				documentId = FacebookEvents.insert(event);
				return documentId;
			}
		} catch( exception ) {
			return exception;
		}
	}
});
