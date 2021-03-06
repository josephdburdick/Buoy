var eventHooks = {
  before: {
    insert: function (doc) {
			if (Meteor.userId()) {
				doc.ownerId = Meteor.userId();
			}

			return doc;
    }
  },
  after: {
    insert: function (error, result) {
			if (!error){
				console.log(result);
				FlowRouter.go('dashboard');
				Bert.alert('Event added!', 'success');
			} else {
				console.error(error);
				Bert.alert(error, 'error');
			}
		}
  }
};

AutoForm.addHooks('insertEventForm', eventHooks);
