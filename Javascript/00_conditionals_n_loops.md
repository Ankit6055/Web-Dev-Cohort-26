# Conditionals and Loops in JavaScript

## Part 1: Conditionals

Conditionals let your code **make decisions** — "if this, do that, otherwise do something else." Like a traffic signal — red means stop, green means go.

---

## `if` Statement

The most basic conditional. Runs the code **only if** the condition is `true`.

```js
const age = 20;

if (age >= 18) {
  console.log("You can vote! ✅");
}
// Output: You can vote! ✅

const temperature = 15;

if (temperature < 10) {
  console.log("It's cold!");
}
// No output — condition is false, so it's skipped
```

---

## `if...else`

Do one thing if true, **another thing** if false.

```js
const isLoggedIn = false;

if (isLoggedIn) {
  console.log("Welcome back!");
} else {
  console.log("Please log in");
}
// Output: Please log in
```

```js
const number = 7;

if (number % 2 === 0) {
  console.log(`${number} is even`);
} else {
  console.log(`${number} is odd`);
}
// Output: 7 is odd
```

---

## `if...else if...else`

Check **multiple conditions** in order. First one that's true wins.

```js
const score = 75;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}
// Output: Grade: C
```

```js
const time = 14;  // 24-hour format

if (time < 6) {
  console.log("🌙 Night");
} else if (time < 12) {
  console.log("🌅 Morning");
} else if (time < 17) {
  console.log("☀️ Afternoon");
} else if (time < 21) {
  console.log("🌆 Evening");
} else {
  console.log("🌙 Night");
}
// Output: ☀️ Afternoon
```

---

## Truthy and Falsy Values

JavaScript conditions don't require strict `true/false`. Some values are **falsy** (treated as false) and everything else is **truthy**.

### Falsy Values (only 8):

```js
if (false)      console.log("nope");   // false
if (0)          console.log("nope");   // 0
if (-0)         console.log("nope");   // -0
if (0n)         console.log("nope");   // 0n (BigInt zero)
if ("")         console.log("nope");   // empty string
if (null)       console.log("nope");   // null
if (undefined)  console.log("nope");   // undefined
if (NaN)        console.log("nope");   // NaN

// None of the above print anything — all are falsy!
```

### Truthy Values (everything else):

```js
if (1)          console.log("yes");  // ✅ any non-zero number
if (-1)         console.log("yes");  // ✅ negative numbers too
if ("hello")    console.log("yes");  // ✅ non-empty string
if ("0")        console.log("yes");  // ✅ string "0" is truthy!
if ("false")    console.log("yes");  // ✅ string "false" is truthy!
if ([])         console.log("yes");  // ✅ empty array is truthy!
if ({})         console.log("yes");  // ✅ empty object is truthy!
if (function(){}) console.log("yes"); // ✅ functions are truthy

// All of the above print "yes"!
```

### Common Use — Checking if Value Exists:

```js
const username = "";

if (username) {
  console.log(`Hello, ${username}`);
} else {
  console.log("No username provided");
}
// Output: No username provided  (empty string is falsy)

const items = [];

if (items.length) {
  console.log(`You have ${items.length} items`);
} else {
  console.log("Cart is empty");
}
// Output: Cart is empty  (0 is falsy)
```

---

## Ternary Operator (`? :`)

A **shorthand** for simple `if...else`. One line instead of five.

```js
// Syntax: condition ? valueIfTrue : valueIfFalse

const age = 20;
const status = age >= 18 ? "Adult" : "Minor";
console.log(status);  // Output: Adult

const score = 85;
const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
console.log(grade);  // Output: B

// Useful in template literals:
const isOnline = true;
console.log(`User is ${isOnline ? "🟢 online" : "⚪ offline"}`);
// Output: User is 🟢 online

// Useful for default values:
const input = "";
const name = input ? input : "Guest";
console.log(name);  // Output: Guest
```

> **Tip**: Don't nest ternaries more than 2 levels — it becomes unreadable. Use `if...else if` instead.

---

## Logical Operators in Conditions

### `&&` (AND) — Both must be true:

```js
const age = 25;
const hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("You can drive! 🚗");
}
// Output: You can drive! 🚗
```

### `||` (OR) — At least one must be true:

```js
const isAdmin = false;
const isModerator = true;

if (isAdmin || isModerator) {
  console.log("Access granted ✅");
}
// Output: Access granted ✅
```

### `!` (NOT) — Flips true/false:

```js
const isBlocked = false;

if (!isBlocked) {
  console.log("User can post");
}
// Output: User can post
```

### Short-Circuit Evaluation:

```js
// && — returns first falsy value, or last value if all truthy
console.log("hello" && "world");   // Output: world  (both truthy → last one)
console.log(0 && "world");         // Output: 0  (first is falsy → stops)
console.log("" && "world");       // Output: ""  (first is falsy → stops)

// || — returns first truthy value, or last value if all falsy
console.log("" || "default");     // Output: default  (first is falsy → next)
console.log("hello" || "default"); // Output: hello  (first is truthy → stops)
console.log(0 || null || "last"); // Output: last  (first truthy value)

// Common pattern — default values:
const username = "" || "Guest";
console.log(username);  // Output: Guest

// ⚠️ Problem with || for defaults:
const count = 0 || 10;
console.log(count);  // Output: 10  (but 0 was a valid value!)

// ✅ Use ?? (nullish coalescing) — only null/undefined trigger default:
const count2 = 0 ?? 10;
console.log(count2);  // Output: 0  ✅ (0 is a valid value, not null/undefined)

const name2 = null ?? "Guest";
console.log(name2);  // Output: Guest
```

---

## `switch` Statement

Check a single value against **many possible cases**. Cleaner than many `if...else if` blocks.

```js
const day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the week 😫");
    break;
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
    console.log("Midweek grind 💪");
    break;
  case "Friday":
    console.log("TGIF! 🎉");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend! 🎊");
    break;
  default:
    console.log("Not a valid day");
}
// Output: Start of the week 😫
```

### ⚠️ Don't Forget `break`!

Without `break`, code **falls through** to the next case:

```js
const fruit = "apple";

// ❌ Missing break — fall-through
switch (fruit) {
  case "apple":
    console.log("It's an apple");
    // no break! Falls through ⬇️
  case "banana":
    console.log("It's a banana");
    // no break! Falls through ⬇️
  case "cherry":
    console.log("It's a cherry");
    break;
}
// Output:
// It's an apple
// It's a banana   ← unintended!
// It's a cherry   ← unintended!
```

### `switch` Uses Strict Comparison (`===`):

```js
const value = "1";

switch (value) {
  case 1:
    console.log("Number 1");
    break;
  case "1":
    console.log("String '1'");
    break;
}
// Output: String '1'  (strict comparison — "1" !== 1)
```

### `switch` with Expressions:

```js
const score = 85;

switch (true) {
  case score >= 90:
    console.log("Grade A");
    break;
  case score >= 80:
    console.log("Grade B");
    break;
  case score >= 70:
    console.log("Grade C");
    break;
  default:
    console.log("Need improvement");
}
// Output: Grade B
```

---

## `switch` vs `if...else` — When to Use Which?

| Use `switch` When...                          | Use `if...else` When...                      |
|-----------------------------------------------|----------------------------------------------|
| Comparing ONE value against many options      | Checking different conditions/variables       |
| Values are exact matches (===)                | Using ranges (`> 10`, `< 50`)                |
| Many cases (cleaner than tons of `else if`)   | Complex conditions (`a > 5 && b < 10`)       |
| Cases group together (fall-through)           | Only 2-3 options                             |

---

## Optional Chaining (`?.`) in Conditions

Safely access nested properties without errors:

```js
const user = {
  name: "Ankit",
  address: {
    city: "Delhi"
  }
};

// ❌ Without optional chaining — crashes if property missing
// console.log(user.phone.number);  // 💥 TypeError!

// ✅ With optional chaining — returns undefined safely
console.log(user.phone?.number);          // Output: undefined  (no crash!)
console.log(user.address?.city);          // Output: Delhi
console.log(user.address?.zipCode);       // Output: undefined

// In conditions:
if (user.address?.city) {
  console.log(`Lives in ${user.address.city}`);
}
// Output: Lives in Delhi

// With methods:
const arr = [1, 2, 3];
console.log(arr.find?.(x => x > 5));     // Output: undefined
console.log(arr.fakMethod?.());           // Output: undefined  (no crash)

// Combining with ??
const city = user.address?.zipCode ?? "Unknown";
console.log(city);  // Output: Unknown
```

---

---

## Part 2: Loops

Loops let you **repeat** code multiple times. Instead of writing the same thing 100 times, you write it once and loop.

---

## `for` Loop

The classic loop. You control **start**, **condition**, and **increment**.

```js
// Syntax: for (initialization; condition; increment) { ... }

for (let i = 1; i <= 5; i++) {
  console.log(`Count: ${i}`);
}
// Output:
// Count: 1
// Count: 2
// Count: 3
// Count: 4
// Count: 5
```

### How It Works Step by Step:

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}
// Step 1: let i = 0        → i is 0
// Step 2: 0 < 3? YES       → run body → print 0
// Step 3: i++               → i is 1
// Step 4: 1 < 3? YES       → run body → print 1
// Step 5: i++               → i is 2
// Step 6: 2 < 3? YES       → run body → print 2
// Step 7: i++               → i is 3
// Step 8: 3 < 3? NO        → STOP
```

### Looping Through Arrays:

```js
const fruits = ["Apple", "Banana", "Cherry", "Date"];

for (let i = 0; i < fruits.length; i++) {
  console.log(`${i + 1}. ${fruits[i]}`);
}
// Output:
// 1. Apple
// 2. Banana
// 3. Cherry
// 4. Date
```

### Reverse Loop:

```js
for (let i = 5; i >= 1; i--) {
  console.log(i);
}
// Output: 5, 4, 3, 2, 1
```

### Custom Step:

```js
// Count by 2s
for (let i = 0; i <= 10; i += 2) {
  console.log(i);
}
// Output: 0, 2, 4, 6, 8, 10

// Count by 3s
for (let i = 0; i <= 15; i += 3) {
  console.log(i);
}
// Output: 0, 3, 6, 9, 12, 15
```

---

## `while` Loop

Keeps running **while** the condition is true. Use when you **don't know** how many times to loop.

```js
let count = 1;

while (count <= 5) {
  console.log(`Count: ${count}`);
  count++;
}
// Output: Count: 1, Count: 2, Count: 3, Count: 4, Count: 5
```

### Real-World: Guessing Game

```js
function guessingGame(secret) {
  let guess = Math.floor(Math.random() * 10) + 1;
  let attempts = 0;

  while (guess !== secret) {
    attempts++;
    console.log(`Attempt ${attempts}: Guessed ${guess} — Wrong!`);
    guess = Math.floor(Math.random() * 10) + 1;
  }

  attempts++;
  console.log(`Attempt ${attempts}: Guessed ${guess} — Correct! 🎉`);
}

guessingGame(7);
// Output (varies):
// Attempt 1: Guessed 3 — Wrong!
// Attempt 2: Guessed 9 — Wrong!
// Attempt 3: Guessed 7 — Correct! 🎉
```

### ⚠️ Infinite Loop — Be Careful!

```js
// ❌ This runs FOREVER — crashes your browser/Node.js
// while (true) {
//   console.log("Forever!");
// }

// ❌ Forgetting to update the condition variable
// let i = 0;
// while (i < 5) {
//   console.log(i);
//   // oops! forgot i++ — infinite loop!
// }
```

---

## `do...while` Loop

Like `while`, but the body runs **at least once** — checks the condition **after** running.

```js
let i = 1;

do {
  console.log(`Count: ${i}`);
  i++;
} while (i <= 5);
// Output: Count: 1, Count: 2, Count: 3, Count: 4, Count: 5
```

### Runs At Least Once (Even if Condition is False):

```js
let x = 100;

// while — checks FIRST, never runs:
while (x < 5) {
  console.log("while:", x);  // Never runs!
}

// do...while — runs FIRST, then checks:
do {
  console.log("do-while:", x);  // Output: do-while: 100  (runs once!)
} while (x < 5);
```

### Real-World: Menu System

```js
function showMenu() {
  let choice;

  do {
    console.log("\n📋 Menu:");
    console.log("1. View Profile");
    console.log("2. Edit Settings");
    console.log("3. Help");
    console.log("4. Exit");

    choice = Math.floor(Math.random() * 4) + 1;  // simulate user input
    console.log(`User chose: ${choice}`);

    switch (choice) {
      case 1: console.log("👤 Showing profile..."); break;
      case 2: console.log("⚙️ Opening settings..."); break;
      case 3: console.log("❓ Showing help..."); break;
      case 4: console.log("👋 Goodbye!"); break;
    }
  } while (choice !== 4);
}
```

---

## `for...of` Loop

Loop over **values** of iterable things: arrays, strings, Maps, Sets.

```js
// Arrays:
const colors = ["red", "green", "blue"];

for (const color of colors) {
  console.log(color);
}
// Output: red, green, blue

// Strings:
for (const char of "Hello") {
  console.log(char);
}
// Output: H, e, l, l, o

// Maps:
const userMap = new Map([
  ["name", "Ankit"],
  ["age", 20],
  ["city", "Delhi"]
]);

for (const [key, value] of userMap) {
  console.log(`${key}: ${value}`);
}
// Output:
// name: Ankit
// age: 20
// city: Delhi

// Sets:
const uniqueNums = new Set([1, 2, 3, 2, 1]);

for (const num of uniqueNums) {
  console.log(num);
}
// Output: 1, 2, 3  (no duplicates!)
```

### Getting Index with `for...of`:

```js
const fruits = ["Apple", "Banana", "Cherry"];

for (const [index, fruit] of fruits.entries()) {
  console.log(`${index + 1}. ${fruit}`);
}
// Output:
// 1. Apple
// 2. Banana
// 3. Cherry
```

---

## `for...in` Loop

Loop over **keys** (property names) of an object. Also loops over **inherited** properties.

```js
const person = {
  name: "Ankit",
  age: 20,
  city: "Delhi"
};

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
// Output:
// name: Ankit
// age: 20
// city: Delhi
```

### ⚠️ `for...in` with Arrays — Don't Do It!

```js
const arr = ["a", "b", "c"];

// ❌ BAD — for...in gives you INDEX as STRING, plus inherited properties
for (const index in arr) {
  console.log(typeof index, index);
}
// Output:
// string 0    ← index is a STRING, not a number!
// string 1
// string 2

// ✅ GOOD — use for...of for arrays
for (const value of arr) {
  console.log(value);
}
// Output: a, b, c
```

### `for...in` Includes Inherited Properties:

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.type = "animal";

const dog = new Animal("Buddy");
dog.breed = "Labrador";

// for...in loops over ALL properties (own + inherited):
for (const key in dog) {
  console.log(`${key}: ${dog[key]}`);
}
// Output:
// name: Buddy
// breed: Labrador
// type: animal   ← inherited from prototype!

// ✅ Filter to own properties only:
for (const key in dog) {
  if (dog.hasOwnProperty(key)) {
    console.log(`${key}: ${dog[key]}`);
  }
}
// Output:
// name: Buddy
// breed: Labrador
```

### `for...of` vs `for...in`:

| Feature          | `for...of`                    | `for...in`                    |
|------------------|-------------------------------|-------------------------------|
| Iterates over    | **Values**                    | **Keys** (property names)     |
| Works with       | Arrays, Strings, Maps, Sets   | Objects (and arrays, but don't)|
| Inherited props  | ❌ No                         | ✅ Yes (unless filtered)      |
| Best for         | Arrays and iterables          | Objects                       |
| Array index type | N/A (gives values)            | String (not number!)          |

---

## `break` — Exit a Loop Early

Stops the loop **immediately** — no more iterations.

```js
// Find the first number greater than 5:
const numbers = [1, 3, 7, 2, 9, 4];

for (const num of numbers) {
  if (num > 5) {
    console.log(`Found: ${num}`);
    break;  // stop looping
  }
}
// Output: Found: 7  (didn't check 2, 9, 4)
```

```js
// Search for a user:
const users = ["Ankit", "Rahul", "Priya", "Neha"];

for (let i = 0; i < users.length; i++) {
  if (users[i] === "Priya") {
    console.log(`Found Priya at index ${i}`);
    break;
  }
}
// Output: Found Priya at index 2
```

---

## `continue` — Skip to Next Iteration

Skips **the rest of the current** iteration and goes to the next one.

```js
// Print only odd numbers:
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue;  // skip even numbers
  console.log(i);
}
// Output: 1, 3, 5, 7, 9
```

```js
// Skip empty strings:
const items = ["Apple", "", "Banana", "", "", "Cherry"];

for (const item of items) {
  if (!item) continue;  // skip falsy (empty strings)
  console.log(`- ${item}`);
}
// Output:
// - Apple
// - Banana
// - Cherry
```

---

## Labeled Statements — `break` and `continue` with Nested Loops

Labels let you `break` or `continue` an **outer** loop from inside an **inner** loop:

```js
// Without label — break only exits inner loop
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) break;  // only breaks inner loop
    console.log(`i=${i}, j=${j}`);
  }
}
// Output: i=0,j=0  i=1,j=0  i=2,j=0  (inner loop breaks but outer continues)

// With label — break exits outer loop
outerLoop:
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outerLoop;  // breaks OUTER loop!
    console.log(`i=${i}, j=${j}`);
  }
}
// Output: i=0,j=0  i=0,j=1  i=0,j=2  i=1,j=0  (stops completely at i=1,j=1)
```

```js
// Label with continue:
outer:
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue outer;  // skip to next i
    console.log(`i=${i}, j=${j}`);
  }
}
// Output: i=0,j=0  i=1,j=0  i=2,j=0  (j never gets past 0)
```

---

## Nested Loops

Loops inside loops — for grids, tables, combinations, etc.

```js
// Multiplication table:
for (let i = 1; i <= 5; i++) {
  let row = "";
  for (let j = 1; j <= 5; j++) {
    row += `${(i * j).toString().padStart(3)} `;
  }
  console.log(row);
}
// Output:
//   1   2   3   4   5
//   2   4   6   8  10
//   3   6   9  12  15
//   4   8  12  16  20
//   5  10  15  20  25
```

```js
// Pattern — triangle:
for (let i = 1; i <= 5; i++) {
  console.log("*".repeat(i));
}
// Output:
// *
// **
// ***
// ****
// *****
```

```js
// Find pairs that sum to a target:
const nums = [2, 7, 11, 15];
const target = 9;

for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === target) {
      console.log(`${nums[i]} + ${nums[j]} = ${target}`);
    }
  }
}
// Output: 2 + 7 = 9
```

---

## Loop with Arrays — Common Patterns

### `forEach`:

```js
const fruits = ["Apple", "Banana", "Cherry"];

fruits.forEach((fruit, index) => {
  console.log(`${index + 1}. ${fruit}`);
});
// Output:
// 1. Apple
// 2. Banana
// 3. Cherry

// Note: You can't break out of forEach! Use for...of instead.
```

### `map` — Transform:

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);  // Output: [2, 4, 6, 8, 10]
```

### `filter` — Keep matches:

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);  // Output: [2, 4, 6, 8, 10]
```

### `reduce` — Accumulate:

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum);  // Output: 15
```

### `find` — First match:

```js
const users = [
  { name: "Ankit", age: 20 },
  { name: "Priya", age: 25 },
  { name: "Rahul", age: 22 }
];

const found = users.find(u => u.age > 21);
console.log(found);  // Output: { name: "Priya", age: 25 }
```

### `some` / `every` — Test conditions:

```js
const ages = [18, 22, 15, 30];

console.log(ages.some(a => a >= 18));   // Output: true  (at least one adult)
console.log(ages.every(a => a >= 18));  // Output: false  (not ALL are adults)
```

---

## `for` vs `while` vs `do...while` vs `for...of` vs `forEach`

| Loop        | Best For                               | Can `break`? | Knows Count? |
|-------------|----------------------------------------|--------------|-------------|
| `for`       | Known number of iterations (i=0; i<n)  | ✅ Yes       | ✅ Yes      |
| `while`     | Unknown count, condition-based         | ✅ Yes       | ❌ No       |
| `do...while`| Must run at least once                 | ✅ Yes       | ❌ No       |
| `for...of`  | Arrays, strings, iterables (values)    | ✅ Yes       | ❌ No       |
| `for...in`  | Object keys                            | ✅ Yes       | ❌ No       |
| `forEach`   | Simple array iteration                 | ❌ No!       | ❌ No       |
| `map/filter`| Transform/filter arrays                | ❌ No        | ❌ No       |

---

## Performance: Which Loop is Fastest?

```js
const arr = Array.from({ length: 1000000 }, (_, i) => i);

// 🏆 1st — Classic for loop (fastest)
console.time("for");
for (let i = 0; i < arr.length; i++) { arr[i]; }
console.timeEnd("for");

// 🥈 2nd — for...of
console.time("for...of");
for (const val of arr) { val; }
console.timeEnd("for...of");

// 🥉 3rd — forEach
console.time("forEach");
arr.forEach(val => { val; });
console.timeEnd("forEach");

// Typical results (varies by engine):
// for: ~2ms
// for...of: ~5ms
// forEach: ~7ms
```

> For most cases the **difference is negligible**. Use whatever is most **readable**. Only optimize if you're looping millions of items.

---

## Common Loop Patterns

### Sum of Array:

```js
const nums = [10, 20, 30, 40, 50];
let sum = 0;

for (const num of nums) {
  sum += num;
}

console.log(sum);  // Output: 150
```

### Find Max/Min:

```js
const nums = [23, 7, 45, 12, 89, 3];
let max = nums[0];
let min = nums[0];

for (const num of nums) {
  if (num > max) max = num;
  if (num < min) min = num;
}

console.log(`Max: ${max}, Min: ${min}`);  // Output: Max: 89, Min: 3
```

### Count Occurrences:

```js
const text = "hello world";
const freq = {};

for (const char of text) {
  freq[char] = (freq[char] || 0) + 1;
}

console.log(freq);
// Output: { h: 1, e: 1, l: 3, o: 2, ' ': 1, w: 1, r: 1, d: 1 }
```

### Remove Duplicates:

```js
const nums = [1, 2, 3, 2, 4, 1, 5, 3];
const unique = [];

for (const num of nums) {
  if (!unique.includes(num)) {
    unique.push(num);
  }
}

console.log(unique);  // Output: [1, 2, 3, 4, 5]

// Or simply:
console.log([...new Set(nums)]);  // Output: [1, 2, 3, 4, 5]
```

### FizzBuzz (Classic Interview Question):

```js
for (let i = 1; i <= 20; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}
// Output: 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16, 17, Fizz, 19, Buzz
```

### Flatten Nested Array:

```js
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = [];

for (const innerArr of nested) {
  for (const num of innerArr) {
    flat.push(num);
  }
}

console.log(flat);  // Output: [1, 2, 3, 4, 5, 6]

// Or simply:
console.log(nested.flat());  // Output: [1, 2, 3, 4, 5, 6]
```

---

## Quick Summary

### Conditionals:

| Concept                | Description                                        |
|------------------------|----------------------------------------------------|
| `if`                   | Run code if condition is true                      |
| `if...else`            | Two paths — true or false                          |
| `if...else if...else`  | Multiple conditions checked in order               |
| Ternary `? :`          | Shorthand for simple if...else                     |
| `switch`               | Match one value against many cases                 |
| `&&` / `||` / `!`      | Combine and negate conditions                      |
| `??`                   | Nullish coalescing — default for null/undefined only|
| `?.`                   | Optional chaining — safe property access           |
| Truthy/Falsy           | Every value is either truthy or falsy in conditions|

### Loops:

| Concept                | Description                                        |
|------------------------|----------------------------------------------------|
| `for`                  | Classic loop — known iterations                    |
| `while`                | Loop while condition is true                       |
| `do...while`           | Loop at least once, then check condition           |
| `for...of`             | Loop over values (arrays, strings, iterables)      |
| `for...in`             | Loop over keys (objects)                           |
| `forEach`              | Array method — can't break                         |
| `break`                | Exit the loop immediately                          |
| `continue`             | Skip current iteration, go to next                 |
| Labels                 | Break/continue outer loops from inner loops        |
| Nested loops           | Loops inside loops (grids, combinations)           |

---

> **Key Takeaways**:
> 1. Use `if...else` for simple decisions, `switch` for many exact matches
> 2. Know your **falsy values** — `false`, `0`, `""`, `null`, `undefined`, `NaN`, `-0`, `0n`
> 3. Use `??` instead of `||` when `0` or `""` are valid values
> 4. Use `for...of` for arrays/strings, `for...in` for objects
> 5. **Never** use `for...in` on arrays — use `for...of` or `forEach`
> 6. Use `break` to exit early, `continue` to skip iterations
> 7. `forEach` **cannot** be broken — use `for...of` if you need `break` 🎯
