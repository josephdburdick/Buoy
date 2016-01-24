Meteor.methods({
  upsertEventPlace( event ) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    check( event, Object );

    try {
      var documentId = Places.upsert( {
        ownerId: event.ownerId,
        eventId: event.eventId,
        markerId: event.markerId,
        fbId: event.fbId
      }, {
        $set: event
      });
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
