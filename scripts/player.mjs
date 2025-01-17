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