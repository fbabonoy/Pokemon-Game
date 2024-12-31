let leftBanner =document.querySelector("#pokemon_info")
leftBanner.appendChild(generateHealthBanner())

function generateHealthBanner() {
    let bannerFragment = document.createDocumentFragment()
    

    let divBanner = document.createElement("div")
    divBanner.setAttribute(`id`, "bannerText")

    let nameText = document.createElement("p")
    nameText.textContent = "Blastoise ⚨"

    let levelText = document.createElement("p")
    levelText.textContent = "Lv17"

    divBanner.appendChild(nameText)
    divBanner.appendChild(levelText)
    

    let healthBar = document.createElement("div")
    healthBar.setAttribute(`id`, "healthBar")

    let hp = document.createElement("p")
    hp.textContent = "HP"

    let health = document.createElement("div")

    healthBar.appendChild(hp)
    healthBar.appendChild(health)

    
    
    bannerFragment.appendChild(divBanner)
    bannerFragment.appendChild(healthBar)

    return bannerFragment
}