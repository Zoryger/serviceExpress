const express = require('express');
const router = express.Router();
const LivreCtrl = require('../controllers/livre');

router.post('/', LivreCtrl.createLivre);
router.get('/:id', LivreCtrl.getOneLivre);
router.get('/', LivreCtrl.getAllLivre);
router.put('/:id', LivreCtrl.updateLivre);
router.delete('/:id', LivreCtrl.deleteLivre);
module.exports = router;