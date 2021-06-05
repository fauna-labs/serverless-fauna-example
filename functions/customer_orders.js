// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

const { query: q } = require('faunadb')
const { client } = require('../db/client')

module.exports.list = (event) => {
  return client
    .query(
      q.Map(
        q.Paginate(
          q.Match(q.Index(process.env.orders_by_customer), q.CurrentIdentity())
        ),
        (ref) => q.Get(ref)
      ),
      { secret: event.headers.secret }
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
