let sentTracker = {
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
}

function saveData(data){
    chrome.storage.local.set(data, function(){
        console.log("saved")
    })
}

chrome.runtime.onInstalled.addListener(function(){
    saveData({"active": ""})
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "getInitialParameters"){
            sendResponse({farewell: sentTracker})
        }else if (request.type == "change"){
            sentTracker[variable] = value
            console.log(sentTracker)
        }
});