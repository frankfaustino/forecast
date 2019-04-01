const axios = require('axios')

const baseUrl = `${process.env.SANDBOX_CLOVER_URI}/v3/merchants`

const merchant = async (parent, args, { req: { session } }, info) => {
  if (session) {
    const { access_token, code, merchant_id } = session

    // Get devices provisioned for merchant
    const url = `${baseUrl}/${merchant_id}/devices?access_token=${access_token}`
    const response = await axios.get(url).catch(err => console.error('🐛', err.message))
    console.log('✨' + JSON.stringify(response.data.elements))
    return {
      id: merchant_id,
      authCode: code,
      accessToken: access_token,
      devices: response.data.elements
    }
  }
  return null
}

module.exports = { merchant }
