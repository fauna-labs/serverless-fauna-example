This repository contains unofficial patterns, sample code, or tools to help developers build more effectively with [Fauna][fauna]. All [Fauna Labs][fauna-labs] repositories are provided “as-is” and without support. By using this repository or its contents, you agree that this repository may never be officially supported and moved to the [Fauna organization][fauna-organization].

---

# Fauna Serverless Framework plugin usage example

[Serverless quick start][serverless-quick-start]
[Serverless Fauna plugin][serverless-fauna-plugin]
[Fauna get started][fauna-get-started]

## Structure of this repository

- `fql` - [Fauna Query Language (FQL)][fql] queries used in [serverless.yml](serverless.yml).
- `functions` - AWS Lambda functions for accessing your database.
- `jsonSchemas` - Used to specify the request shape for Amazon API Gateway.
- `seed` - A Lambda function to populate your database with demo data.

## Setup

- Create an empty database in the [Fauna dashboard][fauna-dashboard].
- Create an Admin key for your new database and copy the generated secret.
- Copy `.env.sample` to `.env` and paste the generated secret as the `FAUNA_SECRET` value.
- Run `npm install` to install dependencies.
- Run `serverless fauna deploy` to create the Fauna collections, indexes, roles, and functions in your database.
- Run  `serverless invoke local --function seed` to seed your database with demo data.

## Deploy to Amazon Web Services (AWS)

```
serverless deploy
```

After you deploy, you have the following database schema populated with the demo data from the [seed](seed) directory.
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

The Serverless Framework also creates an Amazon API Gateway REST API and Lambda functions and connects them together.

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
serverless invoke local \
  --function register \
  --data '{"body": "{\"email\":\"test@fauna.com\",\"password\":\"111111\",\"address\":{\"street\":\"72 Waxwing Terrace\",\"city\":\"Washington\",\"state\":\"DC\",\"zipCode\":\"20002\"},\"creditCard\":{\"network\":\"Visa\",\"number\":\"4916112310613672\"}}"}'
```

### Exchange customer credentials for an application secret

```
serverless invoke local \
  --function login \
  --data '{"body": "{\"email\":\"test@fauna.com\",\"password\":\"111111\"}"}'
```

Copy the `secret/id` values to use as replacements for the `CUSTOMER_SECRET/CUSTOMER_ID` placeholders in the following requests.

### Return a list of all products

#### All products

```
serverless invoke local \
  --function list_products \
  --data '{"headers": {"secret": "CUSTOMER_SECRET"}}'
```

#### All products, sorted by price (low to high)

```
serverless invoke local \
  --function list_products \
  --data '{"queryStringParameters": {"priceSort": "low-to-high"}, "headers": {"secret": "CUSTOMER_SECRET"}}'
```

#### Products available in a specified store

```
serverless invoke local \
  --function list_products \
  --data '{"queryStringParameters": {"storeId": "303"}, "headers": {"secret": "CUSTOMER_SECRET"}}'
```

### Submit one customer order

```
serverless invoke local \
  --function submit_order \
  --data '{"headers": {"secret": "CUSTOMER_SECRET"},"body": "{\"products\":[{\"productId\":\"209\",\"quantity\":1}]}"}'
```

### List all customer orders  

```
serverless invoke local \
  --function customer_orders \
  --data '{"headers": {"secret": "CUSTOMER_SECRET"}}'
```

---

Copyright Fauna, Inc. or its affiliates. All rights reserved. SPDX-License-Identifier: MIT-0

[fauna]: https://www.fauna.com/
[fauna-dashboard]: https://dashboard.fauna.com/
[fauna-get-started]: https://docs.fauna.com/fauna/current/start/
[fauna-labs]: https://github.com/fauna-labs
[fauna-organization]: https://github.com/fauna
[fql]: https://docs.fauna.com/fauna/current/api/fql/
[serverless-fauna-plugin]: https://github.com/fauna/serverless-fauna/
[serverless-quick-start]: https://www.serverless.com/framework/docs/providers/aws/guide/quick-start/