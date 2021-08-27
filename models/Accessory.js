const mongoose = require('mongoose');

const schema = mongoose.Schema;

const accessorySchema = new schema({
    name: String,
    description: String,
    imageUrl: String
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;