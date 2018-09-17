// makemehapi (5/13): views
'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Vision = require('vision');
const Handlebars = require('handlebars');

const server = new Hapi.server({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

const init = async () => {
  await server.register(Vision);

  server.views({
    engines: {
      html: Handlebars
    },
    path: Path.join(__dirname, 'templates')
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      view: 'index.html'
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
