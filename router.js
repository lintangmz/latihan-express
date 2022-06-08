const express = require('express')
const router = express.Router()

router.use(function timelog (req, res, next) {
    console.log(`Time: ${Date.now()}`)
    next()
})

router.get('/home', function (req, res){
    res.send('Hahahaha anda usihuleh!')
})
router.get('/about', (req, res) => {
    res.send('Aku mah orangnya gimanaaa gitu')
})

module.exports = router