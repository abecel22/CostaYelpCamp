let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_2');
const Post = require('./models/post');
const User = require('./models/user');

// User.create({
//     email: 'bob@gmail.com',
//     name: 'Bob Belcher'
// });

Post.create(
    {
        title: 'How to cooke the best burger part 4',
        content: 'iewpoeirwpoeirwpoeirwpoeirweporiopweclea'
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

//find user
// find all posts for that user
// User.findOne({ email: 'bob@gmail.com' })
//     .populate('posts')
//     .exec(function(err, user) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(user);
//         }
//     });
