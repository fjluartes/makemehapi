// makemehapi (11/13): uploads
'use strict';

const Hapi = require('hapi');

const server = new Hapi.server({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

const myHandler = function(request, h) {
    return 'Hello hapi';
}

const init = async () => {
    server.route({
        method: 'GET',
        path: '/',
        handler: myHandler
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();