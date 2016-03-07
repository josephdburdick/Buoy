
const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/', {
  name: 'index',
  action() {
    BlazeLayout.render( 'default', { yield: 'dashboard' } );
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
    BlazeLayout.render( 'default', { yield: 'insertEvent', backButton: true } );
  }
});

authenticatedRoutes.route( '/import', {
  name: 'importEvents',
  action() {
    BlazeLayout.render( 'default', { yield: 'importEvents', backButton: true } );
  }
});

authenticatedRoutes.route( '/user/:userId', {
  name: 'viewProfile',
  action() {
    BlazeLayout.render( 'default', {
			yield: 'viewProfile',
			backButton: true
		} );
  }
});

authenticatedRoutes.route( '/user/:userId/edit', {
  name: 'editProfile',
  action() {
    BlazeLayout.render( 'default', {
			yield: 'editProfile',
			backButton: false
		} );
  }
});
