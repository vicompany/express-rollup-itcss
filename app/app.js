
const path = require('path');

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const session = require('express-session');

const helloWorld = require('./components/hello-world/hello-world.router');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../static')));
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(session({
	saveUninitialized: false,
	secret: '5dX0kCk9x2E',
	resave: false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', helloWorld);

app.use((req, res) => {
	res.status(404);

	res.render('error', {
		title: '404: Page not found',
		error: 'The page you are trying to reach cannot be found.',
	});
});

// MUST have 4 parameters: error, req, res, next. Otherwise this handler won't fire. (https://tinyurl.com/ybhd8q7e)
app.use((error, req, res, next) => {
	res.status(500);

	res.render('error', {
		title: '500: Internal Server Error',
		error,
	});
});

module.exports = app;
