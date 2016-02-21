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
	}
};

Modules.client.facebook = facebook;
