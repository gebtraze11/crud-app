const router = require('express').Router();
const User = require('../../models/user');
const auth = require('../../middleware/authorization');

router.use(auth.authenticate);
router.get('/', auth.checkAuth , async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    res.json({ user });
  } catch(err) {
    res.status(401).send('1 unauthorized');
  }
});

module.exports = router