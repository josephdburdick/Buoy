Meteor.methods({
  readFBAccessToken(){
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    if (Meteor.isClient){
      Meteor.call("getAccessToken", function(error, accessToken){
        if (!error) {
          return accessToken;
        }
      })
    }
    if (Meteor.isServer){
      let token;
      if (Meteor.user().services && Meteor.user().services.facebook)
        token = Meteor.user().services.facebook.accessToken;

      if (!!token) {
        return token;
      } else {
        return false
      }
    }
  }
});
