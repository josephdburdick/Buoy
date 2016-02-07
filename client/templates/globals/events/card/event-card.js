Template.eventCard.helpers({
	descriptionSummary: function(){
		return Modules.both.text.truncateWords(this.description, {hasEllipsis: true, max: 24});
	},
	humanReadableTime: function(time){
		return moment(time).fromNow();
	}
})
