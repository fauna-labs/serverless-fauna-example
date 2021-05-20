const fauna = require('faunadb')
const q = fauna.query

module.exports.submit = async (event) => {
  const { products } = JSON.parse(event.body)
  return new fauna.Client({ secret: event.headers.secret })
    .query(q.Call(q.Function('submit_order'), [q.CurrentIdentity(), products]))
    .then((body) => ({
      statusCode: 200,
      body: JSON.stringify(body),
    }))
    .catch((error) => ({
      statusCode: error.requestResult.statusCode,
      body: error.requestResult.responseRaw,
    }))
}
