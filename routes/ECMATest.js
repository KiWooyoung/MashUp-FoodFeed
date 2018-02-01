//
// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//
//     incrementAge() {
//         console.log(this.age);
//         this.age += 1;
//     }
// }
//
// let person = new Person("wonwoo", 32);
// person.incrementAge();
// console.log(person);


function async1 (param) {
    return new Promise(function(resolve, reject) {
        resolve(param*2);
    });
}
function async2 (param) {
    return new Promise(function(resolve, reject) {
        resolve(param*3);
    });
}
function async3 (param) {
    return new Promise(function(resolve, reject) {
        resolve(param*4);
    });
}

var start = 1;
async1(start)
    .then(async2)
    .then(async3)
    .then(result => {
        console.log(result); // 24
    });

