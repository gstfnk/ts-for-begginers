const names: Array<string> = ['Gabi', 'Tom', 'Max'];

const promise: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10);
    }, 2000);
});

promise.then(data => {
    // data.split(' ');
});

function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'Gabi', hobbies: ['Playing Dota2']}, {age: 22});

console.log(mergedObj.hobbies.toString());

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T) {
    let descriptionText = 'Got no value.';
    if (element.length === 1) descriptionText = 'Got 1 element';
    else if (element.length > 1) descriptionText = 'Got ' + element.length + ' elements.';
    return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!')[1]);
console.log(countAndDescribe(['Playing Dota2', 'Drawing'])[1]);

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key];
}

console.log(extractAndConvert({github: 'gstfnk', name: 'Gabi', age: 22}, 'name'));

class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Im');
textStorage.addItem('adding');
textStorage.addItem('items');
console.log(textStorage.getItems());
textStorage.removeItem('items');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

const objectStorage = new DataStorage<object>();

objectStorage.addItem({name: 'Gabi'});
objectStorage.addItem({name: 'unknown'});

console.log(objectStorage.getItems());

// this method won't delete this because of references
objectStorage.removeItem({name: 'Gabi'});

console.log(objectStorage.getItems());

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
}

const names2: Readonly<string[]> = ['Gabi', 'Tom', 'Max'];
// names2.push('John');
// names2.pop;