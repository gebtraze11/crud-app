const router = require('express').Router();
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    let user = new User(req.body.userInfo);
    try {
        await user.save();
        const token = createJwt(user);
        res.json({ token });
    } catch(err) {
        res.status(400).send('bad request');
    }
});

router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({'username': req.body.userInfo.username});
        if(!user) return res.status(400).send('invalid username or password');
        user.validatePassword(req.body.userInfo.password, (err, isValid) => {
            if(err) return res.status(500).send('Bcrypting countered error while comparing password');
            if(isValid) {
                const token = createJwt(user);  
                res.json({ token });
            }
            else res.status(400).send('invalid username or password');         
        });
    } catch(err) {
        res.status(400).send('bad request');
    }
});

const createJwt = (user) => jwt.sign({ user: { _id: user._id } }, process.env.SECRET, { expiresIn: '24h' });

module.exports = router;