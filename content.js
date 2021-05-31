function preprocess(text){
    //should take care of things like @ signs, mentions, etc.
    
    return text;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

        if (request.greeting == "hello"){
            window.alert("This is a test")
            youtubeComments()
            sendResponse({farewell: "goodbye"});
        }
});

function youtubeComments(){
    $("head").append('<style type="text/css">#stupid.ytd-comment-renderer{--yt-endpoint-color: var(--yt-spec-call-to-action);--yt-endpoint-hover-color: var(--yt-spec-call-to-action);--yt-endpoint-visited-color: var(--yt-spec-call-to-action);color: var(--yt-spec-text-primary);font-size: var(--ytd-user-comment_-_font-size);font-weight: var(--ytd-user-comment_-_font-weight);line-height: var(--ytd-user-comment_-_line-height);letter-spacing: var(--ytd-user-comment_-_letter-spacing);line-height: 2rem;}</style>');
    comment = document.querySelector("yt-formatted-string#content-text")
    console.log(comment)
    if(comment != null){
        commentText = comment.innerText
        console.log(commentText)
        post("https://sendstuff.1234567890hihi.repl.co/3000",[commentText],youtubeColor)
    }
}

function youtubeColor(data){
    console.log(data.response[0].tag_name)
    comment = document.querySelector("yt-formatted-string#content-text")
    if(data.response[0].tag_name == 'Positive'){comment.style.backgroundColor = '#008000'} //green
    else if(data.response[0].tag_name == 'Negative'){comment.style.backgroundColor = '#FF0000'} //red
    else if(data.response[0].tag_name == 'Neutral'){comment.style.backgroundColor = '#808080'} //gray
    comment.id = "stupid"
    //window.alert("next?")
    //youtubeComments()
}

function post(url,info,func){
    console.log("ajax initiating")
    $(function(){
        $.ajax({
            type: "POST",
            headers: {  'Access-Control-Allow-Origin': 'https://sendstuff.1234567890hihi.repl.co/3000' },
            url: url,
            data: {data: info},
            crossDomain : true,
            success: func
        })
    });
}

function instagramFunction(data){
    myResponses = data.response;
    for(let i=0; i<inThing.length; i++){
        let myItem = myDivs[i]
        //object properties: tag_name, tag_id, confidence
        if(myResponses[i].tag_name == 'Positive'){myItem.style.backgroundColor = '#008000'} //green
        else if(myResponses[i].tag_name == 'Negative'){myItem.style.backgroundColor = '#FF0000'} //red
        else if(myResponses[i].tag_name == 'Neutral'){myItem.style.backgroundColor = '#808080'} //gray
        else{}
    }
}

function commentInstagramFunction(data){
    myResponses = data.response
    for(let i=0; i<subInThing.length; i++){
        let myItem = divs[i]
        //object properties: tag_name, tag_id, confidence
        if(myResponses[i].tag_name == 'Positive'){myItem.style.backgroundColor = '#008000'} //green
        else if(myResponses[i].tag_name == 'Negative'){myItem.style.backgroundColor = '#FF0000'} //red
        else if(myResponses[i].tag_name == 'Neutral'){myItem.style.backgroundColor = '#808080'} //gray
        else{}
    }
}

window.addEventListener('load', (e) => {

    var myDivs = document.getElementsByClassName("C4VMK")
    var inThing = []

    for(let i=0; i< myDivs.length;i++){ 
        //should access by span, instead of 1. Accessing by 1 can be risky and is more prone to errors if a change happens
        var myItem = myDivs.item(i).children[1]
        inThing.push(preprocess(myItem.textContent))
    }

    //post("https://sendstuff.1234567890hihi.repl.co/3000", {data: inThing, length: inThing.length}, instagramFunction)

    var mySubcomments = document.getElementsByClassName("TCSYW")
    for(let i=0; i<mySubcomments.length;i++){
        let subComment = mySubcomments.item(i) 
        let reply = subComment.children[0]
        /*console.log(subComment)
        $('body').on('DOMSubtreeModified', 'myDiv', function(){
            console.log('changed');
        });
        subComment.addEventListener("change", e=>{
            console.log("there was a change")
            console.log(e)
        });*/
        reply.addEventListener('click', e=>{
            //console.log(subComment)
            let divs= []
            let subInThing = []
            for(let y=1; y<subComment.children.length;y++){
                let indSubcomment = subComment.children[y]
                let commentDiv = indSubcomment.getElementsByClassName("C4VMK")[0]
                let textComment = commentDiv.children[1].textContent
                divs.push(commentDiv)
                subInThing.push(preprocess(textComment))
            }
            post("https://sendstuff.1234567890hihi.repl.co/3000", {data: subInThing, length: subInThing.length}, commentInstagramFunction)
        })
    }

});