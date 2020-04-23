const path = require('path');

const hbs = require('hbs');
const express = require('express');

const forecast = require('./utils/forcast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = './templates/views';
const partialsPath = './templates/partials';

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ayman Rouly'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        textMessage: 'I love my babe Amale Kbida <3',
        name: 'Ayman'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Help message',
        title: 'Help',
        name: 'Ayman Rouly'
    })
});

app.get('/weather', (req, res) => {

    const address = req.query.address;

    if (!address) {
        return res.status(400).send({
            error: 'The address is required'
        });
    };

    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.status(400).send({
                error
            });
        }

        forecast(latitude, longitude, (error ,forecast) => {

            if (error) {
                return res.status(400).send({
                    error
                });
            }

            res.send({
                forecast,
                location,
                address
            });
        });
    });
});
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.status(400).send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        name: 'Ayman Rouly',
        errorMessage: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        name: 'Ayman Rouly',
        errorMessage: 'Page not found'
    })
});

app.listen(port, () => console.log('Server listning on port ' + port));