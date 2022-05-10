const mongoose = require('mongoose') 
const MONGO_DB_URL = 'mongodb://localhost:27017/restnode';

//Set up default mongoose connection
var mongoDB = MONGO_DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true,
                            useUnifiedTopology: true  });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;