Meteor.methods({
  updateUserEvent( event ) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    check( event, Object );
    console.log('inside meteor method');
    // console.log(event);
    var vals = Object.keys(event).map(key => event[key]);
    console.log(vals);
    try {
      var documentId = Events.update( {
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
