const express = require('express');
const workController = require('../controllers/workController');

const router = express.Router();

router.post('/add', workController.addWork);
router.get('/works', workController.getAllWorks);
router.put('/works/:id', workController.updateWork);
router.delete('/works/:id', workController.deleteWork);

module.exports = router;
