Template.registerHelper('appName', () => {
  return "Buoy";
});

Template.registerHelper('currentUsername', () => {
  return Meteor.user().username;
});

Template.registerHelper('timeFromNow', (time) => {
	return moment(time).fromNow();
});

Template.registerHelper('subNotEmpty', (sub) => {
	console.log()
	return !!sub.count() ? sub.count() : !!sub.length;
});
