Template.importEventItem.helpers({
	descriptionSummary: () => {
		return Modules.both.text.truncateWords(this.description, {hasEllipsis: true, max: 24});
	},
	humanReadableTime: (time) => {
		return moment(time).fromNow();
	}
});

Template.importEventItem.events({
	'click [data-action="import"]': (event, template) => {
		let
			$this = $(event.currentTarget),
			$parent = $this.closest('[data-id]');

		Session.set('activeFacebookEventId', $parent.data('id'));
		Session.set('activeFacebookEventFBId', $parent.data('fbid'));

		// Detect whether this event has already been imported
		if(!Events.findOne($parent.data('id'))){
			$(`[data-id="${Session.get('activeFacebookEventId')}"]`).addClass('event-importing');
			// debugger;
			Meteor.call('insertEvent', template.data, (error, success) => {
				let $eventCard = $(`[data-id="${Session.get('activeFacebookEventId')}"]`);
				if (!error) {
					$eventCard.removeClass('event-importing');
					$eventCard.addClass('event-imported');
					Bert.alert(`Event ${success} imported.`, 'success');
					$('#modal').modal('hide');

				} else {
					Bert.alert(error.message, 'error');
					$eventCard.removeClass('event-importing');
				}
			});
		} else {
			$('#modal').modal('hide');
			Bert.alert('Event has already been imported', 'danger');
		}

	},
	'click [data-action="ignore"]': (event, template) => {
		console.log(event);
		console.log(template);
	}
});
