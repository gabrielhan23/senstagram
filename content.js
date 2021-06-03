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


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "getInitialParameters"){
            sendResponse({farewell: sentTracker})
        }else if (request.type == "change"){
            sentTracker[variable] = value
            console.log(sentTracker)
        }
});

function youtubeComments(){
    $("head").append('<style type="text/css">#stupid.ytd-comment-renderer{--yt-endpoint-color: var(--yt-spec-call-to-action);--yt-endpoint-hover-color: var(--yt-spec-call-to-action);--yt-endpoint-visited-color: var(--yt-spec-call-to-action);color: var(--yt-spec-text-primary);font-size: var(--ytd-user-comment_-_font-size);font-weight: var(--ytd-user-comment_-_font-weight);line-height: var(--ytd-user-comment_-_line-height);letter-spacing: var(--ytd-user-comment_-_letter-spacing);line-height: 2rem;}</style>');
    comment = document.querySelector("yt-formatted-string#content-text")
    if(comment != null){
        commentText = comment.innerText
        post("https://sendstuff.1234567890hihi.repl.co/3000",[commentText],youtubeColor)
    }
}

function youtubeColor(data){
    comment = document.querySelector("yt-formatted-string#content-text")
    if(data.response[0].tag_name == 'Positive'){comment.style.backgroundColor = '#008000'} //green
    else if(data.response[0].tag_name == 'Negative'){comment.style.backgroundColor = '#FF0000'} //red
    else if(data.response[0].tag_name == 'Neutral'){comment.style.backgroundColor = '#808080'} //gray
    comment.id = "stupid"
    //window.alert("next?")
    //youtubeComments()
}

function post(url,info,func){
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

function preprocess(text){
    //should take care of things like @ signs, mentions, etc.
    
    return text;
}

function color(myItem, myResponse){
    if(myResponse.tag_name == 'Positive'){myItem.style.backgroundColor = '#008000'} //green
    else if(myResponse.tag_name == 'Negative'){myItem.style.backgroundColor = '#FF0000'} //red
    else if(myResponse.tag_name == 'Neutral'){myItem.style.backgroundColor = '#808080'} //gray
    else{}
}

window.addEventListener('load', (e) => {
    var processedQueries = []
    var processedResponses = []

    var myDivs = document.getElementsByClassName("C4VMK")
    var inThing = []

    for(let i=0; i< myDivs.length;i++){ 
        //should access by span, instead of 1. Accessing by 1 can be risky and is more prone to errors if a change happens
        var myItem = myDivs.item(i).children[1]
        inThing.push(preprocess(myItem.textContent))
    }

    function instagramFunction(data){
        myResponses = data.response;
        console.log(myResponses)
        for(let i=0; i< inThing.length; i++){
            processedQueries.push(inThing[i])
            processedResponses.push(myResponses[i])
        }
        for(let i=0; i<inThing.length; i++){
            let myItem = myDivs[i]
            let myResponse = myResponses[i]
            //object properties: tag_name, tag_id, confidence
            color(myItem, myResponse)
        }
    }
    post("https://sendstuff.1234567890hihi.repl.co/3000", inThing, instagramFunction)

    //all possible subcomments
    var mySubcomments = document.getElementsByClassName("TCSYW")
    for(let i=0; i<mySubcomments.length;i++){
        //individual subcomments HTML object
        let subComment = mySubcomments.item(i)
        subComment.addEventListener('DOMSubtreeModified', e=>{
            //individual subcomment HTML object
            let divs = []

            //individual subcomment textContent
            let subInThing = []
            for(let y=subComment.children.length-1; y<subComment.children.length;y++){
                let indSubcomment = subComment.children[y]
                if(indSubcomment.className =="_61Di1"){break}
                let commentDiv = indSubcomment.getElementsByClassName("C4VMK")[0]
                let textComment = commentDiv.children[1].textContent
                divs.push(commentDiv)
                subInThing.push(preprocess(textComment))
            }

            //check if processed already
            let processedDivs = []
            let processedSub = []

            //error here
            for(let i=0; i<subInThing.length; i++){
                if(!processedQueries.includes(subInThing[i])){
                    processedDivs.push(divs[i])
                    processedSub.push(subInThing[i])
                }else{
                    //load processed here
                    let processedIndex = processedQueries.indexOf(subInThing[i])
                    let myItem = divs[i]
                    let myResponse = processedResponses[processedIndex]
                    //object properties: tag_name, tag_id, confidence
                    color(myItem, myResponse)
                }
            }

            function commentInstagramFunction(data){
                myResponses = data.response
                for(let i=0; i< processedSub.length; i++){
                    processedQueries.push(processedSub[i])
                    processedResponses.push(myResponses[i])
                }

                for(let i=0; i<subInThing.length; i++){
                    let myItem = processedDivs[i]
                    let myResponse = myResponses[i]
                    //object properties: tag_name, tag_id, confidence
                    color(myItem, myResponse)
                }
            }

            post("https://sendstuff.1234567890hihi.repl.co/3000", processedSub, commentInstagramFunction)
        })
    }
    
});
