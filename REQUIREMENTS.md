# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products**
- Index : localhost:3000/product [GET]
- Show  : localhost:3000/product/:id(product id) [GET](this route will request desired (product_id as number) from url parameters)
- Create [token required] : localhost:3000/product [POST](this route will request product (name, price) from body)
- [OPTIONAL] Top 5 most popular products : sorry didn't have much time for it
- [OPTIONAL] Products by category (args: product category) : sorry didn't have much time for it

#### Users
- Index [token required] : localhost:3000/user [GET]
- Show [token required] : localhost:3000/user/:id(user id) [GET](this route will request (user_id as number) from url parameters)
- Create N[token required] : localhost:3000/user [POST](this route will request user (firstname, lastname, password) from the body)

#### Orders
- Current Order by user (args: user id)[token required] : localhost:3000/order/:order_id/user/:user_id [GET]
- Create [token required] : localhost:3000/order/user/:id [POST](this route will request (user_id as number) from parameters and (status) from body)
- index [token required] : localhost:3000/order [GET]
- add product to current order [token required] : /order/:id/product [POST](this route will request (order_id) from parameter and (product_id) from body and (quantity) from body)
- order confirmation [token required] : localhost:3000/order/user/:id [PUT](this route will request (user_id) from parameters and (order_id) from body)
- [OPTIONAL] Completed Orders by user (args: user id)[token required] : sorry didn't have much time for it

## Data Shapes
i made a erm image clear the database schema and data shape
#### Product
-  id (SERIAL PRIMARY KEY)
- name (VARCHAR(150) NOT NULL)
- price (INT NOT NULL)

#### User
- id  (SERIAL PRIMARY KEY)
- firstName (VARCHAR(60) NOT NULL)
- lastName (VARCHAR(60) NOT NULL)
- password (VARCHAR NOT NULL)

#### Orders
- id (SERIAL PRIMARY KEY)
- user_id (INT REFERENCES users(id))
- status of order (active or complete) (VARCHAR(50) NOT NULL)
  
#### order_product 
- id (SERIAL PRIMARY KEY)
- id of each product in the order (INT REFERENCES products(id))
- quantity of each product in the order (INT NOT NULL)
- order_id for current product (INT REFERENCES orders(id))

## order per product per user data shape (all columns are joit of other tables)
- order_id (order_product table)
- product_id (order_product table)
- quantity ((order_product table))
- user_id (orders table)
- status (orders table)