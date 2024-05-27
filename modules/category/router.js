const express = require('express');
const router = express.Router();
const controller = require('./controller')
const verifyToken = require('../user/middleware');
router.get('', controller.getAll); 
router.get('/:id', controller.getById); 
router.post('', verifyToken, controller.create);
router.put('/:id',controller.update);
router.delete('/:id',controller.remove);

module.exports = router;