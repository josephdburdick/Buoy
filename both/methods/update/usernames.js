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
  changeUsername: function (username) {
    if (Meteor.userId()) {
      throw new Meteor.Error(401, 'You must be logged in to continue.');
    }
    check(username, String);
    if (/[^A-Za-z0-9\_]/g.test(username)){
      throw new Meteor.Error(401, 'Invalid character in username.');
    }
    let available = Meteor.call('isUsernameAvailable', username);
    if (available) {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'username': username
        }
      });
      return true;
    } else {
      throw new Meteor.Error(401, `Username <strong>${username}</strong> is already taken.`);
    }
  },
  isUsernameChanged: function (username) {
    if (Meteor.userId()) {
      throw new Meteor.Error(401, 'You must be logged in to continue.');
    }
    check(username, String);
  }
});
