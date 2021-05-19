const fauna = require('faunadb')
const q = fauna.query

const customers = require('../seed/customers')
const orders = require('../seed/orders')
const products = require('../seed/products')
const stores = require('../seed/stores')

const client = new fauna.Client({ secret: process.env.FAUNA_SECRET })

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
