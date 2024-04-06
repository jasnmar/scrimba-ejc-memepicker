import { catsData } from "./data.js"

const EmotionRadiosDiv = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn")

getImageBtn.addEventListener('click', renderCat)
EmotionRadiosDiv.addEventListener("change", highlightCheckedOption)
memeModalCloseBtn.addEventListener('click', function() {
    memeModal.style.display = 'none'
})

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function getMatchingCatsArray(e) {
    const selectedItem = document.querySelector('input[type="radio"]:checked')
    const isGifsOnly = gifsOnlyOption.checked
    if(selectedItem) {
        const selectedEmotion = selectedItem.value
        const matchingCats = catsData.filter(function(cat) {
            if(cat.emotionTags.includes(selectedEmotion)) {
                if(isGifsOnly) {
                    if(cat.isGif) {
                        return true
                    }
                } else {
                    return true
                } 
            } 
        })
        return matchingCats
    }
}

function highlightCheckedOption(e){

    const radioItems = document.getElementsByClassName("radio")
    for (let radioItem of radioItems) {
        radioItem.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
    console.log(e.target.id)
}

function getSingleCat() {
    const catsArray = getMatchingCatsArray()
    if(catsArray.length===1) {
        return catsArray[0]
    } else {
        const randomIndex = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomIndex]
    }
}

function renderCat() {
    const catObject = getSingleCat()
    memeModalInner.innerHTML =        `
    <img 
    class="cat-img" 
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    >`
    memeModal.style.display = 'flex'
}

function renderEmotionsRadios(cats) {
    let emotionRadios = ""
    const emotions = getEmotionsArray(cats)
    console.log(emotions)
    for (let emotion of emotions) {
        const newEmotion = `<div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input id="${emotion}" type="radio" value="${emotion}" name="emotion" />
        </div>
        `
        emotionRadios += newEmotion
    }
    EmotionRadiosDiv.innerHTML = emotionRadios
}
renderEmotionsRadios(catsData)

 