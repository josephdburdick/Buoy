Template.importActionsButtonGroup.events({
	'click [data-action="import"]': (event, template) => {
		let
			$this = $(event.currentTarget),
			$parent = $this.closest('[data-id]'),
			eventFBId = $parent.data('fbid');

		Session.set('activeFacebookEventId', $parent.data('id'));
		Session.set('activeFacebookEventFBId', $parent.data('fbid'));

		// Detect whether this event has already been imported
		if(!Events.findOne($parent.data('id'))){
			let
				activeEventClass = 'event-card--active-import',
				importedEventClass = 'event-card--imported',
				activeImportModalClass = 'importing-event',

				$eventCard = $(`[data-id="${Session.get('activeFacebookEventId')}"]`),
				eventObj = template.data,
				place = Modules.client.events.processPlace(eventObj);

			Modules.both.facebook.getFacebookData({
				token: eventFBId,
				query: `${eventFBId}?fields=attending_count,can_guests_invite,cover,declined_count,description,admins,attending,declined,feed,owner,start_time,maybe,interested,posts,is_viewer_admin,id,updated_time,comments,picture,name,category,type,maybe_count,noreply_count,interested_count`
			}).then((eventDetailObj) => {
					debugger;
				})
				.catch((error) => {
					debugger;
				})


			eventObj.places = [place];
			if (eventObj.place) delete eventObj.place;
			if (eventObj.location) delete eventObj.location;
			$eventCard.addClass(activeEventClass);

			let fbEventObj = FacebookEvents.findOne({_id: $eventCard.data('id')});
			fbEventObj.isImported = true;

			Meteor.call('insertEvent', eventObj, (error, success) => {
				let $eventCard = $(`[data-id="${Session.get('activeFacebookEventId')}"]`);
				if (!error) {
					Meteor.call('updateFacebookEventImportStatus', {_id: fbEventObj._id, fbId: fbEventObj.fbId, isImported: true}, (error, success) => {
						if (!error){
							console.log(success);
							$eventCard.addClass(importedEventClass);
						} else {
							Bert.alert('Unable to update import status of Facebook Event. You may see it again.', 'info');
							$eventCard.removeClass(activeEventClass);
						}
					});
					Bert.alert(`Event ${success} imported.`, 'success');
					FlowRouter.go('dashboard');
				} else {
					Bert.alert(error.message, 'error');
					$eventCard.addClass(activeEventClass);
				}
			});
		} else {
			Bert.alert('Event has already been imported', 'warning');
		}

	},
	'click [data-action="ignore"]': (event, template) => {
		console.log(event);
		console.log(template);
	}
});
