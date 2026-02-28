# Functions in JavaScript

## What is a Function?

A **function** is a **reusable block of code** that performs a specific task. Instead of writing the same code again and again, you write it once inside a function and **call** it whenever you need it.

Think of a function like a **recipe** — you write the steps once, and follow them every time you want to cook that dish.

```js
// Define the function (write the recipe)
function greet() {
  console.log("Hello, World!");
}

// Call the function (follow the recipe)
greet();  // Output: Hello, World!
greet();  // Output: Hello, World!  (reuse it as many times as you want!)
```

---

## Why Use Functions?

```js
// ❌ Without functions — repeating code
console.log("Welcome, Ankit!");
console.log("Have a great day!");

console.log("Welcome, Rahul!");
console.log("Have a great day!");

console.log("Welcome, Priya!");
console.log("Have a great day!");

// ✅ With a function — write once, use everywhere
function welcome(name) {
  console.log(`Welcome, ${name}!`);
  console.log("Have a great day!");
}

welcome("Ankit");
welcome("Rahul");
welcome("Priya");
```

---

# Types of Functions

## 1. Function Declaration

The most basic and common way to create a function.

```js
function add(a, b) {
  return a + b;
}

let result = add(3, 5);
console.log(result);  // Output: 8
```

### Key Feature: Hoisting

Function declarations are **hoisted** — you can call them **before** they're defined in the code!

```js
sayHi();  // ✅ Works! (function is hoisted)

function sayHi() {
  console.log("Hi!");
}
// Output: Hi!
```

---

## 2. Function Expression

Store a function inside a **variable**.

```js
const add = function(a, b) {
  return a + b;
};

console.log(add(3, 5));  // Output: 8
```

### NOT Hoisted!

```js
sayHi();  // ❌ Error: Cannot access 'sayHi' before initialization

const sayHi = function() {
  console.log("Hi!");
};
```

### Named vs Anonymous Function Expressions:

```js
// Anonymous — no name after "function"
const greet = function() {
  console.log("Hello!");
};

// Named — has a name (useful for debugging/stack traces)
const greet2 = function sayHello() {
  console.log("Hello!");
};

greet();   // Output: Hello!
greet2();  // Output: Hello!
// sayHello();  // ❌ Error: sayHello is not defined (name only accessible inside the function)
```

---

## 3. Arrow Functions (ES6) — The Modern Way

A **shorter syntax** for writing functions.

```js
// Regular function:
const add = function(a, b) {
  return a + b;
};

// Arrow function:
const addArrow = (a, b) => {
  return a + b;
};

// Even shorter — if only ONE expression, skip {} and return:
const addShort = (a, b) => a + b;

console.log(addShort(3, 5));  // Output: 8
```

### Shorthand Rules:

```js
// 1. One parameter — skip parentheses
const double = n => n * 2;
console.log(double(5));  // Output: 10

// 2. No parameters — need empty parentheses
const sayHi = () => console.log("Hi!");
sayHi();  // Output: Hi!

// 3. Multiple parameters — need parentheses
const add = (a, b) => a + b;

// 4. Multiple lines — need {} and return
const greet = (name) => {
  let message = `Hello, ${name}!`;
  return message;
};
console.log(greet("Ankit"));  // Output: Hello, Ankit!

// 5. Returning an object — wrap in ()
const makeUser = (name, age) => ({ name, age });
console.log(makeUser("Ankit", 20));  // Output: { name: "Ankit", age: 20 }
// Without () it thinks {} is a code block, not an object!
```

### Arrow Functions vs Regular Functions:

| Feature                    | Regular Function | Arrow Function |
|----------------------------|------------------|----------------|
| `this` binding             | Has its own `this` | Inherits `this` from parent |
| Can be used as constructor | ✅ Yes           | ❌ No          |
| `arguments` object         | ✅ Has it        | ❌ Doesn't have it |
| Hoisted                    | ✅ (declarations) | ❌ No         |
| Syntax                     | Longer           | Shorter         |

```js
// `this` difference:
const person = {
  name: "Ankit",
  
  // ✅ Regular function — `this` = person
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  },
  
  // ❌ Arrow function — `this` = outer scope (NOT person)
  greetArrow: () => {
    console.log(`Hi, I'm ${this.name}`);  // undefined!
  }
};

person.greet();       // Output: Hi, I'm Ankit  ✅
person.greetArrow();  // Output: Hi, I'm undefined  ❌
```

> **Rule of thumb**: Use arrow functions everywhere EXCEPT for object methods and constructors.

---

## 4. Immediately Invoked Function Expression (IIFE)

A function that **runs immediately** after being defined. No need to call it separately.

```js
(function() {
  console.log("I run immediately!");
})();
// Output: I run immediately!

// With arrow function:
(() => {
  console.log("Me too!");
})();
// Output: Me too!

// With parameters:
(function(name) {
  console.log(`Hello, ${name}!`);
})("Ankit");
// Output: Hello, Ankit!
```

**Why use IIFE?** To create a **private scope** — variables inside don't leak out.

```js
(function() {
  let secret = "hidden";
  console.log(secret);  // Output: hidden
})();

// console.log(secret);  // ❌ Error: secret is not defined
```

---

# Parameters and Arguments

- **Parameters** = the variables in the function definition (placeholders)
- **Arguments** = the actual values you pass when calling the function

```js
//             parameters
function add(a, b) {
  return a + b;
}

//       arguments
add(3, 5);  // 3 and 5 are arguments
```

---

## Default Parameters

Give a parameter a **fallback value** in case no argument is passed.

```js
function greet(name = "Guest") {
  console.log(`Hello, ${name}!`);
}

greet("Ankit");   // Output: Hello, Ankit!
greet();          // Output: Hello, Guest!  (default used)
greet(undefined); // Output: Hello, Guest!  (undefined triggers default)
greet(null);      // Output: Hello, null!   (null does NOT trigger default)
greet("");        // Output: Hello, !       (empty string does NOT trigger default)
```

### Multiple Defaults:

```js
function createUser(name, role = "user", active = true) {
  return { name, role, active };
}

console.log(createUser("Ankit"));
// Output: { name: "Ankit", role: "user", active: true }

console.log(createUser("Ankit", "admin"));
// Output: { name: "Ankit", role: "admin", active: true }

console.log(createUser("Ankit", "admin", false));
// Output: { name: "Ankit", role: "admin", active: false }
```

### Defaults Can Use Previous Parameters:

```js
function createPrice(price, tax = price * 0.1) {
  return { price, tax, total: price + tax };
}

console.log(createPrice(100));
// Output: { price: 100, tax: 10, total: 110 }

console.log(createPrice(100, 20));
// Output: { price: 100, tax: 20, total: 120 }
```

---

## Rest Parameters `...`

Collect **all remaining arguments** into an **array**.

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));       // Output: 6
console.log(sum(1, 2, 3, 4, 5)); // Output: 15
console.log(sum());               // Output: 0
```

### Rest Must Be the Last Parameter:

```js
function introduce(greeting, ...names) {
  names.forEach(name => console.log(`${greeting}, ${name}!`));
}

introduce("Hello", "Ankit", "Rahul", "Priya");
// Output:
// Hello, Ankit!
// Hello, Rahul!
// Hello, Priya!

// ❌ This is NOT allowed:
// function bad(...nums, last) { }  // Error: Rest parameter must be last
```

---

## The `arguments` Object (Old Way)

Every regular function has a built-in `arguments` object (like an array, but NOT an array).

```js
function showArgs() {
  console.log(arguments);
  console.log(arguments.length);
  console.log(arguments[0]);
}

showArgs("a", "b", "c");
// Output: { '0': 'a', '1': 'b', '2': 'c' }
// Output: 3
// Output: a

// ⚠️ Arrow functions do NOT have arguments:
const arrowFn = () => {
  // console.log(arguments);  // ❌ Error: arguments is not defined
};
```

> **Best Practice**: Use `...rest` parameters instead of `arguments`. It gives you a real array!

---

# Return Values

A function can **return** a value back to wherever it was called from.

```js
function add(a, b) {
  return a + b;  // sends the result back
}

let result = add(3, 5);
console.log(result);  // Output: 8
```

### Key Points About `return`:

```js
// 1. Function stops executing after return
function check(num) {
  if (num > 0) return "positive";
  if (num < 0) return "negative";
  return "zero";
  
  console.log("This NEVER runs!");  // unreachable code
}

console.log(check(5));   // Output: positive
console.log(check(-3));  // Output: negative
console.log(check(0));   // Output: zero

// 2. No return = returns undefined
function noReturn() {
  console.log("Hi!");
}
let val = noReturn();
console.log(val);  // Output: undefined

// 3. Empty return = returns undefined
function emptyReturn() {
  return;
}
console.log(emptyReturn());  // Output: undefined

// 4. Can return anything — number, string, array, object, function, etc.
function getUser() {
  return { name: "Ankit", age: 20 };
}

let user = getUser();
console.log(user.name);  // Output: Ankit
```

### Returning Multiple Values:

JavaScript can only return **one thing**, but you can wrap multiple values in an array or object:

```js
// Using an array:
function minMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}

let [min, max] = minMax([3, 7, 1, 9, 4]);
console.log(min, max);  // Output: 1 9

// Using an object:
function getStats(arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
    sum: arr.reduce((a, b) => a + b, 0)
  };
}

let { min: lo, max: hi, sum } = getStats([3, 7, 1, 9, 4]);
console.log(lo, hi, sum);  // Output: 1 9 24
```

---

# Scope in Functions

## Local Scope — Variables Inside a Function

Variables declared inside a function are **only accessible inside** that function.

```js
function myFunc() {
  let secret = "hidden";
  console.log(secret);  // ✅ Works
}

myFunc();
// console.log(secret);  // ❌ Error: secret is not defined
```

## Nested Functions Can Access Parent's Variables

```js
function outer() {
  let outerVar = "I'm outer";

  function inner() {
    let innerVar = "I'm inner";
    console.log(outerVar);  // ✅ Can access parent's variable
    console.log(innerVar);  // ✅ Can access own variable
  }

  inner();
  // console.log(innerVar);  // ❌ Error: innerVar is not defined
}

outer();
// Output:
// I'm outer
// I'm inner
```

---

# Closures

A **closure** is when a function **remembers** the variables from its **parent scope**, even after the parent function has finished running.

This is one of the **most important concepts** in JavaScript.

```js
function createCounter() {
  let count = 0;  // this variable is "trapped" in the closure

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter());  // Output: 1
console.log(counter());  // Output: 2
console.log(counter());  // Output: 3

// count is gone from normal scope, but the inner function still remembers it!
```

### Practical Closure Examples:

```js
// 1. Private variables
function createBankAccount(initialBalance) {
  let balance = initialBalance;  // private — can't be accessed from outside

  return {
    deposit(amount) {
      balance += amount;
      console.log(`Deposited ${amount}. Balance: ${balance}`);
    },
    withdraw(amount) {
      if (amount > balance) {
        console.log("Insufficient funds!");
        return;
      }
      balance -= amount;
      console.log(`Withdrew ${amount}. Balance: ${balance}`);
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
account.deposit(500);     // Output: Deposited 500. Balance: 1500
account.withdraw(200);    // Output: Withdrew 200. Balance: 1300
console.log(account.getBalance());  // Output: 1300
// console.log(balance);  // ❌ Error: can't access it directly!
```

```js
// 2. Function factories
function multiply(factor) {
  return (number) => number * factor;
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5));   // Output: 10
console.log(triple(5));   // Output: 15
console.log(double(10));  // Output: 20
```

```js
// 3. Memoization (caching results)
function memoize(fn) {
  let cache = {};

  return function(...args) {
    let key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log("From cache!");
      return cache[key];
    }
    let result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const slowAdd = (a, b) => {
  // pretend this is slow
  return a + b;
};

const fastAdd = memoize(slowAdd);
console.log(fastAdd(1, 2));  // Output: 3 (calculated)
console.log(fastAdd(1, 2));  // Output: From cache! 3 (from cache!)
```

---

# Callback Functions

A **callback** is a function that you **pass as an argument** to another function, to be called later.

```js
function greet(name, callback) {
  console.log(`Hello, ${name}!`);
  callback();
}

function sayBye() {
  console.log("Goodbye!");
}

greet("Ankit", sayBye);
// Output:
// Hello, Ankit!
// Goodbye!
```

### With Arrow Functions (more common):

```js
function doMath(a, b, operation) {
  return operation(a, b);
}

console.log(doMath(5, 3, (a, b) => a + b));   // Output: 8
console.log(doMath(5, 3, (a, b) => a * b));   // Output: 15
console.log(doMath(5, 3, (a, b) => a - b));   // Output: 2
```

### Callbacks Are Everywhere in JavaScript:

```js
// Array methods use callbacks
[1, 2, 3].forEach(num => console.log(num));
[1, 2, 3].map(num => num * 2);
[1, 2, 3].filter(num => num > 1);

// Event listeners use callbacks
// document.addEventListener("click", () => console.log("Clicked!"));

// setTimeout uses callbacks
setTimeout(() => {
  console.log("Runs after 2 seconds");
}, 2000);

// setInterval uses callbacks
// setInterval(() => console.log("Every 1 sec"), 1000);
```

---

# Higher-Order Functions

A **higher-order function** is a function that either:
1. **Takes a function as an argument** (like callbacks), OR
2. **Returns a function**

```js
// 1. Takes a function as argument
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, (i) => console.log(`Iteration ${i}`));
// Output:
// Iteration 0
// Iteration 1
// Iteration 2

// 2. Returns a function
function greeter(greeting) {
  return function(name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = greeter("Hello");
const sayHi = greeter("Hi");

sayHello("Ankit");  // Output: Hello, Ankit!
sayHi("Rahul");     // Output: Hi, Rahul!
```

### Common Built-in Higher-Order Functions:

```js
let numbers = [1, 2, 3, 4, 5];

// map — transforms each element
let doubled = numbers.map(n => n * 2);
console.log(doubled);  // Output: [2, 4, 6, 8, 10]

// filter — keeps elements that pass the test
let evens = numbers.filter(n => n % 2 === 0);
console.log(evens);  // Output: [2, 4]

// reduce — combines all elements into one value
let sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum);  // Output: 15

// sort — sorts with a compare function
let sorted = [3, 1, 4, 1, 5].sort((a, b) => a - b);
console.log(sorted);  // Output: [1, 1, 3, 4, 5]
```

---

# Pure Functions vs Impure Functions

## Pure Function

A function is **pure** if:
1. Same input → **always** the same output
2. **No side effects** (doesn't change anything outside itself)

```js
// ✅ Pure — same input always gives same output
function add(a, b) {
  return a + b;
}

console.log(add(2, 3));  // Output: 5  (always!)
console.log(add(2, 3));  // Output: 5  (always!)
```

## Impure Function

```js
// ❌ Impure — uses/changes external variable
let total = 0;

function addToTotal(num) {
  total += num;  // side effect: modifies external variable
  return total;
}

console.log(addToTotal(5));   // Output: 5
console.log(addToTotal(5));   // Output: 10  (different result with same input!)
```

```js
// ❌ Impure — different output each time
function getRandom() {
  return Math.random();
}

// ❌ Impure — side effect (console.log)
function logMessage(msg) {
  console.log(msg);  // interacting with the outside world
}
```

> **Best Practice**: Write **pure functions** whenever possible. They're easier to test, debug, and understand.

---

# Recursion

**Recursion** is when a function **calls itself**. It keeps calling itself until it reaches a **base case** (stopping condition).

```js
// Countdown
function countdown(n) {
  if (n <= 0) {           // base case — STOP!
    console.log("Done!");
    return;
  }
  console.log(n);
  countdown(n - 1);       // recursive call
}

countdown(5);
// Output: 5, 4, 3, 2, 1, Done!
```

### Classic Examples:

```js
// Factorial: 5! = 5 × 4 × 3 × 2 × 1 = 120
function factorial(n) {
  if (n <= 1) return 1;          // base case
  return n * factorial(n - 1);   // recursive call
}

console.log(factorial(5));   // Output: 120
console.log(factorial(0));   // Output: 1

// How it works:
// factorial(5)
// 5 * factorial(4)
// 5 * 4 * factorial(3)
// 5 * 4 * 3 * factorial(2)
// 5 * 4 * 3 * 2 * factorial(1)
// 5 * 4 * 3 * 2 * 1 = 120
```

```js
// Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21...
// Each number = sum of previous two
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(7));  // Output: 13
console.log(fibonacci(10)); // Output: 55
```

```js
// Flatten nested arrays
function flatten(arr) {
  let result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));  // recursion!
    } else {
      result.push(item);
    }
  }
  return result;
}

console.log(flatten([1, [2, [3, [4]], 5]]));
// Output: [1, 2, 3, 4, 5]
```

> ⚠️ **Always have a base case!** Without it, the function calls itself forever and crashes (stack overflow).

---

# Function Composition

**Combining** small functions to build bigger ones.

```js
const add10 = (x) => x + 10;
const multiply2 = (x) => x * 2;
const subtract5 = (x) => x - 5;

// Manual composition:
let result = subtract5(multiply2(add10(5)));
// add10(5) = 15 → multiply2(15) = 30 → subtract5(30) = 25
console.log(result);  // Output: 25

// Compose function:
function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

const transform = compose(subtract5, multiply2, add10);
console.log(transform(5));   // Output: 25

// Pipe (left to right):
function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

const process = pipe(add10, multiply2, subtract5);
console.log(process(5));  // Output: 25
```

---

# Currying

**Currying** transforms a function with multiple arguments into a sequence of functions, each taking **one argument**.

```js
// Normal function:
function add(a, b) {
  return a + b;
}
console.log(add(2, 3));  // Output: 5

// Curried version:
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}
console.log(curriedAdd(2)(3));  // Output: 5

// Arrow function version:
const curriedAdd2 = a => b => a + b;
console.log(curriedAdd2(2)(3));  // Output: 5
```

### Why is Currying Useful?

```js
// Create specialized functions:
const add5 = curriedAdd(5);
const add10 = curriedAdd(10);

console.log(add5(3));   // Output: 8
console.log(add10(3));  // Output: 13

// Practical example:
const multiply = a => b => a * b;

const double = multiply(2);
const triple = multiply(3);

console.log([1, 2, 3, 4].map(double));  // Output: [2, 4, 6, 8]
console.log([1, 2, 3, 4].map(triple));  // Output: [3, 6, 9, 12]
```

---

# Generator Functions

**Generators** are special functions that can **pause and resume**. They produce values **one at a time** using `yield`.

Defined with `function*` (star after function).

```js
function* countUp() {
  yield 1;
  yield 2;
  yield 3;
}

const counter = countUp();

console.log(counter.next());  // Output: { value: 1, done: false }
console.log(counter.next());  // Output: { value: 2, done: false }
console.log(counter.next());  // Output: { value: 3, done: false }
console.log(counter.next());  // Output: { value: undefined, done: true }
```

### Practical Example: ID Generator

```js
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
console.log(gen.next().value);  // Output: 1
console.log(gen.next().value);  // Output: 2
console.log(gen.next().value);  // Output: 3
// Goes on forever — generates a new ID each time
```

### Iterate Over a Generator:

```js
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (let num of range(1, 5)) {
  console.log(num);
}
// Output: 1, 2, 3, 4, 5

console.log([...range(1, 5)]);  // Output: [1, 2, 3, 4, 5]
```

---

# Useful Function Patterns

## Debounce — Wait Before Running

Delays execution until the user **stops doing something** for a specified time. Great for search inputs.

```js
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 500);

// If user types fast:
search("h");
search("he");
search("hel");
search("hell");
search("hello");
// Only "Searching for: hello" runs — after 500ms of no typing
```

## Throttle — Run At Most Once Per Interval

```js
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Scrolling...");
}, 1000);

// Even if called 100 times, only runs once per second
```

## Once — Run Only One Time

```js
function once(fn) {
  let called = false;
  let result;
  return function(...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const initialize = once(() => {
  console.log("Initialized!");
  return true;
});

initialize();  // Output: Initialized!   returns: true
initialize();  // (nothing printed)       returns: true  (same result, doesn't run again)
initialize();  // (nothing printed)       returns: true
```

---

# Quick Summary

| Type                    | Syntax                                  | Hoisted? |
|-------------------------|-----------------------------------------|----------|
| Function Declaration    | `function name() {}`                    | ✅ Yes   |
| Function Expression     | `const name = function() {}`            | ❌ No    |
| Arrow Function          | `const name = () => {}`                 | ❌ No    |
| IIFE                    | `(function() { })();`                   | N/A      |
| Generator               | `function* name() { yield }`            | ✅ Yes   |

| Concept          | What It Means                                          |
|------------------|--------------------------------------------------------|
| Parameters       | Placeholders in function definition                    |
| Arguments        | Actual values passed when calling                      |
| Default Params   | Fallback values: `function(a = 10)`                   |
| Rest Params      | Collect remaining args: `function(...args)`            |
| Return           | Send a value back to the caller                        |
| Closure          | Function remembers parent scope variables              |
| Callback         | Function passed as argument to another function        |
| Higher-Order     | Function that takes/returns functions                  |
| Pure Function    | Same input = same output, no side effects              |
| Recursion        | Function that calls itself                             |
| Currying         | Transform `f(a,b)` into `f(a)(b)`                     |
| Debounce         | Wait until user stops, then run                        |
| Throttle         | Run at most once per time interval                     |

---

> **Key Takeaways**:
> 1. Use **arrow functions** for short, simple functions and callbacks
> 2. Use **regular functions** for object methods and constructors
> 3. Use **`const`** to store function expressions (prevent accidental reassignment)
> 4. Use **default parameters** instead of checking `if (param === undefined)`
> 5. Use **rest parameters `...`** instead of the old `arguments` object
> 6. Understand **closures** — they're everywhere in real-world JavaScript
> 7. Write **pure functions** whenever possible
> 8. Always have a **base case** in recursive functions 🎯
