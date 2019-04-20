const axios = require('axios')

const baseUrl = `${process.env.SANDBOX_CLOVER_URI}/v3/merchants`

const merchant = async (parent, args, { req: { session } }, info) => {
  const { access_token, merchant_id } = session
  const url = `${baseUrl}/${merchant_id}/orders?access_token=${access_token}`
  const response = await axios.get(url).catch(err => console.error('🐛', err.message))

  if (response && response.data) {
    console.log('☀️', response)
    return response.data
  }
  return null
}

module.exports = { merchant }
