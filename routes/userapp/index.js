const router = require("express").Router()

router.use('/userapp/auth',require('./auth'));
router.use('/userapp', require("./editor"))

module.exports = router