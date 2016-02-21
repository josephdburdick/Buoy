Template.eventDetail.onCreated(() => {
	let self = Template.instance();

	self.subscribe('eventDetail', FlowRouter.getParam('eventId'));
});

Template.eventDetail.helpers({
	event(){
		console.log(Events.findOne());
		return Events.findOne();
	}
});
