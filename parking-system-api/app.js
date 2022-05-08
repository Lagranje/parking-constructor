/** 
 *   Variables Configuration
 */

const express = require('express');

const app = express();
const cors = require("cors");

const mongoose = require('./database/mongoose');
const Terminal = require('./database/models/terminal');

const expressSession = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');


require("dotenv").config();

const authRouter = require("./controllers/auth");
const terminalRouter = require("./controllers/terminal");

/** 
 *   Express Session Configuration
 */

const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
};  

if (app.get("env") === "production") {
    session.cookie.secure = true;
}

/**
 * Passport Configuration
 */

 const strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      /**
       * Access tokens are used to authorize users to an API
       * (resource server)
       * accessToken is the token to call the Auth0 API
       * or a secured third-party API
       * extraParams.id_token has the JSON Web Token
       * profile has all the information from the user
       */
      return done(null, profile);
    }
  );


/** 
 *   App Configuration
 */

app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(expressSession(session));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    debugger
    done(null, user);
});


app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

const secured = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        req.session.returnTo = req.originalUrl;
        res.redirect("/login");
    } 
}
  
app.use("/", authRouter);

app.use("/", secured, terminalRouter);


app.listen(3000, () => console.log('App is listening on port 3000'))
