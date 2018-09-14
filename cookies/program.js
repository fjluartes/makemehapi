// makemehapi (12/13): cookies
'use strict';

const Hapi = require('hapi');
const Boom = require('boom');

const server = new Hapi.server({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

const setCookie = function(request, h) {
    return h.response({
        message: 'success'
    }).state('session', { key: 'makemehapi' });
}

const checkCookie = function(request, h) {
    let session = request.state.session;
    let result = '';
    if (session) {
        result = { user: 'hapi' };
    } else {
        result = Boom.unauthorized('Missing authentication');
    }
    return result;
}

const init = async () => {
    server.state('session', {
        ttl: 10,
        path: '/',
        domain: 'localhost',
        encoding: 'base64json',
        isSameSite: false,
        isSecure: false,
        isHttpOnly: false
    });
    
    server.route([{
        method: 'GET',
        path: '/set-cookie',
        handler: setCookie,
        options: {
            state: {
                parse: true,
                failAction: 'log'
            }
        }
    }, {
        method: 'GET',
        path: '/check-cookie',
        handler: checkCookie
    }]);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
