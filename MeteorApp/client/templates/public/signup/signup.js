Template.signup.onRendered( () => {
  Modules.client.signup({
    form: "#signup",
    template: Template.instance()
  });
});

Template.signup.events({
  'submit form': ( event ) => event.preventDefault(),
  'click [data-action="facebook-signup"]': ( event ) => {
		event.preventDefault();

    Modules.client.facebook.loginWithFacebook({}, () => {
			FlowRouter.go('dashboard');
		});
	}
});
