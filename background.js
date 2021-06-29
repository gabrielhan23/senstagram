function saveData(data){
    chrome.storage.local.set(data, function(){
        console.log("saved")

        //let bruv = []
        //for(const thing in data){
        //    bruv.push(thing)
        //}
        //chrome.storage.local.get(bruv, function(result){console.log(result)})
    })
}

chrome.runtime.onInstalled.addListener(function(){
    chrome.browserAction.setIcon({ path: "senstagram128.jpg" });
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
    if(message.action == "sentimentGrabDataPopupToBackground"){
        dataNames = message.dataNames
        chrome.storage.local.get(dataNames, function(data){
            chrome.runtime.sendMessage({
                action: "sentimentGrabDataBackgroundToPopup",
                dataNames: dataNames,
                data: data,
                callback: message.callback
            }) 
        })
    } else if (message.action == "timeGrabWebsiteContentToBackground"){
        chrome.storage.local.get("active", function(items){
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
        })
    } else if (message.action == "setData"){
        let name = message.dataName
        let value = message.value
        let data = {name : value}
        saveData(data)
    } else {
        console.log("got weird action request from helper or content js")
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