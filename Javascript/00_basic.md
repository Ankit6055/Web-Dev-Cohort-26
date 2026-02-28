# JavaScript Basics — The Things You MUST Know

## What Is JavaScript?

JavaScript is a **programming language** that makes websites interactive. HTML gives structure, CSS gives style, and **JS makes things happen** — clicks, animations, data fetching, form validation, and more.

```
HTML  → WHAT is on the page (structure)
CSS   → HOW it looks (style)
JS    → WHAT it does (behavior)
```

But JavaScript isn't just for browsers anymore. With **Node.js**, you can run JS on servers, build APIs, desktop apps (Electron), mobile apps (React Native), and even AI tools.

---

## JavaScript Is Single-Threaded

This is the **#1 thing** you need to understand about JavaScript.

**Single-threaded** = JavaScript has only **ONE call stack** — it can do only **ONE thing at a time**.

```js
console.log("First");    // Runs 1st
console.log("Second");   // Runs 2nd (waits for 1st to finish)
console.log("Third");    // Runs 3rd (waits for 2nd to finish)

// Output:
// First
// Second
// Third
```

Think of it like a **single-lane road** — cars (tasks) go one at a time. No overtaking.

### So How Does It Handle Slow Tasks?

If JS can only do one thing at a time, wouldn't a network request **freeze everything**? Nope — that's where the **Event Loop** comes in.

---

## The Event Loop — JS's Superpower

JavaScript uses an **event loop** with **callbacks/promises** to handle slow tasks **without blocking**.

```js
console.log("1 - Start");

setTimeout(() => {
    console.log("2 - Timer done");
}, 2000);

console.log("3 - End");

// Output:
// 1 - Start
// 3 - End
// 2 - Timer done   ← appears after 2 seconds!
```

**What happened?**
1. `"1 - Start"` runs immediately
2. `setTimeout` is handed off to the browser's **Web API** (not JS itself)
3. JS doesn't wait — moves on to `"3 - End"` immediately
4. After 2 seconds, the callback comes back through the **event loop** and prints `"2 - Timer done"`

### The Full Picture:

```
┌──────────────┐
│  CALL STACK   │  ← JS executes code here (one at a time)
│  (single)     │
└──────┬───────┘
       │
       │  Hands off async tasks
       ▼
┌──────────────┐
│   WEB APIs    │  ← Browser handles: setTimeout, fetch, DOM events
│  (separate)   │     These run OUTSIDE of JS's single thread
└──────┬───────┘
       │
       │  When done, callback goes to:
       ▼
┌──────────────┐
│ CALLBACK      │  ← Waiting line for completed tasks
│ QUEUE         │
└──────┬───────┘
       │
       │  Event Loop checks: "Is the call stack empty?"
       │  If YES → moves callback to call stack
       ▼
┌──────────────┐
│  CALL STACK   │  ← Now the callback runs!
└──────────────┘
```

### Key Takeaway:

> JS is single-threaded, but **the browser is NOT**. The browser handles timers, network requests, and events on separate threads. The **event loop** is the bridge that brings results back to JS.

---

## Synchronous vs Asynchronous

### Synchronous — Line by Line, Waits for Each to Finish:

```js
const result = heavyCalculation();  // ⏳ JS WAITS here until done
console.log(result);                // Only runs after calculation finishes
console.log("Next task");           // Runs after console.log finishes
```

### Asynchronous — Doesn't Wait, Moves On:

```js
fetch("https://api.example.com/data")  // 🚀 Starts request, moves on!
    .then(res => res.json())
    .then(data => console.log(data));  // Runs LATER when data arrives

console.log("I run immediately!");     // Doesn't wait for fetch
```

### Real-Life Analogy:

```
Synchronous  = You order food and STAND at the counter waiting.
               Nothing else happens until your food is ready. 🧍

Asynchronous = You order food, get a BUZZER, and sit down.
               You can do other things. The buzzer goes off when food is ready. 📳
```

---

## Call Stack — How JS Executes Code

The call stack is a **LIFO** (Last In, First Out) structure. Think of it as a stack of plates — last plate placed on top comes off first.

```js
function greet() {
    return "Hello!";
}

function sayHi() {
    const message = greet();    // greet() goes ON the stack
    console.log(message);       // greet() finishes, comes OFF
}

sayHi();   // sayHi() goes on the stack

/*
  Call Stack steps:
  
  1. sayHi()        ← pushed
  2. greet()        ← pushed on top of sayHi
  3. greet() done   ← popped off
  4. console.log()  ← pushed
  5. console.log done ← popped
  6. sayHi() done   ← popped

  Stack is now empty ✅
*/
```

### Stack Overflow:

```js
function forever() {
    forever();   // Calls itself infinitely
}
forever();

// ❌ RangeError: Maximum call stack size exceeded
// The stack fills up until the browser stops it
```

---

## JavaScript Runs in Two Places

### 1. Browser (Client-Side):

```js
// Can access:
document.getElementById("title");   // DOM manipulation
window.alert("Hello!");             // Browser APIs
localStorage.setItem("key", "val"); // Storage
fetch("https://api.com/data");      // Network requests

// Can NOT:
// ❌ Access files on user's computer
// ❌ Access databases directly
// ❌ Run system commands
```

### 2. Node.js (Server-Side):

```js
// Can access:
const fs = require('fs');            // File system
const http = require('http');        // Create servers
const path = require('path');        // File paths
// Connect to databases, run commands, etc.

// Can NOT:
// ❌ Access DOM (document, window don't exist)
// ❌ Access localStorage
```

---

## JavaScript Engines

Every browser has a **JS engine** that reads and runs your code:

| Browser         | Engine           |
|-----------------|------------------|
| Chrome          | **V8**           |
| Firefox         | SpiderMonkey     |
| Safari          | JavaScriptCore   |
| Edge            | V8 (Chromium)    |
| Node.js         | **V8**           |

V8 (by Google) is the most popular — it powers both Chrome AND Node.js.

### How Code Runs:

```
Your JS Code
     │
     ▼
┌─────────────┐
│   PARSING    │  ← Reads your code, checks syntax
└─────┬───────┘
      ▼
┌─────────────┐
│    AST       │  ← Abstract Syntax Tree (structured representation)
└─────┬───────┘
      ▼
┌─────────────┐
│  COMPILER /  │  ← Converts to machine code
│ INTERPRETER  │     (V8 uses JIT — Just In Time compilation)
└─────┬───────┘
      ▼
┌─────────────┐
│  EXECUTION   │  ← Runs the machine code
└─────────────┘
```

---

## Interpreted vs Compiled — JS Is Both!

```
Interpreted: Code runs line-by-line (like Python)
  ✅ Fast to start
  ❌ Slower execution

Compiled: Code is fully converted to machine code first (like C++)
  ❌ Slow to start (compile step)
  ✅ Faster execution

JavaScript: JIT (Just-In-Time) Compilation
  ✅ Starts fast (interprets first)
  ✅ Gets faster (compiles hot code in the background)
  Best of both worlds!
```

---

## Dynamic Typing

JavaScript figures out the type **at runtime** — you don't declare types.

```js
let x = 42;          // x is a Number
x = "hello";         // Now x is a String — no error!
x = true;            // Now x is a Boolean
x = [1, 2, 3];       // Now x is an Array

// In languages like Java/TypeScript:
// int x = 42;
// x = "hello";  ← ERROR! Can't change type
```

### Pros & Cons:

```
✅ Flexible — write code faster
✅ No need to declare types
❌ Bugs can hide (passing wrong type)
❌ No autocomplete help from editor
❌ Type errors found at RUNTIME, not compile time

That's why TypeScript exists — adds types to JavaScript!
```

---

## Hoisting — Variables and Functions Move Up

JavaScript **moves declarations to the top** of their scope before executing.

```js
// What you write:
console.log(name);       // undefined (not an error!)
var name = "Ankit";

// What JS actually does (hoisting):
var name;                // Declaration moved to top
console.log(name);       // undefined
name = "Ankit";          // Assignment stays in place


// ⚠️ let and const are hoisted too, BUT:
console.log(age);        // ❌ ReferenceError! (Temporal Dead Zone)
let age = 25;

// Functions are FULLY hoisted:
sayHi();                 // ✅ Works! "Hello!"
function sayHi() {
    console.log("Hello!");
}

// Function EXPRESSIONS are NOT hoisted:
greet();                 // ❌ TypeError: greet is not a function
var greet = function() {
    console.log("Hey!");
};
```

### Hoisting Rules:

| Declaration            | Hoisted?  | Value Before Declaration  |
|------------------------|-----------|---------------------------|
| `var`                  | ✅ Yes     | `undefined`               |
| `let`                  | ✅ Yes*    | ❌ ReferenceError (TDZ)    |
| `const`                | ✅ Yes*    | ❌ ReferenceError (TDZ)    |
| `function` declaration | ✅ Fully   | ✅ Callable                |
| `function` expression  | ✅ Var only| `undefined`               |
| Arrow functions        | ✅ Var only| `undefined`               |

*Hoisted but in the **Temporal Dead Zone** (TDZ) — can't use before declaration.

---

## Scope — Where Variables Live

### Global Scope:

```js
var globalVar = "I'm everywhere";   // Accessible anywhere

function test() {
    console.log(globalVar);   // ✅ Accessible inside functions
}
```

### Function Scope:

```js
function myFunc() {
    var secret = "hidden";     // Only exists inside this function
    console.log(secret);       // ✅ Works
}
console.log(secret);           // ❌ ReferenceError — not accessible outside
```

### Block Scope (`let` and `const`):

```js
if (true) {
    let blockVar = "inside";
    const alsoBlock = "inside";
    var notBlock = "escapes!";
}

console.log(blockVar);    // ❌ ReferenceError
console.log(alsoBlock);   // ❌ ReferenceError
console.log(notBlock);    // ✅ "escapes!" — var ignores blocks!

// 🔑 This is why you should ALWAYS use let/const, NEVER var
```

### Scope Chain:

```js
const outer = "outer";

function parent() {
    const middle = "middle";
    
    function child() {
        const inner = "inner";
        console.log(inner);    // ✅ Own scope
        console.log(middle);   // ✅ Parent's scope
        console.log(outer);    // ✅ Grandparent's scope
    }
    
    child();
}

// JS looks UP the scope chain: own → parent → grandparent → ... → global
```

---

## Strict Mode

```js
"use strict";    // Put at the top of file or function

// Strict mode catches common mistakes:

x = 10;                    // ❌ Error — must declare with let/const/var
delete Object.prototype;   // ❌ Error — can't delete built-in
function f(a, a) {}        // ❌ Error — duplicate parameter names
var undefined = 5;         // ❌ Error — can't assign to reserved words
this;                      // undefined (instead of window in non-strict)

// ✅ Always use strict mode — it prevents silent errors
// Note: ES6 modules are automatically in strict mode
```

---

## `var` vs `let` vs `const`

| Feature          | `var`                | `let`               | `const`             |
|-----------------|----------------------|----------------------|----------------------|
| Scope           | Function-scoped      | Block-scoped         | Block-scoped         |
| Hoisted?        | Yes (`undefined`)    | Yes (TDZ)            | Yes (TDZ)            |
| Re-declare?     | ✅ Yes                | ❌ No                 | ❌ No                 |
| Re-assign?      | ✅ Yes                | ✅ Yes                | ❌ No                 |
| Best practice?  | ❌ Avoid              | ✅ For changing values | ✅ Default choice     |

```js
// ✅ Modern JavaScript rule:
// Use const by default
// Use let when you need to reassign
// Never use var

const API_URL = "https://api.example.com";   // Won't change
let count = 0;                                 // Will change
count++;                                       // ✅ OK

const user = { name: "Ankit" };
user.name = "John";    // ✅ OK — object CONTENTS can change
user = {};             // ❌ Error — can't reassign the variable itself
```

---

## Type Coercion — JS Auto-Converts Types

JavaScript **silently converts types** when operations mix different types:

```js
// String + Number → String (concatenation)
"5" + 3          // "53"   (3 becomes "3")
"hello" + 5      // "hello5"

// Other operators → Number
"5" - 3          // 2      ("5" becomes 5)
"5" * 2          // 10
"10" / 2         // 5
true + 1         // 2      (true becomes 1)
false + 1        // 1      (false becomes 0)
null + 5         // 5      (null becomes 0)

// Comparison weirdness
"5" == 5         // true   (type coercion — converts before comparing)
"5" === 5        // false  (strict — no coercion, different types)

// ✅ ALWAYS use === (strict equality)
// ❌ AVOID == (loose equality — causes bugs)
```

### Falsy & Truthy Values:

```js
// FALSY — these are treated as false in conditions:
false
0
-0
""            // empty string
null
undefined
NaN

// TRUTHY — everything else is true:
true
1, -1, 3.14       // any non-zero number
"hello", "0"       // any non-empty string
[], {}             // empty array and object — YES, they're truthy!
function() {}

// Examples:
if ("") { }         // ❌ Doesn't run — empty string is falsy
if ("hello") { }    // ✅ Runs — non-empty string is truthy
if (0) { }          // ❌ Doesn't run
if ([]) { }         // ✅ Runs — empty array is truthy!
```

---

## Garbage Collection

You don't manually free memory in JS — the engine does it automatically.

```js
let user = { name: "Ankit" };   // Object created in memory
user = null;                     // Object has no reference → garbage collected

// The JS engine (V8) uses "mark-and-sweep":
// 1. Start from root (global, call stack)
// 2. Mark everything reachable
// 3. Sweep (delete) everything unmarked

// Memory leaks happen when you accidentally keep references:
let cache = [];
function addToCache(data) {
    cache.push(data);   // ⚠️ cache grows forever if you never clear it!
}
```

---

## ECMAScript — The JS Standard

JavaScript follows the **ECMAScript** specification. New features are added yearly:

| Version    | Year | Key Features                                        |
|-----------|------|------------------------------------------------------|
| ES5       | 2009 | `strict mode`, `JSON`, `forEach`, `map`, `filter`    |
| **ES6/ES2015** | 2015 | `let/const`, arrows, classes, promises, template literals, destructuring, modules |
| ES2016    | 2016 | `Array.includes()`, `**` operator                    |
| ES2017    | 2017 | `async/await`, `Object.entries()`                    |
| ES2018    | 2018 | Rest/Spread for objects, `Promise.finally()`         |
| ES2019    | 2019 | `Array.flat()`, `Object.fromEntries()`               |
| ES2020    | 2020 | Optional chaining `?.`, nullish coalescing `??`      |
| ES2021    | 2021 | `String.replaceAll()`, logical assignment             |
| ES2022    | 2022 | Top-level `await`, `.at()`, private class fields     |
| ES2023    | 2023 | `findLast()`, `toSorted()`, `toReversed()`           |

```js
// You're writing modern JS (ES6+) when you use:
const x = 5;               // const
const fn = () => {};        // arrow functions
const { name } = user;     // destructuring
const msg = `Hi ${name}`;  // template literals
import/export              // modules
async/await                // async
user?.address?.city         // optional chaining
value ?? "default"          // nullish coalescing
```

---

## Quick Reference — JS Fundamentals

| Concept              | What It Means                                           |
|----------------------|---------------------------------------------------------|
| Single-threaded      | One thing at a time (one call stack)                    |
| Event Loop           | Handles async tasks without blocking                    |
| Dynamic typing       | Types determined at runtime, can change                 |
| JIT Compilation      | Interprets first, compiles hot code for speed           |
| Hoisting             | Declarations move to top of scope                       |
| Scope chain          | Inner functions access outer variables                  |
| Garbage collection   | Engine auto-frees unused memory                         |
| Strict mode          | Catches silent errors (`"use strict"`)                  |
| Type coercion        | JS auto-converts types (use `===` to avoid surprises)   |
| Prototype-based      | Inheritance through prototypes, not classical classes   |
| First-class functions| Functions are values — assign, pass, return them        |

---

> **Key Takeaways**:
> 1. JS is **single-threaded** — one call stack, one task at a time
> 2. The **Event Loop** + Web APIs make async possible without blocking
> 3. Always use **`const`** by default, **`let`** when reassigning, **never `var`**
> 4. Always use **`===`** (strict equality) — `==` causes type coercion bugs
> 5. **Hoisting** moves declarations up — `var` gives `undefined`, `let/const` throw errors
> 6. JS is **dynamically typed** — flexible but error-prone (TypeScript fixes this)
> 7. Understanding the **call stack, scope chain, and event loop** is the foundation of everything in JS 🎯
