const { query: q } = require('faunadb')
const { client } = require('../db/client')

const customers = require('../seed/customers')
const orders = require('../seed/orders')
const products = require('../seed/products')
const stores = require('../seed/stores')

module.exports.seed = async () => {
  try {
    await client.query(
      q.Map([...customers, ...orders, ...products, ...stores], (doc) =>
        q.Create(q.Select(['ref'], doc), { data: q.Select(['data'], doc) })
      )
    )

    return { msg: 'success' }
  } catch (error) {
    return { error }
  }
}
