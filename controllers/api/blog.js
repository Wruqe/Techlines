const router = require('express').Router();
const { Blog } = require('../../models');


// Create a Blogpost
router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET blogPost

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll();

    const blogs = blogData.map(blog => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

// delete BlogPost
router.delete('/:id', async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!blogData) {
            res.status(404).json({Message: 'No blog with this name!'})
            return
        }
        res.status(200).json(blogData,{Message: 'Blog deleted!'})
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router