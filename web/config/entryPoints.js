const middlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&name='
const globals = ['./src/client/js/globals.js']

const exportedEntrypoints = {
  index: ['./src/client/css/index.scss'].concat(globals),
  billing: ['./src/client/js/billing.js', './src/client/css/billing.scss'].concat(globals),
  app: ['./src/client/js/app.js', './src/client/css/app.scss'].concat(globals)
}

if (process.env.NODE_ENV === 'development') {
  const entryPoints = Object.keys(exportedEntrypoints)
  entryPoints.forEach((entryPoint) => {
    console.info(`Add middleware to ${entryPoint}`)
    exportedEntrypoints[entryPoint].push(`${middlewareScript}${entryPoint}.css`) // .css is a hack
  })
}

module.exports = exportedEntrypoints
