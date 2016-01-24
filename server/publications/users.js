Meteor.publish('userData', function() {
  if(!this.userId) return null;
  let userData = Meteor.users.find(this.userId, {fields: {
    profile: 1,
    services: 1
  }});
  if (userData){
    return userData;
  }

  return this.ready();
});

