let facebook = {
	getFacebookToken: () => {
	  if (Meteor.user().services && Meteor.user().services.facebook.accessToken){
			console.log('Got accessToken in getAccesstoken');
	    return (Meteor.user().services.facebook.accessToken);
	  } else {
			Meteor.call('getFacebookAccessToken', function(error, response){
				if (!error){
					return response;
				} else {
					console.error(error);
					console.log('No accessToken in getAccesstoken');
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
		if (!params.token)
			params.token = Modules.both.facebook.getFacebookToken();

		if (Meteor.isClient){
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
		}
		if (Meteor.isServer){
			Meteor.call('getFacebookAPI', {
				token: params.token,
				query: params.query
			}, (error, response) => {
				if ( !error ){
					return response;
				} else {
					return error;
				}
			})
		}
	},

};

Modules.both.facebook = facebook;
