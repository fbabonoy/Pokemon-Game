const pokemonList = [
    {
        name: "Pikachu",
        stats: {
            hp: 100,
            attack: 55,
            defense: 40,
            speed: 90
        },
        attacks: {
            "Thunder Shock": { damage: 40, maxUses: 10, currentUses: 10},
            "Quick Attack": { damage: 20, maxUses: 15, currentUses: 15},
            "Iron Tail": { damage: 50, maxUses: 10, currentUses: 10},
            "Electro Ball": { damage: 60, maxUses: 5, currentUses: 5}
        }
    },
    {
        name: "Charizard",
        stats: {
            hp: 150,
            attack: 84,
            defense: 78,
            speed: 100
        },
        attacks: {
            "Flamethrower": { damage: 90, maxUses: 10, currentUses: 10},
            "Dragon Claw": { damage: 80, maxUses: 10, currentUses: 10},
            "Air Slash": { damage: 75, maxUses: 15, currentUses: 15},
            "Slash": { damage: 70, maxUses: 20, currentUses: 20}
        }
    },
    {
        name: "Blastoise",
        stats: {
            hp: 160,
            attack: 83,
            defense: 100,
            speed: 78
        },
        attacks: {
            "Hydro Pump": { damage: 110, maxUses: 5, currentUses: 5},
            "Water Gun": { damage: 40, maxUses: 25, currentUses: 25},
            "Bite": { damage: 60, maxUses: 20, currentUses: 20},
            "Skull Bash": { damage: 100, maxUses: 5, currentUses: 5}
        }
    },
    {
        name: "Venusaur",
        stats: {
            hp: 160,
            attack: 82,
            defense: 83,
            speed: 80
        },
        attacks: {
            "Solar Beam": { damage: 120, maxUses: 5, currentUses: 5},
            "Razor Leaf": { damage: 55, maxUses: 20, currentUses: 20},
            "Vine Whip": { damage: 45, maxUses: 25, currentUses: 25},
            "Earthquake": { damage: 100, maxUses: 10, currentUses: 10}
        }
    },
    {
        name: "Gengar",
        stats: {
            hp: 120,
            attack: 65,
            defense: 60,
            speed: 110
        },
        attacks: {
            "Shadow Ball": { damage: 80, maxUses: 15, currentUses: 15},
            "Hypnosis": { damage: 0, maxUses: 10, currentUses: 10},
            "Dream Eater": { damage: 100, maxUses: 10, currentUses: 10},
            "Dark Pulse": { damage: 80, maxUses: 15, currentUses: 15}
        }
    },
    {
        name: "Machamp",
        stats: {
            hp: 140,
            attack: 130,
            defense: 80,
            speed: 65
        },
        attacks: {
            "Dynamic Punch": { damage: 100, maxUses: 5, currentUses: 5},
            "Karate Chop": { damage: 50, maxUses: 20, currentUses: 20},
            "Cross Chop": { damage: 75, maxUses: 15, currentUses: 15},
            "Submission": { damage: 80, maxUses: 10, currentUses: 10}
        }
    },
    {
        name: "Snorlax",
        stats: {
            hp: 200,
            attack: 110,
            defense: 65,
            speed: 30
        },
        attacks: {
            "Body Slam": { damage: 85, maxUses: 15, currentUses: 15},
            "Hyper Beam": { damage: 150, maxUses: 5, currentUses: 5},
            "Rest": { damage: 0, maxUses: 10, currentUses: 10},
            "Headbutt": { damage: 70, maxUses: 20, currentUses: 20}
        }
    },
    {
        name: "Dragonite",
        stats: {
            hp: 170,
            attack: 134,
            defense: 95,
            speed: 80
        },
        attacks: {
            "Dragon Breath": { damage: 60, maxUses: 20, currentUses: 20},
            "Thunderbolt": { damage: 90, maxUses: 10, currentUses: 10},
            "Hurricane": { damage: 110, maxUses: 5, currentUses: 5},
            "Fire Punch": { damage: 75, maxUses: 15, currentUses: 15}
        }
    }
];




let fightArea = document.getElementById("battle_arena")
let body = document.querySelector("body")
let fightAnimation = document.querySelector("#fight_animation")
let textBox = document.querySelector("#outer_box")
let insideBox = document.querySelector("#info")
let fontSizeAS = document.querySelectorAll("#action_selector p")

let rightPokemon = document.querySelector("#right_pokemon")
let leftPokemon = document.querySelector("#left_pokemon")



let leftBanner = document.querySelector("#pokemon_info")
leftBanner.appendChild(generateHealthBanner(pokemonList[Math.floor(Math.random() * pokemonList.length)]))

let rightBanner = document.querySelector("#right-pokemon_info")
rightBanner.appendChild(generateHealthBanner(pokemonList[Math.floor(Math.random() * pokemonList.length)], true))

let fontSizeHB = document.querySelectorAll("#bannerText")


console.log(rightPokemon);


window.addEventListener("DOMContentLoaded" , (e) => {  
    resizeGameBoard()

})


window.addEventListener("resize" , (e) => {    
    resizeGameBoard()
})



function resizeGameBoard() {    
    if ( window.innerWidth > 1018 && window.innerHeight < 700) {
        return

    } else if (window.innerWidth < 934 || window.innerHeight < 700 ) {
        fightArea.style.width = `934px`
        fightArea.style.height = `500px`
        resizeButtons(fontSizeHB,`${window.innerWidth * 0.035}px`)
        return
    }  
    body.style.minHeight = `${window.innerHeight}px`
    resizeButtons(fontSizeAS,`${window.innerWidth * 0.025}px`)


    resizeButtons(fontSizeHB,`${window.innerWidth * 0.025}px`)


    fightArea.style.width = `${window.innerWidth * 0.8}px`
    fightArea.style.height = `${window.innerHeight * 0.8}px`

    textBox.style.height = "100%"
    textBox.style.width = "50%"

    insideBox.style.height = "88%"
    insideBox.style.width = "93%"
}

function resizeButtons(font, size = "large") {
    console.log(font);
    
    font.forEach((e) => {
        e.style.fontSize = size
    })
}



function generateHealthBanner(pokemon = pokemonList[3], bottomRightUser = false) {
    let bannerFragment = document.createDocumentFragment()    

    let divBanner = document.createElement("div")
    divBanner.setAttribute(`id`, "bannerText")

    let nameText = document.createElement("p")
    nameText.textContent = `${pokemon.name} ${Math.random() > 0.5 ? "⚨" : "♀"}`
    // nameText.style.fontSize = `${window.s}px`

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

    healthBar.appendChild(hp)
    healthBar.appendChild(health)
   

    healthInfo.appendChild(healthBar)

    if (bottomRightUser) {
        healthInfo.appendChild(healthValue(pokemon.stats.hp))
        leftPokemon.src = `https://img.pokemondb.net/sprites/black-white/anim/back-normal/${pokemon.name.toLowerCase()}.gif`
    } else {
        healthBar.style.height = "25%"
        rightPokemon.src = `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name.toLowerCase()}.gif`

    }
    
    bannerFragment.appendChild(divBanner)
    bannerFragment.appendChild(healthInfo)

    

    return bannerFragment
}

function healthValue(hpUser) {
    let hp = document.createElement("p")
    hp.textContent = `${hpUser}/${hpUser}`
    hp.id = "health_value"
    return hp

}


