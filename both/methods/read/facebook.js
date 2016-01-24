Meteor.methods({
  readFBdata( params ) {
    if (Meteor.isServer){
      if (!Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      console.log(params);
      check( params, {
        token: String,
        query: String
      });

      let request = Modules.both.facebookGraphAPI(params),
          response = HTTP.get(request);
      console.log(response);
      if (response.statusCode === 200){
        return response;
      } else {
        return false
      }
    }
  },
  readFBAccessToken(){
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    if (Meteor.isServer){

      let token = Meteor.user().services.facebook.accessToken;

      if (token) {
        return token;
      } else {
        return false
      }
    }
  }
});
