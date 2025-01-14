const redis = require('../lib/redis');

const getUser = async (req) => {
    const key = `users:${req.params.id}`;
    const val = await redis.get(key);
    const user = JSON.parse(val);
    return user;
};

exports.getUser = getUser;

const getUsers = async (req) => {
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

    return {users: users};
};

exports.getUsers = getUsers;