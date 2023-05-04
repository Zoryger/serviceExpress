const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const RouteLivres = require("./router/livre");
const RouteAuthors = require("./router/author");
const indexRouter = require('./router/index');
var path = require('path');

mongoose.connect('mongodb+srv://thibaultdebril62:root22@cluster2.uxvzfer.mongodb.net/AngularLivre', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("success");
}).catch((error) => {
    console.log(error);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/api/livres/', RouteLivres);
app.use('/api/authors/', RouteAuthors);


module.exports = app;