Meteor.users.deny({
  update: function() {
    return true;
  }
});

let _createUsernameFromEmail = (email) => {
	let username = email.split('@')[0].toLowerCase();
	let available = Meteor.call('isUsernameAvailable', username);
	if (available){
		return username
	} else {
		return username + faker.random.number();
	}
};

let extendAccounts = () => {
  Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile || {};

    if (typeof user.services.facebook !== "undefined") {
      user.emails = [{
        address: user.services.facebook.email,
        verified: true
      }];

      if (user.profile == undefined) user.profile = {};

      user.profile.name = {
        first: user.services.facebook.first_name,
        last: user.services.facebook.last_name
      };

      user.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
      user.profile.gender = user.services.facebook.gender;
      user.profile.locale = user.services.facebook.locale;
      user.profile.age_range = user.services.facebook.age_range;
    }

    if (!user.username)
      user.username = _createUsernameFromEmail(user.emails[0].address);

    return user;
  });
};

Modules.server.extendAccounts = extendAccounts;
