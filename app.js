var userInput;
var userName;
userInput = 5;
userInput = 'Max';
// when we use unknown we must check the typeof
// when we use any we don't need to
if (typeof userInput === 'string')
    userName = userInput;
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError('My custom error!', 666);
