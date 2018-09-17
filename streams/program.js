// makemehapi (8/13): streams
'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Fs = require('fs');
const Rot13 = require('rot13-transform');

const server = new Hapi.server({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

const handler = function(request, h) {
  let path = Path.join(__dirname, 'input.txt');
  let stream = Fs.createReadStream(path);
  return stream.pipe(Rot13());
}

const init = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: handler
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
