import express, { json, urlencoded } from 'express'
import { createServer } from 'http'
import createError from 'http-errors'
import { join } from 'path'
import logger from 'morgan'

// Custom libraries
import { normalizePort } from './libs/express-utilities'

// Routes
import indexRouter from './routes/index'
import billingRouter from './routes/billing'
import registrationRouter from './routes/registration'

const app = express()
const port = normalizePort(process.env.PORT || '3000')
const devMode = process.env.NODE_ENV !== 'production'

// Set up the routes
app.use('/', indexRouter)
app.use('/registration', registrationRouter)
app.use('/billing', billingRouter)

// If we're in development mode, load the development Webpack config
// and use the Webpack Express Middleware to run webpack when the server
// starts.
if (devMode) {
  const webpackConfig = require('../../config/webpack.dev')
  const webpack = require('webpack')
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')

  // Enable the Webpack middleware, with Webpack options
  // const compiler = webpack(webpackConfig)
  const compiler = webpack(webpackConfig)

  // Get the files and dependent chunks for each bundle
  compiler.hooks.done.tap('BundleBuilderPlugin', (stats) => {
    // Best way to find file extension of a string
    // https://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
    const fileExtReg = /(?:\.([^.]+))?$/
    const webpackStats = stats.toJson('normal').chunks
    const bundles = {}
    webpackStats.forEach((bundle) => {
      const files = bundle.files.map(file => file)
      bundles[`${bundle.id}`] = {
        css: files.filter(file => fileExtReg.exec(file)[1] === 'css'),
        js: files.filter(file => fileExtReg.exec(file)[1] === 'js')
      }
    })
    app.locals.bundles = bundles
  })

  // Use webpack middleware
  app.use(webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    mode: 'development'
  }))

  // Enable Webpack hot reloading with Express
  app.use(webpackHotMiddleware(compiler))

} else {

  // Using the WebpackAssetsManifest plugin output in production, store the
  // dynamic bundle names (hashed) in  JSON file for use in the Express views
  // Format it like dev bundle object
  const fileNameReg = /([^\/]+)(?=\.\w+$)/
  const manifest = require('./public/manifest.json')
  const bundleKeys = Object.keys(manifest)
  const bundles = {}
  bundleKeys.forEach((key) => {
    const bundleKey = key.match(fileNameReg)[0]
    bundles[bundleKey] = { css: [], js: [] }
    const css = manifest[`${bundleKey}.css`]
    const js = manifest[`${bundleKey}.js`]
    css && bundles[bundleKey].css.push(css)
    js && bundles[bundleKey].js.push(js)
  })

  app.locals.bundles = bundles

}

// Set public directory for static assets
// NOTE – This has to be after sassMiddleware for sass compilation to work
app.use(express.static(join(__dirname, './public')))

// Set up Express
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.set('port', port)
app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))

// Server Events
const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  console.info(`Listening on ${bind}`)
}

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
    console.error(bind + ' requires elevated privileges')
    process.exit(1)
    break
    case 'EADDRINUSE':
    console.error(bind + ' is already in use')
    process.exit(1)
    break
    default:
    throw error
  }
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// Finally, create the web server
const server = createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

export default app
