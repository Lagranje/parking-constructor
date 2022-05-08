/** 
 *   Variables Configuration
 */

const express = require('express');

const app = express();
const cors = require("cors");

require('./database/mongoose');


require("dotenv").config();

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt.expressjwt({
    secret: jwks.expressJwtSecret({
        cache: false,
        rateLimit: false,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-mcaxjh-z.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://dev-mcaxjh-z.us.auth0.com/api/v2/',
  issuer: 'https://dev-mcaxjh-z.us.auth0.com/',
  algorithms: ['RS256']
});

const authRouter = require("./controllers/auth");
const terminalRouter = require("./controllers/terminal");


/** 
 *   App Configuration
 */

app.use(cors());

app.use(express.json({limit: '50mb'}));

app.use("/", authRouter);

app.use("/", jwtCheck, terminalRouter);


app.listen(3000, () => console.log('App is listening on port 3000'))
