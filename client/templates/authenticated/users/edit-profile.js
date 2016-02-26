Template.updateUserProfile.onCreated( () => {
  // Template.instance().subscribe(Meteor.user());
});

Template.updateUserProfile.helpers({
	userProfile(){
    if(Meteor.user())
      return Meteor.user();
	}
});
