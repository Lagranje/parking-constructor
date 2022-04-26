const mongoose = require('mongoose');

const terminalSchema = new mongoose.Schema({
    name: {
        type: String
    },
    width: {
        type: Number
    },
    height: { 
        type: Number
    },
    parkingPlaces: [{
        width: {
            type: Number
        },
        height: {
            type: Number
        }
    }]
});

const Terminal = mongoose.model('Terminal', terminalSchema);

module.exports = Terminal;