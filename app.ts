let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';

// when we use 'unknown' we must check the typeof
// when we use 'any' we don't need to
if (typeof userInput === 'string') userName = userInput;

// this function 'never' returns and always crashes the script
function generateError(message: string, code: number): never {
    throw {message: message, errorCode: code};
}

generateError('My custom error!', 666);