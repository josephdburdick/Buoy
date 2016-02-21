Meteor.methods({
  getFacebookAPI( params ) {
		if (Meteor.isServer){
	    if (!Meteor.userId()) {
	      throw new Meteor.Error("not-authorized");
	    }

	    if (!params.token){
				try {
					let accessToken = Meteor.call('getFacebookAccessToken');
					if (!!accessToken){
						params.token = accessToken;
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
  				facebookGraphAPIRequest = Modules.both.facebook.facebookGraphAPIString(params),
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
	  if (Meteor.isClient){
	    return Session.get('facebookAccessToken');
	  }
		if (Meteor.isServer){
			try {
				return Meteor.user().services.facebook.accessToken;
			} catch(error) {
        console.error(error);
        console.log('No accessToken in getAccesstoken');
        return false;
			}
		}
  }
});
