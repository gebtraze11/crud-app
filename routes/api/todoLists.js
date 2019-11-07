const router = require('express').Router();
const auth = require('../../middleware/authorization');
const todoListsCtrl = require('../../controllers/todoLists')


router.use(auth.authenticate);

router.get('/', auth.checkAuth, todoListsCtrl.index);
router.post('/', auth.checkAuth, todoListsCtrl.create);

router.get('/:id', auth.checkAuth, todoListsCtrl.show);

module.exports = router;