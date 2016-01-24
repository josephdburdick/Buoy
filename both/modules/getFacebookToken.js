let getFacebookToken = (cb) => {
  if (Meteor.isClient){
    Meteor.callPromise('readFBAccessToken')
    .catch((error) => {
      Bert.alert(error.reason, 'warning');
    })
    .then((token) => {
      if (cb) {
        cb(token);
      } else {
        return token;
      }
    });
  }

  if (Meteor.isServer){
    let token = Meteor.call('readFBAccessToken');

    return !!cb ? cb(token) : token;
  }
};


Modules.both.getFacebookToken = getFacebookToken;

