import { makePermalinkWithString } from '../libs/string-utilities'
import constants from '../../shared/constants'
const apiUrl = process.env.API_URL

export const renderBundles = (req, pageTitle, bundleKey) => {
  let flash
  if (req.query.message) {
    switch (req.query.message) {
      case 'login':
        flash = {
          type: 'danger',
          message: 'Invalid username or password'
        }
        break
      default:
        break
    }
  }
  return {
    title: `${constants.PRODUCT_NAME} – ${pageTitle}`,
    flash: flash,
    permalink: makePermalinkWithString(pageTitle),
    css: req.app.locals.bundles[bundleKey].css,
    js: req.app.locals.bundles[bundleKey].js,
    apiUrl: apiUrl
  }
}

/**
 * Normalize a port into a number, string, or false.
 */
export const normalizePort = (val) => {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    throw new Error('PORT env var must be a number')
  }
  if (port >= 0) {
    // port number
    return port
  }
  return false
}
