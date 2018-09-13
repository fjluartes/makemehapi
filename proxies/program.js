// makemehapi (6/13): proxies
'use strict';

const Hapi = require('hapi');
const H2o2 = require('h2o2');

const server = new Hapi.server({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

const init = async () => {
  await server.register({
    plugin: H2o2
  });

  server.route({
    method: 'GET',
    path: '/proxy',
    handler: {
      proxy: {
        host: '127.0.0.1',
        port: 65535
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
