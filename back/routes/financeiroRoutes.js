const express = require('express');
const router = express.Router();
const financeiroController = require('../controllers/financeiroController');

router.get('/', financeiroController.getAllContas);
router.post('/', financeiroController.createConta);
// router.get('/:id', aulaController.getContaById);

module.exports = router;
