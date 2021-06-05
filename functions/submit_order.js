// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

const { query: q } = require('faunadb')
const { client } = require('../db/client')

module.exports.submit = async (event) => {
  const { products } = JSON.parse(event.body)

  return client
    .query(q.Call(process.env.submit_order, [q.CurrentIdentity(), products]), {
      secret: event.headers.secret,
    })
    .then((body) => ({
      statusCode: 200,
      body: JSON.stringify(body),
    }))
    .catch((error) => ({
      statusCode: error.requestResult.statusCode,
      body: error.requestResult.responseRaw,
    }))
}
