// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors);

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
// Setup server
const port = 8000;

app.listen(port, listening);

// Callback to debug
function listening(){
    console.log('server is running');
    console.log(`running on http://localhost:${port}`);
}

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (req, res) {
    res.status(200).send(projectData);
};

// Post Route
app.post('/add', addData);

function addData(req, res) {
    console.log(`${req.body}`);
    try {
        projectData['date'] = req.body.date;
        projectData['temp'] = req.body.temp;
        projectData['content'] = req.body.content;
        projectData['country'] = req.body.country;
        res.status(200).send({msg: "success"});
        console.log(`${projectData}`);
    } catch(error) {
        console.log("error", error);
    }
}