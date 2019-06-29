const express = require('express');
const app = express();
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./config/plugins.json');
const plugins = low(adapter)
const opn = require('opn');

app.use('/', express.static(path.join(__dirname, 'config', 'static')));

app.get('/plugins', function (req, res) {
    res.send(
        plugins.value()
    )
});

app.put('/plugins', function (req, res) {
    const status = plugins.find({ name: req.query.name }).value().activated;

    plugins
        .find({ name: req.query.name })
        .assign({ activated: !status })
        .write();

    res.send(
        plugins.find({ name: req.query.name }).value()
    )
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
    opn('http://localhost:3000');
});

