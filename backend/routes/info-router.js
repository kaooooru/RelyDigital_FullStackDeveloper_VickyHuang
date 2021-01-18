const express = require('express')

const InfoCtrl = require('../controllers/info-ctrl')

const router = express.Router()

router.post('/', InfoCtrl.createInfo)
router.get('/', InfoCtrl.getInfo)

module.exports = router


