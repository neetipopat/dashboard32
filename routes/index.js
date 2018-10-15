const express = require('express');
const router = express.Router();

const Log = require('../models/logs');

router.get('/getDeviceData', (req, res) => {

	console.log('getviewdata')
	console.log(req.query.deviceID);
	var mysort = { _id: -1 };
	Log.find({ deviceId: req.query.deviceID }, { _id: 0, __v: 0 }, function (err, docs) {
		if (err)
			res.json(err);
		else
			res.send({ logs: docs });
	}).sort(mysort);
})

router.get('/', (req, res) => {
	res.render('index')
})


module.exports = router;