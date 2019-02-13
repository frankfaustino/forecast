const axios = require('axios')

const baseUrl = `${process.env.CLOVER_URI}/v3/merchants`

const merchant = (parent, args, { req: { session } }, info) => {
  if (session) {
    const { access_token, code, merchant_id } = session
    return {
      id: merchant_id,
      authCode: code,
      accessToken: access_token
    }
  }
  return null
}

const inventory = async (parent, args, { req: { session } }, info) => {
  const { access_token, merchant_id } = session
  const url = `${baseUrl}/${merchant_id}/items?access_token=${access_token}`
  const response = await axios.get(url).catch(err => console.error('🐛', err.message))

  if (response && response.data) {
    return response.data
  }
  return null
}

module.exports = {
  Query: {
    merchant,
    inventory
  }
}
