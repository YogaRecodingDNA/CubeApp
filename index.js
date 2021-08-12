const env = process.env.NODE_ENV || 'development';
const mongoose = require('mongoose');
const config = require('./config/config')[env];
const app = require('express')();
require('./config/express')(app);
require('./config/routes')(app);
// require('./controllers/CreateController')(app);
// require('./controllers/CreateAccessoryController')(app);

mongoose.connect('mongodb+srv://kingslander:kingsland2021@cubes.mlich.mongodb.net/Cubicle?retryWrites=true&w=majority',  { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`DB connected...`);
});

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));