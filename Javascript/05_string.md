# Strings in JavaScript

## What is a String?

A **string** is simply **text**. Any text — a name, a sentence, a single character, even an empty value — is a string in JavaScript.

Strings are always wrapped in **quotes**.

```js
let name = "Ankit";       // double quotes ✅
let city = 'Delhi';       // single quotes ✅
let greeting = `Hello!`;  // backticks (template literal) ✅

console.log(typeof name);
// Output: string
```

> All three ways create a string. Double quotes and single quotes work the same. Backticks have **superpowers** (we'll see below).

---

## Creating Strings

### 1. String Literal (Normal Way)

```js
let str1 = "Hello";
let str2 = 'World';
let str3 = `Hey there`;
```

### 2. Using `String()` Constructor

```js
let str = String(42);
console.log(str);        // Output: "42"
console.log(typeof str); // Output: string
```

### 3. Using `new String()` (DON'T do this)

```js
let str = new String("Hello");
console.log(typeof str);  // Output: object  (NOT "string"!)
// This creates a String OBJECT, not a simple string. Avoid this.
```

---

## Strings are Immutable

This means you **cannot change** a character inside a string. Once a string is created, it's **locked** — you can only create a **new** string.

```js
let word = "Hello";

word[0] = "Y";       // ❌ This does NOTHING
console.log(word);    // Output: Hello  (unchanged)

// To "change" it, you create a new string:
word = "Y" + word.slice(1);
console.log(word);    // Output: Yello ✅
```

---

## String Length

The `.length` property tells you **how many characters** are in a string (including spaces and symbols).

```js
let msg = "Hello, World!";
console.log(msg.length);  // Output: 13

let empty = "";
console.log(empty.length);  // Output: 0

let spaces = "  hi  ";
console.log(spaces.length);  // Output: 6  (spaces count!)
```

---

## Accessing Characters

Each character has an **index** (position) starting from **0**.

```js
let str = "JavaScript";

//  J  a  v  a  S  c  r  i  p  t
//  0  1  2  3  4  5  6  7  8  9

console.log(str[0]);     // Output: J  (first character)
console.log(str[4]);     // Output: S
console.log(str[9]);     // Output: t  (last character)
console.log(str[100]);   // Output: undefined  (doesn't exist)
```

### Using `.charAt()`

```js
let str = "Hello";

console.log(str.charAt(0));   // Output: H
console.log(str.charAt(4));   // Output: o
console.log(str.charAt(100)); // Output: ""  (empty string, not undefined)
```

### Using `.at()` — Supports Negative Index! (ES2022)

```js
let str = "Hello";

console.log(str.at(0));    // Output: H
console.log(str.at(-1));   // Output: o  (last character!)
console.log(str.at(-2));   // Output: l  (second last)
```

> **Tip**: `.at(-1)` is the easiest way to get the **last character** of a string.

---

## Template Literals (Backticks) — The Best Way to Work with Strings

Template literals use backticks `` ` ` `` and give you **two superpowers**:

### 1. Embed Variables / Expressions with `${ }`

```js
let name = "Ankit";
let age = 20;

console.log(`My name is ${name} and I am ${age} years old.`);
// Output: My name is Ankit and I am 20 years old.

// You can put ANY expression inside ${ }
console.log(`2 + 3 = ${2 + 3}`);
// Output: 2 + 3 = 5

console.log(`Is adult? ${age >= 18 ? "Yes" : "No"}`);
// Output: Is adult? Yes
```

### 2. Multi-line Strings

```js
// With backticks — easy!
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

// Without backticks — ugly and painful:
let oldWay = "Roses are red,\nViolets are blue,\nJavaScript is awesome.";
```

---

## Escape Characters

Special characters that you write using a **backslash** `\`:

| Escape | What It Does        | Example Output       |
|--------|---------------------|----------------------|
| `\n`   | New line            | Goes to next line    |
| `\t`   | Tab (indent)        | Adds a tab space     |
| `\\`   | Backslash           | `\`                  |
| `\'`   | Single quote        | `'`                  |
| `\"`   | Double quote        | `"`                  |

```js
console.log("Hello\nWorld");
// Output:
// Hello
// World

console.log("Name:\tAnkit");
// Output: Name:	Ankit

console.log("She said \"Hello\"");
// Output: She said "Hello"

console.log("C:\\Users\\Ankit\\Desktop");
// Output: C:\Users\Ankit\Desktop
```

---

## String Concatenation (Joining Strings)

### 1. Using `+` Operator

```js
let first = "Hello";
let second = "World";

let result = first + " " + second;
console.log(result);
// Output: Hello World
```

### 2. Using `+=` Operator

```js
let message = "Hello";
message += " ";
message += "World";
console.log(message);
// Output: Hello World
```

### 3. Using `.concat()` Method

```js
let str1 = "Hello";
let str2 = " World";

console.log(str1.concat(str2));
// Output: Hello World

console.log(str1.concat(" ", "Beautiful", " ", "World"));
// Output: Hello Beautiful World
```

### 4. Using Template Literals (Best Way!)

```js
let name = "Ankit";
console.log(`Hello, ${name}!`);
// Output: Hello, Ankit!
```

> **Best Practice**: Use template literals for string concatenation. It's cleaner and easier to read.

---

## String Methods — The Complete Guide

### Case Conversion

```js
let str = "Hello World";

console.log(str.toUpperCase());  // Output: HELLO WORLD
console.log(str.toLowerCase());  // Output: hello world

// Original string is UNCHANGED (strings are immutable!)
console.log(str);  // Output: Hello World
```

---

### Searching in Strings

#### `includes()` — Does it contain this text?

```js
let sentence = "JavaScript is awesome";

console.log(sentence.includes("awesome"));   // Output: true
console.log(sentence.includes("boring"));    // Output: false
console.log(sentence.includes("java"));      // Output: false  (case-sensitive!)
console.log(sentence.includes("Java"));      // Output: true
```

#### `startsWith()` and `endsWith()`

```js
let file = "photo.png";

console.log(file.startsWith("photo"));  // Output: true
console.log(file.startsWith("Photo"));  // Output: false  (case-sensitive)
console.log(file.endsWith(".png"));     // Output: true
console.log(file.endsWith(".jpg"));     // Output: false
```

#### `indexOf()` — Where is the FIRST occurrence?

Returns the **index** of the first match, or **-1** if not found.

```js
let str = "Hello World Hello";

console.log(str.indexOf("Hello"));   // Output: 0  (first occurrence)
console.log(str.indexOf("World"));   // Output: 6
console.log(str.indexOf("xyz"));     // Output: -1  (not found)
console.log(str.indexOf("Hello", 1)); // Output: 12  (search starting from index 1)
```

#### `lastIndexOf()` — Where is the LAST occurrence?

```js
let str = "Hello World Hello";

console.log(str.lastIndexOf("Hello"));  // Output: 12  (last occurrence)
console.log(str.lastIndexOf("xyz"));    // Output: -1  (not found)
```

#### `search()` — Like indexOf but supports regex

```js
let str = "Hello World 123";

console.log(str.search("World"));   // Output: 6
console.log(str.search(/\d+/));     // Output: 12  (finds first digit)
console.log(str.search("xyz"));     // Output: -1
```

---

### Extracting Parts of a String

#### `slice(start, end)` — The Most Used One

Extracts from `start` index up to (but **NOT including**) `end` index.

```js
let str = "Hello, World!";
//         0123456789...

console.log(str.slice(0, 5));    // Output: Hello
console.log(str.slice(7));       // Output: World!  (from index 7 to end)
console.log(str.slice(7, 12));   // Output: World

// Negative indices — count from the end
console.log(str.slice(-6));      // Output: orld!   (last 6 characters... wait)
console.log(str.slice(-6));      // Output: orld!
console.log(str.slice(-6, -1));  // Output: orld
```

#### `substring(start, end)` — Similar to slice

Almost the same as `slice()`, but:
- Does NOT support negative indices
- If `start > end`, it **swaps** them automatically

```js
let str = "Hello, World!";

console.log(str.substring(0, 5));   // Output: Hello
console.log(str.substring(7, 12));  // Output: World
console.log(str.substring(5, 0));   // Output: Hello  (swaps 5 and 0!)
```

> **Which one to use?** Just use `slice()` — it's more predictable and supports negative indices.

#### `substr(start, length)` — Deprecated ⚠️

```js
let str = "Hello, World!";

console.log(str.substr(7, 5));  // Output: World  (start at 7, take 5 characters)
// ⚠️ This method is deprecated. Don't use it. Use slice() instead.
```

---

### Replacing Text

#### `replace()` — Replace FIRST Match

```js
let str = "Hello World World";

console.log(str.replace("World", "JS"));
// Output: Hello JS World  (only replaces the FIRST match!)
```

#### `replaceAll()` — Replace ALL Matches

```js
let str = "Hello World World";

console.log(str.replaceAll("World", "JS"));
// Output: Hello JS JS  (replaces ALL matches!)
```

#### Using Regex for Replace

```js
let str = "Hello World World";

// 'g' flag means global (replace all)
console.log(str.replace(/World/g, "JS"));
// Output: Hello JS JS

// Case-insensitive replace
let mixed = "Hello hello HELLO";
console.log(mixed.replace(/hello/gi, "Hi"));
// Output: Hi Hi Hi
```

---

### Trimming (Removing Extra Spaces)

```js
let str = "   Hello World   ";

console.log(str.trim());       // Output: "Hello World"  (removes spaces from BOTH sides)
console.log(str.trimStart());  // Output: "Hello World   "  (removes from start only)
console.log(str.trimEnd());    // Output: "   Hello World"  (removes from end only)
```

> **Use case**: Always trim user input! Users often accidentally add spaces.

```js
let userInput = "  ankit@email.com  ";
let cleanEmail = userInput.trim();
console.log(cleanEmail);  // Output: "ankit@email.com"
```

---

### Padding (Adding Characters)

#### `padStart()` — Add characters at the START

```js
let num = "5";

console.log(num.padStart(3, "0"));  // Output: "005"
console.log(num.padStart(5, "0"));  // Output: "00005"
console.log(num.padStart(3, "*"));  // Output: "**5"
console.log(num.padStart(3));       // Output: "  5"  (default padding is space)
```

#### `padEnd()` — Add characters at the END

```js
let name = "Hi";

console.log(name.padEnd(5, "."));   // Output: "Hi..."
console.log(name.padEnd(10, "-"));  // Output: "Hi--------"
```

**Real-world use case — Masking credit card numbers:**

```js
let card = "4532015112830366";
let lastFour = card.slice(-4);
let masked = lastFour.padStart(card.length, "*");
console.log(masked);
// Output: ************0366
```

---

### Repeating Strings

```js
console.log("Ha".repeat(3));    // Output: HaHaHa
console.log("*".repeat(10));    // Output: **********
console.log("-".repeat(20));    // Output: --------------------

// Fun example:
let stars = (n) => "*".repeat(n);
console.log(stars(5));   // Output: *****
```

---

### Splitting Strings into Arrays

#### `split()` — Break a string into an array

```js
let csv = "apple,banana,mango";
let fruits = csv.split(",");
console.log(fruits);
// Output: ["apple", "banana", "mango"]

let sentence = "Hello World How Are You";
let words = sentence.split(" ");
console.log(words);
// Output: ["Hello", "World", "How", "Are", "You"]

// Split every character
let chars = "Hello".split("");
console.log(chars);
// Output: ["H", "e", "l", "l", "o"]

// Limit the number of splits
let data = "a-b-c-d-e";
console.log(data.split("-", 3));
// Output: ["a", "b", "c"]  (only first 3)
```

---

### Joining Arrays into Strings

```js
let words = ["Hello", "World"];
console.log(words.join(" "));   // Output: "Hello World"
console.log(words.join("-"));   // Output: "Hello-World"
console.log(words.join(""));    // Output: "HelloWorld"
console.log(words.join(", "));  // Output: "Hello, World"
```

---

## Comparing Strings

```js
console.log("a" === "a");     // Output: true
console.log("a" === "A");     // Output: false  (case-sensitive!)
console.log("abc" === "abc"); // Output: true
```

### Alphabetical Comparison (using Unicode values)

```js
console.log("a" > "b");    // Output: false  (a comes before b)
console.log("b" > "a");    // Output: true
console.log("z" > "a");    // Output: true
console.log("a" > "A");    // Output: true  (lowercase > uppercase in Unicode)

// For proper locale-aware sorting:
console.log("a".localeCompare("b"));   // Output: -1  (a comes before b)
console.log("b".localeCompare("a"));   // Output: 1   (b comes after a)
console.log("a".localeCompare("a"));   // Output: 0   (they're equal)
```

### Case-insensitive Comparison

```js
let str1 = "Hello";
let str2 = "hello";

// Convert both to same case, then compare
console.log(str1.toLowerCase() === str2.toLowerCase());
// Output: true ✅
```

---

## Converting Other Types to Strings

```js
// Method 1: String()
console.log(String(42));         // Output: "42"
console.log(String(true));       // Output: "true"
console.log(String(null));       // Output: "null"
console.log(String(undefined));  // Output: "undefined"
console.log(String([1, 2, 3]));  // Output: "1,2,3"

// Method 2: .toString()
console.log((42).toString());      // Output: "42"
console.log(true.toString());     // Output: "true"
// null.toString()   ❌ Error!
// undefined.toString()   ❌ Error!

// Method 3: Concatenation with ""
console.log(42 + "");       // Output: "42"
console.log(true + "");     // Output: "true"

// Method 4: Template literal
console.log(`${42}`);       // Output: "42"
console.log(`${true}`);     // Output: "true"
```

---

## Useful String Patterns & Tricks

### Reverse a String

```js
let str = "Hello";
let reversed = str.split("").reverse().join("");
console.log(reversed);
// Output: olleH

// Step by step:
// "Hello" → ["H","e","l","l","o"] → ["o","l","l","e","H"] → "olleH"
```

### Check if a String is a Palindrome

```js
function isPalindrome(str) {
  let cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

console.log(isPalindrome("racecar"));     // Output: true
console.log(isPalindrome("hello"));       // Output: false
console.log(isPalindrome("A man a plan a canal Panama"));  // Output: true
```

### Capitalize First Letter

```js
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

console.log(capitalize("hello"));  // Output: Hello
console.log(capitalize("javaScript"));  // Output: JavaScript
```

### Capitalize Every Word (Title Case)

```js
function titleCase(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

console.log(titleCase("hello world from javascript"));
// Output: Hello World From Javascript
```

### Count Occurrences of a Character

```js
function countChar(str, char) {
  return str.split(char).length - 1;
}

console.log(countChar("hello world", "l"));  // Output: 3
console.log(countChar("banana", "a"));       // Output: 3
```

### Truncate a String (with "...")

```js
function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

console.log(truncate("This is a very long sentence", 15));
// Output: This is a ve...

console.log(truncate("Short", 15));
// Output: Short
```

---

## Quick Summary of All String Methods

| Method             | What It Does                                    | Returns    |
|--------------------|-------------------------------------------------|------------|
| `.length`          | Number of characters                            | Number     |
| `.at(index)`       | Character at index (supports negative)          | String     |
| `.charAt(index)`   | Character at index                              | String     |
| `.toUpperCase()`   | Convert to UPPERCASE                            | String     |
| `.toLowerCase()`   | Convert to lowercase                            | String     |
| `.includes(text)`  | Check if string contains text                   | Boolean    |
| `.startsWith(text)`| Check if starts with text                       | Boolean    |
| `.endsWith(text)`  | Check if ends with text                         | Boolean    |
| `.indexOf(text)`   | Find first position of text                     | Number     |
| `.lastIndexOf(text)`| Find last position of text                     | Number     |
| `.search(regex)`   | Search with regex                               | Number     |
| `.slice(start,end)`| Extract part of string                          | String     |
| `.substring(s,e)`  | Extract part (no negative index)                | String     |
| `.replace(a, b)`   | Replace first match                             | String     |
| `.replaceAll(a,b)` | Replace all matches                             | String     |
| `.trim()`          | Remove spaces from both sides                   | String     |
| `.trimStart()`     | Remove spaces from start                        | String     |
| `.trimEnd()`       | Remove spaces from end                          | String     |
| `.padStart(n,ch)`  | Pad from start to length n                      | String     |
| `.padEnd(n, ch)`   | Pad from end to length n                        | String     |
| `.repeat(n)`       | Repeat string n times                           | String     |
| `.split(sep)`      | Split into array                                | Array      |
| `.concat(str)`     | Join two strings                                | String     |
| `.match(regex)`    | Find matches using regex                        | Array/null |
| `.localeCompare()` | Compare strings alphabetically                  | Number     |

---

> **Key Takeaways**:
> 1. Strings are **immutable** — methods return a NEW string, they don't change the original
> 2. Use **template literals** (backticks) for concatenation — cleanest way
> 3. Use `.trim()` on user input — always!
> 4. Use `.includes()` instead of `.indexOf() !== -1` — more readable
> 5. Use `.at(-1)` for the last character — cleanest way
> 6. All string methods are **case-sensitive** — convert case before comparing 🎯
