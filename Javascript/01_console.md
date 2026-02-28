# Console in JavaScript

## What is Console?

The **console** is a built-in tool in JavaScript that helps you **print messages**, **debug your code**, and **check what's happening** while your program runs.

Think of it like a **diary** where JavaScript writes down whatever you tell it to — so you can read it and understand what's going on inside your code.

You can see the console output in:
- **Browser**: Right-click on a webpage → Click "Inspect" → Go to the "Console" tab
- **Terminal/Node.js**: Just run your `.js` file using `node filename.js`

---

## 1. `console.log()` — The Most Common One

This is the one you'll use **99% of the time**. It simply **prints a message** to the console.

```js
console.log("Hello, World!");
// Output: Hello, World!

console.log(42);
// Output: 42

console.log(true);
// Output: true
```

You can also print **multiple things at once** by separating them with commas:

```js
let name = "Ankit";
let age = 20;

console.log("My name is", name, "and I am", age, "years old.");
// Output: My name is Ankit and I am 20 years old.
```

You can also use **template literals** (backticks `` ` ` ``) for cleaner output:

```js
console.log(`My name is ${name} and I am ${age} years old.`);
// Output: My name is Ankit and I am 20 years old.
```

---

## 2. `console.warn()` — Show a Warning

This prints a **warning message**. In the browser console, it shows up in **yellow** color.

It works exactly like `console.log()`, but it's used when you want to say: _"Hey, something might be wrong here!"_

```js
console.warn("This is a warning!");
// Output: ⚠️ This is a warning!   (shown in yellow in browser)
```

---

## 3. `console.error()` — Show an Error

This prints an **error message**. In the browser console, it shows up in **red** color.

Use this when something has **gone wrong**.

```js
console.error("Something went wrong!");
// Output: ❌ Something went wrong!   (shown in red in browser)
```

---

## 4. `console.info()` — Show Information

This prints an **informational message**. In most browsers, it looks the same as `console.log()`, but it tells the reader: _"This is just some info."_

```js
console.info("The app has started successfully.");
// Output: The app has started successfully.
```

---

## 5. `console.table()` — Print Data in a Table

This is **super useful** when you have an **array** or an **object** and you want to see it in a nice, clean **table format**.

```js
let fruits = ["Apple", "Banana", "Mango"];
console.table(fruits);

// Output:
// ┌─────────┬──────────┐
// │ (index) │  Values  │
// ├─────────┼──────────┤
// │    0    │ 'Apple'  │
// │    1    │ 'Banana' │
// │    2    │ 'Mango'  │
// └─────────┴──────────┘
```

It also works with **objects**:

```js
let person = { name: "Ankit", age: 20, city: "India" };
console.table(person);

// Output:
// ┌──────────┬─────────┐
// │ (index)  │ Values  │
// ├──────────┼─────────┤
// │   name   │ 'Ankit' │
// │   age    │   20    │
// │   city   │ 'India' │
// └──────────┴─────────┘
```

---

## 6. `console.clear()` — Clear the Console

This **removes everything** from the console screen. It's like hitting the reset button.

```js
console.log("This will be printed");
console.clear();
// The console is now empty! Everything above is gone.
```

---

## 7. `console.time()` and `console.timeEnd()` — Measure Time

Want to know **how long** a piece of code takes to run? Use these two together!

- `console.time("label")` — Starts a timer
- `console.timeEnd("label")` — Stops the timer and prints the time taken

> **Important**: Both must have the **same label** (the text inside the quotes).

```js
console.time("loop");

for (let i = 0; i < 100000; i++) {
  // doing some work...
}

console.timeEnd("loop");
// Output: loop: 3.456ms   (time will vary)
```

---

## 8. `console.count()` — Count How Many Times Something Runs

This **counts** how many times it has been called with the same label.

```js
console.count("click");  // Output: click: 1
console.count("click");  // Output: click: 2
console.count("click");  // Output: click: 3
console.count("hover");  // Output: hover: 1
console.count("click");  // Output: click: 4
```

To **reset** the count:

```js
console.countReset("click");
console.count("click");  // Output: click: 1   (starts from 1 again)
```

---

## 9. `console.group()` and `console.groupEnd()` — Group Messages Together

When you have multiple log messages and want to **organize them into a group**, use this.

```js
console.group("User Details");
console.log("Name: Ankit");
console.log("Age: 20");
console.log("City: India");
console.groupEnd();

// Output:
// ▼ User Details
//     Name: Ankit
//     Age: 20
//     City: India
```

You can also use `console.groupCollapsed()` — it does the same thing, but the group is **collapsed (closed) by default** in the browser.

```js
console.groupCollapsed("Server Info");
console.log("Port: 3000");
console.log("Status: Running");
console.groupEnd();

// Output: ▶ Server Info   (click to expand)
```

---

## 10. `console.assert()` — Print Only If Something is Wrong

This only prints a message **if the condition is `false`**. If the condition is `true`, it does **nothing**.

Think of it like: _"I expect this to be true. If it's not, tell me!"_

```js
let x = 10;

console.assert(x === 10, "x is NOT 10");
// Output: (nothing, because x IS 10 ✅)

console.assert(x === 5, "x is NOT 5");
// Output: Assertion failed: x is NOT 5 ❌
```

---

## 11. `console.dir()` — See Full Object Details

This shows you the **full structure** of an object in a tree-like format. Very useful for inspecting DOM elements in the browser.

```js
let car = { brand: "Toyota", year: 2024, electric: false };
console.dir(car);

// Output: (shows object in an expandable tree format)
// { brand: 'Toyota', year: 2024, electric: false }
```

---

## 12. `console.trace()` — See Where the Code Came From

This prints a **stack trace** — basically a trail showing **which functions called what** to reach this point. Super helpful for debugging.

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  console.trace("Trace here");
}

a();

// Output:
// Trace here
//   at c
//   at b
//   at a
```

---

## Quick Summary Table

| Method               | What It Does                                 |
|----------------------|----------------------------------------------|
| `console.log()`      | Print a normal message                       |
| `console.warn()`     | Print a warning (yellow in browser)          |
| `console.error()`    | Print an error (red in browser)              |
| `console.info()`     | Print info (same as log in most browsers)    |
| `console.table()`    | Print arrays/objects in a table format        |
| `console.clear()`    | Clear the console                            |
| `console.time()`     | Start a timer                                |
| `console.timeEnd()`  | Stop the timer and show time taken           |
| `console.count()`    | Count how many times something runs          |
| `console.group()`    | Group messages together                      |
| `console.assert()`   | Print message only if condition is false     |
| `console.dir()`      | Show full object details                     |
| `console.trace()`    | Show which functions were called (call stack)|

---

> **Pro Tip**: When you're just starting out, `console.log()` is your best friend. Use it everywhere to check what your variables hold and whether your code is running correctly! 🚀
