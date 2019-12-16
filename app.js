var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var cors = require("cors");
let db = require("./routes/connectDB").connection;
const HTTPS = require("https");
const FS = require("fs");

var indexRouter = require("./routes/index");
const users = require("./routes/users");
const poems = require("./routes/poems");
const authors = require("./routes/authors");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set('trust proxy',true);
//use sessions for tracking logins
app.use(session({
    store: new MongoStore({
        mongooseConnection: db
    }),
    secret: "work hard",
    proxy:true,
    resave: true,
    saveUninitialized: false,
    cookie:{secure:false}
}));
/*app.get("/session", (request, response, next) => {
    response.send({ id: request.session.userId});
});
app.post("/session", (request, response, next) => {
    if(request.body.session != request.session.userId) {
        return response.status(500).send({ message: "The data in the session does not match!" });
    }
    response.send({ message: "Success!" });
});*/




app.use(logger("dev"));
/*
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
if (process.env.NODE_ENV !== "test") {
    app.use(logger("dev"));
}

app.use("/", indexRouter);
app.use("/users", users);
app.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST','PUT','DELETE'],
    credentials: true
}));

app.get("/users", users.findAllUsers);
app.get("/users/:id", users.findOneUser);
app.get("/usersLogout",users.userLogout);
app.post("/usersRegister",users.addAUser);
app.post("/users/login",users.userLogin);
app.delete("/users/:id", users.deleteUser);

app.get("/poems", poems.findAllPoems);
app.get("/poems/:id", poems.findOnePoem);
app.get('/mypoems', poems.findMyPoems);
app.post("/poems",poems.addPoem);
app.put('/poems/:id/like', poems.incrementLikes);
app.put('/poems/:id/unlike',poems.decreaseLikes);
app.delete("/poems/:id", poems.deletePoem);
app.put("/poems/:id", poems.editPoem);

app.get("/authors", authors.findAllAuthors);
app.get("/authors/:id", authors.findOneAuthor);
app.post("/authors",authors.addAuthor);
app.put('/authors/:id/like',authors.incrementLikes);
app.put('/authors/:id/unlike',authors.decreaseLikes);
app.put("/authors/:id/works",authors.incrementWorks);
app.put("/authors/:id/deleteWork",authors.deleteWorks);
app.delete("/authors/:id", authors.deleteAuthor);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});


module.exports = app;

