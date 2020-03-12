const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controllers');

router.post('/add', eventController.addEvent);

router.get('/:page', eventController.getEvents);

module.exports = router;
