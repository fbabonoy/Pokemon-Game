import { Pokemon } from "./PokemonGenerator.mjs"

export class Player {
    pokemon = []
    index = 0
    selector = []
    #pokemonClass
    constructor(name, bag, pokemon = new Pokemon()) {
        this.name = name
        this.bag = bag
        this.#pokemonClass = pokemon
    }

    async getSelectorList() {
        return await this.#pokemonClass.list()
    }

    async getPokemon(mode){
        if (mode === "random") {
            this.pokemon = await this.#pokemonClass.loadRandomPokemon()
        } else {
            this.pokemon = await this.#pokemonClass.loadPokemon(this.selector)
            
        }
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