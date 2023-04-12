const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());

var corsOptions = { origin: "http://localhost:5001" };
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, }))

const db = require("./server/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    db.seed();
});

// Require our routes into the application.
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({message: 'CitiusCloud IPAM Application',}));

app.listen(port, () => {console.log(`CitiusCloud's IPAM app is running on port ${port}.`);});
module.exports = app;

