const fauna = require('faunadb')
const { Ref, Collection, Time } = fauna.query

module.exports = [
  {
    ref: Ref(Collection('orders'), '299005128666513927'),
    data: {
      customer: Ref(Collection('customers'), '103'),
      cart: [
        {
          product: Ref(Collection('products'), '201'),
          quantity: 25,
          price: 6.98,
        },
        {
          product: Ref(Collection('products'), '203'),
          quantity: 10,
          price: 4.99,
        },
      ],
      status: 'processing',
      creationDate: Time('2021-05-19T08:19:21.303607Z'),
      deliveryAddress: {
        street: '5 Troy Trail',
        city: 'Washington',
        state: 'DC',
        zipCode: '20220',
      },
      creditCard: {
        network: 'Visa',
        number: '4532636730015542',
      },
    },
  },
  {
    ref: Ref(Collection('orders'), '299005128666514951'),
    data: {
      customer: Ref(Collection('customers'), '102'),
      cart: [
        {
          product: Ref(Collection('products'), '203'),
          quantity: 15,
          price: 4.99,
        },
        {
          product: Ref(Collection('products'), '202'),
          quantity: 45,
          price: 24.99,
        },
      ],
      status: 'processing',
      creationDate: Time('2021-05-19T08:19:21.303607Z'),
      deliveryAddress: {
        street: '72 Waxwing Terrace',
        city: 'Washington',
        state: 'DC',
        zipCode: '20002',
      },
      creditCard: {
        network: 'Visa',
        number: '4916112310613672',
      },
    },
  },
  {
    ref: Ref(Collection('orders'), '299005128666515975'),
    data: {
      customer: Ref(Collection('customers'), '101'),
      cart: [
        {
          product: Ref(Collection('products'), '204'),
          quantity: 10,
          price: 3.99,
        },
        {
          product: Ref(Collection('products'), '206'),
          quantity: 5,
          price: 3.49,
        },
        {
          product: Ref(Collection('products'), '208'),
          quantity: 20,
          price: 1.49,
        },
      ],
      status: 'processing',
      creationDate: Time('2021-05-19T08:19:21.303607Z'),
      deliveryAddress: {
        street: '87856 Mendota Court',
        city: 'Washington',
        state: 'DC',
        zipCode: '20220',
      },
      creditCard: {
        network: 'Visa',
        number: '4556781272473393',
      },
    },
  },
]
