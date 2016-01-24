Template.dashboard.onCreated(() => {
  let _this = this;
  Template.instance().subscribe('allUsers');
  Template.instance().subscribe('userData');
  Template.instance().subscribe('events');
  Template.instance().subscribe('itineraries');

  let facebook = new ReactiveDict({
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
    init = (() => {
      getFacebookToken((token) => {
        facebook.set('token', token);

        getFacebookData((data) => {
          if (data) {
            Bert.alert('Data found!', 'success');
            console.log(facebook.keys);
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

