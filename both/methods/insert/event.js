Meteor.methods({
  insertEvent( argument ) {
    check( argument, Object );

    try {
      var documentId = Events.insert( argument );
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
