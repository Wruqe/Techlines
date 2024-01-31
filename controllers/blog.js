const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require('../utils/auth');


router.get("/:id", withAuth, async (req, res) => {
  try {
    const blogId = req.params.id;
    const blogData = await Blog.findByPk(blogId, { include: [User, Comment] });
    const blog = blogData.get({ plain: true });

    userData = await User.findByPk(req.session.user_id, {
      attributes: { include: ['name'] },
    });
     user = userData.get({ plain: true });


    res.render("post", {
      ...blog,
      chat_name: user.name,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;