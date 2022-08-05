// type AddFn = (a: number, b: number) => number;
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
}

interface INamed {
    readonly name?: string;
    outputName?: string;
}

interface IGreetable extends INamed {
    greet(phrase: string): void;
}

class Person implements IGreetable {
    name?: string;
    age: number;

    constructor(age: number, name?: string) {
        if (name) this.name = name;
        this.age = age;
    }

    greet(phrase: string): void {
        if (this.name) console.log(phrase + ' ' + this.name);
        else console.log(phrase);
    }
}

let user1: IGreetable;
user1 = new Person(22, 'Gabi');
user1.greet('Hi!');

let user2 = new Person(35);
user2.greet('Hello!');


