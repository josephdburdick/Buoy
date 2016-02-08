Meteor.methods({
	'seedEvents': function() {
		let
			events = [],
			myId = Meteor.users.findOne({username: 'josephdburdick'})._id;

		_(25).times(() => {
			// Randomly generate an ownerId or assign it to me
			let
				places = [],
				linkedOwnerId = _.sample([faker.internet.password(), myId]);

			_(_.sample([2, 3, 4, 5, 6])).times(() => {
				let place = {
					_id: faker.internet.password(),
					ownerId: linkedOwnerId,
					name: faker.company.companyName(),
					address: faker.address.streetAddress(),
					coords: [faker.address.latitude(), faker.address.longitude()]
				};

				places.push(place);
			});

			let event = {
				ownerId: linkedOwnerId,
				fbId: faker.random.uuid(),
				name: faker.lorem.sentence(),
				description: faker.lorem.paragraph(),
				places: places,
				itineraryId: faker.internet.password(),
				picture: faker.image.nightlife(),
				privacy: _.sample(['EVERYONE', 'ALL_FRIENDS', 'FRIENDS_OF_FRIENDS', 'CUSTOM', 'SELF']),
				'ticket_uri': faker.internet.url(),
				'start_time': faker.date.future(),
				'end_time': faker.date.future(),
				'updated_time': faker.date.past(),
				eventChannel: faker.internet.password()
			};
			events.push(event);
			console.log(event);
		});

		_.each(events, (event) => {
			console.log(event);
			let response = Events.insert(event);
			console.log(response);
		});

  }
});
