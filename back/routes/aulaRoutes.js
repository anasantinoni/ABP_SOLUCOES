const express = require('express');
const router = express.Router();
const aulaController = require('../controllers/aulaController');

router.get('/', aulaController.getAllAulas);
router.post('/', aulaController.createAula);
// router.get('/:id', aulaController.getAulaById);

module.exports = router;
