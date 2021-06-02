document.getElementById("youtubejunk").onclick = contactContent("youtube")
document.getElementById("instagramjunk").onclick = contactContent("instagram")

function contactContent(message) {
    console.log("contacting content.js for "+message)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: message}, function(response) {
            console.log(response);
        });
    });
}