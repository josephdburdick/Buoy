Template.importEvents.onCreated(() => {
	let self = Template.instance();
	self.subscribe('userFacebookEvents', Meteor.userId());
});

Template.importEvents.helpers({
	facebookEvents(){
		console.log(FacebookEvents.find().fetch());
		return FacebookEvents.find();
	}
});
