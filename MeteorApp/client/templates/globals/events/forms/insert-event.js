Template.insertEvent.onCreated(() => {
	let self = Template.instance();
	self.subscribe('userEvents', Meteor.userId());
});
