Meteor.publish( 'userEvents', function(userId) {
	check(userId, String);
  return [
		Events.find({ ownerId: userId }, { sort: { 'start_time': -1 } })
	];
});

Meteor.smartPublish('publicAndUserEvents', function(userId) {
  check(userId, String);
  return [
    Events.find({ ownerId: userId }, { sort: { 'start_time': -1 } }),
    Events.find({ privacy: 'EVERYONE' }, { sort: { 'start_time': -1 } })
  ];
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

Meteor.publish( 'eventDetail', function(eventId) {
	check(eventId, String);
  return Events.find({ _id: eventId });
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
	return FacebookEvents.find({ ownerId: userId }, { sort: { 'start_time': -1 } });
});

Meteor.publish( 'nonImportedUserFacebookEvents', function(userId){
	check(userId, String);
	return FacebookEvents.find({
			ownerId: userId,
			isImported: { $eq: false }
		},
		{
			sort: { 'start_time': -1 }
		}
	);
});

Meteor.publish( 'importedUserFacebookEvents', function(userId){
	check(userId, String);
	return FacebookEvents.find({
			ownerId: userId,
			isImported: { $eq: true }
		},
		{
			sort: { 'start_time': -1 }
		}
	);
});
