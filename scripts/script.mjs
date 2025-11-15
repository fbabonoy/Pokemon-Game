import { Player } from "./player.mjs";
import { Pokemon } from "./PokemonGenerator.mjs";

let fightArea = document.getElementById("battle_arena")
let body = document.querySelector("body")
let fightAnimation = document.querySelector("#fight_animation")

let textBox = document.querySelector("#outer_box")
let info = document.querySelector("#info")

let insideBox = document.querySelector("#info")
let fontSizeAS = document.querySelectorAll("#action_selector p")

let popOverBanner = document.querySelector("#Pop-Over")
let restartBtn = document.createElement("button")
let gameStart = document.createElement("button")



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



updatePokemon("random").then(() => {
    startGame()

})

popOverBanner.style.zIndex = 3
popOverBanner.style.opacity = `95%`;

async function startGame() {
    popOverBanner.innerHTML = ""
    topPlayer.selector = []
    bottomPlayer.selector = []
    topPlayer.pokemon = []
    bottomPlayer.pokemon = []
    popOverBanner.style.opacity = `95%`;

    let fragment = document.createDocumentFragment()

    let list = await new Pokemon().list()

    let playersView = document.createElement("div")
    let player1Selector = generateSelector(list, "player1")
    let player2Selector = generateSelector(list, "player2")
    playersView.classList.add("selectorView")

    playersView.appendChild(player1Selector)
    playersView.appendChild(player2Selector)



    gameStart.style.fontSize = `20px`

    //TODO: need random toggle
    gameStart.classList.add("select")
    gameStart.textContent = "Start Game"

    fragment.appendChild(playersView)
    fragment.appendChild(gameStart)
    popOverBanner.appendChild(fragment)

    popOverBanner.style.zIndex = 3

}



function generateSelector(list = [], id) {
    let playerName = id.slice(0, -1)
    let playerNum = id.slice(-1)
    let playerSelector = document.createElement("select")
    let selectorScreen = document.createElement("div")
    let player = document.createElement("h1")

    selectorScreen.style.textAlign = "center"

    player.textContent = `${playerName} ${playerNum}`
    player.style.color = "white"

    selectorScreen.appendChild(player)
    playerSelector.id = id
    playerSelector.style.width = `${innerWidth / 4}px`
    playerSelector.style.color = "rgb(200, 210, 203)"
    playerSelector.style.backgroundColor = "rgb(3, 71, 21)"

    let fragment = document.createDocumentFragment()

    let option = document.createElement("option")
    option.textContent = "select Pokemon"
    fragment.appendChild(option)
    for (let i of list) {
        let option = document.createElement("option")
        option.textContent = i
        option.style.textAlign = "center"
        fragment.appendChild(option)
    }

    playerSelector.appendChild(fragment)

    playerSelector.addEventListener("change", loadPokemon)

    selectorScreen.appendChild(playerSelector)

    let screen = document.createElement("div")
    screen.id = `${playerName}selector${playerNum}`

    selectorScreen.appendChild(screen)

    return selectorScreen
}


function loadPokemon(e) {
    if (e.target.value === "select Pokemon") return
    
    if (e.target.id === "player1") {

        if (topPlayer.selector.length < 4 && !topPlayer.selector.includes(e.target.value)) {
            topPlayer.selector.push(e.target.value)
            console.log(topPlayer.selector)
            showListOfSelectedPokemon("playerselector1", topPlayer)

        }

    } else {
        if (bottomPlayer.selector.length < 4 && !bottomPlayer.selector.includes(e.target.value)) {
            bottomPlayer.selector.push(e.target.value)
            showListOfSelectedPokemon("playerselector2", bottomPlayer)

        }
    }


}

function showListOfSelectedPokemon(where, player) {
    let list = document.querySelector(`#${where}`)
    list.innerHTML = ""
    for (let i of player.selector) {
        let pokemonName = document.createElement("p")
        pokemonName.textContent = i
        pokemonName.classList.add("pokemonName")
        list.appendChild(pokemonName)
    }
}


let leftBanner = document.querySelector("#pokemon_info")
let rightBanner = document.querySelector("#right-pokemon_info")

async function updatePokemon(selection) {
    info.innerHTML = ""
    info.textContent = `player one's turm`

    if (topPlayer.pokemon.length === 0 || bottomPlayer.pokemon.length === 0) {
        await topPlayer.getPokemon(selection)
        await bottomPlayer.getPokemon(selection)

    }

    leftBanner.innerHTML = ""
    leftBanner.appendChild(generateHealthBanner(topPlayer.currentPokemon))

    rightBanner.innerHTML = ""
    rightBanner.appendChild(generateHealthBanner(bottomPlayer.currentPokemon, true))
}

let fontSizeHB = document.querySelectorAll("#bannerText")


window.addEventListener("DOMContentLoaded", (e) => {
    resizeGameBoard()
    // Force layout recalculation on mobile
    setTimeout(() => {
        resizeGameBoard()
    }, 100)
})

window.addEventListener("resize", (e) => {
    resizeGameBoard()
})

window.addEventListener("orientationchange", (e) => {
    setTimeout(() => {
        resizeGameBoard()
    }, 100)
})

window.addEventListener("load", (e) => {
    resizeGameBoard()
})

fightButton.addEventListener("click", (e) => {
    const button = e.target.closest("button")
    loadMenu(button, e.target)
})

restartBtn.addEventListener("click", () => {
    startGame()

})

gameStart.addEventListener("click", (e) => {
    console.log(e.target.className, "hello");
    
    // If no Pokemon selected, start with random Pokemon
    if (topPlayer.selector.length === 0 && bottomPlayer.selector.length === 0) {
        updatePokemon("random").then(() => {
            popOverBanner.style.zIndex = -3
            // Force layout recalculation after game starts
            setTimeout(() => {
                resizeGameBoard()
            }, 50)
        })
    } else if (topPlayer.selector.length < 4 && topPlayer.selector.length === bottomPlayer.selector.length) {
        updatePokemon(e.target.className).then(() => {
            popOverBanner.style.zIndex = -3
            // Force layout recalculation after game starts
            setTimeout(() => {
                resizeGameBoard()
            }, 50)
        })
    } else {
        let length
        if (topPlayer.selector.length > bottomPlayer.selector.length) {
            length = topPlayer.selector.length
        } else {
            length = bottomPlayer.selector.length
        }
        alert(`Each player needs ${length} pokemon and no more than 4`)
    }
})


function loadMenu(button, target) {

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
        console.log(oponentPlayer.currentPokemon.stats.hpLeft)
        console.log(oponentPlayer.pokemon.length);

        if (oponentPlayer.currentPokemon.stats.hpLeft <= 0 && oponentPlayer.pokemon.length > 0) {
            console.log("he is down")
            console.log(oponentPlayer.pokemon.shift())
            updatePokemon()

        } 

        if (oponentPlayer.pokemon.length === 0) {
            loadGameOver()
        }

        info.innerHTML = ""
        info.textContent = `player ${topPlayerTurn ? "two" : "one"}'s turm`
        return
    }


    actionButtons(button, currentPlayer)


}

function loadGameOver() {
    topPlayerTurn = false
    popOverBanner.innerHTML = ""

    let fragment = document.createDocumentFragment()

    let gameText = document.createElement("p")
    gameText.textContent = "Game Over"
    gameText.style.fontSize = `${innerWidth / 15}px`

    let whoLost = document.createElement("p")
    whoLost.textContent = `${!topPlayerTurn? "player 1" : "player 2"} lost`
    whoLost.style.fontSize = `${innerWidth / 25}px`

    restartBtn.textContent = "restart"
    restartBtn.style.fontSize = `${innerWidth / 25}px`

    fragment.appendChild(gameText)
    fragment.appendChild(whoLost)
    fragment.appendChild(restartBtn)

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
    
    // Resize buttons after they're created
    setTimeout(() => {
        let buttonOptions = document.querySelectorAll("#buttonOptions button")
        resizeButtons(buttonOptions, `${window.innerWidth * 0.02}px`)
    }, 10)
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
    } else if (Number(button.className) >= 0) {
        console.log(button.className);

        changePokemon(Number(button.className))
    } else {
        updateBanner(Number(button.className), currentPlayer, oponentPlayer.bag, topPlayerTurn, button.id)
    }
}

function changePokemon(index) {
    currentPlayer.index = index
    updatePokemon()
    actionBanner.style.zIndex = -1
}


//loading is faling here
function updateBanner(modifier, pokemon, attacker, topPlayerTurn, buttonId) {


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





function generateHealthBanner(pokemon = bottomPlayer.pokemon[0], bottomRightUser = false) {
    let bannerFragment = document.createDocumentFragment()

    let divBanner = document.createElement("div")
    divBanner.setAttribute(`class`, "bannerText")

    let nameText = document.createElement("p")
    nameText.textContent = `${pokemon.name}`

    let levelText = document.createElement("p")
    levelText.textContent = "Lv60"

    divBanner.appendChild(nameText)
    divBanner.appendChild(levelText)


    let healthInfo = document.createElement("div")
    healthInfo.classList.add("animationHealth")
    healthInfo.style.width = "100%"

    let healthBar = document.createElement("div")
    healthBar.setAttribute(`id`, "healthBar")

    let hp = document.createElement("p")
    hp.textContent = "HP"

    let health = document.createElement("div")

    healthInfo.appendChild(healthBar)

    if (bottomRightUser) {
        // healthInfo.appendChild(healthValue(pokemon.stats))
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

// function healthValue(hpUser) {
//     let hp = document.createElement("p")
//     hp.textContent = `${hpUser.hpLeft}/${hpUser.hp}`
//     hp.id = "health_value"
//     return hp

// }



function resizeGameBoard() {
    let bannerText = document.querySelectorAll(".bannerText")
    let selector = document.querySelectorAll(".selectorView")
    let selectPok = document.querySelectorAll(".select")
    let player1 = document.querySelector("#player1")
    let player2 = document.querySelector("#player2")
    let buttonOptions = document.querySelectorAll("#buttonOptions button")

    

    if (player1) {
        player1.style.width = "100%"
        player2.style.width = "100%"

    }
    if (selectPok) {

        for (let banner of selectPok) {
            banner.style.fontSize = `${window.innerWidth * 0.02}px`
        }
    }

    if (selector) {
        for (let banner of selector) {
            banner.style.fontSize = `${window.innerWidth * 0.02}px`
        }
    }

    if (bannerText) {
        for (let banner of bannerText) {
            banner.style.fontSize = `${window.innerWidth * 0.03}px`
        }

    }

    resizeButtons(fontSizeAS, `${window.innerWidth * 0.025}px`)
    resizeButtons(fontSizeHB, `${window.innerWidth * 0.025}px`)
    resizeButtons(buttonOptions, `${window.innerWidth * 0.02}px`)

    if (window.innerWidth > 1018 && window.innerHeight < 700) {
        return
    } else if (window.innerWidth < 934 || window.innerHeight < 700) {
        fightArea.style.width = `934px`
        fightArea.style.height = `500px`
        resizeButtons(fontSizeHB, `${window.innerWidth * 0.033}px`)
        resizeButtons(buttonOptions, `${window.innerWidth * 0.025}px`)
        return
    }

    body.style.minHeight = `${window.innerHeight}px`


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