'use strict'

const app = new(require('koa'))
const router = new(require('impress-router'))
const routing = require('impress-router-table')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const favicon = require('koa-favicon')
const logger = require('koa-logger')
const serve = require('koa-static')

/**
 * middlewares
 */

// cache
app.use(conditional())
app.use(etag())

// favicon
// app.use(favicon(__dirname + '/public/favicon.ico'))

// router
// static
app.use(router)
router.use('/public', serve(__dirname + '/public', {
  maxage: 365 * 86400 * 1000
}))

// log
if (app.env !== 'test') app.use(logger())

// routing
app.use(routing(__dirname + '/api'))

app.listen(5000, function() {
  console.log('server listening at http://localhost:%s', this.address().port)
})