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
    let postId = Posts.insert({
      title: 'Post ' + Random.id(),
      userId: this.userId
    });
    console.log(postId);
  },

  'deletePost': function() {
    console.log('delete Post');
    let post = Posts.findOne();
    if (post) {
      Posts.remove({_id: post._id});
    }
  }
});
if (Meteor.isServer){
  Meteor.publish('posts', function() {
    return Posts.find();
  });
}
