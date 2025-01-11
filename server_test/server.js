
const express = require('express');
const path = require('path');
const app = express();

const userHandler = require('./handlers/users');

// ejs를 뷰 엔진으로 지정
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'views', 'index.ejs'));
});

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/user/:id', (req, res) => {
    res.status(200).send(req.params.id);
})

app.get('/user/:id', async (req, res) => {
    try {
        const user = await userHandler.getUser(req);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('internal error');
    }
})
app.get('/users', async (req, res) => {
    try {
        const locals = await userHandler.getUsers(req);
        res.render(path.join(__dirname, 'views', 'users.ejs'), locals);
    } catch (err) {
        console.error(err);
        res.status(500).send('internal error');
    }
})

redis.connect()
    .once('ready', async () => {
    try {
        await redis.init();

        app.listen(3000, () => {
            console.log('start listening')
        })
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});

redis.on('error', (err) => {
    console.error(err);
    process.exit(1);
});