import { Pokemon } from "./PokemonGenerator.mjs"

export class Player {
    pokemon
    index = 0
    #pokemonClass
    constructor(name, bag, pokemon = new Pokemon()) {
        this.name = name
        this.bag = bag
        this.#pokemonClass = pokemon
    }

    async getPokemon(){
        this.pokemon = await this.#pokemonClass.loadPokemon()
        return this.pokemon[this.index]
    }

    get currentPokemon() {
        return this.pokemon[this.index]
    }

    getPokemonList(){
        console.log(this.pokemon);
        
        return this.pokemon
    }


}

// export class Pokemon {
//     #pokemonlistLink = "https://pokeapi.co/api/v2/pokemon/?offset=1&limit=100"

//     pokemonlist = []
//     async list() {
//         let response = await fetch(this.#pokemonlistLink)
//         let data = await response.json()
//         // console.log(data);

//         for (let pokemon of data.results) {
//             this.pokemonlist.push(pokemon.name)
//         }
//         // console.log(this.#pokemonlist);
//         return this.pokemonlist
//     }

//     async #getpokemonData(pokemon) {
//         const link = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
//         let response = await fetch(link)
//         let data = await response.json()
//         let attacksArr = {}
//         for (let i = 0; i < 4; i++) {
//             attacksArr[`${data.moves[i].move.name.replace("-", " ")}`] = await this.#getAttack(data.moves[i].move.url)
//         }
        

//         return {
//             name: data.name,
//             stats: {
//                 hp: data.stats[0].base_stat * 3,
//                 hpLeft: data.stats[0].base_stat * 3,
//                 attack: data.stats[1].base_stat,
//                 defense: data.stats[2].base_stat,
//                 speed: data.stats[5].base_stat
//             },
//             height: data.height,
//             attacks: attacksArr
//         }

//     }

//     async #getAttack(link) {

//         let response = await fetch(link)
//         let data = await response.json()
//         return {
//             accuracy: data.accuracy,
//             power: data.power,
//             maxUses: data.pp,
//             currentUses: data.pp
//         }
//     }

//     async loadPokemon() {
//         let list = await this.list()
    
//         const randomPokemonArray = [];

//         for (let i = 0; i < 3; i++) {
//             const name = list[Math.floor(Math.random() * list.length)]
//             randomPokemonArray.push(await this.#getpokemonData(name));
//         }
//         // console.log(randomPokemonArray);
//         return randomPokemonArray
//     }


// }
