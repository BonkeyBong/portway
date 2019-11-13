module.exports = () => {
  const port = parseInt(process.env.API_PORT, 10)
  if (isNaN(port) || port < 0) {
    throw new Error(`API_PORT: must be a number greater than 0, port set to ${process.env.API_PORT}`)
  }

  const token = process.env.JWT_SECRET
  if (!token.length) {
    throw new Error(
      `JWT_SECRET: must be specified and non-zero length, set to ${process.env.JWT_SECRET}`
    )
  }
  if (token.length < 10) {
    throw new Error(`JWT_SECRET: length must be greater than 9, set to ${process.env.JWT_SECRET}`)
  }

  const cdnHostname = process.env.CDN_HOSTNAME
  if (cdnHostname) {
    if (typeof cdnHostname !== 'string') {
      throw new Error(`CDN_HOSTNAME: must be a string, set to ${cdnHostname}`)
    }
  }
}
