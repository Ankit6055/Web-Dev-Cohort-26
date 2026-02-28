# Arrays in JavaScript

## What is an Array?

An **array** is a **list** that stores multiple values in a single variable. Think of it like a **row of boxes**, where each box holds a value and has a **number** (index) starting from `0`.

```js
let fruits = ["Apple", "Banana", "Mango"];

//  Index:      0        1        2

console.log(fruits);
// Output: ["Apple", "Banana", "Mango"]
```

Without arrays, you'd need a separate variable for each item:

```js
// ❌ Without arrays — messy!
let fruit1 = "Apple";
let fruit2 = "Banana";
let fruit3 = "Mango";

// ✅ With arrays — clean!
let fruits = ["Apple", "Banana", "Mango"];
```

---

## Creating Arrays

### 1. Array Literal (Most Common)

```js
let colors = ["Red", "Green", "Blue"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["Hello", 42, true, null, undefined];  // can hold different types!
let empty = [];  // empty array
```

### 2. Using `new Array()`

```js
let arr1 = new Array("Apple", "Banana", "Mango");
console.log(arr1);  // Output: ["Apple", "Banana", "Mango"]

// ⚠️ Weird behavior with a single number:
let arr2 = new Array(5);
console.log(arr2);         // Output: [empty × 5]  (creates 5 empty slots!)
console.log(arr2.length);  // Output: 5

// Use Array literal instead — less confusing
```

### 3. Using `Array.of()`

```js
let arr = Array.of(5);
console.log(arr);  // Output: [5]  (creates array WITH the value 5, not 5 empty slots)

let arr2 = Array.of(1, 2, 3);
console.log(arr2);  // Output: [1, 2, 3]
```

### 4. Using `Array.from()` — Convert Something to Array

```js
// From a string
let chars = Array.from("Hello");
console.log(chars);  // Output: ["H", "e", "l", "l", "o"]

// From a Set
let unique = Array.from(new Set([1, 2, 2, 3, 3]));
console.log(unique);  // Output: [1, 2, 3]

// With a mapping function
let nums = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(nums);  // Output: [1, 2, 3, 4, 5]
```

---

## Accessing Elements

```js
let fruits = ["Apple", "Banana", "Mango", "Orange"];
//              0        1        2        3

console.log(fruits[0]);   // Output: Apple  (first element)
console.log(fruits[1]);   // Output: Banana
console.log(fruits[3]);   // Output: Orange  (last element)
console.log(fruits[10]);  // Output: undefined  (doesn't exist)

// Last element
console.log(fruits[fruits.length - 1]);  // Output: Orange
console.log(fruits.at(-1));              // Output: Orange  (cleaner! ES2022)
console.log(fruits.at(-2));              // Output: Mango  (second last)
```

---

## Modifying Elements

```js
let fruits = ["Apple", "Banana", "Mango"];

// Change an element
fruits[1] = "Grapes";
console.log(fruits);  // Output: ["Apple", "Grapes", "Mango"]

// Add an element at a specific index
fruits[3] = "Orange";
console.log(fruits);  // Output: ["Apple", "Grapes", "Mango", "Orange"]

// ⚠️ Be careful — skipping indices creates empty holes!
fruits[10] = "Kiwi";
console.log(fruits.length);  // Output: 11  (indices 4-9 are empty!)
console.log(fruits);         // Output: ["Apple", "Grapes", "Mango", "Orange", empty × 6, "Kiwi"]
```

---

## Array Length

```js
let arr = [10, 20, 30, 40, 50];
console.log(arr.length);  // Output: 5

// You can also SET the length to truncate an array:
arr.length = 3;
console.log(arr);  // Output: [10, 20, 30]  (last 2 items removed!)

// Or make it longer (adds empty slots):
arr.length = 5;
console.log(arr);  // Output: [10, 20, 30, empty × 2]
```

---

## Checking if Something is an Array

```js
console.log(typeof [1, 2, 3]);         // Output: object  (❌ not helpful!)
console.log(Array.isArray([1, 2, 3])); // Output: true ✅
console.log(Array.isArray("hello"));   // Output: false
console.log(Array.isArray({ a: 1 }));  // Output: false
```

---

# Adding & Removing Elements

## `push()` — Add to the END

```js
let fruits = ["Apple", "Banana"];

fruits.push("Mango");
console.log(fruits);  // Output: ["Apple", "Banana", "Mango"]

// Can add multiple at once:
fruits.push("Orange", "Grapes");
console.log(fruits);  // Output: ["Apple", "Banana", "Mango", "Orange", "Grapes"]

// push() returns the new length:
let newLength = fruits.push("Kiwi");
console.log(newLength);  // Output: 6
```

## `pop()` — Remove from the END

```js
let fruits = ["Apple", "Banana", "Mango"];

let removed = fruits.pop();
console.log(removed);  // Output: Mango  (the removed element)
console.log(fruits);   // Output: ["Apple", "Banana"]
```

## `unshift()` — Add to the START

```js
let fruits = ["Banana", "Mango"];

fruits.unshift("Apple");
console.log(fruits);  // Output: ["Apple", "Banana", "Mango"]

// Can add multiple:
fruits.unshift("Grapes", "Orange");
console.log(fruits);  // Output: ["Grapes", "Orange", "Apple", "Banana", "Mango"]
```

## `shift()` — Remove from the START

```js
let fruits = ["Apple", "Banana", "Mango"];

let removed = fruits.shift();
console.log(removed);  // Output: Apple
console.log(fruits);   // Output: ["Banana", "Mango"]
```

### Quick Memory Trick:

| Method      | Where?  | Action  |
|-------------|---------|---------|
| `push()`    | End     | Add     |
| `pop()`     | End     | Remove  |
| `unshift()` | Start   | Add     |
| `shift()`   | Start   | Remove  |

> `push/pop` are **faster** than `unshift/shift` because adding/removing from the start requires re-indexing ALL elements.

---

## `splice()` — The Swiss Army Knife

`splice()` can **add**, **remove**, and **replace** elements at ANY position.

**Syntax**: `array.splice(startIndex, deleteCount, item1, item2, ...)`

### Remove Elements

```js
let fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];

// Remove 2 elements starting from index 1
let removed = fruits.splice(1, 2);
console.log(removed);  // Output: ["Banana", "Mango"]
console.log(fruits);   // Output: ["Apple", "Orange", "Grapes"]
```

### Add Elements (without removing)

```js
let fruits = ["Apple", "Mango", "Grapes"];

// At index 1, remove 0 elements, add "Banana" and "Orange"
fruits.splice(1, 0, "Banana", "Orange");
console.log(fruits);  // Output: ["Apple", "Banana", "Orange", "Mango", "Grapes"]
```

### Replace Elements

```js
let fruits = ["Apple", "Banana", "Mango"];

// At index 1, remove 1 element, add "Grapes"
fruits.splice(1, 1, "Grapes");
console.log(fruits);  // Output: ["Apple", "Grapes", "Mango"]

// Replace 2 elements with 3 new ones
let colors = ["Red", "Green", "Blue", "Yellow"];
colors.splice(1, 2, "Pink", "Purple", "Orange");
console.log(colors);  // Output: ["Red", "Pink", "Purple", "Orange", "Yellow"]
```

---

## `slice()` — Copy a Portion (Does NOT Modify Original)

**Syntax**: `array.slice(start, end)` — from `start` up to (but NOT including) `end`.

```js
let fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];

console.log(fruits.slice(1, 3));   // Output: ["Banana", "Mango"]
console.log(fruits.slice(2));      // Output: ["Mango", "Orange", "Grapes"]
console.log(fruits.slice(-2));     // Output: ["Orange", "Grapes"]  (last 2)
console.log(fruits.slice());       // Output: ["Apple", "Banana", "Mango", "Orange", "Grapes"]  (full copy!)

// Original is UNCHANGED:
console.log(fruits);  // Output: ["Apple", "Banana", "Mango", "Orange", "Grapes"]
```

### `splice()` vs `slice()`:

| Feature      | `splice()`            | `slice()`               |
|--------------|-----------------------|-------------------------|
| Modifies?    | ✅ Yes (mutates)      | ❌ No (returns new)     |
| Can add?     | ✅ Yes                | ❌ No                   |
| Can delete?  | ✅ Yes                | ❌ No                   |
| Returns      | Removed elements      | Copied portion          |

---

## `concat()` — Merge Arrays

Creates a **new array** by combining two or more arrays. Does NOT change the originals.

```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let combined = arr1.concat(arr2);
console.log(combined);  // Output: [1, 2, 3, 4, 5, 6]

// Multiple arrays:
let arr3 = [7, 8];
let all = arr1.concat(arr2, arr3);
console.log(all);  // Output: [1, 2, 3, 4, 5, 6, 7, 8]

// Can also add individual values:
let result = arr1.concat(4, 5);
console.log(result);  // Output: [1, 2, 3, 4, 5]
```

### The Spread Operator `...` (Modern Way)

```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let combined = [...arr1, ...arr2];
console.log(combined);  // Output: [1, 2, 3, 4, 5, 6]

// Insert in between:
let result = [0, ...arr1, 99, ...arr2, 100];
console.log(result);  // Output: [0, 1, 2, 3, 99, 4, 5, 6, 100]
```

---

# Searching in Arrays

## `indexOf()` — Find Index of First Match

```js
let fruits = ["Apple", "Banana", "Mango", "Banana"];

console.log(fruits.indexOf("Banana"));   // Output: 1  (first occurrence)
console.log(fruits.indexOf("Mango"));    // Output: 2
console.log(fruits.indexOf("Grapes"));   // Output: -1  (not found)

// Search from a specific index:
console.log(fruits.indexOf("Banana", 2));  // Output: 3  (search from index 2)
```

## `lastIndexOf()` — Find Index of Last Match

```js
let fruits = ["Apple", "Banana", "Mango", "Banana"];

console.log(fruits.lastIndexOf("Banana"));  // Output: 3  (last occurrence)
```

## `includes()` — Does Array Contain This Value?

```js
let fruits = ["Apple", "Banana", "Mango"];

console.log(fruits.includes("Banana"));  // Output: true
console.log(fruits.includes("Grapes"));  // Output: false
console.log(fruits.includes("banana"));  // Output: false  (case-sensitive!)
```

## `find()` — Find First Element That Matches a Condition

Returns the **element** itself (not the index). Returns `undefined` if not found.

```js
let numbers = [5, 12, 8, 130, 44];

let found = numbers.find(num => num > 10);
console.log(found);  // Output: 12  (first number greater than 10)

let notFound = numbers.find(num => num > 200);
console.log(notFound);  // Output: undefined
```

With objects:

```js
let users = [
  { id: 1, name: "Ankit" },
  { id: 2, name: "Rahul" },
  { id: 3, name: "Priya" }
];

let user = users.find(u => u.id === 2);
console.log(user);  // Output: { id: 2, name: "Rahul" }
```

## `findIndex()` — Find Index of First Match

Like `find()`, but returns the **index** instead of the element.

```js
let numbers = [5, 12, 8, 130, 44];

let index = numbers.findIndex(num => num > 10);
console.log(index);  // Output: 1  (index of 12)

let notFound = numbers.findIndex(num => num > 200);
console.log(notFound);  // Output: -1
```

## `findLast()` and `findLastIndex()` (ES2023)

Same as `find()` and `findIndex()`, but search from the **end**.

```js
let numbers = [5, 12, 8, 130, 44];

console.log(numbers.findLast(n => n > 10));       // Output: 44  (last match)
console.log(numbers.findLastIndex(n => n > 10));  // Output: 4   (index of 44)
```

---

# Looping Through Arrays

## `for` Loop (Classic)

```js
let fruits = ["Apple", "Banana", "Mango"];

for (let i = 0; i < fruits.length; i++) {
  console.log(i, fruits[i]);
}
// Output:
// 0 Apple
// 1 Banana
// 2 Mango
```

## `for...of` Loop (Modern & Clean)

```js
let fruits = ["Apple", "Banana", "Mango"];

for (let fruit of fruits) {
  console.log(fruit);
}
// Output:
// Apple
// Banana
// Mango
```

If you also need the index:

```js
for (let [index, fruit] of fruits.entries()) {
  console.log(index, fruit);
}
// Output:
// 0 Apple
// 1 Banana
// 2 Mango
```

## `forEach()` Method

```js
let fruits = ["Apple", "Banana", "Mango"];

fruits.forEach(function(fruit, index) {
  console.log(`${index}: ${fruit}`);
});
// Output:
// 0: Apple
// 1: Banana
// 2: Mango

// Arrow function version:
fruits.forEach((fruit, index) => console.log(`${index}: ${fruit}`));
```

> **Note**: `forEach()` always returns `undefined`. You can't `break` out of it or use `return` to stop it.

## `for...in` Loop — ❌ Don't Use for Arrays

```js
let fruits = ["Apple", "Banana", "Mango"];

// ❌ This works but is NOT recommended for arrays
for (let key in fruits) {
  console.log(key, fruits[key]);  // key is a STRING index, not number
}

// for...in is meant for OBJECTS, not arrays.
// Use for...of or forEach for arrays.
```

---

# Transforming Arrays — The Big 3: `map`, `filter`, `reduce`

These are the **most important array methods** in JavaScript. They all return a **new array** and don't modify the original.

---

## `map()` — Transform Every Element

Creates a **new array** by applying a function to **every element**.

```js
let numbers = [1, 2, 3, 4, 5];

let doubled = numbers.map(num => num * 2);
console.log(doubled);   // Output: [2, 4, 6, 8, 10]
console.log(numbers);   // Output: [1, 2, 3, 4, 5]  (unchanged!)
```

More examples:

```js
// Get names from objects
let users = [
  { name: "Ankit", age: 20 },
  { name: "Rahul", age: 25 },
  { name: "Priya", age: 22 }
];

let names = users.map(user => user.name);
console.log(names);  // Output: ["Ankit", "Rahul", "Priya"]

// Convert strings to uppercase
let words = ["hello", "world"];
let upper = words.map(word => word.toUpperCase());
console.log(upper);  // Output: ["HELLO", "WORLD"]

// Add index to each element
let indexed = ["a", "b", "c"].map((item, i) => `${i}: ${item}`);
console.log(indexed);  // Output: ["0: a", "1: b", "2: c"]
```

---

## `filter()` — Keep Only Elements That Pass a Test

Creates a **new array** with only the elements that return `true` from the function.

```js
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let evens = numbers.filter(num => num % 2 === 0);
console.log(evens);  // Output: [2, 4, 6, 8, 10]

let bigNums = numbers.filter(num => num > 5);
console.log(bigNums);  // Output: [6, 7, 8, 9, 10]
```

With objects:

```js
let users = [
  { name: "Ankit", age: 20 },
  { name: "Rahul", age: 17 },
  { name: "Priya", age: 22 },
  { name: "Amit", age: 15 }
];

let adults = users.filter(user => user.age >= 18);
console.log(adults);
// Output: [{ name: "Ankit", age: 20 }, { name: "Priya", age: 22 }]
```

### Remove Falsy Values:

```js
let messy = [0, "Hello", "", null, "World", undefined, 42, false, NaN];

let clean = messy.filter(Boolean);
console.log(clean);  // Output: ["Hello", "World", 42]
```

### Remove Duplicates:

```js
let nums = [1, 2, 2, 3, 3, 3, 4];

let unique = nums.filter((num, index, arr) => arr.indexOf(num) === index);
console.log(unique);  // Output: [1, 2, 3, 4]

// Easier way with Set:
let unique2 = [...new Set(nums)];
console.log(unique2);  // Output: [1, 2, 3, 4]
```

---

## `reduce()` — Reduce Array to a Single Value

Takes all elements and **combines them into one result** (a number, string, object, etc.).

**Syntax**: `array.reduce((accumulator, currentValue) => ..., initialValue)`

- **accumulator** = the running total / result being built up
- **currentValue** = the current element being processed
- **initialValue** = what the accumulator starts at

```js
let numbers = [1, 2, 3, 4, 5];

// Sum all numbers
let sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum);  // Output: 15

// Step by step:
// acc=0, num=1 → 0+1 = 1
// acc=1, num=2 → 1+2 = 3
// acc=3, num=3 → 3+3 = 6
// acc=6, num=4 → 6+4 = 10
// acc=10, num=5 → 10+5 = 15
```

### More Examples:

```js
// Product of all numbers
let product = [2, 3, 4].reduce((acc, num) => acc * num, 1);
console.log(product);  // Output: 24  (2 * 3 * 4)

// Find max value
let numbers = [5, 12, 3, 8, 25, 1];
let max = numbers.reduce((acc, num) => num > acc ? num : acc, numbers[0]);
console.log(max);  // Output: 25

// Count occurrences of each word
let words = ["apple", "banana", "apple", "mango", "banana", "apple"];
let count = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
console.log(count);
// Output: { apple: 3, banana: 2, mango: 1 }

// Flatten array of arrays
let nested = [[1, 2], [3, 4], [5, 6]];
let flat = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log(flat);  // Output: [1, 2, 3, 4, 5, 6]

// Group by a property
let people = [
  { name: "Ankit", city: "Delhi" },
  { name: "Rahul", city: "Mumbai" },
  { name: "Priya", city: "Delhi" },
  { name: "Amit", city: "Mumbai" }
];

let grouped = people.reduce((acc, person) => {
  let city = person.city;
  if (!acc[city]) acc[city] = [];
  acc[city].push(person.name);
  return acc;
}, {});
console.log(grouped);
// Output: { Delhi: ["Ankit", "Priya"], Mumbai: ["Rahul", "Amit"] }
```

### `reduceRight()` — Same but from Right to Left

```js
let letters = ["a", "b", "c", "d"];

let result = letters.reduceRight((acc, letter) => acc + letter, "");
console.log(result);  // Output: dcba
```

---

## Chaining `map`, `filter`, and `reduce`

You can chain these methods together for powerful data processing:

```js
let users = [
  { name: "Ankit", age: 20, active: true },
  { name: "Rahul", age: 17, active: false },
  { name: "Priya", age: 22, active: true },
  { name: "Amit", age: 15, active: true }
];

// Get names of active adults
let result = users
  .filter(user => user.active)          // keep only active users
  .filter(user => user.age >= 18)       // keep only adults
  .map(user => user.name);              // get just the names

console.log(result);  // Output: ["Ankit", "Priya"]

// Get total age of all adults
let totalAge = users
  .filter(user => user.age >= 18)
  .reduce((sum, user) => sum + user.age, 0);

console.log(totalAge);  // Output: 42  (20 + 22)
```

---

# Sorting Arrays

## `sort()` — Sort in Place (Mutates!)

```js
// ⚠️ Default sort converts to strings and sorts alphabetically
let fruits = ["Mango", "Apple", "Banana"];
fruits.sort();
console.log(fruits);  // Output: ["Apple", "Banana", "Mango"] ✅

// ⚠️ Numbers DON'T sort correctly by default!
let numbers = [40, 100, 1, 5, 25, 10];
numbers.sort();
console.log(numbers);  // Output: [1, 10, 100, 25, 40, 5] ❌ (sorted as strings!)
```

### Sorting Numbers Correctly:

```js
let numbers = [40, 100, 1, 5, 25, 10];

// Ascending (smallest to largest)
numbers.sort((a, b) => a - b);
console.log(numbers);  // Output: [1, 5, 10, 25, 40, 100] ✅

// Descending (largest to smallest)
numbers.sort((a, b) => b - a);
console.log(numbers);  // Output: [100, 40, 25, 10, 5, 1] ✅
```

**How it works:**
- If `a - b` returns **negative** → `a` comes first
- If `a - b` returns **positive** → `b` comes first  
- If `a - b` returns **0** → order doesn't change

### Sorting Objects:

```js
let users = [
  { name: "Priya", age: 22 },
  { name: "Ankit", age: 20 },
  { name: "Rahul", age: 25 }
];

// Sort by age
users.sort((a, b) => a.age - b.age);
console.log(users);
// Output: [{ name: "Ankit", age: 20 }, { name: "Priya", age: 22 }, { name: "Rahul", age: 25 }]

// Sort by name (alphabetically)
users.sort((a, b) => a.name.localeCompare(b.name));
console.log(users);
// Output: [{ name: "Ankit"... }, { name: "Priya"... }, { name: "Rahul"... }]
```

## `toSorted()` — Sort WITHOUT Mutating (ES2023)

```js
let numbers = [3, 1, 4, 1, 5];

let sorted = numbers.toSorted((a, b) => a - b);
console.log(sorted);   // Output: [1, 1, 3, 4, 5]
console.log(numbers);  // Output: [3, 1, 4, 1, 5]  (unchanged! ✅)
```

## `reverse()` — Reverse the Array (Mutates!)

```js
let arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr);  // Output: [5, 4, 3, 2, 1]
```

## `toReversed()` — Reverse WITHOUT Mutating (ES2023)

```js
let arr = [1, 2, 3, 4, 5];
let rev = arr.toReversed();
console.log(rev);  // Output: [5, 4, 3, 2, 1]
console.log(arr);  // Output: [1, 2, 3, 4, 5]  (unchanged! ✅)
```

---

# Other Important Methods

## `every()` — Do ALL Elements Pass the Test?

Returns `true` only if **every** element passes.

```js
let numbers = [2, 4, 6, 8, 10];

console.log(numbers.every(n => n % 2 === 0));  // Output: true  (all are even)
console.log(numbers.every(n => n > 5));         // Output: false  (2 and 4 are not > 5)

let ages = [18, 21, 25, 30];
console.log(ages.every(age => age >= 18));  // Output: true  (all are adults)
```

## `some()` — Does AT LEAST ONE Element Pass?

Returns `true` if **at least one** element passes.

```js
let numbers = [1, 3, 5, 7, 8];

console.log(numbers.some(n => n % 2 === 0));  // Output: true  (8 is even)
console.log(numbers.some(n => n > 10));       // Output: false  (none are > 10)
```

## `flat()` — Flatten Nested Arrays

```js
let nested = [1, [2, 3], [4, [5, 6]]];

console.log(nested.flat());    // Output: [1, 2, 3, 4, [5, 6]]  (one level deep)
console.log(nested.flat(2));   // Output: [1, 2, 3, 4, 5, 6]    (two levels deep)
console.log(nested.flat(Infinity));  // Output: [1, 2, 3, 4, 5, 6]  (fully flatten)
```

## `flatMap()` — Map + Flatten in One Step

```js
let sentences = ["Hello World", "How are you"];

let words = sentences.flatMap(s => s.split(" "));
console.log(words);  // Output: ["Hello", "World", "How", "are", "you"]

// Without flatMap:
let words2 = sentences.map(s => s.split(" "));
console.log(words2);  // Output: [["Hello", "World"], ["How", "are", "you"]]  (nested!)
```

## `fill()` — Fill Array with a Value

```js
let arr = [1, 2, 3, 4, 5];

arr.fill(0);
console.log(arr);  // Output: [0, 0, 0, 0, 0]

// Fill from index 2 to 4:
let arr2 = [1, 2, 3, 4, 5];
arr2.fill(99, 2, 4);
console.log(arr2);  // Output: [1, 2, 99, 99, 5]

// Create an array of zeros:
let zeros = new Array(5).fill(0);
console.log(zeros);  // Output: [0, 0, 0, 0, 0]
```

## `copyWithin()` — Copy Part of Array to Another Position

```js
let arr = [1, 2, 3, 4, 5];

// Copy index 3-4 to index 0
arr.copyWithin(0, 3, 5);
console.log(arr);  // Output: [4, 5, 3, 4, 5]
```

## `join()` — Convert Array to String

```js
let fruits = ["Apple", "Banana", "Mango"];

console.log(fruits.join());       // Output: "Apple,Banana,Mango"  (default: comma)
console.log(fruits.join(" "));    // Output: "Apple Banana Mango"
console.log(fruits.join(" - "));  // Output: "Apple - Banana - Mango"
console.log(fruits.join(""));     // Output: "AppleBananaMango"
```

## `with()` — Change Element WITHOUT Mutating (ES2023)

```js
let arr = [1, 2, 3, 4, 5];

let newArr = arr.with(2, 99);  // replace index 2 with 99
console.log(newArr);  // Output: [1, 2, 99, 4, 5]
console.log(arr);     // Output: [1, 2, 3, 4, 5]  (unchanged! ✅)
```

---

# Destructuring Arrays

Pull values out of an array into individual variables.

```js
let fruits = ["Apple", "Banana", "Mango"];

// Old way:
let a = fruits[0];
let b = fruits[1];

// New way (destructuring):
let [first, second, third] = fruits;
console.log(first);   // Output: Apple
console.log(second);  // Output: Banana
console.log(third);   // Output: Mango
```

### Skip Elements:

```js
let [a, , c] = [1, 2, 3];
console.log(a);  // Output: 1
console.log(c);  // Output: 3  (skipped 2)
```

### Default Values:

```js
let [a, b, c = "Default"] = [1, 2];
console.log(c);  // Output: Default  (no third element, so default used)
```

### Rest Pattern:

```js
let [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // Output: 1
console.log(rest);   // Output: [2, 3, 4, 5]
```

### Swap Two Variables:

```js
let a = 1;
let b = 2;

[a, b] = [b, a];
console.log(a);  // Output: 2
console.log(b);  // Output: 1
```

---

# Spread Operator with Arrays

The **spread operator** `...` unpacks array elements.

```js
// Copy an array
let original = [1, 2, 3];
let copy = [...original];
console.log(copy);  // Output: [1, 2, 3]

// Merge arrays
let arr1 = [1, 2];
let arr2 = [3, 4];
let merged = [...arr1, ...arr2];
console.log(merged);  // Output: [1, 2, 3, 4]

// Use array elements as function arguments
let numbers = [5, 2, 8, 1, 9];
console.log(Math.max(...numbers));  // Output: 9

// Add elements between arrays
let result = [0, ...arr1, 99, ...arr2, 100];
console.log(result);  // Output: [0, 1, 2, 99, 3, 4, 100]
```

---

# Mutating vs Non-Mutating Methods

| Mutating (changes original) | Non-Mutating (returns new) |
|-----------------------------|---------------------------|
| `push()`, `pop()`          | `map()`                   |
| `shift()`, `unshift()`     | `filter()`                |
| `splice()`                 | `reduce()`                |
| `sort()`                   | `slice()`                 |
| `reverse()`                | `concat()`                |
| `fill()`                   | `flat()`, `flatMap()`     |
| `copyWithin()`             | `toSorted()` (ES2023)     |
|                             | `toReversed()` (ES2023)   |
|                             | `with()` (ES2023)         |
|                             | `toSpliced()` (ES2023)    |

> **Tip**: When in doubt, prefer non-mutating methods. They're safer and easier to debug!

---

# Quick Summary

| Method            | What It Does                              | Mutates? |
|-------------------|-------------------------------------------|----------|
| `push() / pop()`  | Add/remove from end                       | ✅       |
| `shift/unshift()` | Add/remove from start                     | ✅       |
| `splice()`        | Add/remove/replace at any position        | ✅       |
| `slice()`         | Copy a portion                            | ❌       |
| `concat()`        | Merge arrays                              | ❌       |
| `indexOf()`       | Find index of value                       | ❌       |
| `includes()`      | Check if value exists                     | ❌       |
| `find()`          | Find first matching element               | ❌       |
| `findIndex()`     | Find index of first match                 | ❌       |
| `map()`           | Transform every element                   | ❌       |
| `filter()`        | Keep elements that pass test              | ❌       |
| `reduce()`        | Combine all elements into one value       | ❌       |
| `sort()`          | Sort elements                             | ✅       |
| `reverse()`       | Reverse order                             | ✅       |
| `every()`         | Check if ALL pass test                    | ❌       |
| `some()`          | Check if ANY pass test                    | ❌       |
| `flat()`          | Flatten nested arrays                     | ❌       |
| `forEach()`       | Loop through each element                 | ❌       |
| `join()`          | Convert array to string                   | ❌       |
| `fill()`          | Fill with a value                         | ✅       |

---

> **Key Takeaways**:
> 1. **`map`, `filter`, `reduce`** are the three most important array methods — master them!
> 2. Know which methods **mutate** the array and which return a **new one**
> 3. Use **spread `...`** for copying and merging arrays
> 4. Use **destructuring** `[a, b] = arr` to extract values cleanly
> 5. Always pass a **compare function** to `sort()` for numbers: `.sort((a, b) => a - b)`
> 6. Use `Array.isArray()` to check if something is an array (not `typeof`) 🎯
