Meteor.publish( 'userEvents', function() {
  return Events.find( { 'ownerId': this.userId } );
});

Meteor.publish( 'eventsPlacesAndLocations', function() {
	var places = Places.find();
  var eventIds = places.map(function (place) {
    return place.eventId;
  });

  return [
    places,
    Events.find({_id: {$in: eventIds}})
  ];
});

Meteor.publish( 'locations', function() {
  return Locations.find();
});

Meteor.publish( 'places', function() {
  return Places.find();
});

Meteor.publish( 'markers', function() {
  return Markers.find();
});

Meteor.publish( 'userFacebookEvents', function(userId){
	check(userId, String);
	return FacebookEvents.find({ ownerId: userId });
})
