let player = {
    name: "",
    pokekmon: [],
    bag: ["posion", "revive"],
    yield: function () {

    }
}

let pokekmon = {
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