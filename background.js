function saveData(data){
    chrome.storage.local.set(data, function(){
        console.log("saved")
    })
}

chrome.runtime.onInstalled.addListener(function(){
    saveData({"active": ""})
})

chrome.runtime.onMessage.addListener(function(message, callback){
    console.log(message)
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
})
    