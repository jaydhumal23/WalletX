const { rateLimit } = require('express-rate-limit')
const { RedisStore } = require('rate-limit-redis')
const Redis = require('ioredis')
const dotenv = require('dotenv')
dotenv.config()

const client = new Redis(process.env.REDIS_URL)
client.on('error', (err) => console.error('Redis Client Error: '.bgRED, err))
client.on('connect', () => console.log('Connected to Redis successfully'.bgGreen))
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    ipv6Subnet: 56,

    store: new RedisStore({
        sendCommand: (...args) => client.call(...args),
        prefix: 'transaction_limit:'
    }),

})
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: "Too many login attempts, please try again after 15 minutes",
    store: new RedisStore({
        sendCommand: (...args) => client.call(...args),
        prefix: 'auth_limit:'
    }),
})


module.exports = { generalLimiter, authLimiter };