Template.header.onRendered(() => {
	window.scrollTo(0, 0);
	// let
	// 	self = Template.instance(),
	//
	// 	$header = $('#primary-nav'),
	// 	$headerItems = $('a, .caret')
	// 	limit = $header.outerHeight();  /* scrolltop value when opacity should be 0 */
	// $(window).on('scroll', function() {
  //  var st = $(this).scrollTop();
  //  /* avoid unnecessary call to jQuery function */
  //  if (st <= limit) {
	// 	let
	// 		number = st / limit,
	// 		rounded = Math.max( Math.round(number * 10) / 10).toFixed(2);
	//
  //   $header.css({
	// 		'background-color' : `rgba(33,150,243, ${rounded})`
	// 	});
  //  }
	// });
	// let
	//
	// 	mn = $(".main-nav");
  //   mns = "main-nav-scrolled";
  //   hdr = $('header').height();
	//
	// $(window).scroll(function() {
	//   if( $(this).scrollTop() > hdr ) {
	//     mn.addClass(mns);
	//   } else {
	//     mn.removeClass(mns);
	//   }
	// });
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
