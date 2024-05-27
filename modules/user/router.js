const express = require('express');
const router = express.Router();
const controller = require('./controller')
const verifyToken = require('./middleware');

router.get('', verifyToken, controller.getAll); 
router.post('/login', controller.loginUser); 
router.get('/:id', verifyToken, controller.getById); 
router.post('',controller.create);
router.put('/:id',controller.update);
router.delete('/:id',controller.remove);

module.exports = router;