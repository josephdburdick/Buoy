Meteor.methods({
  insertEvent( argument ) {
    check( argument, Object );

    try {
      var documentId = Collection.insert( argument );
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
