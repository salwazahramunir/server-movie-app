# API Documentation
    

## Endpoints :

List of avaiable endpoints:

* POST /users/register
* POST /users/login
* POST  /movies
* GET /movies
* GET /movies/:id
* DELETE /movies/:id
* POST /users/login-google
* GET /users/show-profile
* PUT /movies/:id
* PATCH /movies/:id
* GET /genres
* GET /histories
* POST /pub/register
* POST /pub/login
* POST /pub/login-google
* GET /pub/movies
* GET /pub/movies/:movieId
* GET /pub/favorites
* POST /pub/favorite/:movieId
* GET /pub/qrcode
  
## 1. POST /users/register
Description

* Register for user admin to database

Request :

* Body

    ```
    {
        "email": "string",
        "password": "string",
    }
    ```

Response :

* Respon 201 - (Created)

    ```
    {
        "message": "Success created user",
        "id": number,
        "email": "string"
    }
    ```

* Respon 400 - (Bad Request)

    ```
    {
        "message": [
            <error>
            <error>
            <error>
        ]
    }
    ```

## 2. POST /users/login 
Description

* Login for user admin to database

Request :

* Body

    ```
    {
        "email": "string",
        "password": "string",
    }
    ```

Response :

* Respon 200 - (OK)

    ```
    {
        "message": "Success Login!",
        "access_token": "string"
    }
    ```

* Respon 401 - (Unauthorized)

    ```
    {
        "message": "error invalid username or email or password"
    }
    ```

## 3. POST / movies

Description

* Create movie to database

Request :

* Headers
  
    ```
    {
        "access_token": "string"
    }
    ```

* Body

    ```
    {
        "title": "string",
        "synopsis": "string",
        "trailerUrl": "string",
        "imgUrl": "string",
        "rating": number,
        "genreId: number,
        "authorId": number
    }
    ```

Response :

* Respon 201 - (Created)
    
    ```
    {
        "message": "Success created movie",
        "movie": <movie>
    }
    ```

* Respon 400 - (Bad Request)

    ```
    {
        "message": [
            <error>
            <error>
            <error>
        ]
    }
    ```

## 4. GET /movies

Description

* List all movie from database

Request :

* Headers
  
    ```
    {
        "access_token": "string"
    }
    ```
    
Response :

* Respon 200 - (OK)
    
    ```
    {
        "message": "Success read movies",
        "movies": [
            <movie>
            <movie>
            <movie>
        ]
    }
    ```

## 5. GET /movies/:id

Description

* Show movie by id from database

Request : 

  * Headers
  
    ```
    {
        "access_token": "string"
    }
    ```
  * Params : id

Response :

* Respon 200 - (OK)

    ```
    {
        "movie": <movie>
    }
    ```    


## 6. DELETE /movies/:id

Description

* Delete movie by id from database

Request :

* Headers
  
    ```
    {
        "access_token": "string"
    }
    ```

* Params : id

Response :

* Respon 200 - (OK)
    
    ```
    {
        "message": `<movie.title> success to delete`,
        "movie": <movie>
    }
    ```

## 7. POST /users/login-google

Description

* Login or register for user staff to database

Request :

* Headers
  
    ```
    {
        "access_token": "string"
    }
    ```

Response :

* Respon 200 - (OK)
    
    ```
    {
        "message": "Success Login!",
        "access_token": "string"
    }
    ```

## 8. POST /users/show-profile

Description

* Retrieve logged in user data

Request :

* Headers
  
    ```
    {
        "access_token": "string"
    }
    ```

Response :

* Respon 200 - (OK)
    
    ```
    {
        "message": "Success show user",
        "user": <user>
    }
    ```

## 9. PUT /movies/:id

Description

* Used to update movie data

Request :

* Headers
  
    ```
    {
        "access_token": "string"
    }
    ```
* Params : id
  
* Body

    ```
    {
        "title": "string",
        "synopsis": "string",
        "trailerUrl": "string",
        "imgUrl": "string",
        "rating": number,
        "genreId: number,
    }
    ```

Response :

* Respon 200 - (OK)
    
    ```
    {
        "message": "Success updated movie: <movie.title>"
    }
    ```

## 10. PATCH /movies/:id

Description

* Used to update movie status

Request :

* Headers
  
    ```
    {
        "access_token": "string"
    }
    ```
* Params : id
  
* Body

    ```
    {
        "status": "string"
    }
    ```

Response :

* Respon 200 - (OK)
    
    ```
    {
        "message": "Success updated status movie: <movie.title>"
    }
    ```

## 11. GET /genres

Description

* List all genre from database

Request :

* Headers
  
    ```
    {
        "access_token": "string"
    }
    ```
    
Response :

* Respon 200 - (OK)
    
    ```
    {
        "message": "Success read genres",
        "genres": [
            <genre>
            <genre>
            <genre>
        ]
    }
    ```

## 12. GET /histories
Description

* List all history from database

Request :

* Headers
  
    ```
    {
        "access_token": "string"
    }
    ```
    
Response :

* Respon 200 - (OK)
    
    ```
    {
        "message": "Success read histories",
        "histories": [
            <history>
            <history>
            <history>
        ]
    }
    ```

## 13. POST /pub/register
Description

* Register for user customer to database

Request :

* Body

    ```
    {
        "email": "string",
        "password": "string",
    }
    ```

Response :

* Respon 201 - (Created)

    ```
    {
        "message": "Success created user",
        "id": number,
        "email": "string"
    }
    ```

* Respon 400 - (Bad Request)

    ```
    {
        "message": [
            <error>
            <error>
            <error>
        ]
    }
    ```

## 14. POST /pub/login
Description

* Login for user customer to database

Request :

* Body

    ```
    {
        "email": "string",
        "password": "string",
    }
    ```

Response :

* Respon 200 - (OK)

    ```
    {
        "message": "Success Login!",
        "access_token": "string"
    }
    ```

* Respon 401 - (Unauthorized)

    ```
    {
        "message": "error invalid username or email or password"
    }
    ```

## 15. POST /pub/login-google
Description

* Login or register for user customer staff to database

Request :

* Headers
  
    ```
    {
        "access_token": "string"
    }
    ```

Response :

* Respon 200 - (OK)
    
    ```
    {
        "message": "Success Login!",
        "access_token": "string"
    }
    ```

## 16. GET /pub/movies
Description

* List all movie from database

Request :

* Query
  
  * page
  * size
  * title 
    
Response :

* Respon 200 - (OK)
    
    ```
    {
        "message": "Success read movies",
        "data": "object"
    }
    ```

## 17. GET /pub/movies/:movieId
Description

* Retrieve movie details by id from database

Request :

* Params : movieId
    
Response :

* Respon 200 - (OK)
    
    ```
    {
        "message": "Success show movie",
        "movie": "object"
    }
    ```

## 18. GET /pub/favorites
Description

* List all favorite by user logged from database

Request :

* Headers
  
    ```
    {
        "access_token": "string"
    }
    ```
Response :

* Respon 200 - (OK)
    
    ```
    {
        "message": "Success read your favorite movie",
        "favorites": "object"
    }
    ```

## 19. POST /pub/favorite/:movieId
Description

* Add favorite by user logged to database

Request :

* Headers
  
    ```
    {
        "access_token": "string"
    }
    ```
* Params: movieId


Response :

* Respon 200 - (OK)
    
    ```
    {
        "message": "Successfully added movie to favorites",
        "favorite": "object"
    }
    ```

## 20. GET /pub/qrcode
Description

* Make qr code for movie detail page

Request :

* Headers
  
    ```
    {
        "apikey": "string"
    }
    ```

* Params: text

Response :

* Respon 200 - (OK)
    
    ```
    {
        "data": "object"
    }
    ```

# Global Error

* Respon 500 - (Internal Server Error)

    ```
    {
        "message": "Internal server error"
    }
    ```

* Respon 404 - (NOT FOUND)
    ```
    {
        "message": "Data not found"
    }
    ```   

* Respon 403 - (FORBIDDEN)
    ```
    {
        "message": "Sorry you don't have permission"
    }
    ```   