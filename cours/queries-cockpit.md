# Quelques requêtes Mongo

On fait le CRUD : CREATE / READ / UPDATE / DELETE

### READ

```js
// Compter le nombre de pokemons
db.pokedex.countDocuments()

// Selectionner le pokemon dont l'ID vaut 20
db.pokedex.find({ id: 20 }) // attention au type !

// Selectionner le pokemon dont l'ID vaut 20 ET le nom vaut Raticate
db.pokedex.find({ id: 20, name: "Raticate" })
db.pokedex.findOne({ id: 20, name: "Raticate" })

// Selectionner tous les pokemons mais uniquement le champ "name" => PROJECTION 
db.pokedex.find({}, { name: 1 }) // Mongo laisse tout de même l'ID dans les projections 
db.pokedex.find({}, { name: 1, _id: 0 }) // Sans l'ID // 1 ~= true pour mongo ET 0 ~= false

// Selectionner tous les pokemons de type Electric
db.pokedex.find({ type: ["Electric"] }) // Et seulement Eletric
db.pokedex.find({ type: "Electric" }) // Dont 1 des types est électrique

// Selectionner tous les pokemons de type Eletric ET Flying
db.pokedex.find({ type: ["Electric", "Flying"] })

// Selectionner tous les pokemons de type Electric OU Flying
db.pokedex.find({ $or: [{ type: "Electric" }, { type: "Flying" }] })
db.pokedex.find({ type: { $in: ["Electric", "Flying"] }})

// Selectionner le pokemon dont l'évolution "précédente" était Rattata
db.pokedex.find({ "prev_evolution.name": "Rattata" }); // Nested query

// Selectionner les pokemons dont les chances d'apparitions (spawn_chance) sont inférieures à 0.5
db.pokedex.find({ spawn_chance: { $lt: 0.5 } })

// Le pokemon qui a le moins de chance d'apparition
db.pokedex.find({}).sort({ spawn_chance: 1 }).limit(1)

// Selectionner les pokemons qui ont "chu" dans leur name (similaire à regex LIKE %chu% en Postgres)
db.pokedex.find({ name: /chu/ }, { name: 1 })
db.pokedex.find({ name: { $regex: "chu"} }, { name: 1 })

// Selectionner seulement 3 pokemons
db.pokedex.find({}).limit(3)

// Selectionner les pokemons triés par noms croissant
db.pokedex.find({}).sort({ name: 1 })
```


## CREATE 

```js
db.pokedex.insertOne({ name: "Nicotin" })
db.pokedex.findOne({ _id: ObjectId("63b5545e40e944dfe6060ad6") })
```


## UPDATE

`db.pokedex.update(QUERY, MODIFICATION, OPTIONS)`

```js
db.pokedex.updateOne({ name: "Nicotin" }, { $set: { attacks: ["Rassurer les Mayas", "Bagarre de chat", "Lance patate"] } })
db.pokedex.updateOne({ name: "Nicotin"}, { $pull: { attacks: "Lance patate" } })
db.pokedex.updateOne({ name: "Nicotin"}, { $push: { attacks: "Crash de VM" } })

// On rajoute un champ height puis on le retire
db.pokedex.updateOne({ name: "Nicotin"}, { $set: { height: 180 } })
db.pokedex.updateOne({ name: "Nicotin"}, { $unset: { height: 1 } })

// Update plusieurs documents (= enregistrement) en même temps !
db.pokedex.update({}, { $unset: { candy: 1 } }, { multi: true })
```

## DELETE

```js
db.pokedex.deleteOne({ name: "Nicotin" })
```