$.validator.addMethod('isUniqueUsername', (username) => {
  let exists = Meteor.users.findOne({
    "username": username.toLowerCase()
  }, {
    username: 1
  });

  if (!!exists) {
    if (exists._id === Meteor.userId()) {
      return true;
    }
    if (exists && exists._id != Meteor.userId() || username.toLowerCase() === exists.username.toLowerCase()) {
      return false;
    }
  } else {
    return true;
  }
});

$.validator.addMethod('regex', (value, element, regexpr) => {
  return !regexpr.test(value);
});
