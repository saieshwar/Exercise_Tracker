const router = require('express').Router();

let User = require('../models/User.model');

router.get('/', (req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json('Error : ' + err))
});

router.post('/add', (req,res) => {
    let {userName} = req.body;

    const newUser = new User({userName});
    newUser.save()
    .then(()=> res.json('User Added'))
    .catch(() => res.status(404).json('Error ' + err))

});

module.exports = router;