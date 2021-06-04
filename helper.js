/*
#Reference code
let buttonThing = document.getElementById("instagramjunk")
buttonThing.onclick = function(){
    let message = "instagram"
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: message}, function(response) {
            
        });
    });
}*/

function callback(message){
    console.log("callback is working "+message)
}

getData("positiveColor", callback)

function getData(name, callback){
    console.log("starting function getData")
    chrome.runtime.sendMessage({ action: "sentimentGrabDataPopupToBackground", dataName: name, callback: callback })
}

chrome.runtime.onMessage.addListener(
    function(message){
        if(message.action == "sentimentGrabDataBackgroundToPopup"){
            console.log(message)
            callback(message.data)
        } else if (message.action == "timeGrabDataBackgroundToPopup"){

        } else {
            console.log("recieved weird action from background/content js")
        }
    }
)

function query(message, func){
    chrome.runtime.sendMessage(message, func);
}

window.addEventListener('load', (e) => {
    let parameters = null

    let message = {type: "getInitialParameters"}

    query(message, function(response){
        parameters = response.farewell
        for(const value in parameters){
            let elem = document.getElementsByClassName(value)[0]
            elem.children[1].value = parameters[value]
            //elem.children[1].addEventListener('change', function(e){
                //let changeMessage = {type: "change", value: e.target.value, variable: value}
                //console.log("bruh")
                //query(changeMessage, function(response){})
            //})
        }
    })
})