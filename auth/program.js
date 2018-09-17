// makemehapi (13/13): auth
'use strict';

const Hapi = require('hapi');
const Auth = require('hapi-auth-basic');

const users = {
  hapi: {
    name: 'hapi',
    password: 'auth'
  }
}

const server = new Hapi.server({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

const validate = async (request, username, password, h) => {
  let user = users[username];
  let isValid = false;
  let credentials = {}
  if (username == user.name && password == user.password) {
    isValid = true;
    credentials = { username: user.name }
  } else {
    isValid = false;
    credentials = null;
  }
  return { isValid: isValid, credentials: credentials };
}

const handler = function(request, h) {
  return 'welcome';
}

const init = async () => {
  await server.register(Auth);
  server.auth.strategy('simple', 'basic', { validate });
  server.auth.default('simple');
  
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
