const router = require('express').Router();
const User = require('../models/User');

//signup

router.post('/signup', async (req, res) => {
  const { name, address, phone, email, password } = req.body;

  try {
    const user = await User.create({ name, address, phone, email, password });
    res.json(user);
  } catch (e) {
    if (e.code === 11000) return res.status(400).send('Email already exists');
    res.status(400).send(e.message)
  }
})

//login

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    res.json(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
})



//get a user

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findById(id);
    res.json(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
module.exports = router;

