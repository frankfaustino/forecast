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
      req.session.access_token = data.access_token
      req.session.save()
      console.log('🥳', data)
      console.log('🥳', req.query)
      console.log('🥳', req.session)
      console.log('🥳', req.sessionID)
      console.log('🥳', req.headers)

      res.redirect(`${CLIENT_URI}/auth_success`)
    }
  } catch (err) {
    console.error('😭️', err)
    res.send(err)
  }
}

const authenticate = async (req, res) => {
  const url = `${CLOVER_URI}/oauth/authorize?client_id=${APP_ID}`
  req.query.code ? await requestAPIToken(req, res) : await res.redirect(url)
}

module.exports = authenticate
