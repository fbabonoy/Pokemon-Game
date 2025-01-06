const pokemonList = [
    {
        name: "Pikachu",
        stats: {
            hp: 100,
            hpLeft: 100,
            attack: 55,
            defense: 40,
            speed: 90
        },
        attacks: {
            "Thunder Shock": { damage: 40, maxUses: 10, currentUses: 10 },
            "Quick Attack": { damage: 20, maxUses: 15, currentUses: 15 },
            "Iron Tail": { damage: 50, maxUses: 10, currentUses: 10 },
            "Electro Ball": { damage: 60, maxUses: 5, currentUses: 5 }
        }
    },
    {
        name: "Charizard",
        stats: {
            hp: 150,
            hpLeft: 150,
            attack: 84,
            defense: 78,
            speed: 100
        },
        attacks: {
            "Flamethrower": { damage: 90, maxUses: 10, currentUses: 10 },
            "Dragon Claw": { damage: 80, maxUses: 10, currentUses: 10 },
            "Air Slash": { damage: 75, maxUses: 15, currentUses: 15 },
            "Slash": { damage: 70, maxUses: 20, currentUses: 20 }
        }
    },
    {
        name: "Blastoise",
        stats: {
            hp: 160,
            hpLeft: 160,
            attack: 83,
            defense: 100,
            speed: 78
        },
        attacks: {
            "Hydro Pump": { damage: 110, maxUses: 5, currentUses: 5 },
            "Water Gun": { damage: 40, maxUses: 25, currentUses: 25 },
            "Bite": { damage: 60, maxUses: 20, currentUses: 20 },
            "Skull Bash": { damage: 100, maxUses: 5, currentUses: 5 }
        }
    },
    {
        name: "Venusaur",
        stats: {
            hp: 160,
            hpLeft: 160,
            attack: 82,
            defense: 83,
            speed: 80
        },
        attacks: {
            "Solar Beam": { damage: 120, maxUses: 5, currentUses: 5 },
            "Razor Leaf": { damage: 55, maxUses: 20, currentUses: 20 },
            "Vine Whip": { damage: 45, maxUses: 25, currentUses: 25 },
            "Earthquake": { damage: 100, maxUses: 10, currentUses: 10 }
        }
    },
    {
        name: "Gengar",
        stats: {
            hp: 120,
            hpLeft: 120,
            attack: 65,
            defense: 60,
            speed: 110
        },
        attacks: {
            "Shadow Ball": { damage: 80, maxUses: 15, currentUses: 15 },
            "Hypnosis": { damage: 0, maxUses: 10, currentUses: 10 },
            "Dream Eater": { damage: 100, maxUses: 10, currentUses: 10 },
            "Dark Pulse": { damage: 80, maxUses: 15, currentUses: 15 }
        }
    },
    {
        name: "Machamp",
        stats: {
            hp: 140,
            hpLeft: 140,
            attack: 130,
            defense: 80,
            speed: 65
        },
        attacks: {
            "Dynamic Punch": { damage: 100, maxUses: 5, currentUses: 5 },
            "Karate Chop": { damage: 50, maxUses: 20, currentUses: 20 },
            "Cross Chop": { damage: 75, maxUses: 15, currentUses: 15 },
            "Submission": { damage: 80, maxUses: 10, currentUses: 10 }
        }
    },
    {
        name: "Snorlax",
        stats: {
            hp: 200,
            hpLeft: 200,
            attack: 110,
            defense: 65,
            speed: 30
        },
        attacks: {
            "Body Slam": { damage: 85, maxUses: 15, currentUses: 15 },
            "Hyper Beam": { damage: 150, maxUses: 5, currentUses: 5 },
            "Rest": { damage: 0, maxUses: 10, currentUses: 10 },
            "Headbutt": { damage: 70, maxUses: 20, currentUses: 20 }
        }
    },
    {
        name: "Dragonite",
        stats: {
            hp: 170,
            hpLeft: 170,
            attack: 134,
            defense: 95,
            speed: 80
        },
        attacks: {
            "Dragon Breath": { damage: 60, maxUses: 20, currentUses: 20 },
            "Thunderbolt": { damage: 90, maxUses: 10, currentUses: 10 },
            "Hurricane": { damage: 110, maxUses: 5, currentUses: 5 },
            "Fire Punch": { damage: 75, maxUses: 15, currentUses: 15 }
        }
    }
];




let fightArea = document.getElementById("battle_arena")
let body = document.querySelector("body")
let fightAnimation = document.querySelector("#fight_animation")
let textBox = document.querySelector("#outer_box")
let insideBox = document.querySelector("#info")
let fontSizeAS = document.querySelectorAll("#action_selector p")

let fightButton = document.querySelector("#action_selector")

let actionBanner = document.querySelector("#action_banner")
let backButton = document.querySelector("#backButton")


let rightPokemonSprite = document.querySelector("#right_pokemon")
let leftPokemonSprite = document.querySelector("#left_pokemon")

let topPlayerTurn = false

const topPlayer = {
    name: "brok",
    pokemon: getPokemon(),
    bag: { "potion": { damage: -40, maxUses: 5, currentUses: 5 },
"revive": { damage: -40, maxUses: 5, currentUses: 5 } }
}

const bottomPlayer = {
    name: "ash",
    pokemon: getPokemon(),
    bag: { "potion": { damage: -40, maxUses: 5, currentUses: 5 } }
}

function getPokemon() {
    const randomPokemonArray = [];

    for (let i = 0; i < 1; i++) {
        const randomPokemon = { ...pokemonList[Math.floor(Math.random() * pokemonList.length)] };
        randomPokemonArray.push(randomPokemon);
    }
    return randomPokemonArray;
}


let leftBanner = document.querySelector("#pokemon_info")
leftBanner.appendChild(generateHealthBanner(topPlayer.pokemon[0]))

let rightBanner = document.querySelector("#right-pokemon_info")
rightBanner.appendChild(generateHealthBanner(bottomPlayer.pokemon[0], true))

let fontSizeHB = document.querySelectorAll("#bannerText")


window.addEventListener("DOMContentLoaded", (e) => {
    resizeGameBoard()
})

window.addEventListener("resize", (e) => {
    resizeGameBoard()
})

fightButton.addEventListener("click", (e) => {
    const button = e.target.closest("button")
    let currentPlayer
    let oponentPlayer
    if (topPlayerTurn) {
        currentPlayer = topPlayer
        oponentPlayer = bottomPlayer
    } else {
        currentPlayer = bottomPlayer
        oponentPlayer = topPlayer
    }

    if (e.target.id === "backButton" || !button) {
        return
    } else if (e.target.closest("button").className) {
        menuAction(button, currentPlayer.pokemon[0].stats, oponentPlayer.pokemon[0].stats)
        topPlayerTurn = !topPlayerTurn

        return
    }

    actionButtons(button, currentPlayer)


})

function actionButtons(button, currentPlayer = bottomPlayer) {
    let optionsMenu = document.querySelector("#buttonOptions")
    optionsMenu.innerHTML = ""

    if (button.id === "fight") {
        setMenuButttons(currentPlayer.pokemon[0].attacks, optionsMenu)
    } else if (button.id === "pokemon") {
        showAllPokemon(currentPlayer.pokemon)
    } else if (button.id === "bag") {
        setMenuButttons(currentPlayer.bag)
    } else if (button.id === "run") {
        console.log("gameOver");
    }
    actionBanner.style.zIndex = 0
}

function showAllPokemon(currentPokemon = bottomPlayer.pokemon) {
    for (let option in currentPokemon) {
        let button = document.createElement("button");
        button.textContent = `${currentPokemon[option].name} ${currentPokemon[option].stats.hpLeft}/${currentPokemon[option].stats.hp}`
        button.style.height = `49%`
        button.style.width = `49%`
        button.classList.add(currentPokemon[option].stats.defense)
        buttonOptions.appendChild(button);
    }
}


function menuAction(button, currentPlayer = topPlayer.pokemon[0].stats,  oponentPokemon = bottomPlayer.pokemon[0].stats) {
    if (Number(button.className) > 0) {
        updateBanner(Number(button.className), oponentPokemon, !topPlayerTurn)
    } else {
        updateBanner(Number(button.className), currentPlayer, topPlayerTurn)
    }
}

function updateBanner(modifier, pokemon, currentPlayer) {
        // attack need to be redone to attack the oposite player
        pokemon.hpLeft -= modifier
        let hpBanner = document.getElementById("health_value")

        if (pokemon.hpLeft > pokemon.hp) {
            pokemon.hpLeft = pokemon.hp
        } else if (pokemon.hpLeft < 0) {
            pokemon.hpLeft = 0
        }

        let getsearchBar = ""
        if (currentPlayer) {
            getsearchBar = "#top_hp_animate"
        } else {
            getsearchBar = "#bottom_hp_animate"
            hpBanner.textContent = `${pokemon.hpLeft}/${pokemon.hp}`
        }

        let healthBar = document.querySelector(getsearchBar)

        healthBar.style.width = `${(pokemon.hpLeft / pokemon.hp) * 100}%`
        actionBanner.style.zIndex = -1
}


function setMenuButttons(currentPokemon) {
    for (let option in currentPokemon) {
        let button = document.createElement("button");
        button.textContent = `${option} ${currentPokemon[option].currentUses}/${currentPokemon[option].maxUses}`
        button.style.height = `49%`
        button.style.width = `49%`
        button.classList.add(currentPokemon[option].damage)
        buttonOptions.appendChild(button);
    }
}

backButton.addEventListener("click", () => {
    actionBanner.style.zIndex = -1
})

function resizeGameBoard() {
    if (window.innerWidth > 1018 && window.innerHeight < 700) {
        return
    } else if (window.innerWidth < 934 || window.innerHeight < 700) {
        fightArea.style.width = `934px`
        fightArea.style.height = `500px`
        resizeButtons(fontSizeHB, `${window.innerWidth * 0.033}px`)
        return
    }

    body.style.minHeight = `${window.innerHeight}px`
    resizeButtons(fontSizeAS, `${window.innerWidth * 0.025}px`)
    resizeButtons(fontSizeHB, `${window.innerWidth * 0.025}px`)

    fightArea.style.width = `${window.innerWidth * 0.8}px`
    fightArea.style.height = `${window.innerHeight * 0.8}px`

    textBox.style.height = "100%"
    textBox.style.width = "50%"

    insideBox.style.height = "88%"
    insideBox.style.width = "93%"
}

function resizeButtons(font, size = "large") {
    font.forEach((e) => {
        e.style.fontSize = size
    })
}

function generateHealthBanner(pokemon = bottomPlayer.pokemon[0], bottomRightUser = false) {
    let bannerFragment = document.createDocumentFragment()

    let divBanner = document.createElement("div")
    divBanner.setAttribute(`id`, "bannerText")

    let nameText = document.createElement("p")
    nameText.textContent = `${pokemon.name} ${Math.random() > 0.5 ? "⚨" : "♀"}`

    let levelText = document.createElement("p")
    levelText.textContent = "Lv60"

    divBanner.appendChild(nameText)
    divBanner.appendChild(levelText)


    let healthInfo = document.createElement("div")
    healthInfo.style.width = "100%"

    let healthBar = document.createElement("div")
    healthBar.setAttribute(`id`, "healthBar")

    let hp = document.createElement("p")
    hp.textContent = "HP"

    let health = document.createElement("div")

    healthInfo.appendChild(healthBar)

    if (bottomRightUser) {
        healthInfo.appendChild(healthValue(pokemon.stats))
        leftPokemonSprite.src = `https://img.pokemondb.net/sprites/black-white/anim/back-normal/${pokemon.name.toLowerCase()}.gif`
        health.id = "bottom_hp_animate"
    } else {
        healthBar.style.height = "25%"
        rightPokemonSprite.src = `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name.toLowerCase()}.gif`
        health.id = "top_hp_animate"

    }


    healthBar.appendChild(hp)
    healthBar.appendChild(health)

    bannerFragment.appendChild(divBanner)
    bannerFragment.appendChild(healthInfo)



    return bannerFragment
}

function healthValue(hpUser) {
    let hp = document.createElement("p")
    hp.textContent = `${hpUser.hpLeft}/${hpUser.hp}`
    hp.id = "health_value"
    return hp

}


