const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {type: String},
    genre: {type: String},
    plot: {type: String},
    cast: [{type: Schema.Types.ObjectId, ref: 'CelebM'}]
});

const MovieM = mongoose.model('MovieM', movieSchema);

module.exports = MovieM;