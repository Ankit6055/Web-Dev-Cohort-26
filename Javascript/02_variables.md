# Variables in JavaScript

## What is a Variable?

A **variable** is like a **box** where you store some data (a number, text, true/false, etc.) so you can use it later.

You give the box a **name**, put something inside it, and whenever you need that thing — you just call it by its name.

```js
let name = "Ankit";
console.log(name);
// Output: Ankit
```

Here, `name` is the box, and `"Ankit"` is the thing we put inside it.

---

## 3 Ways to Create Variables

JavaScript gives you **3 keywords** to create variables:

| Keyword | Can Change Value? | Scope        | Introduced In |
|---------|-------------------|--------------|---------------|
| `var`   | ✅ Yes            | Function     | Old JS        |
| `let`   | ✅ Yes            | Block `{}`   | ES6 (2015)    |
| `const` | ❌ No             | Block `{}`   | ES6 (2015)    |

Let's look at each one in detail.

---

## 1. `let` — The Modern Way to Create Variables

Use `let` when the value **can change later**.

```js
let age = 20;
console.log(age);
// Output: 20

age = 21;  // ✅ We can change the value
console.log(age);
// Output: 21
```

### You can declare without assigning a value:

```js
let city;
console.log(city);
// Output: undefined   (no value was assigned yet)

city = "Delhi";
console.log(city);
// Output: Delhi
```

### You CANNOT declare the same `let` variable twice:

```js
let score = 10;
let score = 20;  // ❌ Error: Identifier 'score' has already been declared
```

---

## 2. `const` — For Values That Never Change

Use `const` when the value should **stay the same forever** (constant).

```js
const PI = 3.14159;
console.log(PI);
// Output: 3.14159

PI = 3.14;  // ❌ Error: Assignment to constant variable
```

### You MUST assign a value when declaring:

```js
const name;  // ❌ Error: Missing initializer in const declaration
```

### Important: `const` with Objects and Arrays

`const` stops you from **reassigning** the variable, but it does **NOT** stop you from **changing the contents** of objects and arrays.

```js
const colors = ["red", "blue"];
colors.push("green");  // ✅ This is allowed!
console.log(colors);
// Output: ["red", "blue", "green"]

colors = ["yellow"];  // ❌ Error: Assignment to constant variable
// You can't replace the whole array, but you CAN modify it
```

Same with objects:

```js
const person = { name: "Ankit", age: 20 };
person.age = 21;  // ✅ Allowed! We're changing a property, not the variable
console.log(person);
// Output: { name: "Ankit", age: 21 }

person = { name: "Rahul" };  // ❌ Error: Assignment to constant variable
```

> **Think of it this way**: `const` locks the **box** itself, not the **stuff inside** the box.

---

## 3. `var` — The Old Way (Avoid Using It)

`var` was the **only way** to create variables before ES6 (2015). It still works, but has some **weird behaviors** that can cause bugs.

```js
var message = "Hello";
console.log(message);
// Output: Hello

message = "Hi";  // ✅ Can change the value
console.log(message);
// Output: Hi
```

### Problem 1: `var` can be re-declared (no error!)

```js
var name = "Ankit";
var name = "Rahul";  // ✅ No error! This silently overwrites the old one
console.log(name);
// Output: Rahul

// With let, this would throw an error — which is BETTER because it catches mistakes
```

### Problem 2: `var` is NOT block-scoped

```js
if (true) {
  var x = 10;
}
console.log(x);
// Output: 10   (var leaks out of the block!)

if (true) {
  let y = 20;
}
console.log(y);
// ❌ Error: y is not defined   (let stays INSIDE the block ✅)
```

### Problem 3: `var` gets hoisted (moved to the top)

```js
console.log(a);
var a = 5;
// Output: undefined   (no error! var gets hoisted but without the value)

console.log(b);
let b = 5;
// ❌ Error: Cannot access 'b' before initialization   (let doesn't allow this)
```

> **Bottom line**: Just use `let` and `const`. Forget `var` exists.

---

## `let` vs `const` — When to Use Which?

| Situation                          | Use    |
|------------------------------------|--------|
| Value will **change** later        | `let`  |
| Value will **never change**        | `const`|
| Loops (`for`, `while`)            | `let`  |
| Constants (PI, URLs, config)       | `const`|
| Arrays / Objects you'll modify     | `const`|
| Not sure?                          | `const` (change to `let` if needed) |

> **Best Practice**: Start with `const` by default. Only use `let` if you know the value needs to change.

---

## Variable Naming Rules

JavaScript has some **rules** for naming variables:

### ✅ Allowed:

```js
let myName = "Ankit";       // camelCase (recommended!)
let _private = true;         // can start with _
let $price = 100;            // can start with $
let user1 = "first";         // can contain numbers (but not start with one)
let myFavoriteFruit = "Mango"; // descriptive names are great
```

### ❌ NOT Allowed:

```js
let 1user = "Ankit";        // ❌ Cannot start with a number
let my-name = "Ankit";      // ❌ Cannot use hyphens (-)
let my name = "Ankit";      // ❌ Cannot have spaces
let let = "hello";          // ❌ Cannot use reserved keywords (let, const, if, for, etc.)
```

### Naming Conventions (Best Practices):

```js
// ✅ camelCase — used for variables and functions
let firstName = "Ankit";
let totalPrice = 500;

// ✅ UPPER_SNAKE_CASE — used for true constants
const MAX_USERS = 100;
const API_URL = "https://api.example.com";

// ✅ PascalCase — used for classes (you'll learn this later)
class UserProfile { }
```

---

## Data Types You Can Store in Variables

Variables can hold different **types of data**:

```js
// String (text) — always in quotes
let name = "Ankit";

// Number — no quotes needed
let age = 20;
let price = 99.99;

// Boolean — true or false
let isLoggedIn = true;

// Undefined — declared but no value assigned
let city;
console.log(city);  // Output: undefined

// Null — intentionally empty
let selectedColor = null;

// Array — a list of values
let fruits = ["Apple", "Banana", "Mango"];

// Object — a collection of key-value pairs
let person = { name: "Ankit", age: 20 };
```

You can check the **type** of any variable using `typeof`:

```js
console.log(typeof "Hello");   // Output: string
console.log(typeof 42);        // Output: number
console.log(typeof true);      // Output: boolean
console.log(typeof undefined); // Output: undefined
console.log(typeof null);      // Output: object  (this is a known bug in JS! 😄)
console.log(typeof [1, 2]);    // Output: object  (arrays are objects in JS)
console.log(typeof {a: 1});    // Output: object
```

---

## Hoisting — What Happens Behind the Scenes

**Hoisting** means JavaScript **moves variable declarations to the top** of their scope before running the code.

### `var` hoisting:

```js
console.log(x);  // Output: undefined (declaration is hoisted, but NOT the value)
var x = 10;
console.log(x);  // Output: 10
```

Behind the scenes, JavaScript reads it like this:

```js
var x;            // declaration moved to top
console.log(x);   // undefined
x = 10;           // value assigned here
console.log(x);   // 10
```

### `let` and `const` hoisting:

They ARE hoisted too, but they sit in a **"Temporal Dead Zone" (TDZ)** — you can't use them before the line where they're declared.

```js
console.log(y);  // ❌ Error: Cannot access 'y' before initialization
let y = 20;
```

> **Simple rule**: Always declare your variables **at the top** of your code or before you use them. Then you never have to worry about hoisting.

---

## Scope — Where Can You Access a Variable?

**Scope** means: _"Where in your code can this variable be used?"_

### Global Scope — Accessible everywhere

```js
let greeting = "Hello";

function sayHi() {
  console.log(greeting);  // ✅ Can access it here
}

sayHi();
// Output: Hello

console.log(greeting);  // ✅ Can access it here too
// Output: Hello
```

### Function Scope — Only inside the function

```js
function myFunction() {
  let secret = "hidden";
  console.log(secret);  // ✅ Works inside the function
}

myFunction();
// Output: hidden

console.log(secret);  // ❌ Error: secret is not defined
```

### Block Scope — Only inside `{ }` (for `let` and `const`)

```js
if (true) {
  let blockVar = "I'm inside a block";
  console.log(blockVar);  // ✅ Works here
  // Output: I'm inside a block
}

console.log(blockVar);  // ❌ Error: blockVar is not defined
```

Remember: `var` does **NOT** follow block scope — it leaks out!

```js
if (true) {
  var leaky = "I escape!";
}
console.log(leaky);  // Output: I escape!   (var ignores the block)
```

---

## Quick Summary

| Feature           | `var`             | `let`              | `const`            |
|-------------------|-------------------|--------------------|--------------------|
| Reassign?         | ✅ Yes            | ✅ Yes             | ❌ No              |
| Re-declare?       | ✅ Yes (risky!)   | ❌ No              | ❌ No              |
| Scope             | Function          | Block `{}`         | Block `{}`         |
| Hoisting          | Yes (undefined)   | Yes (TDZ error)    | Yes (TDZ error)    |
| Must assign value?| ❌ No             | ❌ No              | ✅ Yes             |
| Use in 2026?      | ❌ Avoid it       | ✅ Yes             | ✅ Yes (default)   |

---

> **Golden Rule**: Use `const` by default. Use `let` only when you need to reassign. Never use `var`. 🎯
