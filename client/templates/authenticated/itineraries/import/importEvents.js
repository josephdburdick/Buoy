Template.importEvents.onCreated(() => {
	let
		instance = Template.instance(),
		facebook = Modules.both.facebook;

	let init = (() => {
		if (!Session.set('facebookAccessToken')){
			facebook.getAccessToken().then((token) => {
				Session.set('facebookAccessToken', token);
			});
		}
	})(facebook);

	instance.autorun(() => {
		instance.subscribe('importedUserFacebookEvents', Meteor.userId());
		instance.subscribe('nonImportedUserFacebookEvents', Meteor.userId(), () => {

			facebook.getFacebookEventsPromise()
				.then((events) => {
					events.forEach((event, index, array) => {
						let
							then = new Date(event.start_time),
							now = new Date();

						// Only include unique events happening in the future.
						if ( now < then && !FacebookEvents.find({fbId: event.id}).count()) {
							let eventObj = facebook.processUserFacebookEvent(event);
							Meteor.call('upsertUserFacebookEvent', eventObj, (error, response) => {
								if (!error){
									Meteor.call('updateFacebookEventImportStatus', {_id: eventObj._id, fbId: eventObj.fbId, isImported: true}, (error, success) => {
										if (!error){
											// Bert.alert(`Added <strong>${eventObj.name}</strong>.`, 'success');
											console.log(`Added ${eventObj.name}`);
										} else {
											Bert.alert(`Unable to update import status <strong>${eventObj.name}</strong>. You may see it again.`, 'info');
										}
									});
								} else {
									Bert(error.message, 'danger');
								}
							});
						}
					});
			});
		});
	});
});

Template.importEvents.helpers({
	availableFacebookEvents(){
		return FacebookEvents.find({
				isImported: { $ne: true }
			},
			{
				sort: { 'start_time': -1 }
			}
		);
	}
});
