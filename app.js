'use strict';

const Hapi = require('hapi');
const fs = require('fs');
const imagesFS = './public/images';
let imgFileList;



//init server
const server = Hapi.server({
    port: 8000,
    host: 'localhost'
});

//Start server
const init = async() => {

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

    const routes = fs.readdirSync(imagesFS).map((img) => {
        return {
            method: 'GET',
            path: `/image/${img.split('.')[0]}`,
            handler: (request, h) => h.file(`./public/images/${img}`)
        }
    });

    server.route(routes);

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