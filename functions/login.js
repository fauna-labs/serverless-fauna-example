const fauna = require('faunadb')
const q = fauna.query

const client = new fauna.Client({ secret: process.env.FAUNA_SECRET })

module.exports.login = async (event) => {
  const { email, password } = JSON.parse(event.body)
  return client
    .query(q.Login(q.Match(q.Index('customer_by_email'), email), { password }))
    .then((body) => ({
      statusCode: 200,
      body: JSON.stringify(body),
    }))
    .catch((error) => ({
      statusCode: error.requestResult.statusCode,
      body: error.requestResult.responseRaw,
    }))
}
