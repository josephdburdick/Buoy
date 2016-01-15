Template.dashboard.onCreated( () => {
	Template.instance().subscribe( 'itineraries' );
});

Template.dashboard.helpers({
	itineraries(){
		return Itineraries.find();
	}
});
