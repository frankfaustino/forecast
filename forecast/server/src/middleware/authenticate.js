const axios = require('axios')

const { APP_ID, APP_SECRET, CLIENT_URI, CLOVER_URI } = process.env

/**
 * Sends authorization code, along with client ID and client secret
 * in exchange for an API token to make subsequent REST API calls.
 * @param {object} req — Express request object
 * @param {object} res — Express response object
 * @returns {void}
 */
const requestAPIToken = async (req, res) => {
  try {
    const url = `${CLOVER_URI}/oauth/token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${
      req.query.code
    }`

    if (req.session && req.query) {
      // Save response from Clover OAuth to session
      Object.assign(req.session, req.query)
    }

    const { data } = await axios.get(url)

    if (data) {
      console.log('🥳', data)
      console.log('🥳', req.query)
      console.log('🥳', req.session)
      console.log('🥳', req.sessionID)
      console.log('🥳', req.headers)
      req.session.access_token = data.access_token
      req.session.save()

      res.redirect(`${CLIENT_URI}/auth_success`)
    }
  } catch (err) {
    console.error('😭️', err)
    res.send(err)
  }
}

/**
 * Initially, the client is redirected to Clover's OAuth process.
 * Upon successful login, the client receives an authorization code via
 * req.query, which is passed onto requestAPIToken.
 * @param {object} req — Express request object
 * @param {object} res — Express response object
 * @returns {void}
 */
const authenticate = async (req, res) => {
  const url = `${CLOVER_URI}/oauth/authorize?client_id=${APP_ID}`
  req.query.code ? await requestAPIToken(req, res) : await res.redirect(url)
}

module.exports = authenticate
