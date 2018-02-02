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


// function async1 (param) {
//     return new Promise(function(resolve, reject) {
//         resolve(param*2);
//     });
// }
// function async2 (param) {
//     return new Promise(function(resolve, reject) {
//         resolve(param*3);
//     });
// }
// function async3 (param) {
//     return new Promise(function(resolve, reject) {
//         resolve(param*4);
//     });
// }
//
// var start = 1;
// async1(start)
//     .then(async2)
//     .then(async3)
//     .then(result => {
//         console.log(result); // 24
//     });


const set = new Set(['a','dd','asdfasfd','aa','asdfsdf']);
// console.log(set.size);

for (let x of set) {
    // console.log(x);
}

// function getRandomItem(set) {
//     let items = Array.from(set);
//     console.log(Math.random() * items.length);
//     // console.log(Math.random());
//     console.log(items.length);
//     return items[Math.floor(Math.random() * items.length)];
// }


function getRandomKey(collection) {
    let index = Math.floor(Math.random() * collection.size);
    let cntr = 0;
    for (let key of collection.keys()) {
        if (cntr++ === index) {
            return key;
        }
    }
}
// console.log(getRandomItem(set));
// console.log(getRandomKey(set));



// for (var j = 0; j < Math.floor(Math.random() * 20); j++) {
//     count++;
// }
//
// for (var i = 0; i < 20; i++) {
//     var count = 0;
//     var a = Math.random() * 20
//     console.log(a)
//     console.log(Math.floor(a))
//     // for (var j = 0; j < Math.floor(Math.random() * 20); j++) {
//     //     count++;
//     // }
//     // console.log(count);
// }



