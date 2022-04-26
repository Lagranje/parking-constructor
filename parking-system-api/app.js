const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('./database/mongoose');

const Terminal = require('./database/models/terminal');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET HEAD OPTIONS POST PUT PATCH DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/terminals', (req, res) => {
    Terminal.find()
            .then(terminals => res.send(terminals))
            .catch(error => console.error(error));
});

app.get('/terminals/:id', (req, res) => {
    Terminal.findById(req.params.id)
            .then(terminal => res.send(terminal))
            .catch(error => console.log(error));
})

app.post('/terminals', (req, res) => {        
    new Terminal(req.body)
        .save()
        .then(terminal => res.send(terminal))
        .catch(err => console.log(err));
});

app.patch('/terminals/:id', (req, res) => {
    Terminal.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
            .then(res.status(204).send())
            .catch(error => console.log(error));
});

app.delete('/terminals/:id', (req, res) => {
    Terminal.findByIdAndDelete(req.params.id)
            .then(result => res.send(result))
            .catch(error => console.log(error));
})


app.listen(3000, () => console.log('App is listening on port 3000'))
