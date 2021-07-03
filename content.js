function checkSite(){
    console.log("contacting background")
    chrome.runtime.sendMessage({request: "checksite"}, function(response){
        console.log(response)
    })
}


function youtubeComments(){
    $("head").append('<style type="text/css">#stupid.ytd-comment-renderer{--yt-endpoint-color: var(--yt-spec-call-to-action);--yt-endpoint-hover-color: var(--yt-spec-call-to-action);--yt-endpoint-visited-color: var(--yt-spec-call-to-action);color: var(--yt-spec-text-primary);font-size: var(--ytd-user-comment_-_font-size);font-weight: var(--ytd-user-comment_-_font-weight);line-height: var(--ytd-user-comment_-_line-height);letter-spacing: var(--ytd-user-comment_-_letter-spacing);line-height: 2rem;}</style>');
    comment = document.querySelector("yt-formatted-string#content-text")
    if(comment != null){
        commentText = comment.innerText
        post("https://sendstuff.1234567890hihi.repl.co/3000",[commentText],youtubeColor)
    }
}

function youtubeColor(data,positive, negative, neutral){
    comment = document.querySelector("yt-formatted-string#content-text")
    if(data.response[0].tag_name == 'Positive'){comment.style.backgroundColor = positive} //green
    else if(data.response[0].tag_name == 'Negative'){comment.style.backgroundColor = negative} //red
    else if(data.response[0].tag_name == 'Neutral'){comment.style.backgroundColor = neutral} //gray
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

function color(myItem, myResponse, positive, negative, neutral, positiveThreshold, negativeThreshold){
    if(myResponse.tag_name == 'Positive' && myResponse.confidence > positiveThreshold) {myItem.style.backgroundColor = positive} //green
    else if(myResponse.tag_name == 'Negative' && myResponse.confidence > negativeThreshold){myItem.style.backgroundColor = negative} //red
    else{myItem.style.backgroundColor = neutral} //gray
}

//let state = {}
let elements = ["onOff","parent","positiveColor","neutralColor","negativeColor","positiveThreshold","negativeThreshold","positiveComments","neutralComments","negativeComments"]
let types = ["bool", "bool", "color", "color", "color", "probability", "probability", "integer", "integer", "integer"]

chrome.storage.local.get(elements, function(results){
    window.addEventListener('load', (e) => {
        if(results["onOff"]){
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
                //get/set comment values
                
                console.log(myResponses)

                let positiveComments = 0; let negativeComments=0; let neutralComments=0
                for(let z=0; z< myResponses.length; z++){
                    if(myResponses[z]["tag_name"] == "Positive" && myResponses[z]["confidence"] > results["positiveThreshold"]){ positiveComments += 1}
                    else if(myResponses[z]["tag_name"]=="Negative" && myResponses[z]["confidence"] > results["negativeThreshold"]){negativeComments += 1}
                    else{neutralComments += 1}
                }
                let lmao = {"positiveComments": positiveComments, "negativeComments": negativeComments, "neutralComments": neutralComments}
                console.log(lmao)
                chrome.storage.local.set(lmao, function(results){})
                //console.log(myResponses)

                for(let i=0; i< inThing.length; i++){
                    processedQueries.push(inThing[i])
                    processedResponses.push(myResponses[i])
                }
                for(let i=0; i<inThing.length; i++){
                    let myItem = myDivs[i]
                    let myResponse = myResponses[i]
                    //object properties: tag_name, tag_id, confidence

                    if(!results["parent"]){
                        color(myItem, myResponse, results["positiveColor"], results["negativeColor"], results["neutralColor"], results["positiveThreshold"], results["negativeThreshold"])
                    }else{
                        console.log("1")
                        if(myResponse["tag_name"] == "Negative" && myResponse["confidence"]>results["negativeThreshold"]){
                            
                            let span = myItem.children[1]
                            span.parentNode.removeChild(span)
                        }else{
                            console.log("3")
                            color(myItem, myResponse, results["positiveColor"], results["negativeColor"], results["neutralColor"], results["positiveThreshold"], results["negativeThreshold"])
                        }
                    }
                    
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
                            if(!results["parent"]){
                                color(myItem, myResponse, results["positiveColor"], results["negativeColor"], results["neutralColor"], results["positiveThreshold"], results["negativeThreshold"])
                            }else{
                                if(myResponse["tag_name"] == "Negative" && myResponse["confidence"]>results["negativeThreshold"]){
                                    myItem.backgroundColor = "black"
                                }
                            }
                        }
                    }
        
                    function commentInstagramFunction(data){
                        //get/set comment values

                        //let positiveComments = data.positiveComments; let negativeComments=data.negativeComments; let neutralComments=data.neutralComments
                        


                        myResponses = data.response
                        for(let i=0; i< processedSub.length; i++){
                            processedQueries.push(processedSub[i])
                            processedResponses.push(myResponses[i])
                        }
        
                        for(let i=0; i<subInThing.length; i++){
                            let myItem = processedDivs[i]
                            let myResponse = myResponses[i]
                            //object properties: tag_name, tag_id, confidence
                            if(!results["parent"]){
                                color(myItem, myResponse, results["positiveColor"], results["negativeColor"], results["neutralColor"], results["positiveThreshold"], results["negativeThreshold"])
                            }else{
                                if(myResponse["tag_name"] == "Negative" && myResponse["confidence"]>results["negativeThreshold"]){
                                    myItem.backgroundColor = "black"
                                }
                            }
                        }
                    }
        
                    post("https://sendstuff.1234567890hihi.repl.co/3000", processedSub, commentInstagramFunction)
                })
            }
        }
    });
    
})
