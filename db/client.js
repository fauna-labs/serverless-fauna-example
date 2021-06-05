// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

const { Client } = require('faunadb')

module.exports.client = new Client({
  secret: process.env.FAUNA_SECRET,
  domain: process.env.FAUNA_DOMAIN,
  scheme: process.env.FAUNA_SCHEME,
  port: process.env.FAUNA_PORT,
})
