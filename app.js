const express = require('express');
const expressLayouts = require('express-ejs-layouts')

const app = express();


const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');


//Database
const dbConfig = require('./config/dbConfig');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.getDBUri(), {useNewUrlParser: true, useUnifiedTopology: true})
.then(conn=>{
    console.log(`Mongo Database Connected`);
})
.catch(err=>{
    console.log(`ERROR connecting to database`);
});





//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/assets', express.static(`${__dirname}/public`));


//EJS
app.use(expressLayouts);
app.set('view engine', "ejs");

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));





app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}..`);
})

