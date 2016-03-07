Template.viewProfile.onCreated(() => {
	let
		self = Template.instance(),
		userId = FlowRouter.getParam("userId");

		self.subscribe('userProfile', userId);
		self.subscribe('userEvents', userId);
});

Template.viewProfile.helpers({
	user: () => Meteor.users.findOne(FlowRouter.getParam("userId")),
	userEventsCount: () => Events.find({ownerId: FlowRouter.getParam("userId") }).count()
});
