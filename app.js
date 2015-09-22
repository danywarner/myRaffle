var express = require('express'); 
var routes = require('./routes'); 
var path = require('path');

var mongoose = require('mongoose'); 
var passport = require('passport'); 
//var config = require('./config');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var session = require('express-session');
var errorhandler = require('errorhandler')

require('./models/user');
require('./passport')(passport);

mongoose.connect(process.env.MONGOLAB_URI, function(err, res) {
  if(err) throw err;
  console.log('Conectado con éxito a la BD');
});

var app = express();

app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));

// Middlewares de Express que nos permiten enrutar y poder
// realizar peticiones HTTP (GET, POST, PUT, DELETE)
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

// Ruta de los archivos estáticos (HTML estáticos, JS, CSS,...)
app.use(express.static(path.join(__dirname, 'public')));
// Indicamos que use sesiones, para almacenar el objeto usuario
// y que lo recuerde aunque abandonemos la página
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
// Configuración de Passport. Lo inicializamos
// y le indicamos que Passport maneje la Sesión
app.use(passport.initialize());
app.use(passport.session());

// Si estoy en local, le indicamos que maneje los errores
// y nos muestre un log más detallado
if ('development' == app.get('env')) {
   app.use(errorhandler());
}

app.get('/', routes.index);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', failureRedirect: '/login' }
));

app.listen(app.get('port'), function(){
  console.log('Aplicación Express escuchando en el puerto ' + app.get('port'));
});
