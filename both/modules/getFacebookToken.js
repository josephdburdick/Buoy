let getFacebookToken = (cb) => {
  let loginWithFacebook = Modules.client.loginWithFacebook;

  if (Meteor.user().services && Meteor.user().services.facebook.accessToken){
		console.log('Got accessToken in getAccesstoken');
    return (Meteor.user().services.facebook.accessToken);
  } else {
		console.log('No accessToken in getAccesstoken');
		return false;
  }
};

Modules.both.getFacebookToken = getFacebookToken;
