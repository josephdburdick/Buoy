Template.dashboard.onCreated(() => {
	let self = Template.instance();
  self.subscribe('allUsers');
  self.subscribe('userData');
	self.subscribe('publicAndUserEvents', Meteor.userId());
});

Template.dashboard.helpers({
	userHasEvents(){
		return !!Events.find().count();
	},
	numberOfEvents(){
		return Events.find().count();
	},
	facebookEvents(){
		return FacebookEvents.find( {isImported: false}, { sort: { 'start_time': -1 } });
	},
	userEvents(){
		return Events.find( {}, { sort: { 'start_time': -1 } });
	}
});
