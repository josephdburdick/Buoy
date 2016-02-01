Template.body.events({
  'click [data-toggle="modal"]': function(event, template){
    let name = event.currentTarget.dataset.modalTemplate;
		FlowRouter.setQueryParams({modal: true});
    Session.set('activeModal', name);
  },
	'hidden.bs.modal #modal': function(event, template){
		console.log(event);
		FlowRouter.setQueryParams({modal: null});
	}
});

Template.modal.helpers({
  activeModal: function(){
    return Session.get('activeModal');
  },
	modalIsVisible: function(){
		return !!Session.get('activeModal') ? 'in' : '';
	}
});
