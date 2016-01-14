Meteor.publish( 'itineraries', function() {
  return Itineraries.find( { 'ownerId': this.userId }, { fields: { 'ownerId': 1 } } );
});
