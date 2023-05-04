const express = require('express');
const router = express.Router();
const AuthorCtrl = require('../controllers/author');

router.post('/', AuthorCtrl.createAuthor);
router.get('/:id', AuthorCtrl.getOneAuthor);
router.get('/', AuthorCtrl.getAllAuthors);
router.put('/:id', AuthorCtrl.updateAuthor);
router.delete('/:id', AuthorCtrl.deleteAuthor);
module.exports = router;