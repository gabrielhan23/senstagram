
let buttonThing = document.getElementById("instagramjunk")
buttonThing.onclick = function(){
    let message = "instagram"
    console.log("contacting content.js for " + message)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: message}, function(response) {
            console.log(response);
        });
    });
}
