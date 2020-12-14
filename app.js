const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();


//passport config
require('./config/passport')(passport);


const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');


//Database
const dbConfig = require('./config/dbConfig');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.getDBUri(),
     {
         useNewUrlParser: true, 
         useUnifiedTopology: true,
         useCreateIndex: true,
    })
.then(conn=>{
    console.log(`Mongo Database Connected`);
})
.catch(err=>{
    console.log(`ERROR connecting to database`);
});





//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
 //express session middleware
 app.use(session({
    secret: 'i love web design',
    resave: true,
    saveUninitialized: true
 }));
 //passport middleware
 app.use(passport.initialize());
 app.use(passport.session());

 //middleware for connect flash
 app.use(flash());
app.use('/assets', express.static(`${__dirname}/public`));
//Global Variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash(`success_msg`);
    res.locals.error_msg = req.flash(`error_msg`);
    res.locals.error = req.flash(`error`);
    next();
});


//EJS
app.use(expressLayouts);
app.set('view engine', "ejs");

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));





app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}..`);
})

