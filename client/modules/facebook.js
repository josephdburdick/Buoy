let facebook = {
	loginWithFacebook: ( params, callback ) => {
	  params = params || {}
	  params.requestPermissions = !!params.requestPermissions ? params.requestPermissions : Meteor.settings.public.services.facebook.permissions;
	  params.redirectUrl = !!params.redirectUrl ? params.redirectUrl : Meteor.settings.public.services.facebook.redirectUrl;
		console.log('Calling loginWithFacebook...');
	  return Meteor.loginWithFacebook({
	    requestPermissions: params.requestPermissions,
	    redirectUrl: params.redirectUrl
	  }, function (error) {
			if (!error) {
				if (callback) callback();
			} else {
	      Bert.alert(error, 'error');
	      return false;
	    }
	  });
	},
	getFacebookToken: () => {
		if (!!Session.get('facebookAccessToken')){
			return Session.get('facebookAccessToken');
		} else {
			return new Promise((resolve, reject) => {
				Meteor.call('getFacebookToken', (error, response) => {
					if ( error ){
						reject( error );
					} else {
						resolve( response );
					}
				})
			});
		}
	},
	setFacebookToken: (token) => { Session.set('facebookAccessToken', token); },
	processUserFacebookEvent: (event) => {
		console.log('> processUserFacebookEvent function');
		// Assign ownerId to current user if it's not already set
		if (typeof event === "object" && !event.ownerId) event.ownerId = Meteor.userId();
		// Assign the fbId with the to current user fbId if it's not already set
		if (!event.fbId) event.fbId = event.id;
		// If the original facebook ID, ".id", appears anywhere remove it
		if (event.id) delete event.id;

		return event;
	},
	addEventToUserFacebookEvents: (event) => {
		console.log('> addEventToUserFacebookEvents function');

		return new Promise((resolve, reject) => {
			Meteor.call('upsertUserFacebookEvent', event, (error, response) => {
				if ( error ){
					reject( error );
				} else {
					if (response){
						event._id = response;
						resolve(event);
					}
				}
			});
		});
	},
	getFacebookEventsPromise: () => {
		return new Promise((resolve, reject) => {
			Modules.both.facebook.getFacebookData({token: Session.get('facebookAccessToken'), query: '/me?fields=events'})
			.then((response) => {
				if (response.statusCode = 200){
					resolve(response.data.events.data);
				} else {
					reject(response);
				}
			});
		});
	},
	addUserFacebookEvents: () => {
		let events = self.dictionary.facebook.get('events');

		events.forEach((event, index, array) => {
			let processedFacebookEvent = Modules.client.facebook.processUserFacebookEvent(event);
			Modules.client.facebook.addEventToUserFacebookEvents(processedFacebookEvent);
		});
	},
	getUserFacebookAccessToken: () => {
		return new Promise((resolve, reject) => {
			Meteor.call('getFacebookAccessToken', (error, response) => {
				if (!error){
					token = response;
					resolve(response);
				} else {
					reject(error);
				}
			});
		});
	}
};

Modules.client.facebook = facebook;
