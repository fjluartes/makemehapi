// makemehapi (11/13): uploads
'use strict';

const Hapi = require('hapi');

const server = new Hapi.server({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

const myHandler = function(request, h) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.payload.file.on('data', (data) => {
      body += data;
    });
    
    request.payload.file.on('end', () => {
      let result = {
        description: request.payload.description,
        file: {
          data: body, 
          filename: request.payload.file.hapi.filename,
          headers: request.payload.file.hapi.headers
        }
      };
      return resolve(JSON.stringify(result));
    });

    request.payload.file.on('error', (err) => {
      return reject(err);
    });
  });
}

const init = async () => {
  server.route({
    method: 'POST',
    path: '/upload',
    handler: myHandler,
    options: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
      }
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
