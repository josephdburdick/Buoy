Template.updateEvent.onCreated(() => {
	let self = Template.instance();
	debugger;
	self.subscribe('userEvents', Meteor.userId());
});
