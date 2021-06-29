import { checkColor , checkBoolean, checkProbability, checkInteger} from "./checkLegality.js"

let state = {}
let elements = ["onOff","parent","positiveColor","neutralColor","negativeColor","positiveThreshold","negativeThreshold","positiveComments","neutralComments","negativeComments"]
let types = ["bool", "bool", "color", "color", "color", "probability", "probability", "integer", "integer", "integer"]

function getState(name, callback){
    chrome.runtime.sendMessage({ action: "sentimentGrabDataPopupToBackground", dataNames: name, callback: callback })
}

function callback(message, dataNames){
    for(const thing in message){
        state[thing] = message[thing]
    }
    //render items
    for(let i=0; i< elements.length; i++){
        //loop through elements
        let className = elements[i]
        let classType = types[i]

        let elemDiv = document.getElementsByClassName(className)[0]
        let input = elemDiv.children[1]
        input.value = state[className]
        //do onFocusOut event
        input.addEventListener('focusout', (e) => {
            //check if legal
            let legality = false
            let target = e.target.value
            if(classType == "bool"){
                legality = checkBoolean(target)
                if(legality){target = (target == 'true');}
            }
            else if(classType == "color"){
                legality = checkColor(target)
            }
            else if(classType == "probability"){
                legality = checkProbability(target)
                if(legality){target = parseFloat(target,10)}
            }
            else{
                legality = checkInteger(target)
                if(legality){target = parseInt(target,10)}}
            if(legality){console.log(target)}

            //if is, update state and send to background which sends to content
            if(legality){
                state[className] = target
                chrome.runtime.sendMessage({ action: "setData", dataName: className, value: target, callback: null })
            }
            //if not, get state and revert value back to the state
            else{input.value = state[className]}
        })
    }
}

chrome.runtime.onMessage.addListener(
    function(message){
        if(message.action == "sentimentGrabDataBackgroundToPopup"){
            callback(message.data, message.dataNames)
        } else if (message.action == "timeGrabDataBackgroundToPopup"){

        } else {
            console.log("recieved weird action from background/content js")
        }
    }
)

window.addEventListener('load', (e) => {
    getState(elements, callback)
})