require('dotenv').config()
require('./config/database')
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require("mongoose");
const db = mongoose.connection;
const userRouter = require("./routes/api/users");
const port = process.env.PORT || 3001;
const app = express();
const cors = require('cors');






mongoose.connect(process.env.DATABASE_URL);

db.on("connected", () => {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}...`);
});



app.use(logger('dev'));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
// app.use(express.static(path.join(__dirname, 'build')));

app.use(require("./config/checkToken"));

app.use("/api/users", userRouter);




//routs



// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));




//catch all
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});










app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
  });
