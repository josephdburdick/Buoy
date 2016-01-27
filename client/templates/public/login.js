Template.login.onRendered( () => {
  Modules.client.login( { form: "#login", template: Template.instance() } );
});

Template.login.events({
  'submit form': ( event ) => event.preventDefault(),

	'click [data-action="facebook-login"]': ( event ) => {
		event.preventDefault();

    Modules.client.loginWithFacebook({}, () => {
			FlowRouter.go('dashboard');
		});
	}
});
