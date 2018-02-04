let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo');

//POST title- content
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
let Post = mongoose.model('Post', postSchema);

//USER email-name
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
let User = mongoose.model('User', userSchema);

// let newUser = new User({
//     email: 'Joe@brown.edu',
//     name: 'Joe Brown'
// });
// newUser.posts.push({
//     title: 'How to brew ployjuice postion',
//     content: 'Just kidding. Go to postions class to learn it.'
// });
// newUser.save(function(err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// let newPost = new Post({
//     title: 'Reflections on apples',
//     content: 'They are delicious'
// });
// newPost.save(function(err, post) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({ name: 'Joe Brown' }, function(err, user) {
    if (err) {
        // console.log(err);
    } else {
        user.posts.push({
            title: '3 Things I really hate',
            content: 'Voldemart, Voldemart!'
        });
        user.save(function(err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
        console.log(user);
    }
});
