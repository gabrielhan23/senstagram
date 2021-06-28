
function isHex(h) {
    var a = parseInt(h,16);
    return (a.toString(16) === h)
}

function checkBoolean(string){
    if(string == "true" || string=="false"){
        return true;
    }else{
        return false;
    }
}

function checkColor(string){
    if(string.length === 7 && string[0] == "#"){
        for(let i=1;i<string.length; i++){
            if(!isHex(string[i])){return false}
        }
        return true;
    }else{
        return false;
    }
}

function checkProbability(value, list){
    if(typeof(value) == "string"){
        //check if list is all strings
        for(let i=0; i<list.length; i++){if(!list[i]=="string"){throw new TypeError("Passed in non string array with string probability")}}
    }

}