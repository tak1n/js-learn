const restify = require('restify');

let server = restify.createServer({
    name: 'MyApp',
});

// Naming Routes
// server.get('/foo/:id', (req, res, next) => {
//     next('foo2');
// });
// 
// server.get(
//     {
//         name: 'foo2',
//         path: '/foo/:id',
//     }, (req, res, next) => {
//         res.send(200);
//         next();
//     }
// )

// Hypermedia on the Response
server.get({
    name: 'country-cities',
    path: '/country/:id/cities'
}, (req, res, next) => {
    res.send('cities');
})

server.get('/country/:id', (req, res, next) => {
    res.send({
        name: 'Uruguay',
        cities: server.router.render('country-cities', { id: 'uruguay' })
    })
})

// Versioning Routes

const respV1 = (req, res, next) => {
    res.send('This is version 1.0.2');
}

const respV2 = (req, res, next) => {
    res.send('This is version 2.1.3');
}

const path = '/my/route'
server.get({ path: path, version: '1.0.2' }, respV1)
server.get({ path: path, version: '2.1.3' }, respV2)

server.listen(3000)