function add(n1: number, n2: number): number {
    return n1 + n2;
}

// function  printResult(num: number): undefined {
//     console.log('Result: ' + num);
//     return;
// }

function printResult(num: number): void {
    console.log('Result: ' + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = add(n1, n2);
    cb(result);
}

addAndHandle(10, 20, printResult);

addAndHandle(11, 22, (result) => {
    console.log('Result from callback: ' + result);
    // it won't do anything
    return 66;
});

printResult(add(5, 12));

// let combineValues: Function;
// combineValues = printResult;

let combineValues: (a: number, b: number) => number;
combineValues = add;

console.log(combineValues(8, 8))