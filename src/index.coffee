#!/usr/bin/env node
debug = require('debug')('te')
app = require('./app')

app.set('port', process.env.PORT || 1234)

server = app.listen(app.get('port'), () ->
  debug('Express server listening on port ' + server.address().port)
)
