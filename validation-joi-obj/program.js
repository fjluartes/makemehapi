// makemehapi (10/13): validation joi object
'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

const server = new Hapi.server({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

const myHandler = function(request, h) {
  return 'login successful';
}

const init = async () => {
  server.route({
    method: 'POST',
    path: '/login',
    handler: myHandler,
    options: {
      validate: {
        payload: Joi.object({
          isGuest: Joi.boolean().required(),
          username: Joi.string().when('isGuest', {
            is: false, then: Joi.required()
          }),
          password: Joi.string().alphanum(),
          accessToken: Joi.string().alphanum()
        }).options({allowUnknown: true})
          .without('password', 'accessToken')
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
