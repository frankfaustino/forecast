const resolvers = {
  Query: {
    merchant: (parent, args, { req: { session } }, info) => {
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
  }
}

module.exports = resolvers
