const mongoose = require('mongoose');
const Accessory = ('./Accessory');

const Schema = mongoose.Schema;

const cubeSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessory: [{type: Schema.Types.ObjectId, ref: 'Accessory'}],// Phase 2 addition
    creatorId: {type: Schema.Types.ObjectId, ref: 'User', required: true},//  Phase 3 addition
});

const Cube = mongoose.model('Cube', cubeSchema);
// Mongo takes the first arg 'Cube' and names the collection 'cubes'

module.exports = Cube;