const mongoose = require('mongoose');

const terminalSchema = new mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    width: {
        type: Number
    },
    height: { 
        type: Number
    },
    terminalScheme: {
        type: String
    }
});

const Terminal = mongoose.model('Terminal', terminalSchema);

module.exports = Terminal;