
const router = require('express').Router()
const { User } = require('../../models')
const multer  = require('multer')
const path = require('path');
const storage = multer.diskStorage({
    // destination: (req, file, callback) => {
    //   callback(null, 'images')
    // },
    filename: (req, file, callback) => {
      console.log(file)
      callback(null, Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({storage: storage})

// create a user with a profile picture
router.post('/', upload.single('profileImage'), async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profileImage: req.file.filename
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userData.id

            res.status(200).json({
                userData,
                message: "Image uploaded and user created successfully."
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        // check email
        const userData = await User.findOne({
            where: {
                email: req.body.email 
            },
        })
        if(!userData){
            res.status(400).json({Message: 'wromg email or password!'})
            return}
        
        // check password 
        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({Message: 'Wrong email or password'});
            return;
        }
        // create session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true

        res.json({user: userData, Message: `${userData.name} you are now logged in!`})
        })
    } catch (err) {
        res.status(400).json(err)
    }
})


router.post('/logout', async (req, res) => {
    if(req.session.loggedIn) {
        // take away session
        req.session.destroy(()=> {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;