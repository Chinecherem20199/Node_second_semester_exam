# Blog App
####This is an API for creating blogs

###Requirements
1. User should be able to register
2. User should be able to login with Passport using JWT
3. Anybody can get all the blogs and also a single blog
4. Users should be able to create blog
5. Users should be able to update and delete blog
6. only published blog can view by users
7. only users can update from draft to publish state

##URL to Blog API
https://wicked-sneakers-slug.cyclic.app

##Models
###User

|  field     |   data_type   |  constraints        |
|:-----------|:---------|:----------|
|email |string|required, unique
|firstname|string|required
|lastname|string|required
|password|string

###Blog
|field       | data_type     |constrainsts|
|:-----------|:--------------|:-----------|
|title  |string |required, unique
|body|string|required
|description|string
|tags|[string]

####Signup User
- Route: /signup
- method: post
- body:
{
  
  "email": "Chinblog@gmail.com",
  "password": "123456",
  "firstname": "Chichi",
  "lastname": "Tina"
  
}
- Responses
200
{
    "message": "Sign Up Succesfully.",
    "user": {
        "email": "Chinblog@gmail.com",
        "firstname": "Chichi",
        "lastname": "Tina",
        "password": "$2b$10$Tk5CnSYoAufaNM0Jslx3G.70bTkUz.TbDTMxqxSoreFVVzEKQCOvC",
        "created_at": "2022-11-08T10:06:20.797Z",
        "blogs": [],
        "_id": "636a2a1da2d9ee2b9c031629",
        "__v": 0
    }
}

####Login User
- Route: /login
- method: post
- body:
{

  "email": "livell3@gmail.com",
 "password": "123456"
}
- Responses
200
{
    "token": "eyJhbGciOiJIUzI1NiIsIn"
}
####Create Blog
- Route: /blogs
- Method: POST
- Header  - Authorization: Bearer {token}
- Body:
{

"title": "Blog Post for testing fundamental ",
"body": "I want to assign registerdate when I create a user via facebook in my nodejs website.",
"description": "Testing blog post for fundamental users"
"author": "Chinecherem",
"tags": ["blog", "testing"]

}
- Responses
{
  "message": "Blog created Successfully",
  "newBlog": {
    "title": "Node.js tuturial from beginers to advances ",
    "body": "I want to assign registerdate when I create a user via facebook in my nodejs website.",
    "author": {
      "created_at": "2022-11-08T10:37:16.783Z",
      "_id": "63639224163e523a917866df",
      "email": "livell3@gmail.com",
      "firstname": "Juliet",
      "lastname": "John",
      "password": "$2b$10$Wkq9Vgd8sUgKvlwu73jzMu1ikNmCOBgnAfhbksReCeazg6Wl20.22",
      "timestamps": "2022-11-03T10:04:20.659Z",
      "blog": [],
      "__v": 0
    },
    "description": "Testing blog post for fundamental users",
    "tags": [
      "blog",
      "testing"
    ],
    "read_time": "1"
  }
}
####Get All Blogs
Anybody can get all blogs 
- Route: /blogs
- Method: GET
- Responses
200

#### Get Blog By ID
Anybody can get single blog
- Route: /blogs/:id
- Method: GET
- Responses
200

#### Edit Blog By ID
- Route: /blogs/:id
- Method: PUT
- Header  - Authorization: Bearer {token}
- Body:
- Responses
200

#### Delete Blog By ID
- Route: /blogs/:id
- Method: PUT
- Header  - Authorization: Bearer {token}
- Body:
- Responses
{
  "message": "Deleted Succesfully",
  "blog": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
