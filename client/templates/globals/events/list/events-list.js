Template.eventsList.onCreated(() => {
	let self = Template.instance();
	self.subscribe('userEvents', Meteor.userId());
});

Template.eventsList.helpers({
	data(){
		return Events.find( {}, { sort: { 'start_time': 1 } });
	}
});
