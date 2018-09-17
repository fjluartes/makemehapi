// makemehapi (3/13): handling
'use strict';

const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.server({
  host: 'localhost',
  port: Number(process.argv[2] || 8080),
  routes: {
    files: {
      relativeTo: __dirname
    }
  }
});

const init = async () => {
  await server.register(Inert);

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: 'index.html'
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
})

init();
