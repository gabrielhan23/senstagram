let state = {}
let elements = ["onOff","parent","positiveColor","neutralColor","negativeColor","positiveThreshold","negativeThreshold","positiveComments","neutralComments","negativeComments"]
let types = ["bool", "bool", "color", "color", "color", "probability", "probability", "number", "number", "number"]

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
        let elemDiv = document.getElementsByClassName(className)[0]
        let input = elemDiv.children[1]
        input.value = state[className]
        //do onFocusOut event
        input.addEventListener('focusout', (e) => {
            //check if legal
            //if is, update state and send to background which sends to content
            //if not, get state and revert value back to the state
            console.log(e.target.value)
            console.log(state)
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