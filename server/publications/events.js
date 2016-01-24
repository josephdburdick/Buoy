Meteor.publish( 'events', function() {
 //  // return Itineraries.find( { 'ownerId': this.userId }, { fields: { 'ownerId': 1 } } );
 //  let events = Meteor.call('readFBdata', '/me?fields=events');
 //  Meteor.call('updateUserItineraries', {userId: this.userId, events: events});
 //  return events;
	// // return Itineraries.find();

  return Events.find( { 'ownerId': this.userId }, { fields: { 'ownerId': 1 } } );
});


