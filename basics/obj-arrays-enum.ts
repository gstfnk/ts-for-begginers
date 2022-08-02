// const person: {
//     name: string;
//     age: number;
// } = {
//     name: 'Gabriela',
//     age: 22
// };

// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     tuples:
//     role: [number, string];
// } = {

enum Role {ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR = 'AUTHOR'}

const person = {
    name: 'Gabriela',
    age: 22,
    hobbies: ['programming', 'drawing'],
    role: Role.ADMIN
};

// person.role.push('admin'); - WARNING
// person.role[0] = 2;

let favoriteActivities: string[];
favoriteActivities = ['Drawing'];

console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}

if (person.role === Role.ADMIN) {
    console.log('Person is an admin.')
}

