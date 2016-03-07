Meteor.methods({
	'seedEvents': (numberOfEvents) => {
		if (!numberOfEvents){
			numberOfEvents = 50;
		}
		check(numberOfEvents, Number);

		let
			events = [],
			myId = Meteor.users.findOne({username: 'josephdburdick'})._id;



		console.log(`Generating ${numberOfEvents} events...`);

		_(numberOfEvents).times(() => {
			// Randomly generate an ownerId or assign it to me
			let
				places = [],
				linkedOwnerId = _.sample([faker.internet.password(), myId]),
				generatedEventId = faker.random.uuid();

			_(_.sample([2, 3, 4, 5, 6])).times(() => {
				let place = {
					_id: faker.internet.password(),
					eventId: generatedEventId,
					name: faker.company.companyName(),
					street: faker.address.streetAddress(),
					city: faker.address.city(),
					state: faker.address.state(),
					country: faker.address.country(),
					zip: faker.address.zipCode(),
					coords: [faker.address.longitude(), faker.address.latitude()]
				};

				places.push(place);
			});
			_.each(places, (place, index) => {
				place.order = index + 1;
			});
			let event = {
				_id: generatedEventId,
				ownerId: linkedOwnerId,
				fbId: faker.random.uuid(),
				name: faker.lorem.sentence(),
				description: _.sample([faker.lorem.paragraph(), faker.lorem.paragraph() + faker.lorem.paragraph()]),
				places: places,
				itineraryId: faker.internet.password(),
				picture: faker.image.nightlife(),
				type: _.sample(['public', 'private']),
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
