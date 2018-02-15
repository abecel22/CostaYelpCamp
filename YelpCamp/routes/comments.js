const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const Comment = require('../models/comment');

//comments new
router.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', { campground: campground });
        }
    });
});

//comments create

router.post('/campgrounds/:id/comments', isLoggedIn, function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            //Create comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //Connect new comment to campground
                    comment.save();
                    campground.comments.push(comment._id);
                    campground.save();
                    //redirect back to campground show page
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//comment edit route
router.get(
    '/campgrounds/:id/comments/:comment_id/edit',
    checkCommentOwnership,
    function(req, res) {
        Comment.findById(req.params.comment_id, function(err, foundComent) {
            if (err) {
                res.redirect('back');
            } else {
                res.render('comments/edit', {
                    campground_id: req.params.id,
                    comment: foundComent
                });
            }
        });
    }
);

//comment update route
router.put(
    '/campgrounds/:id/comments/:comment_id',
    checkCommentOwnership,
    function(req, res) {
        Comment.findByIdAndUpdate(
            req.params.comment_id,
            req.body.comment,
            function(err, updatedComment) {
                if (err) {
                    res.redirect('back');
                } else {
                    res.redirect('/campgrounds/' + req.params.id);
                }
            }
        );
    }
);

//Comment Destroy route
router.delete(
    '/campgrounds/:id/comments/:comment_id',
    checkCommentOwnership,
    function(req, res) {
        Comment.findByIdAndRemove(req.params.comment_id, function(err) {
            if (err) {
                res.redirect('back');
            } else {
                res.redirect('/campgrounds/' + req.params.id);
            }
        });
    }
);

//middleware to check if user is logged in   FARRTSPLAZA :)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect('back');
            } else {
                //does user own comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}
module.exports = router;
