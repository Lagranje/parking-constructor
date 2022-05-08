/**
 * Required External Modules
 */

const express = require("express");
const router = express.Router();
const Terminal = require("../database/models/terminal");

/**
 * Router Definitions
 */

router.get('/terminals', (req, res) => {
    Terminal.find()
            .then(terminals => res.send(terminals))
            .catch(error => console.error(error));
});

router.get('/terminals/:id', (req, res) => {
    Terminal.findById(req.params.id)
            .then(terminal => res.send(terminal))
            .catch(error => console.log(error));
})

router.post('/terminals', (req, res) => {        
    new Terminal(req.body)
        .save()
        .then(terminal => res.send(terminal))
        .catch(err => console.log(err));
});

router.patch('/terminals/:id', (req, res) => {
    console.log(JSON.stringify(req.body).length);
    Terminal.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
            .then(() => { 
                res.status(204).send(); 
            })
            .catch(error => console.log(error));
});

router.delete('/terminals/:id', (req, res) => {
    Terminal.findByIdAndDelete(req.params.id)
            .then(result => res.send(result))
            .catch(error => console.log(error));
})

/**
 * Module Exports
 */

module.exports = router;