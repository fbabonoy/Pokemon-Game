let leftBanner = document.querySelector("#pokemon_info")
leftBanner.appendChild(generateHealthBanner())

let rightBanner = document.querySelector("#right-pokemon_info")

rightBanner.appendChild(generateHealthBanner(true))


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