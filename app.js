const https = require('https');
const express = require('express');
const path = require('path');

const setHeaders = require('./middleware/headers');
const fetchYt = require('./controllers/youtube');
const fetchVim = require('./controllers/vimeo');
const getDefaultVideoBase = require('./controllers/defaultBase');

const app = express();

app.use(express.json());
app.use(setHeaders);

app.use('/default', getDefaultVideoBase);
app.use('/youtube/:id', fetchYt);
app.use('/vimeo/:id', fetchVim);

module.exports = app;
