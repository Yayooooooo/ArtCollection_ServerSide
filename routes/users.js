let User = require("../models/users");
let express = require("express");
let router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/


router.findAllUsers = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader("Content-Type", "application/json");
    // res.send(JSON.stringify(poems,null,5));
    User.find(function(err, users) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(users,null,5));
    });
};


router.findOneUser = (req, res) => {
    res.setHeader("Content-Type","application/json");
    User.find({ "_id" : req.params.id },function(err, user) {
        if (err)
            res.json({ message: "User NOT Found!", errmsg : err } );
        else
            res.send(JSON.stringify(user,null,5));
    });
};

router.addAUser = (req, res) => {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        res.json({ message: "Passwords do not match."} );
        // return next(err);
    }
    // If the email hasn't been registered
    //Add a new user to our list if all the fields are filled (Register)
    else if(req.body.email && req.body.username && req.body.password && req.body.passwordConf && req.body.gender) {
        /*User.find({"username":req.body.username},function(err, existUser) {
            if (existUser){
                res.json({message:"Username exist"})
            }
        }
        User.find({"email":req.body.email},function(err, existEmail) {
            if (existEmail){
                res.json({message:"Email exist"})
            }
        }*/
        var user = new User();
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.gender = req.body.gender;

        user.save(function (err) {
            if (err)
                res.json({message: "User NOT Added!", errmsg: err});
            else {
                req.session.userId = user._id;
                res.json({message: "User Successfully Added(Registered)!", data: user});
                // return res.redi ('/profile');
            }
        });
    }
    else {
        res.json({message:"All fields required"});
        /*if(!req.body.gender){
            res.json({message: "No gender"});
        }
        if(req.body.username){
            res.json({message: "No username"});
        }
        if(req.body.password){
            res.json({message: "No pas"});
        }
        if(req.body.passwordConf){
            res.json({message: "No pasConf"});
        }
        if(req.body.email){
            res.json({message: "No email"});
        }*/
        // var err = new Error('All fields required.');
        // err.status = 400;
        // return next(err);
    }
};

// GET users/login
router.userLogin = (req, res) => {
    if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
                res.json({message: "Wrong email or password!"});
                // var err = new Error('Wrong email or password.');
                // err.status = 401;
                // return next(err);
            } else {
                req.session.userId = user._id;
                console.log(req.session);
                res.json({data: user._id, message: "User Successfully Login!"});
                // return res.redi ('/profile');
            }
        });
    }
};

// GET users/logout
router.userLogout = (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                // return res.redirect('/');
                res.json({message: "Successfully log out!", data:req.session});
            }
        });
    }
};

router.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: "User NOT DELETED!", errmsg : err } );
        else
            res.json({ message: "User Successfully Deleted!"});
    });
};

module.exports = router;