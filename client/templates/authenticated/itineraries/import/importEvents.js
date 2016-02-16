Template.importEvents.onCreated(() => {
	let
		self = Template.instance(),
		facebook = Modules.client.facebook;

	self.facebookEvents = self.subscribe('nonImportedUserFacebookEvents', Meteor.userId());

	let init = (() => {
		debugger;
		if (!Session.set('facebookAccessToken')){
			facebook.getUserFacebookAccessToken().then((data) => {
				Session.set('facebookAccessToken', data);
			});
		}
	})(facebook);
});

Template.importEvents.onRendered(() => {
	let
		template = Template.instance(),
		facebook = Modules.client.facebook;

	if (FacebookEvents.find().count() === 0){
		let eventsData = facebook.getFacebookEventsPromise();
		eventsData.then((events) => {
			events.forEach((event, index, array) => {
				let
					then = new Date(event.start_time),
					now = new Date(),
					processedFacebookEvent;

				processedFacebookEvent = facebook.processUserFacebookEvent(event);
				if (template.facebookEvents.ready()){
					// Only include unique events happening in the future.
					if ( now < then && !FacebookEvents.find({fbId: event.fbId}).count() ) {
						// facebook.addEventToUserFacebookEvents(processedFacebookEvent);
						Meteor.call('upsertUserFacebookEvent', processedFacebookEvent, (error, response) => {
							if ( error ){
								Bert(error.message, 'danger');
							}
						});
					}
				}
			});
		});
	}
});

Template.importEvents.helpers({
	availableFacebookEvents(){
		return FacebookEvents.find({ }, { sort: { 'start_time': -1 } });
	}
});
