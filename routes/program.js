// makemehapi (2/13): routes
'use strict';

const Hapi = require('hapi');
const server = new Hapi.server({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function(request, h) {
    return `Hello ${request.params.name}`;
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
