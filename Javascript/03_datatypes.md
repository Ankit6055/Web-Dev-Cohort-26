# Data Types in JavaScript

## What are Data Types?

Every piece of data in JavaScript has a **type**. The type tells JavaScript **what kind of value** it is and **what you can do with it**.

Think of it like this: A number `5` and a text `"5"` look similar, but they behave **very differently**. JavaScript needs to know what type each value is so it can handle it correctly.

```js
let a = 5;      // This is a Number
let b = "5";    // This is a String (text)

console.log(a + 2);   // Output: 7      (math addition)
console.log(b + 2);   // Output: 52     (text joining — "5" + "2" = "52")
```

---

## Two Categories of Data Types

JavaScript data types are divided into **two big groups**:

| Category       | Types                                                     | Stored As        |
|----------------|-----------------------------------------------------------|------------------|
| **Primitive**  | String, Number, Boolean, Undefined, Null, BigInt, Symbol  | The **value** itself |
| **Non-Primitive (Reference)** | Object, Array, Function                   | A **reference** (address) to the value |

The key difference:
- **Primitive** = stores the actual value directly
- **Reference** = stores a pointer/address to where the value lives in memory

Don't worry if this doesn't make sense yet — we'll explain it clearly below!

---

# Primitive Data Types (7 Total)

These are the **basic building blocks**. They hold a **single, simple value**.

---

## 1. String — Text

A **string** is any text wrapped in quotes. You can use single quotes `' '`, double quotes `" "`, or backticks `` ` ` ``.

```js
let firstName = "Ankit";        // double quotes ✅
let lastName = 'Kumar';         // single quotes ✅
let greeting = `Hello!`;        // backticks (template literal) ✅

console.log(typeof firstName);
// Output: string
```

### String with Quotes Inside:

```js
let msg1 = "He said 'Hello'";       // single quotes inside double quotes ✅
let msg2 = 'He said "Hello"';       // double quotes inside single quotes ✅
let msg3 = "He said \"Hello\"";     // escape with backslash ✅

console.log(msg1);  // Output: He said 'Hello'
console.log(msg2);  // Output: He said "Hello"
```

### Template Literals (Backticks) — The Best Way:

Backticks let you **embed variables** directly inside a string using `${ }`:

```js
let name = "Ankit";
let age = 20;

console.log(`My name is ${name} and I am ${age} years old.`);
// Output: My name is Ankit and I am 20 years old.

// They also support multi-line strings:
let poem = `Roses are red,
Violets are blue,
JavaScript is awesome,
And so are you!`;

console.log(poem);
// Output:
// Roses are red,
// Violets are blue,
// JavaScript is awesome,
// And so are you!
```

### String Length & Common Methods:

```js
let str = "Hello, World!";

console.log(str.length);            // Output: 13
console.log(str.toUpperCase());     // Output: HELLO, WORLD!
console.log(str.toLowerCase());     // Output: hello, world!
console.log(str.includes("World")); // Output: true
console.log(str.indexOf("World"));  // Output: 7
console.log(str.slice(0, 5));       // Output: Hello
console.log(str.replace("World", "JS")); // Output: Hello, JS!
console.log(str.trim());            // Removes extra spaces from start and end
console.log(str.split(", "));       // Output: ["Hello", "World!"]
```

### Strings are Immutable:

You **cannot change** a character in a string directly. You have to create a new string.

```js
let word = "Hello";
word[0] = "Y";        // ❌ This does nothing!
console.log(word);     // Output: Hello  (unchanged)

// Instead, create a new string:
word = "Y" + word.slice(1);
console.log(word);     // Output: Yello
```

---

## 2. Number — Numbers (Integers & Decimals)

JavaScript has **one number type** for both whole numbers and decimal numbers.

```js
let age = 25;          // integer (whole number)
let price = 99.99;     // float (decimal number)
let negative = -10;    // negative number

console.log(typeof age);
// Output: number
```

### Special Number Values:

```js
console.log(10 / 0);          // Output: Infinity
console.log(-10 / 0);         // Output: -Infinity
console.log("hello" * 2);     // Output: NaN  (Not a Number)
console.log(typeof NaN);      // Output: number  (yes, NaN is technically a "number" 😂)
```

### Checking for NaN:

```js
let result = "abc" * 5;

console.log(isNaN(result));   // Output: true  (it IS NaN)
console.log(isNaN(42));       // Output: false  (42 is a valid number)

// Better way (ES6):
console.log(Number.isNaN(result));  // Output: true
console.log(Number.isNaN("abc"));   // Output: false  (doesn't try to convert)
```

### Useful Number Methods:

```js
let num = 3.14159;

console.log(num.toFixed(2));       // Output: "3.14"  (round to 2 decimal places — returns string!)
console.log(parseInt("42px"));     // Output: 42  (extracts integer from string)
console.log(parseFloat("3.14px")); // Output: 3.14  (extracts decimal from string)
console.log(Number("123"));       // Output: 123  (converts string to number)
console.log(Number("hello"));     // Output: NaN  (can't convert)
console.log(Number(true));        // Output: 1
console.log(Number(false));       // Output: 0
```

### Number Limits:

```js
console.log(Number.MAX_SAFE_INTEGER);  // Output: 9007199254740991
console.log(Number.MIN_SAFE_INTEGER);  // Output: -9007199254740991

// Beyond this, numbers become inaccurate:
console.log(9007199254740991 + 1);  // Output: 9007199254740992 ✅
console.log(9007199254740991 + 2);  // Output: 9007199254740992 ❌ (wrong!)
// For bigger numbers, use BigInt (see below)
```

---

## 3. Boolean — True or False

A **boolean** can only be one of two values: `true` or `false`.

Used for **decisions** (conditions, comparisons, etc.).

```js
let isLoggedIn = true;
let hasPermission = false;

console.log(typeof isLoggedIn);
// Output: boolean
```

### Comparisons Return Booleans:

```js
console.log(5 > 3);     // Output: true
console.log(10 === 10);  // Output: true
console.log(5 < 2);     // Output: false
console.log("a" === "b"); // Output: false
```

### Truthy and Falsy Values:

In JavaScript, **every value** can be treated as `true` or `false` when used in a condition.

**Falsy values** (these are treated as `false`):

```js
console.log(Boolean(false));      // Output: false
console.log(Boolean(0));          // Output: false
console.log(Boolean(-0));         // Output: false
console.log(Boolean(""));         // Output: false  (empty string)
console.log(Boolean(null));       // Output: false
console.log(Boolean(undefined));  // Output: false
console.log(Boolean(NaN));        // Output: false
```

**Everything else is truthy** (treated as `true`):

```js
console.log(Boolean(1));          // Output: true
console.log(Boolean("hello"));   // Output: true
console.log(Boolean([]));         // Output: true  (empty array is truthy!)
console.log(Boolean({}));         // Output: true  (empty object is truthy!)
console.log(Boolean("0"));        // Output: true  (string "0" is truthy!)
console.log(Boolean(" "));        // Output: true  (string with space is truthy!)
```

> **Memory trick**: There are only **7 falsy values**. Everything else is truthy!

---

## 4. Undefined — No Value Assigned

When you create a variable but **don't give it a value**, JavaScript gives it the value `undefined`.

It means: _"This variable exists, but nobody put anything in it yet."_

```js
let x;
console.log(x);
// Output: undefined

console.log(typeof x);
// Output: undefined
```

### When does `undefined` appear?

```js
// 1. Variable declared but not assigned
let a;
console.log(a);  // Output: undefined

// 2. Function that doesn't return anything
function greet() {
  console.log("Hi!");
}
let result = greet();
console.log(result);  // Output: undefined

// 3. Accessing a property that doesn't exist
let person = { name: "Ankit" };
console.log(person.age);  // Output: undefined

// 4. Array index that doesn't exist
let arr = [1, 2, 3];
console.log(arr[10]);  // Output: undefined
```

---

## 5. Null — Intentionally Empty

`null` means: _"I deliberately set this to nothing."_

The difference between `null` and `undefined`:
- `undefined` = JavaScript set it (nothing was assigned)
- `null` = **YOU** set it on purpose

```js
let selectedItem = null;  // "I deliberately say: there's no item selected right now"

console.log(selectedItem);
// Output: null

console.log(typeof selectedItem);
// Output: object   (⚠️ This is a famous bug in JavaScript! null is NOT an object)
```

### Checking for null properly:

```js
let value = null;

// Don't use typeof (gives wrong result)
console.log(typeof value);  // Output: object ❌ (misleading)

// Use strict equality instead
console.log(value === null);  // Output: true ✅
```

### `null` vs `undefined`:

```js
console.log(null == undefined);   // Output: true   (loose comparison says they're "similar")
console.log(null === undefined);  // Output: false   (strict comparison says they're different)

console.log(null + 5);           // Output: 5   (null becomes 0)
console.log(undefined + 5);      // Output: NaN  (undefined becomes NaN)
```

---

## 6. BigInt — Really Big Numbers

When numbers get **bigger than** `Number.MAX_SAFE_INTEGER` (9007199254740991), they become inaccurate. **BigInt** solves this problem.

Just add an `n` at the end of the number:

```js
let bigNumber = 9007199254740991n;
let anotherBig = BigInt("123456789012345678901234567890");

console.log(bigNumber + 1n);
// Output: 9007199254740992n  ✅ (accurate!)

console.log(typeof bigNumber);
// Output: bigint
```

### Rules for BigInt:

```js
// ❌ Cannot mix BigInt and regular numbers
console.log(10n + 5);  // ❌ Error: Cannot mix BigInt and other types

// ✅ Convert first, then do math
console.log(10n + BigInt(5));  // Output: 15n
console.log(Number(10n) + 5); // Output: 15
```

> **When to use**: Only when you need **extremely large numbers** (like crypto calculations, database IDs, etc.). For normal use, regular `Number` is fine.

---

## 7. Symbol — Unique Identifiers

A **Symbol** is a **completely unique value**. Even if you create two Symbols with the same description, they're **different**.

```js
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 === id2);
// Output: false  (every Symbol is unique!)

console.log(typeof id1);
// Output: symbol
```

> **When to use**: Symbols are mostly used in advanced JavaScript — for creating unique object property keys that can't be accidentally overwritten. You don't need to worry about them as a beginner.

```js
let user = {};
let id = Symbol("userId");

user[id] = 101;
console.log(user[id]);  // Output: 101
console.log(user);      // Output: { [Symbol(userId)]: 101 }
```

---

# Non-Primitive (Reference) Data Types

These can hold **multiple values** or **complex data**.

---

## 1. Object — Collection of Key-Value Pairs

An **object** is like a **real-world thing** with properties.

```js
let person = {
  name: "Ankit",
  age: 20,
  isStudent: true,
  hobbies: ["coding", "gaming"]
};

console.log(person.name);       // Output: Ankit
console.log(person["age"]);     // Output: 20
console.log(typeof person);     // Output: object
```

### Adding, Changing, Deleting Properties:

```js
let car = { brand: "Toyota", year: 2024 };

// Add a new property
car.color = "Red";

// Change a property
car.year = 2025;

// Delete a property
delete car.color;

console.log(car);
// Output: { brand: "Toyota", year: 2025 }
```

---

## 2. Array — Ordered List of Values

An **array** is a **list** that holds multiple values in a specific order. Each value has a **position** (index) starting from `0`.

```js
let fruits = ["Apple", "Banana", "Mango"];

console.log(fruits[0]);     // Output: Apple  (first item)
console.log(fruits[1]);     // Output: Banana
console.log(fruits[2]);     // Output: Mango  (last item)
console.log(fruits.length); // Output: 3

console.log(typeof fruits); // Output: object  (arrays are objects in JS!)
```

### Check if something is an array:

```js
console.log(Array.isArray(fruits));  // Output: true ✅
console.log(Array.isArray("hello")); // Output: false
```

---

## 3. Function — Reusable Block of Code

A **function** is a piece of code that you can **call (run) whenever you want**.

```js
function add(a, b) {
  return a + b;
}

console.log(add(3, 5));
// Output: 8

console.log(typeof add);
// Output: function
```

> Functions are actually **objects** in JavaScript, but `typeof` gives them a special label `"function"`.

---

# Primitive vs Reference — The Big Difference

This is one of the **most important concepts** to understand!

## Primitive: Copies the VALUE

```js
let a = 10;
let b = a;    // b gets a COPY of a's value

b = 20;

console.log(a);  // Output: 10  (unchanged! a has its own copy)
console.log(b);  // Output: 20
```

## Reference: Copies the ADDRESS (not the value!)

```js
let obj1 = { name: "Ankit" };
let obj2 = obj1;   // obj2 gets the SAME reference (not a copy!)

obj2.name = "Rahul";

console.log(obj1.name);  // Output: Rahul  (⚠️ obj1 also changed!)
console.log(obj2.name);  // Output: Rahul
```

**Why?** Because `obj1` and `obj2` both **point to the same object** in memory. They're like two remote controls for the same TV.

### How to make a real copy of an object:

```js
let original = { name: "Ankit", age: 20 };

// Method 1: Spread operator (shallow copy)
let copy1 = { ...original };

// Method 2: Object.assign (shallow copy)
let copy2 = Object.assign({}, original);

copy1.name = "Rahul";
console.log(original.name);  // Output: Ankit  (original is unchanged ✅)
console.log(copy1.name);     // Output: Rahul
```

Same for arrays:

```js
let arr1 = [1, 2, 3];
let arr2 = [...arr1];    // spread operator — makes a real copy

arr2.push(4);
console.log(arr1);  // Output: [1, 2, 3]  (unchanged ✅)
console.log(arr2);  // Output: [1, 2, 3, 4]
```

---

## Type Conversion (Changing One Type to Another)

### String Conversion:

```js
let num = 42;

// Method 1: String()
console.log(String(num));       // Output: "42"

// Method 2: .toString()
console.log(num.toString());    // Output: "42"

// Method 3: Concatenation with ""
console.log(num + "");          // Output: "42"
```

### Number Conversion:

```js
console.log(Number("42"));        // Output: 42
console.log(Number("3.14"));      // Output: 3.14
console.log(Number(""));          // Output: 0
console.log(Number(" "));         // Output: 0
console.log(Number("hello"));     // Output: NaN
console.log(Number(true));        // Output: 1
console.log(Number(false));       // Output: 0
console.log(Number(null));        // Output: 0
console.log(Number(undefined));   // Output: NaN

// Quick shortcut: use + before a string
console.log(+"42");               // Output: 42
console.log(+true);               // Output: 1
```

### Boolean Conversion:

```js
console.log(Boolean(1));          // Output: true
console.log(Boolean(0));          // Output: false
console.log(Boolean("hello"));    // Output: true
console.log(Boolean(""));         // Output: false
console.log(Boolean(null));       // Output: false
console.log(Boolean(undefined));  // Output: false
```

---

## Type Coercion (Automatic Conversion by JavaScript)

Sometimes JavaScript **automatically converts** types behind the scenes. This can cause **unexpected results**.

```js
// String + Number → String (concatenation)
console.log("5" + 3);       // Output: "53"  (3 becomes "3")
console.log("5" + true);    // Output: "5true"

// String - Number → Number (math)
console.log("10" - 5);      // Output: 5  ("10" becomes 10)
console.log("10" * 2);      // Output: 20
console.log("10" / 2);      // Output: 5

// Comparison weirdness
console.log("5" == 5);      // Output: true  (== converts types)
console.log("5" === 5);     // Output: false  (=== does NOT convert types)

// Some famous weird ones:
console.log([] + []);        // Output: ""  (empty string)
console.log([] + {});        // Output: "[object Object]"
console.log(true + true);   // Output: 2  (1 + 1)
console.log(true + false);  // Output: 1  (1 + 0)
```

> **Pro Tip**: Always use `===` (strict equality) instead of `==` (loose equality) to avoid type coercion surprises!

---

## Quick Summary

| Data Type   | Example                   | `typeof` Result | Primitive? |
|-------------|---------------------------|-----------------|------------|
| String      | `"Hello"`                 | `"string"`      | ✅ Yes      |
| Number      | `42`, `3.14`              | `"number"`      | ✅ Yes      |
| Boolean     | `true`, `false`           | `"boolean"`     | ✅ Yes      |
| Undefined   | `undefined`               | `"undefined"`   | ✅ Yes      |
| Null        | `null`                    | `"object"` ⚠️   | ✅ Yes      |
| BigInt      | `123n`                    | `"bigint"`      | ✅ Yes      |
| Symbol      | `Symbol("id")`            | `"symbol"`      | ✅ Yes      |
| Object      | `{ key: "value" }`        | `"object"`      | ❌ No       |
| Array       | `[1, 2, 3]`               | `"object"`      | ❌ No       |
| Function    | `function() {}`           | `"function"`    | ❌ No       |

---

> **Key Takeaways**:
> 1. JavaScript has **7 primitive types** and **3 reference types**
> 2. Primitives store the **value**, references store the **address**
> 3. Always use `===` over `==` to avoid type coercion bugs
> 4. Know your **falsy values** (there are only 7!)
> 5. Use `typeof` to check types, but remember `null` and arrays give misleading results 🎯
