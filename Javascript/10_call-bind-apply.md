# Call, Bind & Apply in JavaScript

## Why Do We Need These?

In JavaScript, the value of `this` inside a function depends on **how** the function is called. Sometimes `this` points to the wrong thing. `call()`, `apply()`, and `bind()` let you **manually control** what `this` should be.

Think of it like this: You have a function, and you want to say — _"Hey function, when I say `this`, I mean THIS specific object."_

```js
function greet() {
  console.log(`Hello, I'm ${this.name}`);
}

const person = { name: "Ankit" };

greet();               // Output: Hello, I'm undefined  ❌ (this = global/window)
greet.call(person);    // Output: Hello, I'm Ankit  ✅ (this = person)
```

---

## The Problem These Methods Solve

```js
const ankit = {
  name: "Ankit",
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

const rahul = { name: "Rahul" };

// rahul doesn't have a greet method
// But we want to use ankit's greet for rahul

ankit.greet();              // Output: Hi, I'm Ankit  ✅
// rahul.greet();           // ❌ Error: rahul.greet is not a function

ankit.greet.call(rahul);    // Output: Hi, I'm Rahul  ✅ (borrowed the method!)
```

> `call`, `apply`, and `bind` let you **borrow methods** from one object and use them with another.

---

# 1. `call()` — Call With a Specific `this`

`call()` **immediately invokes** the function with the `this` value you provide. Extra arguments are passed **one by one**, separated by commas.

**Syntax**: `function.call(thisArg, arg1, arg2, arg3, ...)`

### Basic Example

```js
function sayHello(greeting) {
  console.log(`${greeting}, I'm ${this.name}`);
}

const person = { name: "Ankit" };

sayHello.call(person, "Hello");
// Output: Hello, I'm Ankit

sayHello.call(person, "Hey");
// Output: Hey, I'm Ankit
```

### With Multiple Arguments

```js
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}, age ${this.age}${punctuation}`);
}

const user = { name: "Ankit", age: 20 };

introduce.call(user, "Hi", "!");
// Output: Hi, I'm Ankit, age 20!

introduce.call(user, "Hello", ".");
// Output: Hello, I'm Ankit, age 20.
```

### Borrowing Methods Between Objects

```js
const person1 = {
  name: "Ankit",
  introduce(city) {
    console.log(`I'm ${this.name} from ${city}`);
  }
};

const person2 = { name: "Rahul" };
const person3 = { name: "Priya" };

person1.introduce("Delhi");                  // Output: I'm Ankit from Delhi
person1.introduce.call(person2, "Mumbai");   // Output: I'm Rahul from Mumbai
person1.introduce.call(person3, "Bangalore"); // Output: I'm Priya from Bangalore
```

### Borrowing Array Methods for Array-Like Objects

Some things look like arrays but aren't (like `arguments`, NodeLists). You can borrow array methods for them:

```js
function showArgs() {
  // `arguments` is array-like, but NOT a real array
  // console.log(arguments.join("-"));  // ❌ Error: join is not a function

  // Borrow join from Array:
  let result = Array.prototype.join.call(arguments, " - ");
  console.log(result);
}

showArgs("apple", "banana", "mango");
// Output: apple - banana - mango
```

```js
// Convert arguments to a real array:
function toArray() {
  return Array.prototype.slice.call(arguments);
}

console.log(toArray(1, 2, 3));
// Output: [1, 2, 3]

// Modern way (easier):
function toArray2() {
  return [...arguments];  // or Array.from(arguments)
}
```

### Using `call()` for Inheritance (Constructor Chaining)

```js
function Animal(name, sound) {
  this.name = name;
  this.sound = sound;
}

function Dog(name) {
  Animal.call(this, name, "Woof");  // Call Animal's constructor with Dog's `this`
  this.type = "Dog";
}

const buddy = new Dog("Buddy");
console.log(buddy);
// Output: { name: "Buddy", sound: "Woof", type: "Dog" }
```

### Checking Types with `call()`

```js
// The most reliable way to check the type of anything:
function getType(value) {
  return Object.prototype.toString.call(value);
}

console.log(getType(42));          // Output: [object Number]
console.log(getType("hello"));    // Output: [object String]
console.log(getType(true));       // Output: [object Boolean]
console.log(getType(null));       // Output: [object Null]
console.log(getType(undefined));  // Output: [object Undefined]
console.log(getType([]));         // Output: [object Array]
console.log(getType({}));         // Output: [object Object]
console.log(getType(() => {}));   // Output: [object Function]

// Way more reliable than typeof!
```

---

# 2. `apply()` — Same as `call()`, But Arguments in an Array

`apply()` is **almost identical** to `call()`. The only difference: arguments are passed as an **array** (or array-like object) instead of individually.

**Syntax**: `function.apply(thisArg, [arg1, arg2, arg3, ...])`

### Basic Example

```js
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: "Ankit" };

// call — arguments listed one by one
introduce.call(person, "Hello", "!");
// Output: Hello, I'm Ankit!

// apply — arguments in an array
introduce.apply(person, ["Hello", "!"]);
// Output: Hello, I'm Ankit!
```

### When `apply()` is Better Than `call()`

When you already have arguments in an **array**:

```js
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [10, 20, 30];

// With call — you'd need to manually spread them
console.log(sum.call(null, numbers[0], numbers[1], numbers[2]));  // Output: 60

// With apply — just pass the array
console.log(sum.apply(null, numbers));  // Output: 60

// Modern way — spread operator (easiest!)
console.log(sum(...numbers));  // Output: 60
```

### `Math.max()` and `Math.min()` with Arrays

```js
let scores = [85, 92, 67, 95, 78];

// Math.max doesn't accept arrays directly:
// console.log(Math.max(scores));  // Output: NaN ❌

// Old way — apply:
console.log(Math.max.apply(null, scores));  // Output: 95 ✅
console.log(Math.min.apply(null, scores));  // Output: 67 ✅

// Modern way — spread:
console.log(Math.max(...scores));  // Output: 95 ✅
console.log(Math.min(...scores));  // Output: 67 ✅
```

### Merging Arrays with `apply()`

```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

// Push all elements of arr2 into arr1
Array.prototype.push.apply(arr1, arr2);
console.log(arr1);  // Output: [1, 2, 3, 4, 5, 6]

// Modern way:
let arr3 = [1, 2, 3];
arr3.push(...[4, 5, 6]);
console.log(arr3);  // Output: [1, 2, 3, 4, 5, 6]
```

### The `null` or `undefined` as `this`

When you don't care about `this`, you can pass `null` or `undefined`:

```js
function add(a, b) {
  return a + b;  // doesn't use `this` at all
}

console.log(add.call(null, 2, 3));      // Output: 5
console.log(add.apply(undefined, [2, 3])); // Output: 5

// In non-strict mode, `this` will be window/global (it ignores null)
// In strict mode, `this` will actually be null/undefined
```

---

## `call()` vs `apply()` — Side by Side

```js
function greet(greeting, city) {
  console.log(`${greeting}! I'm ${this.name} from ${city}`);
}

const user = { name: "Ankit" };

//     call: arguments separated by Commas
greet.call(user, "Hello", "Delhi");
// Output: Hello! I'm Ankit from Delhi

//     apply: arguments in an Array
greet.apply(user, ["Hello", "Delhi"]);
// Output: Hello! I'm Ankit from Delhi
```

| Feature           | `call()`                    | `apply()`                     |
|-------------------|-----------------------------|-------------------------------|
| Arguments         | Passed **individually**     | Passed as **array**           |
| Syntax            | `fn.call(this, a, b, c)`   | `fn.apply(this, [a, b, c])`  |
| When to use       | Know args ahead of time     | Args already in an array      |
| Calls immediately | ✅ Yes                      | ✅ Yes                        |
| Memory trick      | **C**all = **C**ommas       | **A**pply = **A**rray         |

> **In modern JavaScript**, you rarely need `apply()` because the **spread operator `...`** can do the same thing with `call()`:
> ```js
> let args = ["Hello", "Delhi"];
> greet.call(user, ...args);  // same as apply!
> ```

---

# 3. `bind()` — Create a New Function with Locked `this`

`bind()` is **different** from `call()` and `apply()`. It does **NOT** call the function immediately. Instead, it **returns a brand new function** with `this` permanently set.

**Syntax**: `const newFn = function.bind(thisArg, arg1, arg2, ...)`

### Basic Example

```js
function greet() {
  console.log(`Hello, I'm ${this.name}`);
}

const person = { name: "Ankit" };

// call — runs immediately
greet.call(person);    // Output: Hello, I'm Ankit  (runs NOW)

// bind — returns a new function (doesn't run yet)
const greetAnkit = greet.bind(person);
greetAnkit();          // Output: Hello, I'm Ankit  (runs when YOU call it)
greetAnkit();          // Output: Hello, I'm Ankit  (can call it many times!)
```

### `this` is Permanently Locked

Once you `bind()`, `this` **cannot be changed** — not even by `call()`, `apply()`, or another `bind()`.

```js
function sayName() {
  console.log(this.name);
}

const person1 = { name: "Ankit" };
const person2 = { name: "Rahul" };

const boundFn = sayName.bind(person1);

boundFn();                    // Output: Ankit
boundFn.call(person2);        // Output: Ankit  (still Ankit! call can't override bind)
boundFn.apply(person2);       // Output: Ankit  (apply can't override either)
boundFn.bind(person2)();      // Output: Ankit  (even re-binding doesn't work!)
```

---

### Fixing `this` in Callbacks

This is the **#1 use case** for `bind()`:

```js
const person = {
  name: "Ankit",
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

// ❌ Without bind — `this` is lost
setTimeout(person.greet, 1000);
// Output (after 1s): Hi, I'm undefined

// ✅ With bind — `this` is locked
setTimeout(person.greet.bind(person), 1000);
// Output (after 1s): Hi, I'm Ankit

// ✅ Alternative: Arrow function wrapper
setTimeout(() => person.greet(), 1000);
// Output (after 1s): Hi, I'm Ankit
```

### With Event Listeners

```js
class Button {
  constructor(label) {
    this.label = label;
  }

  handleClick() {
    console.log(`Button "${this.label}" was clicked`);
  }
}

const btn = new Button("Submit");

// Pretend we have a button element:
// ❌ document.getElementById("btn").addEventListener("click", btn.handleClick);
// `this` would be the DOM element, not the Button instance

// ✅ Fix with bind:
// document.getElementById("btn").addEventListener("click", btn.handleClick.bind(btn));
// `this` = the Button instance ✅
```

---

### Partial Application with `bind()`

`bind()` can also **pre-fill arguments**. This is called **partial application**.

```js
function multiply(a, b) {
  return a * b;
}

// Pre-fill the first argument:
const double = multiply.bind(null, 2);   // a = 2, b = ?
const triple = multiply.bind(null, 3);   // a = 3, b = ?
const times10 = multiply.bind(null, 10); // a = 10, b = ?

console.log(double(5));    // Output: 10  (2 × 5)
console.log(triple(5));    // Output: 15  (3 × 5)
console.log(times10(5));   // Output: 50  (10 × 5)
console.log(double(100));  // Output: 200 (2 × 100)
```

### More Partial Application Examples

```js
// Tax calculator
function calculateTotal(taxRate, price) {
  return price + (price * taxRate);
}

const withGST = calculateTotal.bind(null, 0.18);     // 18% GST
const withVAT = calculateTotal.bind(null, 0.20);     // 20% VAT
const noTax = calculateTotal.bind(null, 0);           // No tax

console.log(withGST(1000));  // Output: 1180
console.log(withVAT(1000));  // Output: 1200
console.log(noTax(1000));    // Output: 1000
```

```js
// Logger with prefix
function log(level, message) {
  console.log(`[${level}] ${message}`);
}

const info = log.bind(null, "INFO");
const warn = log.bind(null, "WARN");
const error = log.bind(null, "ERROR");

info("Server started");    // Output: [INFO] Server started
warn("Low memory");         // Output: [WARN] Low memory
error("Connection failed"); // Output: [ERROR] Connection failed
```

```js
// URL builder
function buildURL(base, path, query) {
  return `${base}${path}?${query}`;
}

const apiURL = buildURL.bind(null, "https://api.example.com");

console.log(apiURL("/users", "page=1"));
// Output: https://api.example.com/users?page=1

console.log(apiURL("/posts", "limit=10"));
// Output: https://api.example.com/posts?limit=10
```

---

### Using `bind()` with Methods You Want to Reuse

```js
// Instead of writing the same method in multiple objects:
function describe() {
  return `${this.name} is ${this.age} years old and lives in ${this.city}`;
}

const ankit = { name: "Ankit", age: 20, city: "Delhi" };
const rahul = { name: "Rahul", age: 25, city: "Mumbai" };

const describeAnkit = describe.bind(ankit);
const describeRahul = describe.bind(rahul);

console.log(describeAnkit());  // Output: Ankit is 20 years old and lives in Delhi
console.log(describeRahul());  // Output: Rahul is 25 years old and lives in Mumbai
```

---

# All Three Together — Complete Comparison

```js
function introduce(greeting, hobby) {
  console.log(`${greeting}! I'm ${this.name}. I love ${hobby}.`);
}

const person = { name: "Ankit" };

// call — runs NOW, args individually
introduce.call(person, "Hi", "coding");
// Output: Hi! I'm Ankit. I love coding.

// apply — runs NOW, args in array
introduce.apply(person, ["Hey", "gaming"]);
// Output: Hey! I'm Ankit. I love gaming.

// bind — returns new function, runs LATER
const boundFn = introduce.bind(person, "Hello", "reading");
boundFn();
// Output: Hello! I'm Ankit. I love reading.
```

### Complete Comparison Table

| Feature                  | `call()`              | `apply()`              | `bind()`                    |
|--------------------------|-----------------------|------------------------|-----------------------------|
| **Executes immediately?**| ✅ Yes                | ✅ Yes                 | ❌ No (returns new function)|
| **Arguments format**     | Individually          | As array               | Individually                |
| **Returns**              | Function's result     | Function's result      | New function                |
| **Can pre-fill args?**   | ❌ No                 | ❌ No                  | ✅ Yes (partial application)|
| **`this` changeable?**   | N/A (one-time use)    | N/A (one-time use)     | ❌ Permanently locked       |
| **Use case**             | Borrow method once    | Args already in array  | Fix `this` for later use    |
| **Memory trick**         | **C**ommas            | **A**rray              | **B**ound for later         |

---

# Real-World Examples

### 1. Borrowing `console.log` for Shorter Alias

```js
const log = console.log.bind(console);

log("Hello!");       // Output: Hello!
log(1, 2, 3);       // Output: 1 2 3

// Without bind, `this` inside log wouldn't be console:
// const log2 = console.log;
// log2("test");  // ❌ Might throw error or give weird results
```

### 2. Creating Specialized Functions from Generic Ones

```js
function greet(timeOfDay, name) {
  console.log(`Good ${timeOfDay}, ${name}!`);
}

const goodMorning = greet.bind(null, "morning");
const goodEvening = greet.bind(null, "evening");

goodMorning("Ankit");  // Output: Good morning, Ankit!
goodEvening("Rahul");  // Output: Good evening, Rahul!
```

### 3. Function Borrowing for Different Data Structures

```js
// Borrow Array's forEach for a NodeList
// const divs = document.querySelectorAll("div");  // returns NodeList, not Array
// Array.prototype.forEach.call(divs, function(div) {
//   div.style.color = "red";
// });

// Borrow Array's slice to convert array-like to array
function getArgsArray() {
  return Array.prototype.slice.call(arguments);
}

console.log(getArgsArray(1, 2, 3));  // Output: [1, 2, 3]
```

### 4. Method Sharing Between Constructors (Inheritance)

```js
function Shape(color) {
  this.color = color;
}

function Circle(color, radius) {
  Shape.call(this, color);  // borrow Shape's constructor
  this.radius = radius;
}

function Rectangle(color, width, height) {
  Shape.call(this, color);  // borrow Shape's constructor
  this.width = width;
  this.height = height;
}

const circle = new Circle("red", 5);
console.log(circle);  // Output: { color: "red", radius: 5 }

const rect = new Rectangle("blue", 10, 20);
console.log(rect);    // Output: { color: "blue", width: 10, height: 20 }
```

### 5. Setting `this` in Class Methods for React-style Patterns

```js
class Component {
  constructor(name) {
    this.name = name;
    
    // Bind methods in constructor (common React pattern)
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  handleClick() {
    console.log(`${this.name} clicked`);
  }

  handleHover() {
    console.log(`${this.name} hovered`);
  }
}

const btn = new Component("LoginButton");

// Now these work even as standalone callbacks:
setTimeout(btn.handleClick, 100);  // Output: LoginButton clicked  ✅
setTimeout(btn.handleHover, 100);  // Output: LoginButton hovered  ✅
```

---

# Implementing Your Own `call`, `apply`, `bind`

Understanding how these work internally helps solidify the concept.

### Custom `call()`

```js
Function.prototype.myCall = function(context, ...args) {
  context = context || globalThis;         // default to global if null/undefined
  const uniqueKey = Symbol();              // create unique key to avoid conflicts
  context[uniqueKey] = this;               // attach the function to the object
  const result = context[uniqueKey](...args); // call it as a method (so this = context)
  delete context[uniqueKey];               // clean up
  return result;
};

// Test:
function greet(greeting) {
  console.log(`${greeting}, I'm ${this.name}`);
}

greet.myCall({ name: "Ankit" }, "Hello");
// Output: Hello, I'm Ankit
```

### Custom `apply()`

```js
Function.prototype.myApply = function(context, args = []) {
  context = context || globalThis;
  const uniqueKey = Symbol();
  context[uniqueKey] = this;
  const result = context[uniqueKey](...args);  // spread the array
  delete context[uniqueKey];
  return result;
};

// Test:
greet.myApply({ name: "Rahul" }, ["Hey"]);
// Output: Hey, I'm Rahul
```

### Custom `bind()`

```js
Function.prototype.myBind = function(context, ...boundArgs) {
  const fn = this;  // save reference to original function
  
  return function(...callArgs) {
    return fn.apply(context, [...boundArgs, ...callArgs]);
  };
};

// Test:
const boundGreet = greet.myBind({ name: "Priya" }, "Hi");
boundGreet();
// Output: Hi, I'm Priya
```

---

# When to Use Which?

| Situation                                        | Use          |
|--------------------------------------------------|--------------|
| Borrow a method for one-time use                 | `call()`     |
| Arguments are already in an array                | `apply()`    |
| Fix `this` for a callback (setTimeout, events)   | `bind()`     |
| Create specialized versions of a function        | `bind()`     |
| Constructor chaining / inheritance               | `call()`     |
| Checking types with `Object.prototype.toString`  | `call()`     |
| Borrow array methods for array-like objects      | `call()`     |
| Pass method as argument without losing `this`    | `bind()`     |

---

> **Key Takeaways**:
> 1. **`call()`** = invoke NOW with custom `this` + comma-separated args
> 2. **`apply()`** = invoke NOW with custom `this` + args as array
> 3. **`bind()`** = create new function with PERMANENTLY locked `this`
> 4. `bind()` is most useful for **callbacks** and **partial application**
> 5. `call()` is most useful for **method borrowing** and **constructor chaining**
> 6. In modern JS, you can often replace `apply()` with `call()` + spread: `fn.call(obj, ...args)`
> 7. **Memory trick**: **C**all = **C**ommas, **A**pply = **A**rray, **B**ind = **B**ound for later 🎯
