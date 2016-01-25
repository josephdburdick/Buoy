Template.header.helpers({
  brandLink() {
    let login = FlowRouter.path( 'login' ),
        index = FlowRouter.path( 'index' );
    return !Meteor.loggingIn() && !Meteor.userId() ? login : index;
  }
});

Template.header.events({
  "click [data-action='logout']": (event) => {
		event.preventDefault();
    Meteor.logout(function( error ) {
      if ( error ) {
        Bert.alert( error.reason, 'warning' );
      } else {
        FlowRouter.go('/');
        Bert.alert( 'Logged out!', 'success' );
      }
    });
  }
});
