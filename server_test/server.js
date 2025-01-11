const Redis = require('ioredis');
const express = require('express');
const path = require('path');
const app = express();

const redis = new Redis({
    port: 6379,
    host: '192.168.45.111',
    password : process.env.REDIS_PASSWORD,
    enableOfflineQueue: false
})

const init = async () => {
    await Promise.all([
        redis.set('users:1', JSON.stringify({id: 1, name: 'alpha'})),
        redis.set('users:2', JSON.stringify({id: 2, name: 'bravo'})),
        redis.set('users:3', JSON.stringify({id: 3, name: 'charlie'})),
        redis.set('users:4', JSON.stringify({id: 4, name: 'delta'})),
    ]);
};

// ejs를 뷰 엔진으로 지정
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'views', 'index.ejs'));
});

app.get('/user/:id', (req, res) => {
    res.status(200).send(req.params.id);
})

redis.once('ready', async () => {
    try {
        await init();

        app.get('/user/:id', async (req, res) => {
            try {
                const key = `users:${req.params.id}`;
                const val = await redis.get(key);
                const user = JSON.parse(val);
                res.status(200).json(user);
            } catch (err) {
                console.error(err);
                res.status(500).send('internal error');
            }
        })

        app.get('/users', async (req, res) => {
            try {
                const stream = redis.scanStream({
                    math: 'users:*',
                    count: 2
                });

                const users = [];
                for await (const resultKeys of stream) {
                    for(const key of resultKeys) {
                        const value = await redis.get(key);
                        const user = JSON.parse(value);
                        users.push(user);
                    }
                }
                res.render(path.join(__dirname, 'views', 'users.ejs'), {users: users});
            } catch (err) {
                console.error(err);
                res.status(500).send('internal error');
            }
        })

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