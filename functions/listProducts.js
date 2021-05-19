const fauna = require('faunadb')
const q = fauna.query

const client = new fauna.Client({ secret: process.env.FAUNA_SECRET })

const MatchByStore = (storeId) =>
  q.Match(q.Index('products_by_store'), q.Ref(q.Collection('stores'), storeId))

const MatchByCustomer = (customerId) =>
  q.Match(
    q.Index('products_by_customer'),
    q.Ref(q.Collection('customers'), customerId)
  )

const GetMatch = ({ storeId, customerId }) => {
  const conditions = [
    storeId && MatchByStore(storeId),
    customerId && MatchByCustomer(customerId),
  ].filter((c) => c)

  switch (conditions.length) {
    case 0:
      return q.Match(q.Index('all_products'))
    case 1:
      return conditions[0]
    default:
      return q.Intersection(conditions)
  }
}

const SortByPrice = (order) =>
  q.Index(
    order === 'low-to-high'
      ? 'products_by_price_low_to_high'
      : 'products_by_price_high_to_low'
  )

module.exports.list = async ({ queryStringParameters = {} }) => {
  const { storeId, customerId, priceSort } = queryStringParameters

  const Match = GetMatch({ storeId, customerId })
  const MatchAndSort = priceSort ? q.Join(Match, SortByPrice(priceSort)) : Match
  const MapLambda = priceSort ? (_, ref) => q.Get(ref) : (ref) => q.Get(ref)

  return client.query(q.Map(q.Paginate(MatchAndSort), MapLambda))
}
