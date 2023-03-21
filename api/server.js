let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let plugins = require('./routes/PluginControler');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

const uri = 'mongodb+srv://ons:mdp@cluster0.okglpv3.mongodb.net/WAM?retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB WAM dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez avec http://localhost:8010/api/plugins pour afficher les pluggins, http://localhost:8010/api/buildDB pour les mettre dans la base sinon")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// Pour les fichiers statiques (html, css, etc.)
app.use(express.static('plugins')); // permet d'accéder aux fichiers statiques dans le dossier plugins
// Avec la règle ci-dessous on peut redéfinir la page d’accueil
app.get('/', (req, res) => { // Page d’accueil
  res.sendFile(__dirname + "/plugins/index.html");
});


// les routes
const prefix = '/api';


app.route(prefix + '/plugins')
  .get(plugins.getPlugins)
  .post(plugins.postPlugin)
  .put(plugins.updatePlugin);

app.route(prefix + '/buildDB')
  .get(plugins.putPluginsInDB);

////////// User 
global.__root   = __dirname + '/'; 
var UserController = require(__root + 'routes/UserController');
app.use('/api/routes', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);
///////////// end

app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);




module.exports = app;

