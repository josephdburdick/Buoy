Contacts = new Mongo.Collection( 'contacts' );

Contacts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Contacts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Meteor.methods({
  'addContact': function(contact) {
    console.log(contact);
    Contacts.upsert({
        recordID: contact.recordID,
        ownerId: this.userId
      },
      {
        $set: contact
      }
    );
  }
});
if (Meteor.isServer){
  Meteor.publish('contacts', function() {
    return Contacts.find();
  });
}
