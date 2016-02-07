Template.viewProfile.onCreated(() => {
	let
		self = Template.instance(),
		userId = FlowRouter.getParam("userId");

		self.subscribe('userProfile', userId);


});

Template.viewProfile.helpers({
	user: () => Meteor.users.findOne(FlowRouter.getParam("userId"))

});
