const express = require('express');
const path = require('path');

const app = express();
app.get('/', (res, req) => {
    res.status(200).send(req.params.id);
});

app.use((err, req, res, next) => {
    res.status(500).send('Internal Server Error');
})

app.listen(3000, () => {
    console.log('start listening');
});