Template.importEventItem.helpers({
	descriptionSummary: function(){
		return Modules.both.text.truncateWords(this.description, {hasEllipsis: true, wordLength: 12});
	}
})
