const fauna = require('faunadb')
const { Ref, Collection } = fauna.query

module.exports = [
  {
    ref: Ref(Collection('stores'), '301'),
    ts: 1621412361760000,
    data: {
      name: 'DC Fruits',
      address: {
        street: '13 Pierstorff Drive',
        city: 'Washington',
        state: 'DC',
        zipCode: '20220',
      },
    },
  },
  {
    ref: Ref(Collection('stores'), '302'),
    ts: 1621412361760000,
    data: {
      name: 'Party Supplies',
      address: {
        street: '7529 Capitalsaurus Court',
        city: 'Washington',
        state: 'DC',
        zipCode: '20002',
      },
    },
  },
  {
    ref: Ref(Collection('stores'), '303'),
    ts: 1621412361760000,
    data: {
      name: 'Foggy Bottom Market',
      address: {
        street: '4 Florida Ave',
        city: 'Washington',
        state: 'DC',
        zipCode: '20037',
      },
    },
  },
]
