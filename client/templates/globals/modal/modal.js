Template.body.events({
  'click [data-toggle="modal"]': function(event, template){
    let name = event.currentTarget.dataset.modalTemplate;
		let modalSize = !!event.currentTarget.dataset.modalSize ? event.currentTarget.dataset.modalSize : null;
		FlowRouter.setQueryParams({modal: true});
		Session.set('modalSize', modalSize);
    Session.set('activeModal', name);
  },
	'hidden.bs.modal #modal': function(event, template){
		console.log(event);
		FlowRouter.setQueryParams({modal: null});
		Session.set('modalSize', null);
	}
});

Template.modal.helpers({
  activeModal: function(){
    return Session.get('activeModal');
  },
	modalIsVisible: function(){
		return !!Session.get('activeModal') ? 'in' : '';
	},
	modalSize: function(){
		return !!Session.get('modalSize') ? `modal-${Session.get('modalSize')}` : '';
	}
});
