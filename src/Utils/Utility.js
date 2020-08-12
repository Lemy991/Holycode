/**
 * @description Setting all the first letters in word to upercase
 * @param {String} str unformated string
 * @returns formated string
 */
function toUpperCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

/** 
 * @description Utility used across application
 */
export default {
    toUpperCase
}