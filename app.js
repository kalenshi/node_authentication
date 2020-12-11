const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');



//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/assets', express.static(`${__dirname}/public`));

app.set('view engine', "ejs");



app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}..`);
})

