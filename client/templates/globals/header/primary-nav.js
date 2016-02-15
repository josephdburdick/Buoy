Template.primaryNav.onRendered(() => {
  window.scrollTo(0, 0);
  let
    self = Template.instance(),
    $primaryNav = $('#primary-nav'),
    $secondaryNav = !!$('#secondary-nav') ? $('#secondary-nav') : false,
    primaryNavLimit = $primaryNav.outerHeight();


	$(window).on('scroll', () => {
	  let st = $(this).scrollTop();
	  /* avoid unnecessary call to jQuery function */
	  if (st <= primaryNavLimit) {
	    $primaryNav.addClass('navbar-inverse').removeClass('navbar-default');
	  } else {
	    $primaryNav.removeClass('navbar-inverse').addClass('navbar-default');
	  }
		if (!!$secondaryNav){
			let
				opacity = 1,
				secondaryNavLimit = $secondaryNav.offset().top;

      if(st <= secondaryNavLimit) {
				opacity = secondaryNavLimit / st - 1;
      } else {
				opacity = 1;
			}

      //set the opacity of div id="someDivId"
      $primaryNav.find('.navbar-nav').css('opacity', opacity);
		}
	});
})

Template.primaryNav.helpers({
  brandLink() {
    let
      login = FlowRouter.path('login'),
      dashboard = FlowRouter.path('dashboard');
    return !Meteor.loggingIn() && !Meteor.userId() ? login : dashboard;
  }
});

Template.primaryNav.events({
  "click [data-action='logout']": (event) => {
    event.preventDefault();
    Meteor.logout(function (error) {
      if (error) {
        Bert.alert(error.reason, 'warning');
      } else {
        FlowRouter.go('/');
        Bert.alert('Logged out!', 'success');
      }
    });
  },
	"click [data-action='back']": (event) => {
    event.preventDefault();
    window.history.go(-1);
  }
});
