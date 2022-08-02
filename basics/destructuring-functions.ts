const add = (a: number, b: number = 1) => a + b;

console.log(add(2, 5));
console.log(add(6, 6));

const printOutput: (a: number | string) => void = output => console.log(output);

printOutput(add(2, 5));

const button = document.querySelector('button');

if (button) {
    button.addEventListener('click', event => console.log(event));
}

printOutput(add(4));

const person = {
    firstName: 'Gabi',
    age: 22
};

const copiedPerson = {...person};

const addAllValues = (...numbers: number[]) => {

    return numbers.reduce((currentResult, currentValue) => {
        return currentResult + currentValue;
    }, 0);
};
const addedNumbers = addAllValues(1, 2, 3, 4, 5, 6);

console.log(addedNumbers);

const hobbies = ['Drawing', 'Cooking'];
const activeHobbies = ['Running'];

activeHobbies.push(...hobbies);

//  destructuring
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2, hobbies);

const {firstName, age} = person;

console.log(firstName, age, person);
