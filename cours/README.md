# Introduction à MongoDB


## Les différences entre les SGBD 

`SGBD` : Systeme de Gestion de Base de Données

| `SQL` | `NoSQL` |
| -- | -- |
| `Postgres` / `MySQL` / `SQLite` / `Microsoft SQL Server` / `Oracle Database` |  `MongoDB` / `Redis` / `Cassandra` / `Neo4J`


**Quel SGBD j'utilise ?**

- Si on connait d'avance la structure de nos données et qu'il y a plusieurs entités distinctes dans notre problème => SQL potentiellement adapté. 

- Scraping : j'ai des données non organisés à récupérer => MongoDB potentiellement adapté 

- Cache ?? => Redis 


## MongoDB

Parallèle avec Postgres 

| `Postgres` | `Mongodb` | Explication
| -- | -- | -- |
| `postgresql` | `mongod` | C'est le serveur | 
| `psql` | `mongo` / `mongosh` | C'est le client CLI | 
| `\l` | `show dbs` | Lister les BDD de mon SGBD |
| `CREATE DATABASE` | Pas besoin ! Il suffit de se placer sur la base | Créer une table
| `\c <maBase> ` | `use <maBase>` | Se placer sur une base particulière
| `\dt` | `show collections` | Lister les tables/collections
| `CREATE TABLE ...` | Pas besoin ! On insère des choses et ça créé la table à la volée | Créer une table


> PostgreSQL and MongoDB are both popular databases, but they have different use cases. PostgreSQL is a traditional, SQL-style database that is well-suited for transactional systems, while MongoDB is a NoSQL database that is designed to store large amounts of unstructured data. Both databases have their own set of features and benefits, and the decision of which one to use depends on the specific requirements of the application. In general, PostgreSQL tends to be more popular in enterprise environments, while MongoDB is often used in web and mobile applications. However, both databases have a large and active user base, so it is difficult to say definitively which one is "more used." - ChatGPT

## Installation

- Sur votre VM, il n'y a rien à installer. Vous pouvez directement accéder à votre SBGD mongodb via le client terminal `mongosh` (ou `mongo`). 

- Sinon, installer `MongoDB Community Edition` via la [documentation officielle](https://www.mongodb.com/try/download/community).

Autres possibilités d'installation, selon le système d'exploitation :

- Sous **Mac** :
  - Suivre attentivement les étapes d'installation via Homebrew dans la [documentation ici](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/). Elles sont résumés ici à titre indicatif. 

<details><summary>
Résumé commandes Mac
</summary>

- Installer avec `homebrew` : 
  - `brew tap mongodb/brew && brew update` (mettre à jour brew)
  - `brew install mongodb-community@6.0` (installer mongodb server)
  - `brew services start mongodb-community@6.0` (lancer le serveur)
- Tester l'accès aux SGBD
  - `mongosh` (se connecter au serveur depuis le terminal)

</details>
  

- Sous **Linux** :
  - Suivre attentivement les étapes d'installation de la [documentation ici](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/). Elles sont résumés ici à titre indicatif. 


<details><summary>
Résumé commandes Linux
</summary>

- Installer avec `apt`
  - `sudo apt-get update` (mettre à jour apt)
  - `wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -` (doit répondre OK)
  - `lsb_release -dc` (doit répondre `Ubuntu 20.04.4 LTS`)
  - `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list` (pas de nouvelles, bonne nouvelle)
  - `sudo apt-get update` (reload local package database)
  - `sudo apt-get install -y mongodb-org` (installer mongodb)
  - `sudo systemctl start mongod` (lancer le serveur)
  - `sudo apt install mongodb`
- Tester l'accès aux SGBD
  - `sudo systemctl status mongod` (tester l'état du serveur)
  - `mongosh` (se connecter au serveur depuis le terminal)

</details>

- Sous **Window** :
  - Suivre attentivement les étapes d'installations de la [documentation ici](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/).
  - Penser à aussi installer le client `mongosh`. 


## Un poil de vocabulaire

| Lexique | Explication |
| -- | -- |
| *Document* | un enregistrement. Dans une BDD SQL, cela correspondrait plus ou moins à une ligne dans une table.
| *Collection* | presque équivalent à une table. C'est un ensemble non structuré de documents (c'est-à-dire qu'ils n'ont pas forcément tous le même format !).
| *BSON* | _Binary JSON_. Un format développé par et pour MongoDB, basé sur la notation JSON.

https://www.mongodb.com/compare/mongodb-postgresql

## Premières commandes du SGBD

| Commande | Explication |
| -- | -- |
| `show dbs` | lister les bases existantes |
| `use <maBase>` | se placer dans une base (créer la base à la volée si elle n'existe pas) |
| `show collections` | lister les collections de la BDD courante |
| `exit` | quitter la console |
| `CTRL+D` | quitter la console |
| `mongorestore -d <maBase> <folder>` | load BSON dumbs from `<folder>` into `<maBase>`. Pas besoin de créer la base, `mongorestore` le fait pour nous. |
| `db.oldCollection.renameCollection("newCollection")` | renommer une collection | 

## Mongo Cheat sheet

[Mongo Cheat Sheet](https://www.mongodb.com/developer/products/mongodb/cheat-sheet/)

## Queries

On (re)découvre le **CRUD** avec Mongo !

[Queries](queries.md)
[Exercice cockpit](queries-cockpit.md)

Mise en place : 

- Cloner le dépot
- cd dans le dépot
- `mongorestore -d pokemon data` (il doit dire "imported 151 documents" qqch dans le genre)
- `mongo` ou `mongosh` (pour entrer dans le SGBD)
- `use pokemon`
- `db.samples_pokemon.renameCollection("pokedex")`
- On test : `db.pokedex.find()` => on voit tous les pokemons 


## Aggregate

Techniquement parlant, `aggregate` est _juste_ une méthode des collections de mongo.

Mais ses capacités sont tellement gigantesques qu'on parle souvent du _framework_ aggregate.

Direction [le markdown aggregate](./aggregate.md) pour la suite !

Attention, la syntaxe est pour le moins velue (voire piquante!), et difficile à prendre en main, ce qui vaut à aggregate une réputation de "monstre efficace mais indomptable".

## Express

Pour dialoguer avec une base Mongo, 2 solutions : 
- Faire des requêtes "à la main" avec le package [mongodb](https://www.npmjs.com/package/mongodb).
- Utiliser un ~ORM~ ODM (D pour Document :wink:) comme [mongoose](https://www.npmjs.com/package/mongoose)
