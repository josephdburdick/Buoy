let getFacebookToken = (cb) => {
  let facebookLogin = Modules.client.loginWithFacebook;
  if (Meteor.isClient){
    if (Meteor.user().services && Meteor.user().services.facebook.accessToken){
      return Meteor.user().services.facebook.accessToken;
    } else {
      Meteor.callPromise('readFBAccessToken')
        .catch((error) => {

          if (confirm("Please log into Facebook to access this feature.") == true) {
            facebookLogin(() => {
              Meteor.call('readFacebookToken', (error, response) => {
                if (!error){
                  Bert.alert(response.content, 'success');
                  return response;
                } else {
                  Bert.alert(error.reason, 'warning');
                }
              })
            })
          } else {
            Bert.alert('Unable to access this feature without Facebook permission.', 'warning');
          }

        })
        .then((token) => {
          if (cb) {
            cb(token);
          } else {
            return token;
          }
        });
    }
  }
};


Modules.both.getFacebookToken = getFacebookToken;

