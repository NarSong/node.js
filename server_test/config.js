const redisConfig = {
    port: 6379,
    host: '192.168.45.111',
    password : process.env.REDIS_PASSWORD,
    enableOfflineQueue: false
};

exports.redisConfig = redisConfig;