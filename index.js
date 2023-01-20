// Objectif : se connecter à sa BDD locale "pokemon" depuis du code NodeJS
// Pour ça, on a besoin d'un driver : `mongodb` (équivalent de 'pg' pour MongoDB)

const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017/pokemon");

async function main() {
  await client.connect();
  const db = client.db("pokemon");
  const pokedex = db.collection("pokedex");

  const pokemons = await pokedex.find({})
    .project({ name: 1, _id: 0 })
    .sort({ name: 1 })
    .limit(3)
    .toArray();

  console.log(pokemons); // On affiche le nom des 3 premiers pokemons triés par ordre alphabétique !
}

main();


async function exo1() {
  // Trouver toutes les infos du Pokémon nommé Doduo (et les console.log)
}
exo1();

async function exo2() {
  // Trouver le nom et les types des 5 premiers Pokémons (par ordre alphabétique) qui ont exactement 2 types
}
exo2();

async function exo3() {
  // Trouver les Pokémons avec deux 'E' consécutifs dans le nom (exemple : Goldeen) (astuce : Regex)
}
exo3();

async function exo4() {
   // Trouver le nom des Pokémons qui sont une évolution finale (exemple : Alakazam, car évolution de Kadabra > Abra) 
   // Astuce : il a un prev_evolution mais PAS de next_evolution
}
exo4();

async function exo5() {
  // Récupérer la liste de tous les types (sans doublons) par ordre alphabétiques (avec par exemple une aggregation)
}
exo5();
