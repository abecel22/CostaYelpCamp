let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_2');

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
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});
let User = mongoose.model('User', userSchema);

// User.create({
//     email: 'bob@gmail.com',
//     name: 'Bob Belcher'
// });

Post.create(
    {
        title: 'How to cooke the best burger part 2',
        content: 'blah blah blah blah blah blah'
    },
    function(err, post) {
        User.findOne({ email: 'bob@gmail.com' }, function(err, foundUser) {
            if (err) {
                console.log(err);
            } else {
                foundUser.posts.push(post);
                foundUser.save(function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });
            }
        });
    }
);
