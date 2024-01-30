# Fact About Pokemons API

A simple API for getting pokemon data, using NestJS.

For dataset, [Competitive Pokémon Tier Dataset](https://www.kaggle.com/datasets/varlawend/competitive-pokmon-tier-dataset?resource=download) is used from kaggle.


## License

This project is licensed under [GNU GPL-3.0](https://github.com/ErtyumPX/facts-about-pokes/blob/main/LICENSE) license.


## Setup

#### Requirements

In this project, [NestJS](https://nestjs.com/) version 10.3.0 is used with TypeScript, any version above 10.0.0 should work fine.

For package management, [NPM](https://www.npmjs.com/) version 10.4.0 is used.

#### Installation and Running

```bash
# installation
$ npm install

# development
$ npm run start

# unit tests
$ npm run test
```

There is almost none unit tests for now, hopefully will be added in the future.


## Services and Helpers

---

#### Abstract Class AppConfig

General-use static variables are defined here. Mostly for the dataset file paths.

---

#### Class PokemonService

For getting pokemon data from the dataset. Helper service for PokeController.

---

#### Class CsvService

Mostly used in PokemonService class. All properties and methods are static.

For reading csv files in the dataset. May not be the best way to do it, but still fine for manipulating csv files without holding the entire file in memory.

Static `separator` property is set to `,` for current database, for splitting any csv output from CsvService, this property should be used.

---

#### Class SearchService

Used in PokemonService.getSuggestions() method for creating a simple fuzzy search algorithm for pokemon names.

Uses a simple levenstein distance algorithm, with a threshold of 0.72.

Uses a simplification process to reduce characters with accents to their base characters in ASCII.

Also checks if the input word is a substring of any pokemon name.

---

#### Class ImageService

For getting pokemon images. Helper service for ImageController.

---

## API Documentation

Currently everything works locally, in 3000 port. We will get base url as `http://localhost:3000/` and call it 'BASE_URL' in this documentation.

There is **zero** authentication, CORS is enabled for all origins.

Enpoing structure:

```
BASE_URL
  /poke
    /valid/:name
    /random
    /:index
    /abilities/:name
    /ability/defs/:name
    /suggest/:input
    /moves/:name
    /move/defs/:name
    /stats/:name
    /types/:name
  /image
    /:name
```


There are 2 controllers, `/poke` and `/image`.

### Controller /poke

For getting main pokemon data, `${BASE_URL}/poke` is used.

---

#### GET /poke/valid/:name

Checks if the given name is a valid pokemon name.

**Return Value:** Boolean value `true` or `false` depending on if the given name is a valid pokemon name. Only pokemons in the dataset are valid.

**Parameters:** Requires only 1 string value as `name` parameter, for the pokemon name.

```bash
# request
GET ${BASE_URL}/poke/valid/charizard

# possible outputs
OUTPUT: true
OUTPUT: false
```

---

#### GET /poke/random

Gets a random pokemon name from the dataset.

**Return Value:** String value, a random pokemon name.

**Parameters:** Does not require any parameter.

```bash
# request
GET ${BASE_URL}/poke/random

# possible outputs
OUTPUT: charizard
OUTPUT: pikachu
```

---


#### GET /poke/:index

Gets the pokemon name at the given index in the dataset.

**Return Value:** String value, pokemon name.

**Parameters:** Requires only 1 integer value as `index` parameter.

```bash
# request
GET ${BASE_URL}/poke/1

# possible outputs
OUTPUT: charizard
OUTPUT: pikachu
```

---

#### GET /poke/abilities/:name

Gets the abilities of the pokemon with the given name.

**Return Value:** Array of string values, ability names.

**Parameters:** Requires only 1 string value as `name` parameter, for the pokemon name.
```bash
# request
GET ${BASE_URL}/poke/abilities/charizard

# possible outputs
OUTPUT: ["Blaze", "Solar Power"]
OUTPUT: ["Static", "Lightning Rod"]
```

---

#### GET /poke/ability/defs/:name

Gets the definitions of the abilities of the pokemon with the given name.

**Return Value:** Array of string values, definitions of the abilities.

**Parameters:** Requires only 1 string value as `name` parameter, for the pokemon name.


```bash
# request
GET ${BASE_URL}/poke/ability/defs/charizard

# possible outputs
OUTPUT: ["Powers up Fire-type moves in a pinch.", "Boosts the Sp. Atk stat in harsh sunlight, but HP decreases every turn."]
```

---

#### GET /poke/suggest/:input

Gets the pokemon names that resembles the given input.

**Return Value:** Array of string values, valid pokemon names.

**Parameters:** Requires only 1 string value as `input` parameter, for the input.

```bash
# request
GET ${BASE_URL}/poke/suggest/char

# possible outputs
OUTPUT: ["charizard", "charmeleon", "charmander"]
```

---

#### GET /poke/moves/:name

Gets the moves of the pokemon with the given name.

**Return Value:** Array of string values, moves.

**Parameters:** Requires only 1 string value as `name` parameter, for the pokemon name.

```bash
# request
GET ${BASE_URL}/poke/moves/charizard

# possible outputs
OUTPUT: ["fire-fang", "flamethrower", "fire-blast", "wing-attack", "slash", "dragon-rage", "scary-face", "fire-spin", "ember", "smokescreen", ...]
```

---

#### GET /poke/move/defs/:name

Gets the definitions of the moves of the pokemon with the given name.

**Return Value:** Array of string values, definitions of the moves.

**Parameters:** Requires only 1 string value as `name` parameter, for the pokemon name.

```bash
# request
GET ${BASE_URL}/poke/move/defs/charizard

# possible outputs
OUTPUT: ["Has a 10% chance to burn the target.", "Has a 10% chance to burn the target.", "Has a 10% chance to burn the target.", "Inflicts regular damage with no additional effect.", "Inflicts regular damage with no additional effect.", "Always inflicts 40 HP.", "Lowers the target's Speed by one stage.", "Traps foes in a vortex, damaging them for 4-5 turns.", "Inflicts regular damage with no additional effect.", "Lowers the target's Accuracy by one stage.", ...]
```

---

#### GET /poke/stats/:name

Gets the stats of the pokemon with the given name.

**Return Value:** String value, stats of the pokemon. Stats are seperated with commas.

**Parameters:** Requires only 1 string value as `name` parameter, for the pokemon name.

```bash
# request
GET ${BASE_URL}/poke/stats/charizard

# possible outputs
OUTPUT: Togepi,35,20,65,40,65,20,1.5,0.3,LC,GS
OUTPUT: Charizard,78,84,78,109,85,100,1.7,90.5,OU,RSE
```

---

#### GET /poke/types/:name

Gets the types of the pokemon with the given name.

**Return Value:** Array of string values, types of the pokemon.

**Parameters:** Requires only 1 string value as `name` parameter, for the pokemon name.

```bash
# request
GET ${BASE_URL}/poke/types/charizard

# possible outputs
OUTPUT: ["fire", "flying"]
OUTPUT: ["electric"]
```

---

### Controller /image

For getting pokemon image, `${BASE_URL}/image` is used.

Currently only pokemondb.com images are supported, tough it is planned to be extended into getting different kind of images.

---

#### GET /image/:name

Gets the image url of the pokemon with the given name.

**Return Value:** String value, url of the image.

**Parameters:** Requires only 1 string value as `name` parameter, for the pokemon name.

```bash
# request
GET ${BASE_URL}/image/charizard

# possible outputs
OUTPUT: https://img.pokemondb.net/artwork/large/charizard.jpg
OUTPUT: https://img.pokemondb.net/artwork/large/pikachu.jpg
```
