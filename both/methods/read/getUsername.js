Meteor.methods({
  isUsernameAvailable: function (username) {
    if (Meteor.userId()) {
      throw new Meteor.Error(401, 'You must be logged in to continue.');
    }
    check(username, String);

    var userExistsId = Meteor.users.findOne({
      username: username
    });
    if (userExistsId && userExistsId._id != Meteor.userId()) {
      return false;
    } else {
      return true;
    }
  },
  isUsernameUnique: function (username) {
    if (Meteor.userId()) {
      throw new Meteor.Error(401, 'You must be logged in to continue.');
    }
    check(username, String);

    var userExistsId = Meteor.users.findOne({
      username: username
    });

    if (!userExistsId) {
      return true;
    } else {
      return false;
    }
  },
  isUsernameChanged: function (username) {
    if (Meteor.userId()) {
      throw new Meteor.Error(401, 'You must be logged in to continue.');
    }
    check(username, String);
  }
});
