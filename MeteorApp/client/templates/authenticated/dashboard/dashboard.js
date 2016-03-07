Template.dashboard.onCreated(() => {
	let self = Template.instance();
  self.subscribe('allUsers');
  self.subscribe('userData');
	self.subscribe('publicAndUserEvents', Meteor.userId());
	self.subscribe('posts');

	if (! Session.get('activeEventListFilterValue')){
		Session.set('activeEventListFilterValue', 'all');
	}
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
		if (Session.equals('activeEventListFilterValue', 'all')){
			return Events.find( { }, { sort: { 'start_time': -1 } });
		} else {
			return Events.find( { type: Session.get('activeEventListFilterValue') }, { sort: { 'start_time': -1 } });
		}
	}
});
