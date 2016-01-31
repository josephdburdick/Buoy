Template.dashboard.onCreated(() => {
	let self = Template.instance();
  self.subscribe('allUsers');
  self.subscribe('userData');
	self.subscribe('userEvents');
	self.subscribe('userFacebookEvents', Meteor.userId());
	self.subscribe('places');
	self.subscribe('markers');
	self.subscribe('locations');
	self.subscribe('eventsPlacesAndLocations');

	self.dictionary = {
		facebook: new ReactiveDict({
	    token: false,
	    data: false,
	    events: false
		}),
	};
	self.methods = {
		getFacebookToken: () => !!Session.get('facebookAccessToken') ? Session.get('facebookAccessToken') : Modules.both.getFacebookToken(),
		// setFacebookToken: (token) => { self.dictionary.facebook.set('token', token); },
		getFacebookData: (params) => {
			if (!params.token)
				params.token = self.dictionary.facebook.get('token');

			return new Promise((resolve, reject) => {
				Meteor.call('getFacebookAPI', {
	        token: params.token,
	        query: params.query
	      }, (error, response) => {
					if ( error ){
						reject( error );
					} else {
						resolve( response );
					}
				})
			});
		},
		processUserFacebookEvent: (event) => {
			console.log('> processUserFacebookEvent function');
			// Assign ownerId to current user if it's not already set
			if (typeof event === "object" && !event.ownerId) event.ownerId = Meteor.userId();
			// Assign the fbId with the to current user fbId if it's not already set
			if (!event.fbId) event.fbId = event.id;
			// If the original facebook ID, ".id", appears anywhere remove it
			if (event.id) delete event.id;

			return event;
		},
		addEventToUserFacebookEvents: (event) => {
			console.log('> addEventToUserFacebookEvents function');

			return new Promise((resolve, reject) => {
				Meteor.call('upsertUserFacebookEvent', event, (error, response) => {
					if ( error ){
						reject( error );
					} else {
						if (response){
							event._id = response;
							self.dictionary.facebook.set('currentFacebookEvent', event);
							resolve(event);
						}
					}
				});
			});
		},
		getFacebookEventData: () => {
			return new Promise((resolve, reject) => {
				self.methods.getFacebookData({token: Session.get('facebookAccessToken'), query: '/me?fields=events'})
				.then((response) => {
					if (response.statusCode = 200){
						resolve(response.data.events.data);
					} else {
						reject(response);
					}
				});
			});
		},
		addUserFacebookEvents: () => {
			let events = self.dictionary.facebook.get('events');

      events.forEach((event, index, array) => {
				let processedFacebookEvent = Template.instance().processUserFacebookEvent(event);
				Template.instance().addEventToUserFacebookEvents(processedFacebookEvent);
      });
    },
		getUserFacebookAccessToken: () => {
			return new Promise((resolve, reject) => {
				Meteor.call('getFacebookAccessToken', (error, response) => {
					if (!error){
						token = response;
						resolve(response);
					} else {
						reject(error);
					}
				});
			});
		}
	};

	let init = ((self) => {
		self.methods.getUserFacebookAccessToken().then((data) => {
			Session.set('facebookAccessToken', data);
		});
	})(self);
				/*Template.instance().dictionary.facebook.set('token', token);
				Template.instance().methods.getFacebookEventData({token: token});*/
			//}
      // return new Promise((resolve, reject) => {
			// 	let token = Modules.both.getFacebookToken();
			// 	if (token){
			// 		Template.instance().dictionary.facebook.set('token', token);
			// 		Template.instance().methods.getFacebookEventData({token: token});
			// 		if (callback) callback(token);
			// 	} else {
			// 		Bert.alert('You must login with Facebook to use this feature.', 'warning');
			// 		Modules.client.loginWithFacebook({}, () => {
			// 			let token = Template.instance().methods.getFacebookToken();
			// 			Template.instance().dictionary.facebook.set('token', token);
			// 			Template.instance().methods.getFacebookEventData({token: token});
			// 			if (callback) callback(token);
			// 		});
			//
			// 		return false;
			// 	}
      // });
  // let
	// 	processEvent = (event) => {
	// 		console.log('> processEvent function');
	// 		let processedEvent = event;
  //     processedEvent.ownerId = Meteor.userId();
	//
	// 		if (!processedEvent.fbId) processedEvent.fbId = event.id;
	//
	// 		//if (event.id) delete event.id;
	// 		return processedEvent;
  //   },
	// 	addEvent = (event) => {
	// 		console.log('> addEvent function');
	// 		return new Promise((resolve, reject) => {
	// 			Meteor.call('upsertEvent', event, (error, response) => {
	// 				if ( error ){
	// 					reject( error );
	// 				} else {
	// 					if (response){
	// 						console.log('Returned response from upsertEvent');
	// 						event._id = response.insertedId;
	// 						Template.instance().dictionary.facebook.set('currentEvent', event);
	//
	// 						// process/add place
	// 						let place = processPlace(event);
	// 						debugger;
	// 						// processedEvent.places = [];
	// 						// processedEvent.places.push(event);
	// 						//
	// 						//
	// 						// let location = processLocation(place);
	// 						// processedEvent.locations = [];
	// 						// processedEvent.locations.push(location);
	// 						//
	// 						// debugger;
	// 						// // addPlace(place).then((addedPlace) => {
	// 						// // 	debugger;
	// 						// // });
	// 						// // addLocation(location).then((addedLocation) => {
	// 						// // 	debugger;
	// 						// // });
	//
	//
	// 						resolve(event);
	// 					}
	// 				}
	// 			});
	// 		});
	// 	},
  //   processPlace = (event) => {
	// 		console.log('> processPlace function');
	// 		let place = !!event.place ? event.place : {};
	// 		let location = {};
	// 		if (place){
	// 			location = !!event.place.location ? event.place.location : {};
	// 			// If there's no fbId, assign it then trash the original.
	// 			if (!place.fbId) place.fbId = place.id;
	// 			// if (place.id) delete place.id;
	// 		}
	//
	// 		// Add events to place
	// 		place.events = !!place.events ? place.events : [];
	//
	// 		if (!!event.place && !place.events.length){
	// 			place.events.push({
	// 				name: event.place.name,
	// 				fbId: event.place.fbId
	// 			});
	// 		}
	//
	// 		// Add locations to place
	// 		place.locations = !!place.locations ? place.locations : [];
	// 		if (!!event.location && !place.locations.length){
	// 			place.locations.push({
	// 				fbId: place.fbId
	// 			});
	// 		}
	// 		Template.instance().dictionary.facebook.set('currentPlace', place);
	//
	// 		return place;
	// 	},
	// 	addPlace = (place) => {
	// 		console.log('> addPlace function');
	// 		return new Promise((resolve, reject) => {
	// 			Meteor.call('upsertPlace', place, (error, response) => {
	// 				if ( error ){
	// 					reject( error );
	// 				} else {
	// 					if (response){
	// 						place._id = response;
	// 						Template.instance().dictionary.facebook.set('currentPlace', place);
	// 						resolve(place);
	// 					}
	// 				}
	// 			});
	// 		});
	// 	},
	// 	addPlaceToEvent = (place) => {
	// 		console.log('> addPlaceToEvent');
	// 		// let event = Object.create(Template.instance().dictionary.facebook.get('currentEvent'));
	// 		if (!event.places instanceof Array) {
	// 			if (!event){
	// 				debugger;
	// 			}
	// 			event.places = [];
	// 			event.places.push(
	// 				{
	// 					eventId: event._id,
	// 					name: place.name,
	// 					fbId: place.fbId
	// 				}
	// 			);
	// 		}
	//
	// 		return new Promise((resolve, reject) => {
	// 			Meteor.call('upsertEvent', event, (error, response) => {
	// 				if ( error ){
	// 					reject ( error )
	// 				} else {
	// 					Template.instance().dictionary.facebook.set('currentPlace', place);
	// 					resolve(place);
	// 				}
	// 			})
	// 		});
  //   },
  //   processLocation = (place) => {
	// 		// For now, we'll reject any place without a location
	// 		let location = {};
	// 		if (place.location){
	// 			location = {
	// 				fbId: place.fbId,
	// 				city: place.location.city,
	// 				latitude: place.location.latitude,
	// 				longitude: place.location.longitude,
	// 				state: place.location.state,
	// 				street: place.location.street,
	// 				zip: place.location.zip
	// 			}
	// 			return location;
	// 		} else {
	// 			return place;
	// 		}
  //   },
	// 	addLocation = (location) => {
	// 		console.log();
	// 		return new Promise((resolve, reject) => {
	// 			// insert Locations
	// 			Meteor.call('upsertLocation', location , (error, response) => {
	// 				if ( error ){
	// 					reject( error );
	// 				} else {
	// 					location._id = response.insertedId;
	// 					resolve(location);
	// 				}
	// 			});
	// 		});
	// 	},
	// 	addLocationToPlace = (location) => {
	// 		//We need the place._id here to upsert to the right place.
	// 		return new Promise((resolve, reject) => {
	// 			// insert Locations
	// 			Meteor.call('upsertPlace', location , (error, response) => {
	// 				if ( error ){
	// 					reject( error );
	// 				} else {
	// 					location._id = response.insertedId;
	// 					resolve(location);
	// 				}
	// 			});
	// 		});
	// 	},
  //   processMarker = (location) => {
  //     let _marker = {};
	//
  //     _marker = {
	// 			locationId: location._id,
  //       lat: location.latitude,
  //       lng: location.longitude,
  //       type: "place"
  //     };
	//
	// 		console.log(_marker);
	// 		return _marker;
  //   },
	// 	addMarker = (marker) => {
	// 		return new Promise((resolve, reject) => {
	// 			Meteor.call('upsertMarker', _marker , (error, response) => {
	// 				if ( error ){
	// 					reject( error );
	// 				} else {
	// 					_marker._id = response.insertedId;
	// 					resolve(_marker);
	// 				}
	// 			});
	// 		});
	// 	},
 	// 	addMarkerToLocation = () => {
	// 		debugger;
	// 	},
 	//
	// 	init = (() => {
	//

    // })();
});

Template.dashboard.helpers({
	numberOfEvents(){
		return FacebookEvents.find().count();
	}
});

Template.dashboard.events({
	'click [data-role="import-events"]': function(e, template){
		e.preventDefault();
		let eventData = template.methods.getFacebookEventData();
		eventData.then((events) => {
			template.dictionary.facebook.set('events', events);
			events.forEach((event, index, array) => {
				let processedFacebookEvent = template.methods.processUserFacebookEvent(event);
				template.methods.addEventToUserFacebookEvents(processedFacebookEvent).then((data) => {
					//Act on imported events from DB
				});
			});
		});
	}
})
