Template.dashboard.onCreated(() => {
  let _this = this;
  Template.instance().subscribe('allUsers');
  Template.instance().subscribe('userData');
  Template.instance().subscribe('events');
  Template.instance().subscribe('itineraries');

  let facebook = {
    token: false,
    data: false,
    events: false
  };

  let
    getFacebookToken = Modules.both.getFacebookToken,
    getFacebookData = (cb) => {
      let facebookDataPromise = Meteor.callPromise('readFBdata', {
        token: facebook.token,
        query: '/me?fields=events'
      })
      .catch((error) => {
        Bert.alert(error.reason, 'warning');
      })
      .then((data) => {
        facebook.data = JSON.parse(data.content);
        facebook.events = facebook.data.events;
        if (cb) cb();
      });
    },
    init = (() => {
      getFacebookToken((token) => {
        facebook.token = token;
        console.log(facebook.token);
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
