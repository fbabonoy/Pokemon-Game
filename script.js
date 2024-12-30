let fightArea = document.getElementById("battle_arena")
let body = document.querySelector("body")
let fightAnimation = document.querySelector("#fight_animation")
let textBox = document.querySelector("#outer_box")
let insideBox = document.querySelector("#info")
let fontSize = document.querySelectorAll("#action_selector p")


window.addEventListener("load" , (e) => {  
    resizeGameBoard()

})


window.addEventListener("resize" , (e) => {    
    resizeGameBoard()
})



function resizeGameBoard() {
    body.style.minHeight = `${window.innerHeight}px`
    resizeButtons(`${window.innerWidth * 0.025}px`)

    console.log(window.innerWidth);
    
    if (window.innerWidth < 934 || window.innerHeight < 700 ) {
        fightArea.style.width = `934px`
        fightArea.style.height = `500px`
        return
    } else if ( window.innerWidth > 1718 && window.innerHeight < 700) {
        fightArea.style.width = `1718px`
        fightArea.style.height = `500px`
    }


    fightArea.style.width = `${window.innerWidth * 0.8}px`
    fightArea.style.height = `${window.innerHeight * 0.8}px`

    textBox.style.height = "100%"
    textBox.style.width = "50%"

    insideBox.style.height = "88%"
    insideBox.style.width = "93%"
}

function resizeButtons(size = "large") {
    fontSize.forEach((e) => {
        e.style.fontSize = size
    })
}