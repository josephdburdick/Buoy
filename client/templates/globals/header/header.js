Template.header.onRendered(() => {
	window.scrollTo(0, 0);
	let
		self = Template.instance(),
		$header = $('#primary-nav'),
		limit = $header.outerHeight();

	$(window).on('scroll', () => {
   var st = $(this).scrollTop();
   /* avoid unnecessary call to jQuery function */
   if (st <= limit){
		 $header.removeClass('navbar-inverse');
	 } else {
		 $header.addClass('navbar-inverse');
	 }
	});
})

Template.header.helpers({
  brandLink() {
    let
			login = FlowRouter.path( 'login' ),
      dashboard = FlowRouter.path( 'dashboard' );
    return !Meteor.loggingIn() && !Meteor.userId() ? login : dashboard;
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
