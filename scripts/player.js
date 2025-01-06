let player = {
    name: "",
    pokemon: [],
    bag: ["posion", "revive"],
    yield: function () {

    }
}

let pokemon = {
    name: "",
    gender: Math.round(Math.random()* 2) > 1 ? "⚨" : "♀",
    attacks: {},
    stats: {},
}

let attacks = {
    name: "",
    damage: 0, 
    maxUses: 0, 
    currentUses: 0, 
    animation: "" ,
}