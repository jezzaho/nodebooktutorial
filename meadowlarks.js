var express = require('express');
const { getFortune } = require('./lib/fortunes');

var fortune = require('./lib/fortunes.js');

var app = express();

app.set('port', process.env.PORT || 3000);;
// set up handlebars view engine
var handlebars = require('express3-handlebars')
 .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'));

// add route to /about
app.use('/about', (req, res) => {
    res.render('about', { fortune: fortune.getFortune() });
})
// add route to / 
app.use('/', (req,res) => {
    res.render('home')
});


//custom 404 page 
app.use((req, res, next) => {
   res.status(404);
   res.render('404');
});

// custom 500 page 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl+C to terminate.');
});
