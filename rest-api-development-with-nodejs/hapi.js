'use strict'
const Hapi=require('@hapi/hapi');

const server = Hapi.server({
    host: 'localhost',
    port: 8000
})

const adminServer = Hapi.server({
    host: 'localhost',
    port: 8001
})

const getUsers = (request, reply) => { return 'All Users' };
const getUser  = (request, reply) => {
    return `User name: ${request.params.name}, lastname: ${request.params.lastname}`
}

adminServer.route({
    method: 'GET',
    path: '/users',
    handler: getUsers
})

adminServer.route({
    method: 'GET',
    path: '/users/{name}/{lastname?}',
    handler: getUser
})

async function start() {
    try {
        await server.start();
        await adminServer.start();
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Servers running at:', server.info.uri, 'and', adminServer.info.uri);
}
start()