Template.registerHelper('appName', () => {
  return "Buoy";
});

Template.registerHelper('currentUsername', () => {
  return Meteor.user().username;
});

Template.registerHelper('timeFromNow', (time) => {
	return moment(time).fromNow();
});

$('[data-toggle="tooltip"]').tooltip();
