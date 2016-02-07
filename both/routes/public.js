const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route( '/signup', {
  name: 'signup',
  action() {
    BlazeLayout.render( 'default', { yield: 'signup' } );
  }
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    BlazeLayout.render( 'default', { yield: 'login' } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recover-password',
  action() {
    BlazeLayout.render( 'default', { yield: 'recoverPassword' } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'reset-password',
  action() {
    BlazeLayout.render( 'default', { yield: 'resetPassword' } );
  }
});


publicRoutes.route( '/event/:eventId', {
  name: 'eventDetail',
  action() {
    BlazeLayout.render( 'default', { yield: 'eventDetail' } );
  }
});

FlowRouter.route('/event/:eventId/edit', {
	name: 'edit-event',
  action: function(params, queryParams) {
    console.log("Yeah! We are on the post:", params.postId);
		BlazeLayout.render( 'default', { yield: 'eventUpdate' } );
  }
});
