const https = require('https');
const express = require('express');

const setHeaders = require('./middleware/headers');
const fetchYt = require('./controllers/youtube');
const fetchVim = require('./controllers/vimeo');

const app = express();

app.use(express.json());
app.use(setHeaders);

app.use('/youtube/:id', fetchYt);

app.use('/vimeo/:id', fetchVim);

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;
