const mongoose = require('mongoose');

function connect() {
    mongoose.connect('mongodb://127.0.0.1:27017/khoa_hoc')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    });
}

module.exports = { connect };