//Imports
const express = require('express');
const mongoose  = require('mongoose');
//Routes
let adminRouter = require('./routes/admin');
let patientRouter = require('./routes/patient');
let doctorRouter = require('./routes/doctor');
// Initialize Express
const app  = express();

//DB Creds
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

// Connecting to the Database
let mongodb_url = 'mongodb://localhost/';
let dbName = 'healthApp';
// Define a url to connect to the database
const MONGODB_URI = process.env.MONGODB_URI || mongodb_url + dbName;
mongoose.connect(MONGODB_URI, options);
let db = mongoose.connection;

db.once('open',()=>{
	console.log("Database connected successfully.");
});

db.on('error',(error)=>{
	console.log(error);
});

//Set View Engine
app.set('view engine','ejs');
//Set Static folder
app.use(express.static('public'));
// body parser middleware
app.use(express.json());
// App Routing
app.use('/admin', adminRouter);
// Doctor Routing
app.use('/doctor', doctorRouter);
//Server PORT
const PORT = process.env.PORT || 5000;
//Start Server
app.listen(PORT, function(){
	console.log(`Server is listening on port ${PORT}`);
});