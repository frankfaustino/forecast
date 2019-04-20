const axios = require('axios')

const baseUrl = `${process.env.SANDBOX_CLOVER_URI}/v3/merchants`

const order = async (parent, args, { req: { session } }, info) => {
  const { access_token, merchant_id } = session
  const url = `${baseUrl}/${merchant_id}/orders?access_token=${access_token}&expand=lineItems`
  const response = await axios.get(url).catch(err => console.error('🐛', err.message))

  if (response && response.data) {
    return response.data
  }
  return null
}

module.exports = { order }
