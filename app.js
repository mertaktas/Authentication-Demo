var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/users"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")

mongoose.connect("mongodb://localhost:27017/auth_demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var app = express();
app.set('view engine', 'ejs');

app.use(require("express-session")({
    secret: "Hello everbody lets go!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.get("/", function (req, res) {
    res.render("home");
});

app.get("/secret", function (req, res) {
    res.render("secret");
});

app.listen(3000, function () {
    console.log("Server Started....");
});