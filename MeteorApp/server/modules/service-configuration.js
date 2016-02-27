let serviceConfiguration = () => {
	ServiceConfiguration.configurations.remove({
	    service: 'facebook'
	});

	ServiceConfiguration.configurations.upsert(
	  { service: 'facebook' },
	  {
	    $set: {
	      appId: Meteor.settings.private.services.facebook.appId,
	      loginStyle: 'popup',
	      secret: Meteor.settings.private.services.facebook.secret
	    }
	  }
	);
};

Modules.server.serviceConfiguration = serviceConfiguration;
