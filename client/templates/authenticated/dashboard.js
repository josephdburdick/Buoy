Template.dashboard.onCreated(() => {
  let _this = this;
  Template.instance().subscribe('allUsers');
  Template.instance().subscribe('userData');
	Template.instance().subscribe('userEvents');
	Template.instance().subscribe('userFacebookEvents', Meteor.userId());
	Template.instance().subscribe('places');
	Template.instance().subscribe('markers');
	Template.instance().subscribe('locations');


	Template.instance().subscribe('eventsPlacesAndLocations');
  // Template.instance().subscribe('events');
	// Template.instance().subscribe('allMarkers');
  // Template.instance().subscribe('itineraries');

  let facebookDict = new ReactiveDict({
    token: false,
    data: false,
    events: false
  });

  let
    getFacebookToken = Modules.both.getFacebookToken,
		getFacebookData = (params) => {
			if (!params.token)
				params.token = facebookDict.get('token');

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
    importUserFacebookEvents = () => {
      let
        eventsArray = [];
        events = facebookDict.get('events');

      events.forEach((event, index, array) => {
				let processedFacebookEvent = processUserFacebookEvent(event);
					addEventToUserFacebookEvents(processedFacebookEvent)
					.then((data) => {
						console.log(data);
					})
      })
    },
		processUserFacebookEvent = (event) => {
			console.log('> processUserFacebookEvent function');

			// Assign ownerId to current user if it's not already set
			if (typeof event === "object" && !event.ownerId) event.ownerId = Meteor.userId();
			if (!event.fbId) event.fbId = event.id;
			if (event.id) delete event.id;

			return event;
		},
		addEventToUserFacebookEvents = (event) => {
			console.log('> addEventToUserFacebookEvents function');

			return new Promise((resolve, reject) => {
				Meteor.call('upsertUserFacebookEvent', event, function(error, response){
					if ( error ){
						reject( error );
					} else {
						if (response){
							event._id = response;
							facebookDict.set('currentFacebookEvent', event);
							resolve(event);
						}
					}
				});
			});
		},
    processEvent = (event) => {
			console.log('> processEvent function');
			let processedEvent = event;
      processedEvent.ownerId = Meteor.userId();

			if (!processedEvent.fbId) processedEvent.fbId = event.id;

			//if (event.id) delete event.id;
			return processedEvent;
    },
		addEvent = (event) => {
			console.log('> addEvent function');
			return new Promise((resolve, reject) => {
				Meteor.call('upsertEvent', event, (error, response) => {
					if ( error ){
						reject( error );
					} else {
						if (response){
							console.log('Returned response from upsertEvent');
							event._id = response.insertedId;
							facebookDict.set('currentEvent', event);

							// process/add place
							debugger;
							let place = processPlace(event);
							// processedEvent.places = [];
							// processedEvent.places.push(event);
							//
							//
							// let location = processLocation(place);
							// processedEvent.locations = [];
							// processedEvent.locations.push(location);
							//
							// debugger;
							// // addPlace(place).then((addedPlace) => {
							// // 	debugger;
							// // });
							// // addLocation(location).then((addedLocation) => {
							// // 	debugger;
							// // });


							resolve(event);
						}
					}
				});
			});
		},
    processPlace = (event) => {
			console.log('> processPlace function');
			let place = !!event.place ? event.place : {};
			let location = {};
			if (place){
				location = !!event.place.location ? event.place.location : {};
				// If there's no fbId, assign it then trash the original.
				if (!place.fbId) place.fbId = place.id;
				// if (place.id) delete place.id;
			}

			// Add events to place
			place.events = !!place.events ? place.events : [];

			if (!!event.place && !place.events.length){
				place.events.push({
					name: event.place.name,
					fbId: event.place.fbId
				});
			}

			// Add locations to place
			place.locations = !!place.locations ? place.locations : [];
			if (!!event.location && !place.locations.length){
				place.locations.push({
					fbId: place.fbId
				});
			}
			facebookDict.set('currentPlace', place);

			return place;
		},

		addPlace = (place) => {
			console.log('> addPlace function');
			return new Promise((resolve, reject) => {
				Meteor.call('upsertPlace', place, (error, response) => {
					if ( error ){
						reject( error );
					} else {
						if (response){
							place._id = response;
							facebookDict.set('currentPlace', place);
							resolve(place);
						}
					}
				});
			});
		},
		addPlaceToEvent = (place) => {
			console.log('> addPlaceToEvent');
			// let event = Object.create(facebookDict.get('currentEvent'));
			if (!event.places instanceof Array) {
				if (!event){
					debugger;
				}
				event.places = [];
				event.places.push(
					{
						eventId: event._id,
						name: place.name,
						fbId: place.fbId
					}
				);
			}

			return new Promise((resolve, reject) => {
				Meteor.call('upsertEvent', event, (error, response) => {
					if ( error ){
						reject ( error )
					} else {
						facebookDict.set('currentPlace', place);
						resolve(place);
					}
				})
			});
    },
    processLocation = (place) => {
			// For now, we'll reject any place without a location
			let location = {};
			if (place.location){
				location = {
					fbId: place.fbId,
					city: place.location.city,
					latitude: place.location.latitude,
					longitude: place.location.longitude,
					state: place.location.state,
					street: place.location.street,
					zip: place.location.zip
				}
				return location;
			} else {
				return place;
			}
    },
		addLocation = (location) => {
			console.log();
			return new Promise((resolve, reject) => {
				// insert Locations
				Meteor.call('upsertLocation', location , (error, response) => {
					if ( error ){
						reject( error );
					} else {
						location._id = response.insertedId;
						resolve(location);
					}
				});
			});
		},
		addLocationToPlace = (location) => {
			//We need the place._id here to upsert to the right place.
			return new Promise((resolve, reject) => {
				// insert Locations
				Meteor.call('upsertPlace', location , (error, response) => {
					if ( error ){
						reject( error );
					} else {
						location._id = response.insertedId;
						resolve(location);
					}
				});
			});
		},
    processMarker = (location) => {
      let _marker = {};

      _marker = {
				locationId: location._id,
        lat: location.latitude,
        lng: location.longitude,
        type: "place"
      };

			console.log(_marker);
			return _marker;
    },
		addMarker = (marker) => {
			return new Promise((resolve, reject) => {
				Meteor.call('upsertMarker', _marker , (error, response) => {
					if ( error ){
						reject( error );
					} else {
						_marker._id = response.insertedId;
						resolve(_marker);
					}
				});
			});
		},
		addMarkerToLocation = () => {
			debugger;
		},
		getFacebookEventData = () => {
			getFacebookData({token: token, query: '/me?fields=events'})
			.then((response) => {
				if (response) {
					facebookDict.set('events', response.data.events.data);
					Bert.alert('Data retrieved. Loading events...');
					importUserFacebookEvents();
				} else {
					Bert.alert('Data not found. You probably need to allow access to Facebook.', 'warning');
				}
			});
		}
		init = (() => {
			Meteor.call('getFacebookAccessToken', (error, response) => {
				if (!error){
					token = response;
					facebookDict.set('token', token);
					getFacebookEventData({token: token});
				} else {
					Bert.alert('You must login with Facebook to use this feature.', 'warning');
					return false;
				}
			});
      // return new Promise((resolve, reject) => {
				// let token = getFacebookToken();
				// if (token){
				// 	facebookDict.set('token', token);
				// 	getFacebookEventData({token: token});
				// } else {
				// 	Bert.alert('You must login with Facebook to use this feature.', 'warning');
				// 	Modules.client.loginWithFacebook({}, () => {
				// 		let token = getFacebookToken();
				// 		facebookDict.set('token', token);
				// 		getFacebookEventData({token: token});
				// 	});
				//
				// 	return false;
				// }
      //});
    })();
});

Template.dashboard.helpers({
	numberOfEvents(){
		return FacebookEvents.find().count();
	}
});
