import { catsData } from "./data.js"

const EmotionRadiosDiv = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById("gifs-only-option")

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

getImageBtn.addEventListener('click', getMatchingCatsArray)

function getMatchingCatsArray(e) {
    const selectedItem = document.querySelector('input[type="radio"]:checked')
    if(selectedItem) {
        const selectedEmotion = selectedItem.value
        const matchingEmCats = catsData.filter(function(cat) {
            return cat.emotionTags.includes(selectedEmotion)
        })
        console.log(matchingEmCats)
        console.log(selectedItem.value)
    }
    const isGifsOnly = gifsOnlyOption.checked
    console.log(isGifsOnly)
}

EmotionRadiosDiv.addEventListener("change", highlightCheckedOption)

function highlightCheckedOption(e){

    const radioItems = document.getElementsByClassName("radio")
    for (let radioItem of radioItems) {
        radioItem.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
    console.log(e.target.id)
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

 