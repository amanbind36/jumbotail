#E-Commerce Shipping Charge Estimator
**Description**:The Jumbotail Backend API provides essential functionalities for managing users, products, and warehouses in a logistics-focused application. It includes RBAC middleware for secure role-based access and supports efficient database operations

## Features
- **User Authentication**: Login and register users.
- **Product Management**: Add, view, update, and delete products.
- **Warehouse Integration**: Find nearest warehouses and calculate shipping charges.

- ## Prerequisites
  - Node.js (v14+)
  - MongoDB (running locally or in the cloud)
  - Postman (for testing API endpoints)

- - ## Installation
  - git clone https://github.com/amanbind36/jumbotail
  - cd jumbotail-backend
  - npm install
  - Configure environment variables
  - Start the server:(npm run dev)

- ## File Structure
- ```plaintext
  jumbotail
 ├── Backend  
 │   ├── Controller            # Contains controllers for handling business logic  
 │   │   ├── productController.js  
 │   │   ├── userController.js  
 │   │   └── warehouseController.js   
 │   ├── DB                    # Database connection setup  
 │   │   └── Connection.js  
 │   ├── Middleware            # Contains RBAC middleware  
 │   │   └── rbac.middleware.js  
 │   ├── Model                 # MongoDB models for collections  
 │   │   ├── product.model.js  
 │   │   ├── user.model.js  
 │   │   └── warehouse.model.js  
 │   ├── Route                 # API route definitions  
 │   │   ├── product.Route.js  
 │   │   ├── user.Route.js  
 │   │   └── warehouse.Route.js  
 ├── node_modules  
 ├── .env                    # Environment variables  
 ├── package-lock.json       # Dependency lock file  
 ├── package.json            # Project metadata and dependencies  
 ├── server.js               # Main application entry point  



 

- ## Endpoints
 - /api/users
 - POST /register: Register a new user.
 - POST /login: Login a user and generate a token.
 - GET /profile: Get user profile (requires authentication).
   
-Product API
 - POST /: Add a new product
 - GET /: Retrieve all products
 - DELETE /:productId: Delete a product by ID.
 - PATCH /:productId: Update a product by ID.
 - 
-Warehouse API
 - GET /nearest
 - GET /shipping-charge

- ## Endpoints
 - RBAC Middleware: Restricts access to certain routes based on user roles. Ensure that roles are correctly defined in the user model.
