Template.editProfile.onCreated( () => {
  //Template.instance().subscribe(Meteor.user());
});

Template.editProfile.helpers({
	userProfile(){
    if(Meteor.user())
      return Meteor.user();
	}
});
