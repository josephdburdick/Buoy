let events = {
	getFacebookEventDetail(query){
		debugger;
		// Modules.both.facebook.getFacebookData({token: Session.get('facebookAccessToken'), query: `/${query}`})
		// Meteor.call('getFacebookData', {token: Session.get('facebookAccessToken'), query: `/${query}`})
	},
	processEvent: (event) => {
		console.log('> processEvent function');
		let processedEvent = event;
    processedEvent.ownerId = Meteor.userId();

		if (!processedEvent.fbId) processedEvent.fbId = event.id;

		//if (event.id) delete event.id;
		return processedEvent;
  },
	addEvent: (event) => {
		console.log('> addEvent function');
		return new Promise((resolve, reject) => {
			Meteor.call('upsertEvent', event, (error, response) => {
				if ( error ){
					reject( error );
				} else {
					if (response){
						console.log('Returned response from upsertEvent');
						event._id = response.insertedId;
						Template.instance().dictionary.facebook.set('currentEvent', event);

						// process/add place
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
  processPlace: (event) => {
		console.log('> processPlace function');
		let place = !!event.place ? event.place : false;
		let location = place ? {} : false;
		if (place){
			location = !!event.place.location ? event.place.location : {};
			// If there's no fbId, assign it then trash the original.
			if (!place.fbId) place.fbId = place.id;
			if (place.id) delete place.id;
			// Add events to place
			place.events = !!place.events ? place.events : [];

			if (!!event.place && !place.events.length){
				place.events.push({
					name: event.place.name,
					fbId: event.place.fbId,
					street: event.place.location.street,
					coords: [event.place.location.latitude, event.place.location.longitude]
				});
			}
			// Add locations to place
			place.locations = !!place.locations ? place.locations : [];
			if (!!event.place.location && !place.locations.length){
				place.locations.push({
					fbId: place.fbId
				});
			}
		}

		// No place found. Generate one until a user inputs real values.
		if (!place){
			place = {
				location: {

				}
			}
		}
		return place;
	},
	addPlace: (place) => {
		console.log('> addPlace function');
		return new Promise((resolve, reject) => {
			Meteor.call('upsertPlace', place, (error, response) => {
				if ( error ){
					reject( error );
				} else {
					if (response){
						place._id = response;
						Template.instance().dictionary.facebook.set('currentPlace', place);
						resolve(place);
					}
				}
			});
		});
	},
	addPlaceToEvent: (place) => {
		console.log('> addPlaceToEvent');
		// let event = Object.create(Template.instance().dictionary.facebook.get('currentEvent'));
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
					Template.instance().dictionary.facebook.set('currentPlace', place);
					resolve(place);
				}
			})
		});
  },
  processLocation: (place) => {
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
	addLocation: (location) => {
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
	addLocationToPlace: (location) => {
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
  processMarker: (location) => {
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
	addMarker: (marker) => {
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
	addMarkerToLocation: () => {
		debugger;
	},

};

Modules.client.events = events;
