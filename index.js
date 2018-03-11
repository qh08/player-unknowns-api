var express = require('express');
var app = express();

var dao = require('./src/dao/index');

app.get('/', async function (req, res) {
  const results = await dao.getBattles({
    userId: '5a0c61397732d50001497349'
  }, 'sea', 'tpp', 2);
  res.json(results);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});