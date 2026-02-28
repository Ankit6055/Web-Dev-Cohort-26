# Numbers in JavaScript

## What are Numbers in JS?

JavaScript has **only one type** for all numbers — whether it's a whole number (integer) or a decimal (float). There's no separate `int` or `float` like in other languages.

```js
let age = 25;         // integer
let price = 99.99;    // decimal (float)
let negative = -10;   // negative number
let zero = 0;         // zero

console.log(typeof age);    // Output: number
console.log(typeof price);  // Output: number
// Both are just "number" — JS doesn't differentiate
```

---

## Creating Numbers

### 1. Regular Way (Number Literal)

```js
let a = 42;
let b = 3.14;
let c = -100;
```

### 2. Using the `Number()` Constructor

```js
let num = Number("42");
console.log(num);        // Output: 42
console.log(typeof num); // Output: number
```

### 3. Using `new Number()` (DON'T do this)

```js
let num = new Number(42);
console.log(typeof num);  // Output: object  (not "number"!)
// This creates a Number OBJECT, not a simple number. Avoid this.
```

---

## Basic Math Operations

```js
let a = 10;
let b = 3;

console.log(a + b);   // Output: 13   (Addition)
console.log(a - b);   // Output: 7    (Subtraction)
console.log(a * b);   // Output: 30   (Multiplication)
console.log(a / b);   // Output: 3.3333333333333335  (Division)
console.log(a % b);   // Output: 1    (Modulus — remainder after division)
console.log(a ** b);  // Output: 1000 (Exponentiation — 10 to the power 3)
```

### Modulus `%` — Why is it Useful?

The remainder operator is great for checking things like **even/odd**:

```js
console.log(10 % 2);  // Output: 0  → Even (no remainder)
console.log(7 % 2);   // Output: 1  → Odd  (has remainder)
console.log(15 % 5);  // Output: 0  → Divisible by 5
console.log(17 % 5);  // Output: 2  → Not divisible by 5
```

---

## Increment & Decrement

```js
let count = 5;

// Increment (add 1)
count++;           // same as: count = count + 1
console.log(count); // Output: 6

// Decrement (subtract 1)
count--;           // same as: count = count - 1
console.log(count); // Output: 5
```

### Pre vs Post Increment:

```js
let x = 5;

// Post-increment: uses the value FIRST, then increments
console.log(x++);  // Output: 5  (uses 5, then x becomes 6)
console.log(x);    // Output: 6

// Pre-increment: increments FIRST, then uses the value
let y = 5;
console.log(++y);  // Output: 6  (increments first, then uses 6)
console.log(y);    // Output: 6
```

---

## Assignment Operators (Shorthand)

```js
let num = 10;

num += 5;   // same as: num = num + 5   → 15
num -= 3;   // same as: num = num - 3   → 12
num *= 2;   // same as: num = num * 2   → 24
num /= 4;   // same as: num = num / 4   → 6
num %= 4;   // same as: num = num % 4   → 2
num **= 3;  // same as: num = num ** 3  → 8

console.log(num);  // Output: 8
```

---

## Floating Point Precision Problem

This is a **famous issue** in JavaScript (and most programming languages):

```js
console.log(0.1 + 0.2);
// Output: 0.30000000000000004  😱 (NOT 0.3!)

console.log(0.1 + 0.2 === 0.3);
// Output: false  😱
```

**Why?** Computers store numbers in **binary (0s and 1s)**, and some decimal numbers can't be perfectly represented in binary. It's like how 1/3 = 0.3333... never ends in decimal.

### How to Fix It:

```js
// Method 1: Use toFixed() and convert back to number
let result = (0.1 + 0.2).toFixed(2);
console.log(result);         // Output: "0.30"  (string!)
console.log(Number(result)); // Output: 0.3     (number ✅)

// Method 2: Multiply, do math, then divide (work with whole numbers)
let sum = (0.1 * 10 + 0.2 * 10) / 10;
console.log(sum);  // Output: 0.3 ✅

// Method 3: Use Number.EPSILON for comparison
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON);
// Output: true ✅
```

---

## Special Number Values

### Infinity and -Infinity

```js
console.log(1 / 0);        // Output: Infinity
console.log(-1 / 0);       // Output: -Infinity
console.log(Infinity + 1); // Output: Infinity  (infinity is still infinity)
console.log(Infinity - Infinity);  // Output: NaN

// Check if a number is finite
console.log(isFinite(42));        // Output: true
console.log(isFinite(Infinity));  // Output: false
console.log(isFinite(-Infinity)); // Output: false
```

### NaN — Not a Number

`NaN` means the result of a math operation **doesn't make sense**.

```js
console.log("hello" * 5);   // Output: NaN
console.log("hello" - 1);   // Output: NaN
console.log(Math.sqrt(-1)); // Output: NaN  (square root of negative)
console.log(0 / 0);         // Output: NaN
console.log(undefined + 1); // Output: NaN
```

### Important: NaN is NOT equal to anything, not even itself!

```js
console.log(NaN === NaN);  // Output: false  😱
console.log(NaN == NaN);   // Output: false  😱

// So how do you check for NaN?
console.log(isNaN(NaN));          // Output: true
console.log(isNaN("hello"));     // Output: true  (converts to number first → NaN)

// Better way:
console.log(Number.isNaN(NaN));       // Output: true
console.log(Number.isNaN("hello"));   // Output: false  (doesn't convert — "hello" is not NaN)
```

---

## Number Properties (Constants)

```js
console.log(Number.MAX_SAFE_INTEGER);  // Output: 9007199254740991  (2^53 - 1)
console.log(Number.MIN_SAFE_INTEGER);  // Output: -9007199254740991

console.log(Number.MAX_VALUE);         // Output: 1.7976931348623157e+308  (largest possible number)
console.log(Number.MIN_VALUE);         // Output: 5e-324  (smallest positive number, close to 0)

console.log(Number.POSITIVE_INFINITY); // Output: Infinity
console.log(Number.NEGATIVE_INFINITY); // Output: -Infinity

console.log(Number.EPSILON);           // Output: 2.220446049250313e-16  (smallest difference between two numbers)
```

---

## Number Methods

### `toFixed()` — Round to N Decimal Places

Returns a **string**, not a number!

```js
let pi = 3.14159;

console.log(pi.toFixed(2));  // Output: "3.14"
console.log(pi.toFixed(0));  // Output: "3"
console.log(pi.toFixed(4));  // Output: "3.1416"  (rounds up!)

// Convert back to number:
console.log(Number(pi.toFixed(2)));  // Output: 3.14
console.log(+pi.toFixed(2));         // Output: 3.14  (shortcut)
```

### `toPrecision()` — Total Number of Digits

```js
let num = 3.14159;

console.log(num.toPrecision(3));  // Output: "3.14"  (3 total digits)
console.log(num.toPrecision(5));  // Output: "3.1416" (5 total digits)
console.log(num.toPrecision(1));  // Output: "3"      (1 total digit)
```

### `toString()` — Convert Number to String

Can also convert to **different bases** (binary, octal, hex):

```js
let num = 255;

console.log(num.toString());    // Output: "255"   (decimal — base 10)
console.log(num.toString(2));   // Output: "11111111"  (binary — base 2)
console.log(num.toString(8));   // Output: "377"   (octal — base 8)
console.log(num.toString(16));  // Output: "ff"    (hexadecimal — base 16)
```

### `toLocaleString()` — Format with Commas / Currency

```js
let bigNum = 1234567.89;

console.log(bigNum.toLocaleString());
// Output: "1,234,567.89"  (adds commas automatically!)

console.log(bigNum.toLocaleString("en-IN"));
// Output: "12,34,567.89"  (Indian number format!)

console.log(bigNum.toLocaleString("en-US", { style: "currency", currency: "USD" }));
// Output: "$1,234,567.89"

console.log(bigNum.toLocaleString("en-IN", { style: "currency", currency: "INR" }));
// Output: "₹12,34,567.89"
```

---

## Converting TO Numbers

### `Number()` — Strictest Conversion

```js
console.log(Number("42"));        // Output: 42
console.log(Number("3.14"));      // Output: 3.14
console.log(Number(""));          // Output: 0
console.log(Number(" "));         // Output: 0
console.log(Number("42abc"));     // Output: NaN  (can't convert entire string)
console.log(Number(true));        // Output: 1
console.log(Number(false));       // Output: 0
console.log(Number(null));        // Output: 0
console.log(Number(undefined));   // Output: NaN
```

### `parseInt()` — Extract Integer from Start of String

```js
console.log(parseInt("42"));       // Output: 42
console.log(parseInt("42.99"));    // Output: 42  (drops decimal part)
console.log(parseInt("42px"));     // Output: 42  (stops at non-digit)
console.log(parseInt("abc42"));    // Output: NaN (doesn't start with a digit)
console.log(parseInt("0xFF", 16)); // Output: 255 (parse hex)
console.log(parseInt("111", 2));   // Output: 7   (parse binary)
```

### `parseFloat()` — Extract Decimal Number from String

```js
console.log(parseFloat("3.14"));      // Output: 3.14
console.log(parseFloat("3.14.159"));  // Output: 3.14  (stops at second dot)
console.log(parseFloat("42px"));      // Output: 42
console.log(parseFloat("abc"));       // Output: NaN
```

### Unary `+` — Quick Conversion

```js
console.log(+"42");       // Output: 42
console.log(+"3.14");     // Output: 3.14
console.log(+"");         // Output: 0
console.log(+"hello");    // Output: NaN
console.log(+true);       // Output: 1
console.log(+false);      // Output: 0
```

---

## Number Checking Methods

```js
// Is it a finite number?
console.log(Number.isFinite(42));        // Output: true
console.log(Number.isFinite(Infinity));  // Output: false
console.log(Number.isFinite("42"));      // Output: false  (strings are not numbers)

// Is it an integer?
console.log(Number.isInteger(42));       // Output: true
console.log(Number.isInteger(42.0));     // Output: true  (42.0 is the same as 42)
console.log(Number.isInteger(42.5));     // Output: false

// Is it a safe integer (within the safe range)?
console.log(Number.isSafeInteger(42));                    // Output: true
console.log(Number.isSafeInteger(9007199254740992));      // Output: false  (too big)

// Is it NaN?
console.log(Number.isNaN(NaN));          // Output: true
console.log(Number.isNaN(42));           // Output: false
console.log(Number.isNaN("hello"));      // Output: false  (it's a string, not NaN)
```

---

## The `Math` Object — Built-in Math Functions

JavaScript has a built-in `Math` object packed with useful methods.

### Rounding Methods

```js
let num = 4.7;

console.log(Math.round(num));  // Output: 5    (rounds to nearest integer)
console.log(Math.ceil(num));   // Output: 5    (always rounds UP)
console.log(Math.floor(num));  // Output: 4    (always rounds DOWN)
console.log(Math.trunc(num));  // Output: 4    (removes decimal, keeps integer part)

// Difference between floor and trunc for NEGATIVE numbers:
console.log(Math.floor(-4.3)); // Output: -5   (rounds DOWN, so -5)
console.log(Math.trunc(-4.3)); // Output: -4   (just chops off .3)
```

### Min, Max, Abs

```js
console.log(Math.max(10, 20, 5, 30)); // Output: 30  (largest)
console.log(Math.min(10, 20, 5, 30)); // Output: 5   (smallest)
console.log(Math.abs(-42));            // Output: 42  (absolute value — removes the negative sign)
console.log(Math.abs(42));             // Output: 42
```

### Finding Max/Min from an Array:

```js
let numbers = [5, 12, 3, 8, 25, 1];

// Use spread operator with Math.max/min
console.log(Math.max(...numbers));  // Output: 25
console.log(Math.min(...numbers));  // Output: 1
```

### Power and Square Root

```js
console.log(Math.pow(2, 3));    // Output: 8   (2 to the power 3 = 2*2*2)
console.log(2 ** 3);            // Output: 8   (same thing, shorter syntax)

console.log(Math.sqrt(64));     // Output: 8   (square root of 64)
console.log(Math.sqrt(2));      // Output: 1.4142135623730951

console.log(Math.cbrt(27));     // Output: 3   (cube root of 27)
```

### Logarithms

```js
console.log(Math.log(1));       // Output: 0   (natural log of 1)
console.log(Math.log2(8));      // Output: 3   (log base 2 of 8 → 2^3 = 8)
console.log(Math.log10(1000));  // Output: 3   (log base 10 of 1000 → 10^3 = 1000)
```

### `Math.random()` — Generate Random Numbers

Returns a random number between `0` (inclusive) and `1` (exclusive).

```js
console.log(Math.random());
// Output: 0.7283948573...  (different every time)
```

### Random Number in a Range:

```js
// Random integer between 1 and 10 (inclusive)
let random = Math.floor(Math.random() * 10) + 1;
console.log(random);  // Output: any number from 1 to 10

// Formula: Math.floor(Math.random() * (max - min + 1)) + min

// Random integer between 5 and 15
let min = 5;
let max = 15;
let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
console.log(randomNum);  // Output: any number from 5 to 15
```

### Make it a Reusable Function:

```js
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomInt(1, 100));   // Output: random number between 1 and 100
console.log(getRandomInt(1, 6));     // Output: random dice roll (1 to 6)
```

### Other Math Constants

```js
console.log(Math.PI);     // Output: 3.141592653589793
console.log(Math.E);      // Output: 2.718281828459045  (Euler's number)
console.log(Math.SQRT2);  // Output: 1.4142135623730951  (square root of 2)
console.log(Math.LN2);    // Output: 0.6931471805599453  (natural log of 2)
```

### Trigonometry (angles in radians)

```js
console.log(Math.sin(0));           // Output: 0
console.log(Math.cos(0));           // Output: 1
console.log(Math.tan(Math.PI / 4)); // Output: 0.9999999999999999  (≈ 1)

// Convert degrees to radians: radians = degrees * (Math.PI / 180)
let degrees = 90;
let radians = degrees * (Math.PI / 180);
console.log(Math.sin(radians));     // Output: 1
```

---

## Numeric Separators (ES2021)

For large numbers, you can use **underscores** `_` to make them more readable. They don't affect the value.

```js
let billion = 1_000_000_000;
console.log(billion);  // Output: 1000000000

let bytes = 256_000;
console.log(bytes);    // Output: 256000

let hex = 0xFF_FF_FF;
console.log(hex);      // Output: 16777215

let pi = 3.141_592_653;
console.log(pi);       // Output: 3.141592653
```

---

## Scientific Notation (e)

For very large or very small numbers, use `e`:

```js
let million = 1e6;     // 1 × 10^6 = 1,000,000
let tiny = 1e-6;       // 1 × 10^-6 = 0.000001

console.log(million);  // Output: 1000000
console.log(tiny);     // Output: 0.000001

console.log(5e3);      // Output: 5000  (5 × 10^3)
console.log(2.5e2);    // Output: 250   (2.5 × 10^2)
```

---

## Number Systems (Binary, Octal, Hex)

```js
// Binary (base 2) — prefix: 0b
let binary = 0b1010;
console.log(binary);  // Output: 10

// Octal (base 8) — prefix: 0o
let octal = 0o77;
console.log(octal);   // Output: 63

// Hexadecimal (base 16) — prefix: 0x
let hex = 0xFF;
console.log(hex);     // Output: 255

// All of these are just regular numbers internally
console.log(typeof binary);  // Output: number
```

---

## Comparing Numbers

```js
console.log(5 > 3);      // Output: true
console.log(5 < 3);      // Output: false
console.log(5 >= 5);     // Output: true
console.log(5 <= 4);     // Output: false
console.log(5 === 5);    // Output: true  (strict equality)
console.log(5 !== 3);    // Output: true  (strict inequality)

// ⚠️ Avoid == with different types
console.log(0 == false);   // Output: true  (type coercion!)
console.log(0 === false);  // Output: false ✅ (no coercion)
console.log("" == 0);      // Output: true  (type coercion!)
console.log("" === 0);     // Output: false ✅
```

---

## Quick Summary

| Topic                  | Key Point                                                      |
|------------------------|----------------------------------------------------------------|
| Type                   | Only one number type for integers and decimals                 |
| Operators              | `+`, `-`, `*`, `/`, `%` (remainder), `**` (power)             |
| Floating Point         | `0.1 + 0.2 ≠ 0.3` — use `toFixed()` to fix it                |
| Special Values         | `Infinity`, `-Infinity`, `NaN`                                 |
| NaN                    | `NaN !== NaN` — use `Number.isNaN()` to check                 |
| Convert to Number      | `Number()`, `parseInt()`, `parseFloat()`, unary `+`           |
| Rounding               | `Math.round()`, `Math.ceil()`, `Math.floor()`, `Math.trunc()` |
| Random                 | `Math.floor(Math.random() * (max - min + 1)) + min`           |
| Readability            | Use `_` separators: `1_000_000`                                |
| Number Systems         | `0b` (binary), `0o` (octal), `0x` (hex)                       |

---

> **Pro Tips**:
> 1. Use `===` always, never `==`
> 2. Use `Number.isNaN()` instead of `isNaN()`
> 3. Remember `toFixed()` returns a **string**, not a number
> 4. For random numbers, memorize the formula: `Math.floor(Math.random() * (max - min + 1)) + min` 🎯
