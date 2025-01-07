const express = require('express');
const path = require('path');
const app = express();

const logMiddleware = (req, res, next) => {
    console.log(req.method, res.url);
    next();
}

app.get('/', logMiddleware, (req, res) => {
    res.status(200).send(req.params.id);
});

const errorMiddleware = (req, res, next) => {
    next(new Error('미들웨어 에러'));
}

app.get('/err', errorMiddleware, (req, res) => {
    console.log('err 라우트');
    res.status(200).send('err 라우트');
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
})

app.listen(3000, () => {
    console.log('start listening');
});