// makemehapi (1/13): hello_hapi
'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, h) {
    return 'Hello hapi';
  }
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
