Template.dashboard.onCreated(() => {
	let self = Template.instance();
  self.subscribe('allUsers');
  self.subscribe('userData');
	self.subscribe('publicAndUserEvents', Meteor.userId());
	// self.subscribe('userFacebookEvents', Meteor.userId());
	// self.subscribe('places');
	// self.subscribe('markers');
	// self.subscribe('locations');
	// self.subscribe('eventsPlacesAndLocations');

	// let facebook = Modules.client.facebook;
	// self.dictionary = {
	// 	facebook: new ReactiveDict({
	//     token: false,
	//     data: false,
	//     events: false
	// 	}),
	// };
	//
	// let init = ((self) => {
	// 	facebook.getUserFacebookAccessToken().then((data) => {
	// 		Session.set('facebookAccessToken', data);
	// 	});
	// })(self);
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
	// importedFacebookEvents(){
	// 	return FacebookEvents.find( { isImported: true }, { sort: { 'start_time': -1 } });
	// },
	userEvents(){
		return Events.find( {}, { sort: { 'start_time': -1 } });
	}

});
// Template.dashboard.events({
// 	'click [data-role="import-events"]': function(e, template){
// 		e.preventDefault();
// 		let facebook = Modules.client.facebook;
//
// 		if (!!template.dictionary.facebook.keys.events){
// 		} else {
// 			let eventsData = facebook.getFacebookEventsPromise();
// 			eventsData.then((events) => {
// 				template.dictionary.facebook.set('events', events);
// 				events.forEach((event, index, array) => {
// 					let
// 						then = new Date(event.start_time),
// 						now = new Date(),
// 						processedFacebookEvent;
//
// 					// Only include unique events happening in the future.
// 					if ( /*now < then &&*/ !FacebookEvents.find({fbId: event.id}).count() ) {
// 						processedFacebookEvent = facebook.processUserFacebookEvent(event);
// 						// facebook.addEventToUserFacebookEvents(processedFacebookEvent);
// 						Meteor.call('upsertUserFacebookEvent', processedFacebookEvent, (error, response) => {
// 							if ( error ){
// 								Bert(error.message, 'danger');
// 							}
// 						});
// 					}
// 				});
// 			});
// 		}
// 	}
// })
