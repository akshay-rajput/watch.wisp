export const checkExistanceInArray = (array, id) => {
    // returns true or false
    return !!array.find((item) => item._id === id);
};

// convert number
export const convertNumberScale = (number) => {
    let numberToString = number.toString();

    let scaledNumber = ''
    
    if(numberToString.length < 4){
        return numberToString;
    }    
    else if(numberToString.length > 3 && numberToString.length < 7){
        scaledNumber = numberToString.slice(0,-3)+"K";
        return scaledNumber
    }
    else if(numberToString.length > 6 && numberToString.length < 10){
        scaledNumber = numberToString.slice(0,-6)+"."+numberToString[1]+"M";
        return scaledNumber
    }
    else{
        return numberToString;
    }
};