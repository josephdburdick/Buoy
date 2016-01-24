Meteor.methods({
  getGeocode( query ) {
    if (Meteor.isServer){
      if (!Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      console.log(query);

      check( query, String );
      let geo = new GeoCoder();
      let result = geo.geocode( query );

      console.log(result);

      if (!!result){
        return result;
      } else {
        return false
      }
    }
  }
});
