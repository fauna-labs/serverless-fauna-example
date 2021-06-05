// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

const fauna = require('faunadb')
const { Ref, Collection } = fauna.query

module.exports = [
  {
    ref: Ref(Collection('products'), '201'),
    ts: 1621412361760000,
    data: {
      name: 'cups',
      description: 'Translucent 9 Oz, 100 ct',
      price: 6.98,
      quantity: 100,
      store: Ref(Collection('stores'), '302'),
      backorderLimit: 5,
      backordered: false,
    },
  },
  {
    ref: Ref(Collection('products'), '202'),
    ts: 1621412361760000,
    data: {
      name: 'pinata',
      description: 'Original Classic Donkey Pinata',
      price: 24.99,
      quantity: 20,
      store: Ref(Collection('stores'), '302'),
      backorderLimit: 10,
      backordered: false,
    },
  },
  {
    ref: Ref(Collection('products'), '203'),
    ts: 1621412361760000,
    data: {
      name: 'pizza',
      description: 'Frozen Cheese',
      price: 4.99,
      quantity: 100,
      store: Ref(Collection('stores'), '303'),
      backorderLimit: 15,
      backordered: false,
    },
  },
  {
    ref: Ref(Collection('products'), '204'),
    ts: 1621412361760000,
    data: {
      name: 'avocados',
      description: 'Conventional Hass, 4ct bag',
      price: 3.99,
      quantity: 1000,
      store: Ref(Collection('stores'), '301'),
      backorderLimit: 15,
      backordered: false,
    },
  },
  {
    ref: Ref(Collection('products'), '205'),
    ts: 1621412361760000,
    data: {
      name: 'limes',
      description: 'Conventional, 1 ct',
      price: 0.35,
      quantity: 1000,
      store: Ref(Collection('stores'), '301'),
      backorderLimit: 15,
      backordered: false,
    },
  },
  {
    ref: Ref(Collection('products'), '206'),
    ts: 1621412361760000,
    data: {
      name: 'limes',
      description: 'Organic, 16 oz bag',
      price: 3.49,
      quantity: 50,
      store: Ref(Collection('stores'), '302'),
      backorderLimit: 15,
      backordered: false,
    },
  },
  {
    ref: Ref(Collection('products'), '207'),
    ts: 1621412361760000,
    data: {
      name: 'limes',
      description: 'Conventional, 16 oz bag',
      price: 2.99,
      quantity: 30,
      store: Ref(Collection('stores'), '303'),
      backorderLimit: 15,
      backordered: false,
    },
  },
  {
    ref: Ref(Collection('products'), '208'),
    ts: 1621412361760000,
    data: {
      name: 'cilantro',
      description: 'Organic, 1 bunch',
      price: 1.49,
      quantity: 100,
      store: Ref(Collection('stores'), '301'),
      backorderLimit: 15,
      backordered: false,
    },
  },
  {
    ref: Ref(Collection('products'), '209'),
    ts: 1621412361760000,
    data: {
      name: 'pinata',
      description: 'Giant Taco Pinata',
      price: 23.99,
      quantity: 10,
      store: Ref(Collection('stores'), '302'),
      backorderLimit: 10,
      backordered: false,
    },
  },
]
