let getFacebookToken = (cb) => {
  let facebookLogin = Modules.client.loginWithFacebook;
  if (Meteor.isClient){
    if (Meteor.user().services && Meteor.user().services.facebook.accessToken){
      return Meteor.user().services.facebook.accessToken;
    } else {
      return new Promise((resolve, reject) => {
				Meteor.call('getFacebookAccessToken', (error, response) => {
					if ( error ){
						if (confirm("Please log into Facebook to access this feature.") == true) {
	            facebookLogin({},() => {
								debugger;
	              // Meteor.call('readFacebookToken', (error, response) => {
	              //   if (!error){
	              //     Bert.alert(response.content, 'success');
	              //     return response;
	              //   } else {
	              //     Bert.alert(error.reason, 'warning');
	              //   }
	              // })
	            })
	          } else {
	            Bert.alert('Unable to access this feature without Facebook permission.', 'warning');
	          }
						reject (error.reason);
					} else {
						resolve (response);
					}
				});
			});
    }
  }
};


Modules.both.getFacebookToken = getFacebookToken;
