const fauna = require('faunadb')
const q = fauna.query

const client = new fauna.Client({ secret: process.env.FAUNA_SECRET })

module.exports.create = async (event) => {
  const { password, ...data } = JSON.parse(event.body)
  return client
    .query(
      q.If(
        q.Exists(q.Match(q.Index('customer_by_email'), data.email)),
        q.Abort('Email occupied'),
        q.Create(q.Collection('customers'), { credentials: { password }, data })
      )
    )
    .then((body) => ({
      statusCode: 200,
      body: JSON.stringify(body),
    }))
    .catch((error) => ({
      statusCode: error.requestResult.statusCode,
      body: error.requestResult.responseRaw,
    }))
}
