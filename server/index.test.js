const frisby = require('frisby');

it ('GET should return a status of 200 OK', function () {
    return frisby
      .get('http://localhost:3000/api/contact/CENTRO')
      .expect('status', 200);
  });
