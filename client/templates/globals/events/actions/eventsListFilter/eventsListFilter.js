Template.eventsListFilter.onCreated(() => {
  let instance = Template.instance();

  instance.activeFilterButton = new ReactiveVar('all');
});

Template.eventsListFilter.events({
  'click [data-events-filter]': (event, template) => {
    let $this = $(event.currentTarget);
    $this.addClass('active').siblings('[data-events-filter]').removeClass('active');
    template.activeFilterButton.set($this.data('eventsFilter'));
  }
});

Template.eventsListFilter.helpers({
  
});
