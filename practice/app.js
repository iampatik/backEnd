const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

//Initialize the app
const app = express();

//Middlewares
//Form Data Middleware
app.use(bodyParser.urlencoded({
    extended:false
}));


// Json Body Middleware
app.use(bodyParser.json());

// Cors Middleware
app.use(cors());

// Setting up the static directory
app.use(express.static(path.join(__dirname,'public')));

//Bring in the database Config
const db = require('./config/keys').mongoURI;
mongoose.connect(db, {
    useNewUrlParser:true
}).then(() => {
    console.log(`Successfully connected to the database ${db}`)
}).catch(err => {
    console.log(`Unable to connect to the dabase ${err}`)
});


app.get('/', (req,res) => {
    res.send("<h1>Hello Patchan!</h1>")
})

//Bring the user's route
const users = require('./routes/api/users');
app.use('/api/users')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})



