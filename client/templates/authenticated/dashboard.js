Template.dashboard.onCreated(() => {
  let _this = this;
  Template.instance().subscribe('allUsers');
  Template.instance().subscribe('userData');
  Template.instance().subscribe('events');
  Template.instance().subscribe('userPlaces');
  Template.instance().subscribe('itineraries');

  let
    _data = new ReactiveDict({}),
    facebook = new ReactiveDict({
    token: false,
    data: false,
    events: false
  });

  let
    getFacebookToken = Modules.both.getFacebookToken,
    getFacebookData = (cb) => {
      return Meteor.callPromise('readFBdata', {
        token: facebook.get('token'),
        query: '/me?fields=events'
      })
        .catch((error) => {
          Bert.alert(error.reason, 'warning');
          return false;
        })
        .then((data) => {
          if (data){
            facebook.set('data', JSON.parse(data.content));
            facebook.set('events', JSON.parse(data.content).events);
          }
          if (cb) cb(data);
        });
    },
    processFacebookEvents = () => {
      let
        eventsArray = [];
        events = facebook.get('events');

      events.data.forEach((event, index, array) => {
        /*
        users -> itineraries (events)
        events (channels) -> places -> locations (comments) -> markers
        */

        // let
        //   _data = {},
        //   _event = processEvent(event, (data) => {
        //     _data.eventId = data.insertedId;
        //     _place = processPlace(event),
        //   }),
        //   _location = processLocation(event),
        //   _marker = processMarker(event, (marker) => {
        //     // Finished processing each, time to add
        //     // addEvent({
        //     //   event: _event,
        //     //   place: _place,
        //     //   location: _location,
        //     //   marker: _marker
        //     // });
        //   });


        processEvent(event, (data) => {
          _data.set('eventId', data.insertedId);
          processPlace(event, (data) => {
            _data.set('placeId', data.insertedId);
            processLocation(event, (data) => {
              _data.set('locationId', data.insertedId);
              processMarker(event, (data) => {
                _data.set('markerId', data.insertedId);

                debugger;
              });
            });
          });
        });

        // processMarker(event, (data) => {
        //   _data.set('markerId', data.insertedId);
        //   processLocation(event, (data) => {
        //     _data.set('locationId', data.insertedId);
        //     processPlace(event, (data) => {
        //       _data.set('placeId', data.insertedId);
        //       processEvent(event, (data) => {
        //         _data.set('eventId', data.insertedId);
        //       });
        //     });
        //   });
        // });

      })
    },
    processEvent = (event, cb) => {
      let _event = event;

      _event.ownerId = Meteor.userId();
      _event.fbId = _event.id;
      delete _event.id;

      return Meteor.callPromise('upsertUserEvent', _event)
        .catch((error) => {
          console.log(error);
        })
        .then((data) => {
          if (cb) cb(data);
        });
    },
    processPlace = (event, cb) => {
      let
        _event = event,
        _place = !!event.place ? event.place : {};

      _place.eventId = !!_data.get('eventId') ? _data.get('eventId') : 0;
      _place.markerId = _data.get('markerId');
      _place.ownerId = event.ownerId;
      _place.fbId = _place.id;
      delete event.place

      return Meteor.callPromise('upsertEventPlace', _place)
        .catch((error) => {
          console.log(error);
        })
        .then((data) => {
          if (cb) cb(data);
        });
    },
    processLocation = (event, cb) => {
      let
        _event = event,
        _place = !!event.place ? event.place : {};

      return _place.location;
    }
    processMarker = (event, cb) => {
      let
        _event = event,
        _place = !!event.place ? event.place : {},
        _location = _place.location;

      if (_location){
          _marker = {
            lat: _location.latitude,
            lng: _location.longitude,
            type: "place"
          };
          if (cb) cb(_marker);
        } else {
          return Meteor.callPromise('getGeocode', event.place.name)
            .catch((error) => {
              console.log(error);
            })
            .then((data) => {
              _marker = {
                lat: data.latitude,
                lng: data.longitude,
                type: "place"
              };
              if (cb) cb(_marker);
            });
        }
    },
    init = (() => {
      getFacebookToken((token) => {
        facebook.set('token', token);

        getFacebookData((data) => {
          if (data) {
            Bert.alert('Data found!', 'success');
            processFacebookEvents();
          }
          else {
            Bert.alert('Data not found. You probably need to allow access to Facebook.');
          }
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
          //     console.log(response);
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

