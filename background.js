/*let sentTracker = {
    "onOff": false,
    "parent": false,

    "positiveColor": "green",
    "neutralColor": "gray",
    "negativeColor": "red",
    "positiveThreshold": 0.33,
    "negativeThreshold": 0.33,

    "positiveComments": 0.0,
    "neutralComments": 0.0,
    "negativeComments": 0.0
}*/

function saveData(data){
    chrome.storage.local.set(data, function(){
        console.log("saved")
    })
}

chrome.runtime.onInstalled.addListener(function(){
    saveData({
        "onOff": false,
        "parent": false,
    
        "positiveColor": "green",
        "neutralColor": "gray",
        "negativeColor": "red",
        "positiveThreshold": 0.33,
        "negativeThreshold": 0.33,
    
        "positiveComments": 0.0,
        "neutralComments": 0.0,
        "negativeComments": 0.0
    })
    saveData({"active": ""})
})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    console.log("recieved action item from js file: "+message.action)
    if(message.action == "sentimentGrabDataPopupToBackground"){
        dataName = message.dataName
        console.log("accessing data with name "+dataName)
        console.log("sender is "+sender)
        chrome.storage.local.get(dataName, function(data){
            console.log("got data")
            console.log(data)
            chrome.runtime.sendMessage({
                action: "sentimentGrabDataBackgroundToPopup",
                data: data[dataName],
                callback: message.callback
            }) 
        })
    } else if (message.action == "timeGrabWebsiteContentToBackground"){
        chrome.storage.local.get("active", function(items){
            console.log("getting..."+items.active)
            data = items.active
            if(data){
                console.log(data)
            } else {
                chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                    let url = tabs[0].url;
                    console.log(url)
                    saveData({"active": url})
                })
            }
            console.log("done")
        })
    } else {
        console.log("got werid action request from helper or content js")
    }
})
/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.type == "getInitialParameters"){
            sendResponse({farewell: sentTracker})
        }else if (request.type == "change"){
            sentTracker[variable] = value
            console.log(sentTracker)
        }
});*/