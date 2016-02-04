Template.importEvents.onCreated(() => {
	let self = Template.instance();
	self.subscribe('userFacebookEvents', Meteor.userId());
});

Template.importEvents.helpers({
	facebookEvents(){
		return FacebookEvents.find( {}, { sort: { 'start_time': 1 } });
	}
});
