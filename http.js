const http = require('http');

// express uses http https://github.com/expressjs/express/blob/master/lib/application.js#L616
// this is different to ruby or python which have a middle layer or specification to plug and play different application servers together with applications made by various frameworks:
// https://medium.com/analytics-vidhya/what-is-wsgi-web-server-gateway-interface-ed2d290449e
// http://blog.gauravchande.com/what-is-rack-in-ruby-rails
http.createServer(function (req, res) {
  res.write('Hello World!');
  res.end();
}).listen(8080);