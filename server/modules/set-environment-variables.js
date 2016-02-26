let setEnvironmentVariables = () => {
  if ( Meteor.settings.private ) {
    Meteor.settings.private.MAIL_URL = process.env.MAIL_URL;
		Meteor.settings.private.services.facebook.appId = process.env.FB_appId;
		Meteor.settings.private.services.facebook.secret = process.env.FB_appSecret;
  }
  if ( typeof Meteor.settings.private.services.facebook.appId === "undefined" || typeof Meteor.settings.private.services.facebook.secret === "undefined") {
    console.error('\n\n\n\n+++++++++++++++++++++++\n');
    console.error(process.env.npm_package_name + ' v' + process.env.npm_package_version + '\n');
    console.error('ERROR: No environmental variables set. \n\nBefore running this project \nFB_appId and FB_appSecret environment variables \nmust be applied on this machine.');
    console.error('\n+++++++++++++++++++++++');
  }
};

Modules.server.setEnvironmentVariables = setEnvironmentVariables;
