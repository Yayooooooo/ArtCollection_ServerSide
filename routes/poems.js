let Poem = require("../models/poems");
let User = require("../models/users");
let express = require("express");
let router = express.Router();

router.findAllPoems = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader("Content-Type", "application/json");
    Poem.find(function(err, poems) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(poems,null,5));
    });
};

router.findPoemById = (req, res) => {
    res.setHeader("Content-Type","application/json");
    Poem.find({ "id" : req.params.id },function(err, poem) {
        if (err)
            res.json({ message: "Poem NOT Found!", errmsg : err } );
        else
            res.send(JSON.stringify(poem,null,5));
    });
};

router.findOnePoem = (req, res) => {
    res.setHeader("Content-Type","application/json");

    Poem.find({ "title" : req.params.title },function(err, poem) {
        if (err)
            res.json({ message: "Poem NOT Found!", errmsg : err } );
        else
            res.send(JSON.stringify(poem,null,5));
            // res.json({ data : poem.data.title} );
            // res.json({ data : poem.data[0].title} );
            // res.json({ data : poem.title} ); 是空的
    });
};

router.findMyPoems = (req, res) => {
    res.setHeader("Content-Type","application/json");
    User.findById(req.session.userId,function(err,user) {
        if (err)
            res.json({message: "You don't have your own poems! Error", errmsg: err});
        else {
            // poem.likes.push(req.session.userId);
            // console.log(req.session.userId)
            // console.log(req.body)
            // console.log(req.session)
            // res.json({data:req.session.userId})
            if(!req.session.userId){
                res.json({data:"Please Login first"});
            }
            else{
                Poem.find({"author": user.username}, function (err, poem) {
                    if (err)
                        res.json({message: "Poem NOT Found!", errmsg: err});
                    else
                        res.send(JSON.stringify(poem, null, 5));
                });
            }
        }
    });
};

router.addPoem = (req, res) => {
    //Add a new donation to our list
    var poem = new Poem();

    poem.title = req.body.title;
    poem.author = req.body.author;
    poem.content = req.body.content;

    poem.save(function(err) {
        if (err)
            res.json({ message: "Poem NOT Added!", errmsg : err } );
        else {
            res.json({message: "Poem Successfully Added!", data: poem});
        }
    });
};


router.incrementLikes = (req, res) => {
    Poem.findById(req.params.id, function(err,poem) {
        if (err)
            res.json({ message: "Poem NOT Found!", errmsg : err } );
        else {
            if (poem.likes.includes(req.session.userId)) {
                res.json({message: "You have already liked this poem!"});
            } else {
                if(req.session.userId == null){
                    res.json({message:"You haven't login. Please login first."});
                }
                else{
                    poem.likes.push(req.session.userId);
                    poem.save(function (err) {
                        if (err)
                            res.json({message: "Poem NOT liked!", errmsg: err});
                        else
                            res.json({message: "Poem Successfully Liked!", data: poem});
                    });
                }
            }
        }
    });
};

router.decreaseLikes = (req, res) => {
    Poem.findById(req.params.id, function(err,poem) {
        if (err)
            res.json({ message: "Poem NOT Found!", errmsg : err } );
        else {
            if(req.session.userId == null){
                res.json({message:"You haven't login. Please login first."});
            } else {
                if (!poem.likes.includes(req.session.userId)) {
                    res.json({message: "This is used for cancel your like."});
                }
                else{
                    poem.likes.remove(req.session.userId);
                    poem.save(function (err) {
                        if (err)
                            res.json({message: "Poem NOT unliked!", errmsg: err});
                        else
                            res.json({message: "Poem Successfully unliked!", data: poem});
                    });
                }
            }
        }
    });
};

router.deletePoem = (req, res) => {
    Poem.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: "Poem NOT DELETED!", errmsg : err } );
        else
            res.json({ message: "Poem Successfully Deleted!"});
    });
};

router.editPoem = (req, res) => {

    Poem.find({ "title" : req.params.title} , function(err, poem) {
        // console.log('SERVER : ' + req.params._id + ' ' + req.body);
        if (err)
            res.json({ message: "Poem NOT Found!", errmsg : err } );
        else {
            console.log("here");
            console.log(poem);
            poem[0].title = req.body.title;
            console.log(req.body);
            poem[0].content= req.body.content;

            poem[0].save(function (err) {
                if (err)
                    res.json({ message: "Poem NOT UpDated!", errmsg : err } );
                else
                    res.json({ message: "Poem Successfully UpDated!", data: poem });
            });
        }
    });
};

/*
//This is the sum of the like of all the objects
function getTotalLikes(array) {
    let totalLikes = 0;
    array.forEach(function(obj) { totalLikes += obj.likes; });
    return totalLikes;
}
*/

/*router.findTotalLikes = (req, res) => {
    Poem.findById(req.params.id,function (err,poem) {
        if (err)
            res.json({ message: "Poem NOT Found!", errmsg : err } );
        else {
            res.json({ message: "Here is total likes!", data: poem.likes.length });
        }
    });
}*/
module.exports = router;