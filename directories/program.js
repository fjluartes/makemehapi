// makemehapi (4/13): directories
'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');

const server = new Hapi.server({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

const init = async () => {
  await server.register(Inert);

  server.route({
    method: 'GET',
    path: '/foo/bar/baz/{param}',
    handler: {
      directory: {
        path: Path.join(__dirname, 'public')
      }
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
