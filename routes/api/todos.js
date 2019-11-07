const router = require('express').Router();
const auth = require('../../middleware/authorization');
const todosCtrl = require('../../controllers/todos');

router.use(auth.authenticate);

router.post('/', auth.checkAuth, todosCtrl.create);


module.exports = router;