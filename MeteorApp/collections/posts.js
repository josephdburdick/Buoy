Posts = new Mongo.Collection( 'posts' );

Posts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Posts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Meteor.methods({
  'addPost': function() {
    console.log('add Post');
    Posts.insert({title: 'Post ' + Random.id()});
  },

  'deletePost': function() {
    console.log('delete Post');
    let post = Posts.findOne();
    if (post) {
      Posts.remove({_id: post._id});
    }
  }
});

Meteor.publish('posts', function() {
  return Posts.find();
});
