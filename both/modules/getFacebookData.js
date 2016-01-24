// let getFacebookData = (params, cb) => {
//   let facebookDataPromise = Meteor.callPromise('readFBdata', {
//     token: _this.fb.token,
//     query: '/me?fields=events'
//   })
//   .catch((error) => {
//     Bert.alert(error.reason, 'warning');
//   })
//   .then((data) => {
//     _this.fb.data = JSON.parse(data.content);
//     _this.fb.events = _this.fb.data.events;
//     if (cb) cb();
//   });
// }


// Modules.both.getFacebookData = getFacebookData;

