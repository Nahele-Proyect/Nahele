# Nahele (Third Project)

## Endpoints tables

#### Front Endpoints
  
  Method | Endpoint | Description
  --- | --- | --- 
 
  
  
 #### Back Endpoint
 
 Method | Endpoint | Description
 --- | --- | ---
 
 
## Models

##### User model
```

* User {
   username: {type: String, required: true},
   email: {type: String, required: true},
   password: {type: String, required: true},
   img: String,
   role: {type: String, enum: ['admin', 'standar', shelter']}
   pets ????
}
```

##### Pet model
```
Pet {
name: {type: String, required: true},
specie: {type: String, enum: ['dog', 'cat', ...]},
owner: {type: Schema.Types.ObjectId, required: true}
}


```

# Temas de los que hablar:
  
  * Que paso con client
  * Modificaciones del gitignore y colocacion del gitignore y git init
  * Concenso en cuanto a TO-DOS, variables
  * Web en ingles o español
