Template.body.events({
  'click [data-toggle="modal"]': function(event, template){
    let name = event.currentTarget.dataset.modalTemplate;
		let modalSize = !!event.currentTarget.dataset.modalSize ? event.currentTarget.dataset.modalSize : null;
		Session.set('modalSize', modalSize);
    Session.set('activeModal', name);

		$('#modal').off('hidden.bs.modal').on('hidden.bs.modal', (event) => {
			Session.set('modalSize', null);
			Session.set('activeModal', null);
		});
  }
});

Template.modal.helpers({
  activeModal: function(){
    return Session.get('activeModal');
  },
	modalSize: function(){
		return !!Session.get('modalSize') ? `modal-${Session.get('modalSize')}` : '';
	}
});
