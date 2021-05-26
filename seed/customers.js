const fauna = require('faunadb')
const { Ref, Collection } = fauna.query

module.exports = [
  {
    ref: Ref(Collection('customers'), '101'),
    data: {
      email: 'alice.appleseed@unknown.com',
      firstName: 'Alice',
      lastName: 'Appleseed',
      address: {
        street: '87856 Mendota Court',
        city: 'Washington',
        state: 'DC',
        zipCode: '20220',
      },
      telephone: '208-346-0715',
      creditCard: {
        network: 'Visa',
        number: '4556781272473393',
      },
    },
  },
  {
    ref: Ref(Collection('customers'), '102'),
    data: {
      email: 'bob.brown@unknown.com',
      firstName: 'Bob',
      lastName: 'Brown',
      address: {
        street: '72 Waxwing Terrace',
        city: 'Washington',
        state: 'DC',
        zipCode: '20002',
      },
      telephone: '719-872-8799',
      creditCard: {
        network: 'Visa',
        number: '4916112310613672',
      },
    },
  },
  {
    ref: Ref(Collection('customers'), '103'),
    data: {
      email: 'carol.clark@unknown.com',
      firstName: 'Carol',
      lastName: 'Clark',
      address: {
        street: '5 Troy Trail',
        city: 'Washington',
        state: 'DC',
        zipCode: '20220',
      },
      telephone: '907-949-4470',
      creditCard: {
        network: 'Visa',
        number: '4532636730015542',
      },
    },
  },
]
