/*
#Reference code

let buttonThing = document.getElementById("instagramjunk")
buttonThing.onclick = function(){
    let message = "instagram"
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: message}, function(response) {
            console.log(response);
        });
    });
}*/
