Template.userProfile.onCreated( () => {
  // Template.instance().subscribe(Meteor.user());
});

Template.userProfile.helpers({
	userProfile(){
    if(Meteor.user())
      return Meteor.user();
	}
});
