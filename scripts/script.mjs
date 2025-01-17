import { Player } from "./player.mjs";
let fightArea = document.getElementById("battle_arena")
let body = document.querySelector("body")
let fightAnimation = document.querySelector("#fight_animation")
let textBox = document.querySelector("#outer_box")
let insideBox = document.querySelector("#info")
let fontSizeAS = document.querySelectorAll("#action_selector p")

let popOverBanner = document.querySelector("#Pop-Over")
let button = document.createElement("button")


let fightButton = document.querySelector("#action_selector")

let actionBanner = document.querySelector("#action_banner")
let backButton = document.querySelector("#backButton")


let rightPokemonSprite = document.querySelector("#right_pokemon")
let leftPokemonSprite = document.querySelector("#left_pokemon")

let topPlayerTurn = false
let currentPlayer
let oponentPlayer

const topPlayer = new Player("brok", { "potion": { power: -40, maxUses: 5, currentUses: 5 } })
const bottomPlayer = new Player("ash", { "potion": { power: -40, maxUses: 5, currentUses: 5 } })



//need to make this a funciton so that it updates when they change pokemon
updatePokemon()
// loadGameOver()  



let leftBanner = document.querySelector("#pokemon_info")
let rightBanner = document.querySelector("#right-pokemon_info")

async function updatePokemon() {  
    if (!topPlayer.pokemon || !bottomPlayer.pokemon) {
        await topPlayer.getPokemon()
        await bottomPlayer.getPokemon()

    }

    leftBanner.innerHTML = ""
    leftBanner.appendChild(generateHealthBanner(topPlayer.currentPokemon))

    rightBanner.innerHTML = ""
    rightBanner.appendChild(generateHealthBanner(bottomPlayer.currentPokemon, true))
}

let fontSizeHB = document.querySelectorAll("#bannerText")


window.addEventListener("DOMContentLoaded", (e) => {
    resizeGameBoard()
})

window.addEventListener("resize", (e) => {
    resizeGameBoard()
})

fightButton.addEventListener("click", (e) => {
    const button = e.target.closest("button")
    loadMenu(button, e.target)
})

button.addEventListener("click", ()=>{
    topPlayer.pokemon = null
    bottomPlayer.pokemon = null
    updatePokemon().then(()=>{
        popOverBanner.style.zIndex = -3

    })
   

    
})

async function loadMenu(button, target) {
    
    if (topPlayerTurn) {
        currentPlayer = topPlayer
        oponentPlayer = bottomPlayer
    } else {
        currentPlayer = bottomPlayer
        oponentPlayer = topPlayer
    }

    if (target.id === "backButton" || !button) {
        return
    } else if (target.closest("button").className) {
        if (Number(button.className) === currentPlayer.index) return

        menuAction(button, currentPlayer.currentPokemon, oponentPlayer.currentPokemon)
        topPlayerTurn = !topPlayerTurn
        if (oponentPlayer.currentPokemon.stats.hpLeft < 1 && oponentPlayer.pokemon.length > 1) {
            console.log("he is down")
            console.log(oponentPlayer.pokemon.shift())
            updatePokemon()
        } else {
            console.log("game over");
            loadGameOver()
            
        }
        return
    }


    actionButtons(button, currentPlayer)
}

function loadGameOver() {
    popOverBanner.innerHTML = ""

    let fragment = document.createDocumentFragment()

    let gameText = document.createElement("p")
    gameText.textContent = "Game Over" 
    gameText.style.fontSize = `${innerWidth / 9}px`

    button.textContent = "restart"
    button.style.fontSize = `${innerWidth / 20}px`

    fragment.appendChild(gameText)
    fragment.appendChild(button)

    popOverBanner.appendChild(fragment)
    popOverBanner.style.zIndex = 3
}

function actionButtons(button, currentPlayer = bottomPlayer) {
    let optionsMenu = document.querySelector("#buttonOptions")
    optionsMenu.innerHTML = ""

    if (button.id === "fight") {
        setMenuButttons(currentPlayer.currentPokemon.attacks, optionsMenu)
    } else if (button.id === "pokemon") {
        showAllPokemon(currentPlayer.getPokemonList())
    } else if (button.id === "bag") {
        setMenuButttons(currentPlayer.bag)
    } else if (button.id === "run") {
        loadGameOver()
        return
    }
    actionBanner.style.zIndex = 0
}

function showAllPokemon(currentPokemon = bottomPlayer.pokemon) {
    for (let option in currentPokemon) {
        let button = document.createElement("button");
        button.textContent = `${currentPokemon[option].name} ${currentPokemon[option].stats.hpLeft}/${currentPokemon[option].stats.hp}`
        button.style.height = `49%`
        button.style.width = `49%`
        // console.log(option);

        button.classList.add(`${option}`)
        buttonOptions.appendChild(button);
    }
}


function menuAction(button, currentPlayer, oponentPokemon) {

    if (Number(button.className) > 6) {
        updateBanner(Number(button.className), oponentPokemon, currentPlayer.attacks, !topPlayerTurn, button.id)
    } else if(Number(button.className) >= 0){
    console.log(button.className);

        changePokemon(Number(button.className))
    } else {
        updateBanner(Number(button.className), currentPlayer, oponentPlayer.bag, topPlayerTurn, button.id)
    }
}

function changePokemon(index){
    currentPlayer.index = index
    updatePokemon()
    actionBanner.style.zIndex = -1
}


//loading is faling here
function updateBanner(modifier, pokemon, attacker, topPlayerTurn, buttonId) {

    let hpBanner = document.getElementById("health_value")

    if (pokemon.stats.hpLeft > pokemon.stats.hp) {
        pokemon.stats.hpLeft = pokemon.stats.hp
    } else if (pokemon.stats.hpLeft < 0) {
        pokemon.stats.hpLeft = 0
    }
    
    if (attacker[buttonId].currentUses > 0) {
        pokemon.stats.hpLeft -= modifier
        attacker[buttonId].currentUses -= 1
    } else {
        pokemon.stats.hpLeft -= 15
    }

    let getsearchBar = ""
    if (topPlayerTurn) {
        getsearchBar = "#top_hp_animate"
    } else {
        getsearchBar = "#bottom_hp_animate"
        hpBanner.textContent = `${pokemon.stats.hpLeft}/${pokemon.stats.hp}`
    }

    let healthBar = document.querySelector(getsearchBar)

    healthBar.style.width = `${(pokemon.stats.hpLeft / pokemon.stats.hp) * 100}%`
    actionBanner.style.zIndex = -1
}


function setMenuButttons(currentPokemon) {
    for (let option in currentPokemon) {
        let button = document.createElement("button");
        button.textContent = `${option} ${currentPokemon[option].currentUses}/${currentPokemon[option].maxUses}`
        button.style.height = `49%`
        button.style.width = `49%`
        // console.log(option);
        // console.log(currentPokemon);

        // console.log(currentPokemon[option].power);
        button.id = option
        if (!currentPokemon[option].power) {
            button.classList.add(15)
        } else {
            button.classList.add(currentPokemon[option].power)
        }
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
    nameText.textContent = `${pokemon.name}`

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


