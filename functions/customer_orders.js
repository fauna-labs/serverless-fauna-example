const fauna = require('faunadb')
const q = fauna.query

module.exports.list = async (event) => {
  return new fauna.Client({ secret: event.headers.secret })
    .query(
      q.Map(
        q.Paginate(
          q.Match(q.Index(process.env.orders_by_customer), q.CurrentIdentity())
        ),
        (ref) => q.Get(ref)
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
