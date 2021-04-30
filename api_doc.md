# Fancy Todo
Fancy Todo is an application to manage your Todo list. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /todo

> Get all todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

### GET /todo:id

> Get todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
{"id": "<todo id>"}

```

_Response (200)_
```
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "UserId": "<todo UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /todo

> Create new todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>"
  }
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "UserId": "<todo UserId>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### GET /todo/suggest

> get suggest from 3rd party API

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```
_Request Query_
```
{
  "type": "<suggest type>"
}
```

_Response (200 - Created)_
```
{
    "activity": "Learn a new programming language",
    "type": "education",
    "participants": 1,
    "price": 0.1,
    "link": "",
    "key": "5881028",
    "accessibility": 0.25
}
```

_Response (500 - Bad Request)_
```
{
  "message": "internal server error"
}
```

### PUT /todo

> Update todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>"
  }
```

_Request Params_
```
  {
    "id": "<todo id>"
  }
```

_Response (200 - Updated)_
```
{
  "id": <todo id>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "UserId": "<todo UserId>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### PATCH /todo

> Update status todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
  {
    "status": "<todo status>"
  }
```

_Request Params_
```
  {
    "id": "<todo id>"
  }
```

_Response (200 - Updated)_
```
{
  "id": <todo id>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "UserId": "<todo UserId>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### DELETE /todo

> Update todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
  {
    "id": "<todo id>"
  }
```

_Response (200 - Updated)_
```
{
  "id": <todo id>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "UserId": "<todo UserId>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### POST /register

> create new user

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
  {
    "email": "<user email>",
    "password": "<user passsword>"
  }
```


_Response (200 - Updated)_
```
{
  "insert success",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### POST /login

> validation user

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
  {
    "email": "<user email>",
    "password": "<user passsword>"
  }
```


_Response (200 - Updated)_
```
{
  "id": <user id>,
  "email": "<user email>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
