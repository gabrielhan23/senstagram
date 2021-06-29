
function isHex(h) {
    var a = parseInt(h,16);
    return (a.toString(16) === h)
}

export function checkBoolean(string){
    if(string == "true" || string=="false"){
        return true;
    }else{
        return false;
    }
}

export function checkColor(string){
    if(string.length === 7 && string[0] == "#"){
        for(let i=1;i<string.length; i++){
            if(!isHex(string[i])){return false;}
        }
        return true;
    }else{
        return false;
    }
}

export function checkProbability(value){
    if(value >= 0 && value < 0.5){
        return true
    }
    return false
}

export function checkInteger(value){
    if(Number.isInteger(parseInt(value,10))){
        return true
    }
    return false
}