function Logger(logString: string) {
    console.log('LOGGER FACTORY')
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function <T extends { new(...args: any[]): { name: string } }>
    (originalConstructor: T) {
        return class extends originalConstructor {
            constructor(...args: any[]) {
                super();
                console.log('Rendering template...')
                const element = document.getElementById(hookId);
                if (element) {
                    element.innerHTML = template;
                    element.querySelector('h2')!.textContent = this.name;
                }
            }

        }
    };
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h2>My Person Object</h2>', 'app')
class Person {
    name = 'Gabi';

    constructor() {
        console.log('Creating person object')
    }
}

const person = new Person();
console.log(person);

// ----------

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) this._price = val;
        else throw new Error('Invalid price - should be positive!');
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this.price * (1 + tax);
    }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Pencil case', 11);

// ----------

function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        }
    };
    return adjustedDescriptor;
}

class Printer {
    message = 'Checker :)';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const printer = new Printer();
const button = document.querySelector('button');
if (button) button.addEventListener('click', printer.showMessage);

// ----------

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[];
    };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        // naive approach
        [propName]: ['required']
    };
}

function PositiveNUmber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        // naive approach
        [propName]: ['positive']
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) return true;
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && (obj[prop] > 0);
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNUmber
    price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if (!validate(createdCourse)) {
        throw new Error('Invalid input!');
        return;
    }

    console.log(createdCourse);
});