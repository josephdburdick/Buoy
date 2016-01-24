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

      if (!params.token) return false;

      let
        request = Modules.both.facebookGraphAPI(params),
        response = HTTP.get(request);

      if (response.statusCode === 200){
        return response;
      } else {
        return false
      }
    }
  }
});
