Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {
    fields: {
      profile: 1,
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

// User Profile
Meteor.publish('userProfile', function(userId) {
  if(!this.userId) return null;
	check(userId, String);

  return Meteor.users.find({_id: userId}, {
    fields: {
      profile: 1,
			createdAt: 1,
			updatedAt: 1,
			friends: 1
    }
  });
});
