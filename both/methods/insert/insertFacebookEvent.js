Meteor.methods({
  insertUserFacebookEvent( event ) {
    if (!Meteor.userId())
      throw new Meteor.Error("not-authorized");

    check( event, Object );
		console.log('> insertFacebookEvent ')
		console.log(event);
		try {
			let documentId = FacebookEvents.insert( event );
			return documentId;
		} catch( exception ) {
			return exception;
		}
	}
});
