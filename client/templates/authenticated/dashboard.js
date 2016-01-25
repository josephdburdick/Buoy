Template.dashboard.onCreated(() => {
  let _this = this;
  Template.instance().subscribe('allUsers');
  Template.instance().subscribe('userData');
	Template.instance().subscribe('userEvents');
	Template.instance().subscribe('places');
	Template.instance().subscribe('markers');
	Template.instance().subscribe('locations');


	Template.instance().subscribe('eventsPlacesAndLocations');
  // Template.instance().subscribe('events');
	// Template.instance().subscribe('allMarkers');
  // Template.instance().subscribe('itineraries');

  let
    _data = new ReactiveDict({}),
    facebook = new ReactiveDict({
    token: false,
    data: false,
    events: false
  });

  let
    getFacebookToken = Modules.both.getFacebookToken,
		getFacebookData = (params) => {
			return new Promise((resolve, reject) => {
				Meteor.call('readFBdata', {
	        token: facebook.get('token'),
	        query: params.query
	      }, (error, response) => {
					if ( error ){
						reject( error.reason );
					} else {
						resolve( response );
					}
				})
			});
		},
    processFacebookEvents = () => {
      let
        eventsArray = [];
        events = facebook.get('events');

      events.forEach((event, index, array) => {
        /*
        users -> itineraries (events)
        events (channels) -> places -> locations (comments) -> markers
        */

				processEvent(event)
					.then((data) => processPlace(data))
					.then((data) => processLocation(data))
					.then((data) => processMarker(data))
					.then((data) => {
						debugger;
					})
      })
    },
    processEvent = (event) => {
			let _event = event;
      _event.ownerId = Meteor.userId();
      _event.fbId = _event.id;
			_event.places = [];
      delete _event.id;
			return new Promise((resolve, reject) => {
				Meteor.call('upsertUserEvent', _event, (error, response) => {
					if ( error ){
						reject( error.reason );
					} else {
						if (response){
							_event._id = response;
							resolve(_event);
						}
					}
				});
			});
    },
    processPlace = (event) => {
			let _place = !!event.place ? event.place : {};
			_place.events = [];
      _place.fbId = _place.id;
			_place.locations = [];
			_place.events.push({
				_id: event._id,
				name: event.name,
				ownerId: event.ownerId
			});
			delete _place.id;

      return new Promise((resolve, reject) => {
				Meteor.call('upsertEventPlace', _place, (error, response) => {
					if ( error ){
						reject( error.reason );
					} else {
						if (response){
							_place._id = response;
						}
						let eventPlace = {
							_id: _place._id,
							name: _place.name,
							ownerId: _place.ownerId,
							coords: () => {
								if (_place.location && _place.location.latitude) {
									return [_place.location.latitude, _place.location.longitude]
								}
							},
							address: () => {
								if (_place.location && _place.location.street) {
									return _place.location.street + ' ' + _place.location.city + ' ' + _place.location.state;
								}
							}
						}
						event.places.push(eventPlace);
						return new Promise((resolve, reject) => {
							Meteor.call('upsertUserEvent', event, (error, response) => {
								if ( error ){
									reject ( error.reason )
								} else {
									resolve( event );
								}
							})
						});
					}
				});
			});
    },
    processLocation = (place) => {
			// For now, we'll reject any place without a location
			let
				location = place.location;
				location.placeId = place._id;

			return new Promise((resolve, reject) => {
				// insert Locations
				Meteor.call('upsertPlaceLocation', location , (error, response) => {
					if ( error ){
						reject( error.reason );
					} else {
						location._id = response.insertedId;
						resolve(location);
					}
				});
			});
    },
    processMarker = (location) => {
      let _marker = {};
			// Until we stop rejecting places without locations they'll always have location
      // if (location){
          _marker = {
						locationId: location._id,
            lat: location.latitude,
            lng: location.longitude,
            type: "place"
          };
					// console.log(_marker);
					return new Promise((resolve, reject) => {
						Meteor.call('upsertMarker', _marker , (error, response) => {
							if ( error ){
								reject( error.reason );
							} else {
								debugger;
								// console.log(_marker);
								// console.log(response);
								_marker._id = response.insertedId;
								resolve(_marker);
							}
						});
					});
      // } else {
			// 	// Should never run.
      //   return new Promise((resolve, reject) => {
			// 		Meteor.call('getGeocode', event.place.name, (error, response) => {
			// 			if ( error ){
			// 				reject( error.reason );
			//
			// 			} else {
			// 				debugger;
			// 				_marker = {
      //           lat: data.latitude,
      //           lng: data.longitude,
      //           type: "place"
      //         };
			// 				resolve( response );
			// 			}
			// 		});
			// 	});
      // }
    },
    init = (() => {
      return new Promise((resolve, reject) => {
				getFacebookToken()
					.then((token) => {
						facebook.set('token', token);
					})
					.then(() => {
						getFacebookData({query: '/me?fields=events'})
						 	.then((response) => {
			          if (response) {
									facebook.set('events', response.data.events.data);
			            Bert.alert('Data retrieved. Loading events...');
			            processFacebookEvents();
			          } else {
			            Bert.alert('Data not found. You probably need to allow access to Facebook.', 'warning');
			          }
			        });
					});
      });
    })();


    /*, function(err, response) {
      if (!err) {

        let events = $.parseJSON(response.content).events.data,
            eventsArray = [];

        events.forEach((event, index, array) => {
          event.ownerId = Meteor.userId();
          event.fbId = event.id;
          delete event.id;
          let location = event.place;
          // Meteor.call('upsertLocation', event.place);
          // Meteor.call('upsertItinerary', event.place);

          eventsArray.push(event);

          debugger;

          // Meteor.call('upsertUserEvent', event, function(err, response) {
          //   if (!err) {
              console.log(response);
          //   } else {
          //     Bert.alert(error.reason, 'warning');
          //   }
          // });
        });
      } else {
        Bert.alert(error.reason, 'warning');
      }
  }
  }
  });*/
});

Template.dashboard.helpers({

});
