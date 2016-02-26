Template.modal.onRendered(() => {
	let self = Template.instance();

	$('[data-toggle="modal"]').off('click').on('click', (event) => {
		let name = event.currentTarget.dataset.modalTemplate;
			let modalSize = !!event.currentTarget.dataset.modalSize ? event.currentTarget.dataset.modalSize : null;
			Session.set('modalSize', modalSize);
	    Session.set('activeModalTemplate', name);

			$('#modal').off('hidden.bs.modal').on('hidden.bs.modal', (event) => {
				Session.set('modalSize', null);
				Session.set('activeModalTemplate', null);
			});
	});
})


Template.modal.helpers({
  activeModalTemplate: function(){
    return Session.get('activeModalTemplate');
  },
	modalSize: function(){
		return !!Session.get('modalSize') ? `modal-${Session.get('modalSize')}` : '';
	}
});
