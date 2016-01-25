let getDayPeriod = (m) => {
	var g = null; //return g

	if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

	var split_afternoon = 12 //24hr time to split the afternoon
	var split_evening = 17 //24hr time to split the evening
	var currentHour = parseFloat(m.format("HH"));

	if(currentHour >= split_afternoon && currentHour <= split_evening) {
		g = "Afternoon";
	} else if(currentHour >= split_evening) {
		g = "Evening";
	} else {
		g = "Morning";
	}

	return g;
}

Modules.both.getDayPeriod = getDayPeriod;
