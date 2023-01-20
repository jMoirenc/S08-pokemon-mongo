# Premières requêtes

## Requetes "valeur exacte"

1. `db.pokedex.find()` : "trouve les éléments de la collection pokedex, sans filtre"
2. `db.pokedex.count()` : "compte tous les éléments...."
3. `db.pokedex.find({id: 150})` : "trouve les éléments..., dont la propriété `id` est égale à 150"
4. Attention:  `db.pokedex.find({id: "150"})`, paf ça renvoie rien !! MongoDB est stricte sur les types de données.
5. Bien sur, c'est combinable : `db.pokedex.find({name:"Mewtwo", id: 150})`. C'est un ET, pas un OU !
6. c'est moche? cadeau : `db.pokedex.find({id: 150}).pretty()`

## Projection

Lorsqu'on ne veut que certaines propriétés des documents, on passe un objet en 2ème paramètre de find() :

`db.pokedex.find({}, {name: 1})`

Par défaut, l'id sera toujours inclus. On peut le désactiver : 

`db.pokedex.find({}, {name: 1, _id:0})`

## Valeurs incluses

Quand le document contient un array, on peut tester si l'array en question CONTIENT une valeur : 

`db.pokedex.find({type: "Dragon"})`

Quand le document contient un objet, on peut tester les valeurs de cet objet, avec la dot-notation habituelle : 

(pas d'exemple direct dans la base)
`db.example.find({objet.value: "valeur"})`

Et le must du must : on peut combiner les deux ! Quand un document contient un array de sous-document, ça fonctionne tout pareil :

`db.pokedex.find({"prev_evolution.name":"Eevee"});`

## Modificateurs

- plus grand que : `find({"spawn_chance": {$gte: 2}});`
- plus petit que : `find({"spawn_chance": {$lte: 2}});`
- parmi (sert de OU logique!) : `find({"type": {$in: ["Dragon", "Ice"] } }, {name:1});`
- pas dans : `find({"type": {$nin: ["Water", "Fire"] } }, {name:1});`
- "ET" sur même prop : `find({ "type": {$eq:"Flying", $ne:"Normal"} },{name:1,type:1});`
- regexp ! : `find({"name": /ard/gi})`

## Tri et limite

- tri simple : `db.pokedex.find({}, {name:1}).sort({name:1})` (1 pour ascendant, -1 pour descendant)
- tri à paramètres multiples: `db.pokedex.find().sort({type:1, name:-1})`. L'ordre de priorité est égal à l'ordre de déclaration (ici, "type ascendant" en premier, puis "name descendant" )
- un exemple plus lisible (avec une projection) : `db.pokedex.find({},{name:1, type:1}).sort({type:1, name:-1})`

- limite : `db.pokedex.find().limit(4)`

## Insertion
`db.pokedex.insert({nom: "JaiRienAFaireLa"})`

On remarque que le nouvel objet n'a aucune propriété en commun avec les autres. Et pourtant, mongo l'a inséré sans broncher dans la collection...

## Modification

Modifier un seul document : 

`db.pokedex.updateOne({nom: "JaiRienAFaireLa"},{"$set": {test: "truc"}});`

L'opérateur "$set" est nécessaire. Il en existe un paquet : https://docs.mongodb.com/manual/reference/operator/update/#id1

Modifier plusieurs document : 

`db.collection.updateMany(...)` sur le même format que updateOne

## Suppression

Supprimer un seul document : 

`db.pokedex.deleteOne({nom: "JaiRienAFaireLa"});`


Supprimer plusieurs document : `db.collection.deleteMany(...)`, sur le même format.