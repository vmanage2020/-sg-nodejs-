const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const logger = require('./config/logger')



// create express app
const app = express();

app.use(cors() );
/*app.use(cors( {
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
} ));*/

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(allowCrossDomain);


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

// Require Notes routes
require('./app/routes/routes.js')(app);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
     keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
     useCreateIndex: true,
      useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});




// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
