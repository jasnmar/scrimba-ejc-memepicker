import { catsData } from "./data.js"

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

const EmotionRadiosDiv = document.getElementById("emotion-radios")

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

 