const router = require('express').Router();
const User = require('../../models/user');
const auth = require('../../middleware/authorization');

router.use(auth.authenticate);

router.get('/', auth.checkAuth, async (req, res) => {
  try {
    let users = await User.find().select('username -_id');
    res.json({ users });
  } catch(err) {
    console.log(err);
    res.status(500).send('Mongoose encountered an error while searching');
  }
});

router.get('/:id', auth.checkAuth , async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    res.json({ user });
  } catch(err) {
    res.status(401).send('1 unauthorized');
  }
});

module.exports = router