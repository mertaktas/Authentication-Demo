// VARIABLES
var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/users"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    app = express();


// APP CONFİG
mongoose.connect("mongodb://localhost:27017/auth_demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require("express-session")({
    secret: "Hello everbody lets go!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// =====================
// ROUTES
// =====================

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/secret", function (req, res) {
    res.render("secret");
});

// AUTH ROUTES
// show sign up form
app.get("/register", function (req, res) {
    res.render("register");
});

//handling user sign up
app.post("/register", function (req, res) {
    req.body.username
    req.body.password
    User.register(new User({
        username: req.body.username
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/secret");
        });
    });
});

// LOGIN ROUTES
// render login form
app.get("/login", function (req, res) {
    res.render("login");
});
// login.logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) {

});

app.listen(3000, function () {
    console.log("Server Started....");
});