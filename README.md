
# Game Store 

![logo](https://user-images.githubusercontent.com/101065815/236390987-974e9f9e-597c-4887-815c-6af0849bef45.png)

The Game Store is an E-Commerce platform to buy latest game titles online.


## Features

- Cross platform
- Responsive
- Authorization
- Authentication
- Pagination
- Search
- Paypal Integration
- Admin Features

## Screenshots

![Home](https://github.com/zeeshani26/game-store/assets/101065815/1bacfc82-b518-40c8-8c99-53edda9f2036)
![Signin](https://github.com/zeeshani26/game-store/assets/101065815/b527365d-49b6-41a0-b3a7-bb819e873872)
![Single Product](https://github.com/zeeshani26/game-store/assets/101065815/7b38ebb4-6d02-42ab-abc2-e537fef36a05)
![Cart](https://github.com/zeeshani26/game-store/assets/101065815/b6efa730-dcd9-4565-affe-68972c4bf25e)
![Admin Section](https://github.com/zeeshani26/game-store/assets/101065815/37d5b522-c6dd-4a6d-af40-a460afa1a952)

## Tech Stack

**Framework:** Create-React-App

**Client:** React, Bootstrap, Redux Library

**Server:** Node, Express

**Database:** MongoDB


## Run Locally

Clone the project

```bash
  git clone https://github.com/zeeshani26/game-store
```
Get to the server directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```
Start the server

```bash
  npm start
```

Get to the client side directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```
Start the client side

```bash
  npm start
```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`port`

`MongoUrl`

`JWT_KEY`

`PAYPAL_CLIENT_ID`

## API Reference

#### User Route

- POST "/login"
- Description: Authenticates user and returns a JWT token.
- Returns:
  - _id (string): User's ID in the database
  - name (string): User's name
  - email (string): User's email address
  - isAdmin (boolean): Indicates whether the user has admin privileges
  - token (string): JWT token

- POST "/"
- Description: Registers a new user and returns a JWT token.
- Returns:
  - _id (string): User's ID in the database
  - name (string): User's name
  - email (string): User's email address
  - isAdmin (boolean): Indicates whether the user has admin privileges
  - token (string): JWT token

- GET "/profile"
- Description: Returns the logged-in user's profile.
- Returns:
  - _id (string): User's ID in the database
  - name (string): User's name
  - email (string): User's email address
  - isAdmin (boolean): Indicates whether the user has admin privileges

- PUT "/profile"
- Description: Updates the logged-in user's profile.
- Returns:
  - _id (string): User's ID in the database
  - name (string): User's name
  - email (string): User's email address
  - isAdmin (boolean): Indicates whether the user has admin privileges
  - token (string): JWT token

- GET "/"
- Description: Returns all users in the database (admin only).
- Returns: 
  - Array of user objects, each containing:
    - _id (string): User's ID in the database
    - name (string): User's name
    - email (string): User's email address
    - isAdmin (boolean): Indicates whether the user has admin privileges

- GET "/:id"
- Description: Returns a user by ID (admin only).
- Returns: 
  - User object containing:
    - _id (string): User's ID in the database
    - name (string): User's name
    - email (string): User's email address
    - isAdmin (boolean): Indicates whether the user has admin privileges

- DELETE "/:id"
- Description: Deletes a user by ID (admin only).
- Returns:
  - message (string): Indicates whether the user was successfully removed

- PUT "/:id"
- Description: Updates a user by ID (admin only).
- Returns:
  - _id (string): User's ID in the database
  - name (string): User's name
  - email (string):

#### Orders Route

- POST "/orders"
- Description: Create a new order.
- Returns:
  - createdOrder: The newly created order.

- GET "/orders/myorders"
- Description: Get all orders for the currently logged in user.
- Returns:
  - orders: An array of all orders for the currently logged in user.
  
- GET "/orders/:id"
- Description: Get an order by its ID.
- Returns:
  - order: The order with the specified ID.

- PUT "/orders/:id/pay"
- Description: Update an order to indicate that it has been paid.
- Returns:
  - updatedOrder: The updated order.

- GET "/orders"
- Description: Get all orders (admin only).
- Returns:
  - orders: An array of all orders.

- PUT /orders/:id/delivered
- Description: Update an order to indicate that it has been delivered (admin only).
- Returns:
  - updatedOrder: The updated order.

#### Product Route

- GET "/products" 
- Description: Get all products
- Returns:
  - products: An array of products.
  - page: The page number that was returned.
  - TotalPages: The total number of pages for the given search.

- GET "/products/top"
- Description: Get the top-rated products (4 products with the highest rating)
- Returns:
  - An array of products.

- GET "/products/:id" 
- Description: Get a single product by ID
- Returns:
  - product: The product with the specified ID.
  
- DELETE "/products/:id"
- Description: Delete a product by ID (admin only)
- Returns:
  - message: A message indicating the deletion was successful.
  
- POST "/products" 
- Description: Create a new product (admin only)
- Returns:
  - The created product.
  
- PATCH "/products/:id"
- Description: Update an existing product (admin only)
- Returns:
  - The updated product.

- POST "/products/:id/reviews"
- Description:  Add a review to a product (authenticated users only)
- Returns:
  - message: A message indicating the review was added.
  
## Demo

https://the-game-store.vercel.app/
