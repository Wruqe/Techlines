const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require('../utility/auth');


router.get("/:id", withAuth, async (req, res) => {
  try {
    console.log("Blog Route Reached");
    const blogId = req.params.id;
    const blogData = await Blog.findByPk(blogId, { include: [User, {
      model: Comment, 
      include: [{model: User, attributes: ['name'] }]
    }] });
    const blog = blogData.get({ plain: true });
console.log("is this working")
    userData = await User.findByPk(req.session.user_id, {
      attributes: { include: ['user.name'] },
    });
     user = userData.get({ plain: true });


    res.render("blog", {
      ...blog,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;