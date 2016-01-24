Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {
    fields: {
      profile: 1
    }
  });
});


// Publish the user directory which everbody can see
Meteor.publish("allUsers", function () {
  if(!this.userId) return null;
  return Meteor.users.find({}, {
    fields: {
      _id: 1,
      username: 1,
      profile: 1,
      emails: 1
    }
  });
});

Meteor.publish("userPlaces", function () {
  if(!this.userId) return null;
  return Places.find({
    ownerId : this.userId
  });
});
