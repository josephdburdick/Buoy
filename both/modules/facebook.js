let facebook = {
	getAccessToken: () => {
		if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
	  if (Meteor.isClient){
			if (!!Session.get('facebookAccessToken')){
				return Session.get('facebookAccessToken');
			} else {
				return new Promise((resolve, reject) => {
					Meteor.call('getFacebookAccessToken', (error, response) => {
						if (!error){
							resolve(response);
						} else {
							reject(error);
						}
					});
				});
			}
		}
		if (Meteor.isServer){
			Meteor.call('getFacebookAccessToken', function(error, response){
				if (!error){
					return response;
				} else {
					console.error(error);
					return false;
				}
			});
	  }
	},
	facebookGraphAPIString: (params) => {
	  let
	    prefix = "https://graph.facebook.com/v2.5",
	    accessToken = params.token,
	    query = params.query,
	    affix = "&access_token=";
	  console.log(prefix + query + affix + accessToken);
	  return (prefix + query + affix + accessToken);
	},
	getFacebookData: (params) => {
		if (!params.token){
			Modules.both.facebook.getAccessToken()
				.then((token) => {
					params.token = token
				});
		}

		return new Promise((resolve, reject) => {
			Meteor.call('getFacebookAPI', {
				token: params.token,
				query: params.query
			}, (error, response) => {
				if ( error ){
					reject( error );
				} else {
					resolve( response );
				}
			})
		});
	},
	getFacebookEventsPromise: () => {
		return new Promise((resolve, reject) => {
			Modules.both.facebook.getFacebookData({token: Session.get('facebookAccessToken'), query: '/me?fields=events'})
			.then((response) => {
				if (response.statusCode === 200){
					resolve(response.data.events.data);
				} else {
					reject(response);
				}
			});
		});
	},
	processUserFacebookEvent: (event) => {
		console.log('> processUserFacebookEvent function');
		// Assign ownerId to current user if it's not already set
		if (!event.ownerId) event.ownerId = Meteor.userId();
		if (!event.fbId) event.fbId = event.id;
		if (event.id) delete event.id;
		return event;
	}
};

Modules.both.facebook = facebook;
