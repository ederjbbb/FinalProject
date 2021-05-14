# [Yummy](https://yummy.fyi) - API Documentation
This documentation shows all backend endpoints, at this foulder you can also find a postman collection that can be imported to test it.  
Notice that environment variables are used by postman, so for example when you do a login or user create request the token is automatically saved and will be send on the next request that requires it, more about it [here](https://learning.postman.com/docs/postman/variables-and-environments/variables/). 

## Summary
* [Auth](##Votes)
* [Users](##Users)
* [Orders](##Orders)
* [Restaurants](##Restaurants)
* [Meals](##Meals)

## Auth
### Login
Log in an existing user to the application.  

* *POST*>preview
    `/api/v1/auth/login`
    * `body`:
        ```javascript
        {
            "email": "example@gmail.com",
            "password": "qwe123",
        }
        ```
    * `response`:
        ```javascript
        {
            "token": "new_user_token", // only for POST
            "renew": "new_renew_token", // only for POST
            "user": {
              "id": 1,
              "email": "example@gmail.com",
              "phone": "+35390828272",
              "firstName": "Jose",
              "lastName": "Moreira",
              "role": "customer"
              "updatedAt":"2020-05-24T16:13:28.076Z",
              "createdAt":"2020-05-24T16:13:28.076Z"
            }
        }
        ```  
### Logout
Log out an logged user from the application.  
The number one in the result represents the number of tokens that logged out, for this endpoint should be always one.

* *POST*
    `/api/v1/auth/logout`
    * `body`:
        ```javascript
        {
        }
        ```
    * `response`:
        ```javascript
        {
          "result": [
              1
          ]
        }
        ```  
### Logout all
Log out all tokens from the current user, making any session in other computers invalid.  
The number returned is the number of tokens invalidted.

* *POST*
    `/api/v1/auth/logoutAll`
    * `body`:
        ```javascript
        {
        }
        ```
    * `response`:
        ```javascript
        {
          "result": [
              3
          ]
        }
        ```  

### Renew
Renews the user session returning a new token.  

* *POST*
    `/api/v1/auth/renew`
    * `body`:
        ```javascript
        {
            "renew": "renew_token"
        }
        ```
    * `response`:
        ```javascript
        {
            "token": "new_user_token", 
            "renew": "new_renew_token",
            "user": {
              "id": 1,
              "email": "example@gmail.com",
              "phone": "+35390828272",
              "firstName": "Jose",
              "lastName": "Moreira",
              "role": "customer"
              "updatedAt":"2020-05-24T16:13:28.076Z",
              "createdAt":"2020-05-24T16:13:28.076Z"
            }
        }
        ```  
### Send SMS
Sends a sms to specific number with a random code.  

* *POST*
    `/api/v1/auth/sendSMS`
    * `body`:
        ```javascript
        {
            "phone": "phone_number"
        }
        ```
    * `response`:
        ```javascript
        {
          "result": "Ok"
        }
        ```

### Validate SMS
Validates if the random code sent to the phone number is the same as the received on this request. 

* *POST*
    `/api/v1/auth/sendSMS`
    * `body`:
        ```javascript
        {
            "phone": "phone_number",
            "code": "38389"
        }
        ```
    * `response`:
        ```javascript
        {
          "result": "Ok"
        }
        ```  

## Users
### Me (get by token)
Retrieves the user that is logged at the moment based on the header token.

* *GET*
    `/api/v1/users/me`
    * `headers`:
        * Content-Type: application/json
    * `response`:
        ```javascript
        {
          "id": 1,
          "email": "example@gmail.com",
          "phone": "+35390828272",
          "firstName": "Jose",
          "lastName": "Moreira",
          "role": "customer"
          "updatedAt":"2020-05-24T16:13:28.076Z",
          "createdAt":"2020-05-24T16:13:28.076Z"
        }
        ```

### Add/Update users
Creates or udpate an user.   
The `code` sent is the phone validation token documented unders `Auth` `Validate SMS`, if the code send to the phone was not validated the user creation will fail.  
The password is cryptographed before been saved to the database.
The possible values for role are `customer` and `merchant`.  

* *POST/PATCH*
    `/api/v1/users`
    * `body`:
        ```javascript
        {
            "email": "example@gmail.com",
            "phone": "+35390828272",
            "firstName": "Jose",
            "lastName": "Moreira",
            "code": "3230",
            "password": "qwe123",
            "role": "customer"
        }
        ```
    * `response`:
        ```javascript
        {
            "token": "new_user_token", // only for POST
            "renew": "new_renew_token", // only for POST
            "user": {
              "id": 1,
              "email": "example@gmail.com",
              "phone": "+35390828272",
              "firstName": "Jose",
              "lastName": "Moreira",
              "role": "customer"
              "updatedAt":"2020-05-24T16:13:28.076Z",
              "createdAt":"2020-05-24T16:13:28.076Z"
            }
        }
        ```  

### Get user
Retrieves a specific user.
> This endpoint is not used by the app and only `admin` users can access it.
* *GET*
    `/api/v1/users/:id`
    * `headers`:
        * Content-Type: application/json
    * `response`:
        ```javascript
        {
          "id": 1,
          "email": "example@gmail.com",
          "phone": "+35390828272",
          "firstName": "Jose",
          "lastName": "Moreira",
          "role": "customer"
          "updatedAt":"2020-05-24T16:13:28.076Z",
          "createdAt":"2020-05-24T16:13:28.076Z"
        }
        ```

### Get by email
Retrieves the user based on his email, used by the login flow, it returns the user data in case we want to say hello even before he/she log in (like Google does).

* *GET*
    `/api/v1/users/email/:email`
    * `headers`:
        * Content-Type: application/json
    * `response`:
        ```javascript
        {
          "id": 1,
          "email": "example@gmail.com",
          "phone": "+35390828272",
          "firstName": "Jose",
          "lastName": "Moreira",
          "role": "customer"
          "updatedAt":"2020-05-24T16:13:28.076Z",
          "createdAt":"2020-05-24T16:13:28.076Z"
        }
        ```
### List users
Retrives a list of users.  
> This endpoint is not used by the app and only `admin` users can access it.

* *GET*
    `/api/v1/users/email/:email`
    * `headers`:
        * Content-Type: application/json
    * `response`:
        ```javascript
        {
          "id": 1,
          "email": "example@gmail.com",
          "phone": "+35390828272",
          "firstName": "Jose",
          "lastName": "Moreira",
          "role": "customer"
          "updatedAt":"2020-05-24T16:13:28.076Z",
          "createdAt":"2020-05-24T16:13:28.076Z"
        }
        ```
### Block/Unblock users
Block or unblock a specific user.  
Used by merchants to block users so they can't see their restaurants anymore.

* *GET*
    `/api/v1/users/:userID/(block|unblock)`
    * `headers`:
        * Content-Type: application/json
    * `body`:
        ```javascript
          {
            "reason": "why" // only for block
          }
        ```
    * `response`:
        ```javascript
        {
          "status": "Ok"
        }
        ```
### Delete user
Deletes an user.
> This endpoint is not used by the app and only `admin` users can access it.

* *DELETE*
    `/api/v1/restaurants/:id`
    
## Orders
### Create order
Starts an order to a specific restaurant to be delivered to a specific address.  
Note that the delivery fee will be added automatically if the restaurant has one.

* *GET*
    `/api/v1/orders`
    * `headers`:
        * Content-Type: application/json
    * `body`:
        ```javascript
          {
            "restaurantId": 1,
            "address": "193 Capertenstown Road, Tyrrestown"
          }
        ```
    * `response`:
        ```javascript
        {
            "status": "open",
            "id": 1,
            "userId": 1,
            "address": "193 Capertenstown Road, Tyrrestown",
            "restaurantId": 1,
            "delivery": "3.49",
            "total": "3.49",
            "updatedAt": "2020-05-24T09:15:05.988Z",
            "createdAt": "2020-05-24T09:15:05.988Z"
        }
        ```
### Add meals
Updates the items inside the oder, based on the quantity and if the items is already in the order the item will be added, updated or deleted.  
Returns the udpated order.

* *GET*
    `/api/v1/orders/:orderId/meals`
    * `headers`:
        * Content-Type: application/json
    * `body`:
        ```javascript
        {
          "mealId": 1,
          "quantity": 1
        }
        ```
    * `response`:
        ```javascript
        {
            "id": 72,
            "userId": 1,
            "restaurantId": 1,
            "delivery": "3.49",
            "total": "11.89",
            "address": "193 Capertenstown road, Tyrrestown",
            "status": "open",
            "createdAt": "2020-05-24T16:58:20.000Z",
            "updatedAt": "2020-05-24T16:58:23.775Z"
        }
        ```
### Get orders
Retrieves a list of orders.  
If the user is a merchant it will contain orders to the restaurants.  
If the user is a customer it will contain orders made by him/her.  

* *GET*
    `/api/v1/orders/`
    * `headers`:
        * Content-Type: application/json
    * `response`:
        ```javascript
        [
          {
            "id": 72,
            "userId": 1,
            "restaurantId": 1,
            "delivery": "3.49",
            "total": "11.89",
            "address": "193 Capertenstown road, Tyrrestown",
            "status": "open",
            "createdAt": "2020-05-24T16:58:20.000Z",
            "updatedAt": "2020-05-24T16:58:23.000Z",
            "user": {
              "id": 1,
              "firstName": "John",
              "lastName": "Doe",
              "phone": "+3530845434",
              "email": "customer@gmail.com",
              "role": "customer",
              "createdAt": "2020-05-24T13:12:12.000Z",,
              "updatedAt": "2020-05-24T13:12:12.000Z",
            },
            "restaurant": {
              "id": 1,
              "name": "Supermac's",
              "description": "Supermac's ",
              "image": "url_here",
              "delivery": "3.49",
              "tags": "Wings, American",
              "userId": 2,
              "createdAt": "2020-05-24T13:12:12.000Z",,
              "updatedAt": "2020-05-24T13:12:12.000Z",
            },
            "items": [
              {
                "id": 71,
                "orderId": 72,
                "quantity": 1,
                "total": "8.40",
                "mealId": 1,
                "createdAt": "2020-05-24T16:58:23.000Z",
                "updatedAt": "2020-05-24T16:58:23.000Z",
                "meal": {
                  "id": 1,
                  "name": "Wow Hamburger1",
                  "description": "Two thin 100 percent Irish beef.",
                  "restaurantId": 1,
                  "price": "8.40",
                  "image": "url_here",
                  "createdAt": "2020-05-24T13:12:12.000Z",
                  "updatedAt": "2020-05-24T13:12:12.000Z",
                }
              }
            ],
            "history": []
          }
        ]
        ```
### Get order
Retrieves a specific order.  

* *GET*
    `/api/v1/orders/:id`
    * `headers`:
        * Content-Type: application/json
    * `response`:
        ```javascript
        {
          {
            "id": 1,
            "userId": 1,
            "restaurantId": 1,
            "delivery": "3.49",
            "total": "11.89",
            "address": "193 Capertenstown road, Tyrrestown",
            "status": "open",
            "createdAt": "2020-05-24T16:58:20.000Z",
            "updatedAt": "2020-05-24T16:58:23.000Z",
            "user": {
              "id": 1,
              "firstName": "John",
              "lastName": "Doe",
              "phone": "+3530845434",
              "email": "customer@gmail.com",
              "role": "customer",
              "createdAt": "2020-05-24T13:12:12.000Z",,
              "updatedAt": "2020-05-24T13:12:12.000Z",
            },
            "restaurant": {
              "id": 1,
              "name": "Supermac's",
              "description": "Supermac's ",
              "image": "url_here",
              "delivery": "3.49",
              "tags": "Wings, American",
              "userId": 2,
              "createdAt": "2020-05-24T13:12:12.000Z",,
              "updatedAt": "2020-05-24T13:12:12.000Z",
            },
            "items": [
              {
                "id": 1,
                "orderId": 72,
                "quantity": 1,
                "total": "8.40",
                "mealId": 1,
                "createdAt": "2020-05-24T16:58:23.000Z",
                "updatedAt": "2020-05-24T16:58:23.000Z",
                "meal": {
                  "id": 1,
                  "name": "Wow Hamburger1",
                  "description": "Two thin 100 percent Irish beef.",
                  "restaurantId": 1,
                  "price": "8.40",
                  "image": "url_here",
                  "createdAt": "2020-05-24T13:12:12.000Z",
                  "updatedAt": "2020-05-24T13:12:12.000Z",
                }
              }
            ],
            "history": []
          }
        }
        ```

## Restaurants
### List restaurants
Retrieves a list of restaurants.
If the user is a merchant is will return his/her own restaurants otherwise it will return a list of resturants where you can buy meals.

* *GET*
    `/api/v1/restaurants`
    * `headers`:
        * Content-Type: application/json
    * `response`:
        ```javascript
        [
          {
            "id": 1,
            "name": "Supermac's",
            "description": "Supermac's has developed a unique....",
            "image": "image_url",
            "delivery": "3.49",
            "tags": "Wings, American",
            "userId": 2,
            "createdAt": "2020-05-24T13:12:12.000Z",
            "updatedAt": "2020-05-24T13:12:12.000Z",
         }
        ]
        ```
### List restaurants - public
This endpoings returns a list of restaurants without any other validation (like tokens), it's used by the home page and idealy should be cached once it does not change frequently.

* *GET*
    `/api/v1/restaurants`
    * `headers`:
        * Content-Type: application/json
    * `response`:
        ```javascript
        [
          {
            "id": 1,
            "name": "Supermac's",
            "description": "Supermac's has developed a unique....",
            "image": "image_url",
            "delivery": "3.49",
            "tags": "Wings, American",
            "userId": 2,
            "createdAt": "2020-05-24T13:12:12.000Z",
            "updatedAt": "2020-05-24T13:12:12.000Z",
         }
        ]
        ```
### Get restaurant
Retrieves one specific restaurant.

* *GET*
    `/api/v1/restaurants/:id`
    * `headers`:
        * Content-Type: application/json
    * `response`:
        ```javascript
          {
            "id": 1,
            "name": "Supermac's",
            "description": "Supermac's has developed a unique....",
            "image": "image_url",
            "delivery": "3.49",
            "tags": "Wings, American",
            "userId": 2,
            "createdAt": "2020-05-24T13:12:12.000Z",
            "updatedAt": "2020-05-24T13:12:12.000Z",
         }
        ```

### Add/Update restaurants
Creates or udpate a resturant.
Only merchants are able to access this endpoint.

* *POST/PATCH*
    `/api/v1/restaurants`
    * `body`:
        ```javascript
        {
          "name": "Manifesto",
          "description": "Chef-owner Lucio ...",
          "image": "image_url",
          "delivery": 1.99,
          "tags": "Italy, Cousine",
          "userId": 2
        }
        ```
    * `response`:
        ```javascript
        {
          "id": 1,
          "name": "Manifesto",
          "description": "Chef-owner Lucio ...",
          "image": "image_url",
          "delivery": 1.99,
          "tags": "Italy, Cousine",
          "userId": 2
          "updatedAt":"2020-05-24T16:13:28.076Z",
          "createdAt":"2020-05-24T16:13:28.076Z"
        }
        ```  
### Delete restaurant
Deletes a restaurant.

* *DELETE*
    `/api/v1/restaurants/:id`

## Meals
### List meals
Retrieves a list of meals from a specific resturant.

* *GET*
    `/api/v1/restaurants/:restaurantId/meals`
    * `headers`:
        * Content-Type: application/json
    * `response`:
        ```javascript
        [
          {
              "id": 1,
              "name": "Wow Hamburger1",
              "description": "Two thin 100 percent Irish beef...",
              "restaurantId": 1,
              "price": "8.40",
              "image": "image_url",
              "updatedAt":"2020-05-24T16:13:28.076Z",
              "createdAt":"2020-05-24T16:13:28.076Z"
              }
        ]
        ```

### Get meal
Retrieves one specific meal from one specific restaurant.

* *GET*
    `/api/v1/restaurants/:restaurantId/meals/:mealId`
    * `headers`:
        * Content-Type: application/json
    * `response`:
        ```javascript
          {
            "id": 1,
            "name": "Wow Hamburger1",
            "description": "Two thin 100 percent Irish beef...",
            "restaurantId": 1,
            "price": "8.40",
            "image": "image_url",
            "updatedAt":"2020-05-24T16:13:28.076Z",
            "createdAt":"2020-05-24T16:13:28.076Z"
         }
        ```

### Add/Update meals
Creates or udpate a meal.

* *POST/PATCH*
    `/api/v1/restaurants/:restaurantId/meals/:mealId`
    * `body`:
        ```javascript
        {
          "name": "Manifesto",
          "description": "Chef-owner Lucio ...",
          "image": "image_url",
          "delivery": 1.99,
          "tags": "Italy, Cousine"
        }
        ```
    * `response`:
        ```javascript
        {
          "id": 1,
          "name": "Manifesto",
          "description": "Chef-owner Lucio ...",
          "image": "image_url",
          "delivery": 1.99,
          "tags": "Italy, Cousine",
          "userId": 2
          "updatedAt":"2020-05-24T16:13:28.076Z",
          "createdAt":"2020-05-24T16:13:28.076Z"
        }
        ```  

### Delete meal
Deletes a meal.

* *DELETE*
    `/api/v1/restaurants/:restaurantId/meals/:mealId`

--  
> On this version we don't have pagination 