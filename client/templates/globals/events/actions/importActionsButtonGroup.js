Template.importActionsButtonGroup.events({
	'click [data-action="import"]': (event, template) => {
		let
			$this = $(event.currentTarget),
			$parent = $this.closest('[data-id]'),
			eventFBId = $parent.data('fbid');

		Session.set('activeFacebookEventId', $parent.data('id'));
		Session.set('activeFacebookEventFBId', $parent.data('fbid'));

		// Detect whether this event has already been imported
		if(!Events.findOne({fbId: $parent.data('fbid') })){
			let
				activeEventClass = 'event-card--active-import',
				importedEventClass = 'event-card--imported',
				activeImportModalClass = 'importing-event',

				$eventCard = $(`[data-id="${Session.get('activeFacebookEventId')}"]`),
				eventObj = template.data;

			Modules.both.facebook.getFacebookData({
				token: Session.get('facebookAccessToken'),
				query: `/${eventFBId}?fields=attending_count,can_guests_invite,cover,declined_count,description,admins,attending,declined,owner,start_time,maybe,interested,posts,is_viewer_admin,id,updated_time,comments,picture,name,category,type,maybe_count,noreply_count,interested_count`
			})
				.then((facebookEventDetail) => {
					/* PROCESS EVENT DETAIL */
					/*
						1. Create new object by extending "shallow" event import with event Details
						2. Create new attendees object for later insertion
					*/
					eventObj = Object.assign({}, template.data, facebookEventDetail.data)
					eventObj.attendees = {};
					if (eventObj.admins.data){
						eventObj.attendees.admins = eventObj.admins.data;
						delete eventObj.admins;
					}
					/*
						Process attendees
					*/
					_.forEach(['attending', 'interested', 'maybe', 'declined'], (attendeesProperty) => {
						if (!! eventObj[attendeesProperty] && !! eventObj[attendeesProperty].data){
							eventObj.attendees[attendeesProperty] = eventObj[attendeesProperty].data;
						}
						/*
							Loop through each attendee from all the attendees arrays and reformat data
						*/
						_.each(eventObj.attendees[attendeesProperty], (attendee) => {
							attendee.fbId = attendee.id;
							delete attendee.id;
						});
						/*
							Remove attendees array item from object root now that it's been applied
						*/
						delete eventObj[attendeesProperty];
						delete eventObj[`${attendeesProperty}_count`];
					});
					/*
						END Process attendees
					*/

					/*
						Process place
					*/
					if (eventObj.place){
						let place = eventObj.place.location
							? Object.assign({}, eventObj.place, eventObj.place.location)
							: Object.assign({}, eventObj.place);

						if (place.id){
							place.fbId = place.id;
							delete place.id;
						}
						if (place.location) delete place.location;
						eventObj.places = [place];

						//Clean up
						if (eventObj.place) delete eventObj.place;
						if (eventObj.location) delete eventObj.location;
					}
					/*
						END Process place
					*/

					eventObj.ownerId = Meteor.userId();
					eventObj.fbOwnerId = eventObj.owner.id;
					if (eventObj.owner) delete eventObj.owner;

					eventObj.fbId = eventObj.id;
					delete eventObj.id;

					if (eventObj.picture){
						eventObj.picture = eventObj.picture.data.url
					}
					eventObj.cover.fbId = eventObj.cover.id;
					if (eventObj.cover.id) delete eventObj.cover.id;
					delete eventObj.noreply_count;
					/* END EVENT DETAIL PROCESS */

					/* INSERT event */
					$eventCard.addClass(activeEventClass);
					// Set isImported to true to remove it from importEvents view
					eventObj.isImported = true;

					Meteor.call('insertEvent', eventObj, (error, success) => {
						let $eventCard = $(`[data-id="${Session.get('activeFacebookEventId')}"]`);
						if (!error) {
							Meteor.call('updateFacebookEventImportStatus', {_id: eventObj._id, fbId: eventObj.fbId, isImported: true}, (error, success) => {
								if (!error){
									console.log(success);
									Bert.alert(`Added <strong>${eventObj.name}</strong>.`, 'success');
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
				})
				// .catch((error) => {
				// 	console.log(error);
				// 	Bert.alert(error.message, 'danger');
				// });
		} else {
			Bert.alert('Event has already been imported', 'warning');
		}
	},
	'click [data-action="ignore"]': (event, template) => {
		console.log(event);
		console.log(template);
	}
});
