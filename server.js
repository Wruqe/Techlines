const path = require('path')
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./controllers/')
const time = require('./utility/time')
var bodyParser = require('body-parser')
var multer = require('multer')
const sequelize = require('./config/connection')

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express()
const PORT = process.env.PORT || 3001

const hbs = exphbs.create({ helpers: time });


// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    console.log(file)
    callback(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

module.exports = { upload };
