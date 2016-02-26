Meteor.methods({
  updateEvent( event ) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    check( event, Object );
    var vals = Object.keys(event).map(key => event[key]);

    try {
      var documentId = Events.update( {
				_id: event._id,
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
