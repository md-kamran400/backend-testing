const rateLimiter = require("express-rate-limit")
const Limiter = rateLimiter({
    window: 10*60*1000,
    max: 50
})

module.exports = Limiter;