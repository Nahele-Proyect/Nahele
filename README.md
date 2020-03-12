# Nahele (Third Project)

## Models

##### User model
```

* User {
    username: String,
  password: String,
  confirmPassword: String,
  email: String,
  img: String,
  pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
  calendar: [{ type: Schema.Types.ObjectId, ref: 'Calendar' }]
}, {
  timestamps: true
}

```

##### Pet model
```

Pet {
 name: { type: String, required: true },
    img: { type: String, required: true },
    city: { type: String, required: true },
    flag: { type: String, default: "https://petshelter.miwuki.com/img/b/es.svg", required: true },
    specie: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    urgency: { type: String, enum: ["En Adopción", "Urgente"] },
    personality: [String],
    born: Date,
    gender: String,
    size: String,
    weigth: String,
    activity: String,
    vaccinated: { type: String, enum: ["Sí", "No"] },
    dewormed: { type: String, enum: ["Sí", "No"] },
    healthy: { type: String, enum: ["Sí", "No"] },
    sterilized: { type: String, enum: ["Sí", "No"] },
    identified: { type: String, enum: ["Sí", "No"] },
    microchip: { type: String, enum: ["Sí", "No"] },
    comment: String,
    calendar: [{ type: Schema.Types.ObjectId, ref: "Calendar" }],
    requests: [{ username: String, email: String, request: String }]
}, {
    timestamps: true
}



```

##### Calendar model

````

Calendar{
    title: String,
    start: Date,
    end: Date,
    petsUrl: [String],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
}

````
