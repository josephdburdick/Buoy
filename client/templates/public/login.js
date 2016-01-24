Template.login.onRendered( () => {
  Modules.client.login( { form: "#login", template: Template.instance() } );
});

Template.login.events({
  'submit form': ( event ) => event.preventDefault(),

	'click [data-action="facebook-login"]': ( event ) => {
		event.preventDefault();

    let facebookLogin = Modules.client.loginWithFacebook;

    return Meteor.loginWithFacebook({
			requestPermissions: Meteor.settings.public.services.facebook.permissions,
			redirectUrl: 'http://localhost:3000/'
		}, function (error) {
		  if (error){
				console.log(error);
				Bert.alert(error.reason, 'danger');
			} else {
				FlowRouter.go('dashboard');
			}
		});
	}
});
