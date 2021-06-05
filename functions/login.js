// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

const { query: q } = require('faunadb')
const { client } = require('../db/client')

module.exports.login = async (event) => {
  const { email, password } = JSON.parse(event.body)

  return client
    .query(
      q.Login(q.Match(q.Index(process.env.customer_by_email), email), {
        password,
      })
    )
    .then(({ secret, instance }) => ({
      statusCode: 200,
      body: JSON.stringify({
        secret,
        id: instance.id,
      }),
    }))
    .catch((error) => ({
      statusCode: error.requestResult.statusCode,
      body: error.requestResult.responseRaw,
    }))
}
