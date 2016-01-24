Meteor.methods({
  upsertUserEvent( event ) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    check( event, Object );
    console.log(event);

    try {
      var documentId = Events.upsert( {
        ownerId: Meteor.userId(),
        fbId: event.id
      }, {
        $set: event
      });
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
