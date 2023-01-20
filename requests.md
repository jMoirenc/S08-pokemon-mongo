# Mongo queries

## Compter le nombre de pokemons

db.pokedex.countDocuments()

db.pokedex.count()

## Selectionner le pokemon dont l'ID vaut 20

db.pokedex.findOne({ id: 20 })

## Selectionner le pokemon dont l'ID vaut 20 ET le nom vaut Raticate

db.pokedex.findOne({ id: 20, name: 'Raticate' })

## Selectionner tous les pokemons mais uniquement le champ "name" => PROJECTION 

db.pokedex.find({}, { name: 1, _id: 0})

## Selectionner tous les pokemons de type Electric

db.pokedex.find({ type: 'Electric'})

## Selectionner tous les pokemons de type Eletric ET Flying

db.pokedex.find({ $and: [ { type: 'Electric'}, { type: 'Flying'} ] })

## Selectionner tous les pokemons de type Electric OU Flying

db.pokedex.find({ type: 'Electric', type: 'Flying'})

## Selectionner le pokemon dont l'évolution "précédente" était Rattata

db.pokedex.findOne({ prev_evolution: {$elemMatch: {name: 'Rattata'}}})

## Selectionner les pokemons dont les chances d'apparitions (spawn_chance) sont inférieures à 0.5

db.pokedex.find( { spawn_chance: { $lt: 0.5 }})

## Le pokemon qui a le moins de chance d'apparition

db.pokedex.find().sort({ spawn_chance : 1}).limit(1)

## Selectionner les pokemons qui ont "chu" dans leur name (similaire à regex LIKE %chu% en Postgres)

db.pokedex.find({"name": /chu/})

## Selectionner seulement 3 pokemons

db.pokedex.find().limit(3)

## Selectionner les pokemons triés par noms croissant

db.pokedex.find({}).sort({ name: 1});

## On rajoute un champ height puis on le retire

db.pokedex.updateOne({ name: 'Rattata' }, { $set: { height: 12 }})
db.pokedex.updateOne({ name: 'Rattata' }, { $unset: { height: 1 }})

## Update plusieurs documents (= enregistrement) en même temps !

db.pokedex.updateMany({ type: 'Electric' }, { $set: { callout: 'tzzzzz' }})
