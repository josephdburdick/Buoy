let loginWithFacebook = ( params, cb ) => {
  params = params || {}
  params.requestPermissions = !!params.requestPermissions ? params.requestPermissions : Meteor.settings.public.services.facebook.permissions;
  params.redirectUrl = !!params.redirectUrl ? params.redirectUrl : 'http://localhost:3000/';

  return Meteor.loginWithFacebook({
    requestPermissions: params.requestPermissions,
    redirectUrl: params.redirectUrl
  }, function (error) {
    if (error){
      console.log(error);
      return false;
    } else {
      if (cb) { console.log(cb); cb(); }
      return true;
    }
  });
}

Modules.client.loginWithFacebook = loginWithFacebook;
