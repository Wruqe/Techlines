const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utility/auth');



router.get('/', withAuth, async (req, res) => {

    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blog }],
      });
  
      const user = userData.get({ plain: true });
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:id', withAuth, async (req, res) => {
    try {
      // Find the user based on the provided user ID
      const userData = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blog }],
      });
  
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = userData.get({ plain: true });
      res.render('profile', {
        ...user,
        logged_in: false
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;