const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const cors = require("cors");
const { user } = require('./server/models');
// Set up the express app
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// Log requests to the console.
app.use(logger('dev'));


// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const db = require("./server/models");
// db.sequelize.sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  user.create({
    user_type : "tutor", 
    email : "testang@tasd.com",
    password  : "tstatnsdg",
    username : "deasd"
  })
}

require("./server/routes/auth.routes")(app);
// require("./server/routes/user.routes")(app);


// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning.',
  // initial();
}));

module.exports = app;