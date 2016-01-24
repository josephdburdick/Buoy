Meteor.users.deny({
  update: function() {
    return true;
  }
});

let _createUsernameFromEmail = (email) => {
  return email.split('@')[0].toLowerCase();
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

    if (typeof options.profile.username === "undefined")
      user.username = _createUsernameFromEmail(user.emails[0].address);

    if (typeof user.profile.picture === "undefined")
      user.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";

    return user;
  });
};

Modules.server.extendAccounts = extendAccounts;
