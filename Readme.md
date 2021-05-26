This repository contains unofficial patterns, sample code, or tools to help developers build more effectively with [Fauna][fauna]. All [Fauna Labs][fauna-labs] repositories are provided “as-is” and without support. By using this repository or its contents, you agree that this repository may never be officially supported and moved to the [Fauna organization][fauna-organization].

---

# Fauna Serverless Framework plugin usage example

[Serverless quick start](https://www.serverless.com/framework/docs/providers/aws/guide/quick-start/)
[Serverless Fauna plugin](https://github.com/fauna/serverless-fauna/)
[Fauna get started](https://docs.fauna.com/fauna/current/start/)

## Structure
- `fql` - *.fql queries that uses at the serverless.yml configuration
- `functions` - AWS Lambda's
- `jsonSchemas` - uses to specify request shape for AWS Gateway at serverless.yml
- `seed` - demo data

## Before start
- run `npm install` (TODO: Add "serverless-fauna" package in package.json once it's published)
- copy `.env.sample` file as `.env` and fill up required `FAUNA_SECRET` variable
- run `sls fauna deploy` to deploy only Fauna resources
- run  `sls invoke local -f seed` to seed demo data

## Deploy to cloud
```
sls deploy
```

After deploy you will have following database schema plus demo data specified at the seed directory
```
[
  {
    data: [
      Collection("customers"),
      Collection("orders"),
      Collection("products"),
      Collection("stores")
    ]
  },
  {
    data: [
      Index("products_by_customer"),
      Index("all_orders"),
      Index("all_customers"),
      Index("all_stores"),
      Index("all_products"),
      Index("products_by_store"),
      Index("products_by_price_high_to_low"),
      Index("products_by_price_low_to_high"),
      Index("customer_by_email"),
      Index("orders_by_customer")
    ]
  },
  {
    data: [Role("customer")]
  },
  {
    data: [Ref(Ref("functions"), "submit_order")]
  }
]

```

In additional to that, serverless will create AWS API Gateway endpoints and Lambda's and link them together

| Endpoint              | Function        | Description                             |
| --------------------- | --------------- | --------------------------------------- |
| GET /products         | list_products   | Return list of all products             |
| POST /customers       | register        | Customer registration                   |
| POST /customers/login | login           | Exchange customer credentials to secret |
| POST /orders          | submit_order    | Customer purchase product(s)            |
| GET /orders           | customer_orders | Return list of customer orders          |


## Invoke functions locally

### Customer registration

```
sls invoke local -f register --data '{"body": "{\"email\":\"test@fauna.com\",\"password\":\"111111\",\"address\":{\"street\":\"72 Waxwing Terrace\",\"city\":\"Washington\",\"state\":\"DC\",\"zipCode\":\"20002\"},\"creditCard\":{\"network\":\"Visa\",\"number\":\"4916112310613672\"}}"}'
```

### Exchange customer credentials to secret

```
sls invoke local -f login --data '{"body": "{\"email\":\"test@fauna.com\",\"password\":\"111111\"}"}'
```

Use the `secret/id` values as replacements for `CUSTOMER_SECRET/CUSTOMER_ID` placeholders in the next requests.

### Return list of all products

#### All products

```
sls invoke local -f list_products --data '{"headers": {"secret": "CUSTOMER_SECRET"}}'
```

#### Sort by price

```
sls invoke local -f list_products --data '{"queryStringParameters": {"priceSort": "low-to-high"}, "headers": {"secret": "CUSTOMER_SECRET"}}'
```

#### Match by store

```
sls invoke local -f list_products --data '{"queryStringParameters": {"storeId": "303"}, "headers": {"secret": "CUSTOMER_SECRET"}}'
```

#### Match by store + customer and sort by price

```
sls invoke local -f list_products --data '{"queryStringParameters": {"storeId": "303", "customerId": "CUSTOMER_ID","priceSort": "low-to-high"}, "headers": {"secret": "CUSTOMER_SECRET"}}'
```

### Customer purchase product(s)

```
sls invoke local -f submit_order --data '{"headers": {"secret": "CUSTOMER_SECRET"},"body": "{\"products\":[{\"productId\":\"209\",\"quantity\":1}]}"}'
```

### Return list of customer orders  

```
sls invoke local -f customer_orders --data '{"headers": {"secret": "CUSTOMER_SECRET"}}'
```

---

Copyright Fauna, Inc. or its affiliates. All rights reserved. SPDX-License-Identifier: MIT-0

[fauna]: https://www.fauna.com/
[fauna-labs]: https://github.com/fauna-labs
[fauna-organization]: https://github.com/fauna
