Template.eventsListFilter.onCreated(() => {
  // let instance = Template.instance();
  //
  // instance.activeEventListFilterValue = new ReactiveVar('all');

});

Template.eventsListFilter.events({
  'click [data-events-filter]': (event, template) => {
    let $this = $(event.currentTarget);
    $this.addClass('active').siblings('[data-events-filter]').removeClass('active');
    // template.activeEventListFilterValue.set($this.data('eventsFilter'));
    Session.set('activeEventListFilterValue', $this.data('eventsFilter'));
  }
});

Template.eventsListFilter.helpers({
  activeFilterButton: function(button){
    //debugger;
  }
});
