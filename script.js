let fightArea = document.getElementById("battle_arena")
let body = document.querySelector("body")
let fightAnimation = document.querySelector("#fight_animation")
let textBox = document.querySelector("#outer_box")
let insideBox = document.querySelector("#info")
let fontSizeAS = document.querySelectorAll("#action_selector p")


let leftBanner = document.querySelector("#pokemon_info")
leftBanner.appendChild(generateHealthBanner())

let rightBanner = document.querySelector("#right-pokemon_info")
rightBanner.appendChild(generateHealthBanner(true))

let fontSizeHB = document.querySelectorAll("#bannerText")



window.addEventListener("load" , (e) => {  
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



function generateHealthBanner(bottomRightUser = false) {
    let bannerFragment = document.createDocumentFragment()
    

    let divBanner = document.createElement("div")
    divBanner.setAttribute(`id`, "bannerText")

    let nameText = document.createElement("p")
    nameText.textContent = "Blastoise ⚨"
    nameText.style.fontSize = `${window.s}px`

    let levelText = document.createElement("p")
    levelText.textContent = "Lv17"

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
        healthInfo.appendChild(healthValue())

    } else {
        healthBar.style.height = "25%"
    }
    
    bannerFragment.appendChild(divBanner)
    bannerFragment.appendChild(healthInfo)

    

    return bannerFragment
}

function healthValue() {
    let hp = document.createElement("p")
    hp.textContent = "45/45"
    hp.id = "health_value"
    return hp

}