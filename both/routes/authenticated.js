const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/', {
  name: 'index',
  action() {
    BlazeLayout.render( 'default', { yield: 'index' } );
  }
});

authenticatedRoutes.route( '/dashboard', {
  name: 'dashboard',
  action() {
    BlazeLayout.render( 'default', { yield: 'dashboard' } );
  }
});

authenticatedRoutes.route( '/event/create', {
  name: 'insertEvent',
  action() {
    BlazeLayout.render( 'default', { yield: 'insertEvent' } );
  }
});

authenticatedRoutes.route( '/user/:userId/profile', {
  name: 'viewProfile',
  action() {
    BlazeLayout.render( 'default', { yield: 'viewProfile' } );
  }
});
