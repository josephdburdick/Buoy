Template.dashboard.onCreated(() => {
	let self = Template.instance();
  self.subscribe('allUsers');
  self.subscribe('userData');
	self.subscribe('userEvents', Meteor.userId());
	self.subscribe('userFacebookEvents', Meteor.userId());
	self.subscribe('places');
	self.subscribe('markers');
	self.subscribe('locations');
	self.subscribe('eventsPlacesAndLocations');

	let facebook = Modules.client.facebook;
	self.dictionary = {
		facebook: new ReactiveDict({
	    token: false,
	    data: false,
	    events: false
		}),
	};

	let init = ((self) => {
		facebook.getUserFacebookAccessToken().then((data) => {
			Session.set('facebookAccessToken', data);
		});
	})(self);
});

Template.dashboard.helpers({
	userHasEvents(){
		return !!Events.find().count();
	},
	numberOfEvents(){
		return Events.find().count();
	},
	facebookEvents(){
		return FacebookEvents.find( {}, { sort: { 'start_time': -1 } });
	}
});

Template.dashboard.events({
	'click [data-role="import-events"]': function(e, template){
		e.preventDefault();
		let facebook = Modules.client.facebook;
		let eventsData = facebook.getFacebookEventsPromise();
		eventsData.then((events) => {
			template.dictionary.facebook.set('events', events);
			$('#modal').modal('show');
			events.forEach((event, index, array) => {
				let processedFacebookEvent = facebook.processUserFacebookEvent(event);
				facebook.addEventToUserFacebookEvents(processedFacebookEvent);
			});
		});
	}
})
