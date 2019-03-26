'use strict';

const Hapi = require('hapi');

//init server
const server = Hapi.server({
    port: 8000,
    host: 'localhost'
});

//Start server
const init = async () => {

    //handling static
    await server.register(require('inert'));

    // static page
    server.route({
        method: 'GET',
        path: '/hello',
        handler: (request, h) => {

            return h.file('./public/hello.html');
        }
    });

    // static page content
    server.route({
        method: 'GET',
        path: '/images/1',
        handler: (request, h) => {

            return h.file('./public/images/1.png');
        }
    });

    server.route({
        method: 'GET',
        path: '/images/dance',
        handler: (request, h) => {

            return h.file('./public/images/dance.gif');
        }
    });

    await server.start();
    console.log(`Hapi server hosed at : ${server.info.uri}`);
}

// home route
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return '<h1>Hello world!</h1>';
    }
});

// dynamic route
server.route({
    method: 'GET',
    path: '/user/{name}',
    handler: (request, h) => {
        return `<h1>Hello, ${encodeURIComponent(request.params.name)} </h1>`;
    }
});


// error handling
process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();