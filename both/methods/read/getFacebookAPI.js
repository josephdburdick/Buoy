Meteor.methods({
  getFacebookAPI( params ) {
		if (Meteor.isServer){
	    if (!Meteor.userId()) {
	      throw new Meteor.Error("not-authorized");
	    }

	    if (!params.token){
				try {
					console.log('No Facebook access token. Attempting server retrieval.');
					let accessToken = Meteor.call('getFacebookAccessToken');
					if (!!accessToken){
						params.token = accessToken;
						console.log('Facebook access token grabbed from server. Try grabbing from the client next time.');
					} else {
						console.error('No Facebook access token. \nTry logging in with Facebook to acceess this feature.');
						return false;
					}
				} catch (e) {
					throw new Meteor.Error(e);
				}
			}
			if (!!params.token){
				check( params, {
					token: String,
					query: String
				});

				let
				facebookGraphAPIRequest = Modules.both.facebookGraphAPIString(params),
				response = HTTP.get(facebookGraphAPIRequest);

				if (response.statusCode === 200){
					return response;
				} else {
					return false
				}
			} else {
				throw new Meteor.Error('No Facebook access token. \nTry logging in with Facebook to acceess this feature.');
			}
		}
  },
	getFacebookAccessToken(){
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
		if (Meteor.isServer){
			try {
				return Meteor.user().services.facebook.accessToken;
			} catch(e) {
				return null;
			}
		}
		if (Meteor.isClient){
			Meteor.call("getFacebookAccessToken", (error, accessToken) => {
			  if (!error){
					return accessToken;
				} else {
					return error;
				}
			});
		}
  }
});
