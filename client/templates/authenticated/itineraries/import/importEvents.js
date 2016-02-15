Template.importEvents.onCreated(() => {
	let self = Template.instance();
	self.subscribe('nonImportedUserFacebookEvents', Meteor.userId());

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

Template.importEvents.onRendered(() => {
	let template = Template.instance(),
			facebook = Modules.client.facebook;

	if (!template.dictionary.facebook.keys.events){
		let eventsData = facebook.getFacebookEventsPromise();
		eventsData.then((events) => {
			template.dictionary.facebook.set('events', events);
			events.forEach((event, index, array) => {
				let
					then = new Date(event.start_time),
					now = new Date(),
					processedFacebookEvent;

				// Only include unique events happening in the future.
				if ( /*now < then &&*/ !FacebookEvents.find({fbId: event.id}).count() ) {
					processedFacebookEvent = facebook.processUserFacebookEvent(event);
					// facebook.addEventToUserFacebookEvents(processedFacebookEvent);
					Meteor.call('upsertUserFacebookEvent', processedFacebookEvent, (error, response) => {
						if ( error ){
							Bert(error.message, 'danger');
						}
					});
				}
			});
		});
	}
});

Template.importEvents.helpers({
	availableFacebookEvents(){
		return FacebookEvents.find( { isImported: false }, { sort: { 'start_time': -1 } });
	}
});
