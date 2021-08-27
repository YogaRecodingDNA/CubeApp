const mongoose = require('mongoose');
const Accessory = ('./Accessory');

const Schema = mongoose.Schema;

const cubeSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessory: [{type: Schema.Types.ObjectId, ref: 'Accessory'}],
    creatorId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
});

const Cube = mongoose.model('Cube', cubeSchema);
// Mongo takes the first arg 'Cube' and names the collection 'cubes'.

module.exports = Cube;