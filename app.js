const express = require('express');
const logger = require('morgan');

const todoRoutes = require('./routes/todo');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/', todoRoutes);

module.exports = app;