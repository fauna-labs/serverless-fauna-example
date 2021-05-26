const { query: q } = require('faunadb')
const { client } = require('../db/client')

module.exports.create = async (event) => {
  const { password, ...data } = JSON.parse(event.body)

  return client
    .query(
      q.If(
        q.Exists(q.Match(q.Index(process.env.customer_by_email), data.email)),
        q.Abort('Email occupied'),
        q.Create(q.Collection(process.env.customers), {
          credentials: { password },
          data,
        })
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
