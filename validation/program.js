// makemehapi (9/13): validation
'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

const server = new Hapi.server({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

const myHandler = function(request, h) {
  return h.response(`${request.params.breed}`);
}

const init = async () => {
  server.route({
    method: 'GET',
    path: '/chickens/{breed?}',
    handler: myHandler,
    config: {
      validate: {
        params: {
          breed: Joi.string().required()
        }
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
