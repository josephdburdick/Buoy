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
						console.error('No Facebook access token.');
					}
				} catch (e) {
					throw new Meteor.Error(e);
				}
			}

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
		}
  },
	getFacebookAccessToken(){
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
		let accessToken;
		if (Meteor.user().services && Meteor.user().services.facebook){
			accessToken = Meteor.user().services.facebook.accessToken;
			return accessToken;
		} else {
			if (Meteor.isClient){
				Meteor.call("getFacebookAccessToken", function(error, accessToken){
					if (!error) {
						return accessToken;
					} else {
						return error.message;
					}
				})
			}
			if (Meteor.isServer){
				if (Meteor.user().services && Meteor.user().services.facebook)
					accessToken = Meteor.user().services.facebook.accessToken;

				if (!!accessToken) {
					return accessToken;
				} else {
					return false
				}
			}
		}
  }
});
