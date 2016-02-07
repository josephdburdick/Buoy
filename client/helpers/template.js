Template.registerHelper('appName', () => {
  return "Buoy";
});

Template.registerHelper('currentUsername', () => {
  return Meteor.user().username;
});

$('[data-toggle="tooltip"]').tooltip();
