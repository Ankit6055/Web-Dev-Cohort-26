# Objects in JavaScript

## What is an Object?

An **object** is a collection of **key-value pairs**. Think of it like a **real-world thing** that has **properties**.

For example, a person has a name, age, and city. An object lets you group all of this together:

```js
let person = {
  name: "Ankit",
  age: 20,
  city: "Delhi"
};

console.log(person);
// Output: { name: "Ankit", age: 20, city: "Delhi" }
```

- **Keys** (also called properties): `name`, `age`, `city`
- **Values**: `"Ankit"`, `20`, `"Delhi"`

> Arrays are great for **ordered lists**. Objects are great for **describing things**.

---

## Creating Objects

### 1. Object Literal (Most Common)

```js
let car = {
  brand: "Toyota",
  year: 2024,
  color: "Red"
};
```

### 2. Empty Object (add properties later)

```js
let user = {};
user.name = "Ankit";
user.age = 20;

console.log(user);  // Output: { name: "Ankit", age: 20 }
```

### 3. Using `new Object()` (Don't use this)

```js
let obj = new Object();
obj.name = "Ankit";
// Works, but object literal {} is cleaner. Don't use this.
```

### 4. Using `Object.create()`

Creates a new object with a specified **prototype** (we'll cover prototypes later).

```js
let animal = {
  speak() {
    console.log("Some sound");
  }
};

let dog = Object.create(animal);
dog.name = "Buddy";
dog.speak();  // Output: Some sound  (inherited from animal)
console.log(dog.name);  // Output: Buddy
```

---

## Accessing Properties

### 1. Dot Notation (Most Common)

```js
let person = { name: "Ankit", age: 20 };

console.log(person.name);  // Output: Ankit
console.log(person.age);   // Output: 20
```

### 2. Bracket Notation

Use this when the key is **dynamic** or has **special characters/spaces**.

```js
let person = { name: "Ankit", age: 20, "full name": "Ankit Kumar" };

console.log(person["name"]);       // Output: Ankit
console.log(person["full name"]);  // Output: Ankit Kumar  (can't use dot for this!)

// Dynamic key:
let key = "age";
console.log(person[key]);  // Output: 20
console.log(person.key);   // Output: undefined  (looks for a property literally called "key")
```

### Accessing Nested Objects

```js
let user = {
  name: "Ankit",
  address: {
    city: "Delhi",
    pin: 110001,
    country: {
      name: "India",
      code: "IN"
    }
  }
};

console.log(user.address.city);            // Output: Delhi
console.log(user.address.country.name);    // Output: India
console.log(user["address"]["country"]["code"]);  // Output: IN
```

### Optional Chaining `?.` — Safe Access (ES2020)

If a property doesn't exist, normally you get an **error**. Optional chaining returns `undefined` instead.

```js
let user = { name: "Ankit" };

// Without optional chaining:
// console.log(user.address.city);  // ❌ Error: Cannot read property 'city' of undefined

// With optional chaining:
console.log(user.address?.city);     // Output: undefined  (no error! ✅)
console.log(user.address?.city?.toUpperCase());  // Output: undefined

// Works with bracket notation too:
console.log(user?.["address"]?.["city"]);  // Output: undefined

// Works with methods:
let obj = {};
console.log(obj.someMethod?.());  // Output: undefined  (doesn't crash)
```

---

## Adding, Changing, and Deleting Properties

### Adding Properties

```js
let person = { name: "Ankit" };

person.age = 20;
person["city"] = "Delhi";
person.hobbies = ["coding", "gaming"];

console.log(person);
// Output: { name: "Ankit", age: 20, city: "Delhi", hobbies: ["coding", "gaming"] }
```

### Changing Properties

```js
let person = { name: "Ankit", age: 20 };

person.age = 21;
person.name = "Ankit Kumar";

console.log(person);  // Output: { name: "Ankit Kumar", age: 21 }
```

### Deleting Properties

```js
let person = { name: "Ankit", age: 20, city: "Delhi" };

delete person.city;
console.log(person);  // Output: { name: "Ankit", age: 20 }

// delete returns true if successful:
console.log(delete person.age);  // Output: true
```

---

## Checking if a Property Exists

### 1. `in` Operator

```js
let person = { name: "Ankit", age: 20 };

console.log("name" in person);    // Output: true
console.log("city" in person);    // Output: false
console.log("age" in person);     // Output: true
```

### 2. `hasOwnProperty()`

Only checks properties that belong to the object **directly** (not inherited ones).

```js
let person = { name: "Ankit", age: 20 };

console.log(person.hasOwnProperty("name"));      // Output: true
console.log(person.hasOwnProperty("toString"));  // Output: false  (toString is inherited)
```

### 3. Check for `undefined`

```js
let person = { name: "Ankit", age: 20 };

console.log(person.city !== undefined);   // Output: false (city doesn't exist)
console.log(person.name !== undefined);   // Output: true

// ⚠️ Be careful — this fails if the value IS undefined:
let obj = { x: undefined };
console.log(obj.x !== undefined);  // Output: false  (but x DOES exist!)
// Use "in" operator instead for this case
```

---

## Shorthand Properties and Methods

### Property Shorthand

When the variable name and key name are the **same**, you can shorten it:

```js
let name = "Ankit";
let age = 20;

// Old way:
let person1 = { name: name, age: age };

// Shorthand (ES6):
let person2 = { name, age };

console.log(person2);  // Output: { name: "Ankit", age: 20 }
```

### Method Shorthand

```js
// Old way:
let person1 = {
  name: "Ankit",
  greet: function() {
    console.log("Hello!");
  }
};

// Shorthand (ES6):
let person2 = {
  name: "Ankit",
  greet() {
    console.log("Hello!");
  }
};

person2.greet();  // Output: Hello!
```

---

## Computed Property Names

Use **expressions** as property keys using `[ ]`:

```js
let key = "color";

let car = {
  brand: "Toyota",
  [key]: "Red"            // key becomes "color"
};

console.log(car);  // Output: { brand: "Toyota", color: "Red" }

// Dynamic keys:
let i = 0;
let obj = {
  [`item_${i}`]: "Apple",
  [`item_${i + 1}`]: "Banana",
  [`item_${i + 2}`]: "Mango"
};

console.log(obj);
// Output: { item_0: "Apple", item_1: "Banana", item_2: "Mango" }
```

---

## Looping Through Objects

### 1. `for...in` — Loop Through Keys

```js
let person = { name: "Ankit", age: 20, city: "Delhi" };

for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}
// Output:
// name: Ankit
// age: 20
// city: Delhi
```

> **Note**: `for...in` also loops through **inherited** properties. Use `hasOwnProperty()` to filter:

```js
for (let key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(`${key}: ${person[key]}`);
  }
}
```

### 2. `Object.keys()` — Get All Keys as Array

```js
let person = { name: "Ankit", age: 20, city: "Delhi" };

let keys = Object.keys(person);
console.log(keys);  // Output: ["name", "age", "city"]

// Loop through:
Object.keys(person).forEach(key => {
  console.log(`${key}: ${person[key]}`);
});
```

### 3. `Object.values()` — Get All Values as Array

```js
let person = { name: "Ankit", age: 20, city: "Delhi" };

let values = Object.values(person);
console.log(values);  // Output: ["Ankit", 20, "Delhi"]
```

### 4. `Object.entries()` — Get Key-Value Pairs as Array

```js
let person = { name: "Ankit", age: 20, city: "Delhi" };

let entries = Object.entries(person);
console.log(entries);
// Output: [["name", "Ankit"], ["age", 20], ["city", "Delhi"]]

// Great with for...of and destructuring:
for (let [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}
// Output:
// name: Ankit
// age: 20
// city: Delhi
```

---

## `this` Keyword in Objects

Inside a method, `this` refers to the **object that owns the method**.

```js
let person = {
  name: "Ankit",
  age: 20,
  greet() {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  }
};

person.greet();
// Output: Hi, I'm Ankit and I'm 20 years old.
```

### ⚠️ Arrow Functions Don't Have Their Own `this`

```js
let person = {
  name: "Ankit",
  // ❌ Arrow function — `this` does NOT point to person
  greet: () => {
    console.log(`Hi, I'm ${this.name}`);
  },
  // ✅ Regular function — `this` points to person
  introduce() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

person.greet();      // Output: Hi, I'm undefined  ❌
person.introduce();  // Output: Hi, I'm Ankit  ✅

// Rule: Always use regular function syntax for object methods
```

---

## Copying Objects

### ⚠️ The Reference Problem

Objects are **reference types**. Assigning an object to another variable doesn't copy it — both variables point to the **same object**.

```js
let original = { name: "Ankit", age: 20 };
let copy = original;

copy.name = "Rahul";
console.log(original.name);  // Output: Rahul  ❌ (original also changed!)
```

### Shallow Copy Methods

#### 1. Spread Operator `...` (Most Common)

```js
let original = { name: "Ankit", age: 20 };
let copy = { ...original };

copy.name = "Rahul";
console.log(original.name);  // Output: Ankit  ✅ (unchanged!)
console.log(copy.name);      // Output: Rahul
```

#### 2. `Object.assign()`

```js
let original = { name: "Ankit", age: 20 };
let copy = Object.assign({}, original);

copy.name = "Rahul";
console.log(original.name);  // Output: Ankit  ✅
```

### ⚠️ Shallow Copy Problem — Nested Objects Are Still Shared!

```js
let original = {
  name: "Ankit",
  address: { city: "Delhi", pin: 110001 }
};

let copy = { ...original };

copy.name = "Rahul";           // ✅ Doesn't affect original
copy.address.city = "Mumbai";  // ❌ ALSO changes original!

console.log(original.address.city);  // Output: Mumbai  ❌
```

**Why?** Spread only copies the **first level**. Nested objects are still shared references.

### Deep Copy Methods

#### 1. `structuredClone()` (Best Way — ES2022)

```js
let original = {
  name: "Ankit",
  address: { city: "Delhi", pin: 110001 }
};

let copy = structuredClone(original);

copy.address.city = "Mumbai";
console.log(original.address.city);  // Output: Delhi  ✅ (unchanged!)
```

#### 2. `JSON.parse(JSON.stringify())` (Old Way)

```js
let original = {
  name: "Ankit",
  address: { city: "Delhi" }
};

let copy = JSON.parse(JSON.stringify(original));

copy.address.city = "Mumbai";
console.log(original.address.city);  // Output: Delhi  ✅

// ⚠️ Limitations: Loses functions, undefined, Date objects, RegExp, etc.
let obj = { fn: function() {}, date: new Date(), x: undefined };
let broken = JSON.parse(JSON.stringify(obj));
console.log(broken);  // Output: { date: "2026-03-01T..." }  (fn and x are gone!)
```

> **Best Practice**: Use `structuredClone()` for deep copies. Use `{ ...obj }` for shallow copies.

---

## Merging Objects

### Spread Operator (Modern Way)

```js
let defaults = { theme: "light", lang: "en", fontSize: 14 };
let userSettings = { theme: "dark", fontSize: 18 };

let settings = { ...defaults, ...userSettings };
console.log(settings);
// Output: { theme: "dark", lang: "en", fontSize: 18 }
// userSettings overwrites matching keys from defaults ✅
```

### `Object.assign()`

```js
let target = { a: 1 };
let source1 = { b: 2 };
let source2 = { c: 3 };

Object.assign(target, source1, source2);
console.log(target);  // Output: { a: 1, b: 2, c: 3 }
// ⚠️ This MODIFIES the target object!

// For a new object:
let merged = Object.assign({}, source1, source2);
console.log(merged);  // Output: { b: 2, c: 3 }
```

---

## Object Destructuring

Pull values out of an object into individual variables.

```js
let person = { name: "Ankit", age: 20, city: "Delhi" };

// Old way:
let name1 = person.name;
let age1 = person.age;

// New way (destructuring):
let { name, age, city } = person;
console.log(name);  // Output: Ankit
console.log(age);   // Output: 20
console.log(city);  // Output: Delhi
```

### Rename Variables

```js
let person = { name: "Ankit", age: 20 };

let { name: fullName, age: years } = person;
console.log(fullName);  // Output: Ankit
console.log(years);     // Output: 20
// console.log(name);   // ❌ Error: name is not defined (we renamed it)
```

### Default Values

```js
let person = { name: "Ankit" };

let { name, age = 25, city = "Unknown" } = person;
console.log(name);  // Output: Ankit
console.log(age);   // Output: 25  (default used — no age in object)
console.log(city);  // Output: Unknown
```

### Nested Destructuring

```js
let user = {
  name: "Ankit",
  address: {
    city: "Delhi",
    pin: 110001
  }
};

let { name, address: { city, pin } } = user;
console.log(name);  // Output: Ankit
console.log(city);  // Output: Delhi
console.log(pin);   // Output: 110001
```

### Rest in Destructuring

```js
let person = { name: "Ankit", age: 20, city: "Delhi", job: "Developer" };

let { name, ...rest } = person;
console.log(name);  // Output: Ankit
console.log(rest);  // Output: { age: 20, city: "Delhi", job: "Developer" }
```

### Destructuring in Function Parameters

```js
// Instead of:
function greet(person) {
  console.log(`Hi ${person.name}, age ${person.age}`);
}

// You can destructure directly:
function greet({ name, age }) {
  console.log(`Hi ${name}, age ${age}`);
}

greet({ name: "Ankit", age: 20 });
// Output: Hi Ankit, age 20

// With defaults:
function createUser({ name, role = "user", active = true } = {}) {
  return { name, role, active };
}

console.log(createUser({ name: "Ankit" }));
// Output: { name: "Ankit", role: "user", active: true }
```

---

## Object Methods (Built-in)

### `Object.keys()`, `Object.values()`, `Object.entries()`

```js
let person = { name: "Ankit", age: 20, city: "Delhi" };

console.log(Object.keys(person));     // Output: ["name", "age", "city"]
console.log(Object.values(person));   // Output: ["Ankit", 20, "Delhi"]
console.log(Object.entries(person));  // Output: [["name","Ankit"], ["age",20], ["city","Delhi"]]
```

### `Object.fromEntries()` — Convert Array of Pairs to Object

The opposite of `Object.entries()`.

```js
let entries = [["name", "Ankit"], ["age", 20], ["city", "Delhi"]];

let person = Object.fromEntries(entries);
console.log(person);  // Output: { name: "Ankit", age: 20, city: "Delhi" }

// Useful for converting Map to Object:
let map = new Map([["a", 1], ["b", 2]]);
let obj = Object.fromEntries(map);
console.log(obj);  // Output: { a: 1, b: 2 }

// Transform object entries:
let prices = { apple: 100, banana: 50, mango: 80 };
let doubled = Object.fromEntries(
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
console.log(doubled);  // Output: { apple: 200, banana: 100, mango: 160 }
```

### `Object.freeze()` — Make Object Completely Immutable

```js
let person = { name: "Ankit", age: 20 };

Object.freeze(person);

person.age = 25;          // ❌ Silently fails (no error, but doesn't change)
person.city = "Delhi";    // ❌ Can't add new properties
delete person.name;       // ❌ Can't delete properties

console.log(person);  // Output: { name: "Ankit", age: 20 }  (unchanged!)

console.log(Object.isFrozen(person));  // Output: true

// ⚠️ Shallow freeze only! Nested objects can still be changed:
let user = { name: "Ankit", address: { city: "Delhi" } };
Object.freeze(user);
user.address.city = "Mumbai";  // ✅ This works!  (nested object not frozen)
```

### `Object.seal()` — Allow Changes, Prevent Adding/Deleting

```js
let person = { name: "Ankit", age: 20 };

Object.seal(person);

person.age = 25;          // ✅ Can change existing properties
person.city = "Delhi";    // ❌ Can't add new properties
delete person.name;       // ❌ Can't delete properties

console.log(person);  // Output: { name: "Ankit", age: 25 }
console.log(Object.isSealed(person));  // Output: true
```

### `Object.freeze()` vs `Object.seal()`:

| Feature           | `freeze()` | `seal()` |
|-------------------|------------|----------|
| Change values?    | ❌ No      | ✅ Yes   |
| Add properties?   | ❌ No      | ❌ No    |
| Delete properties?| ❌ No      | ❌ No    |

### `Object.preventExtensions()` — Block Adding Only

```js
let person = { name: "Ankit" };

Object.preventExtensions(person);

person.name = "Rahul";     // ✅ Can change
delete person.name;        // ✅ Can delete
person.age = 20;           // ❌ Can't add new properties

console.log(Object.isExtensible(person));  // Output: false
```

### `Object.defineProperty()` — Advanced Property Control

Gives you fine-grained control over a single property.

```js
let person = {};

Object.defineProperty(person, "name", {
  value: "Ankit",
  writable: false,       // can't change the value
  enumerable: true,      // shows up in loops
  configurable: false    // can't delete or reconfigure
});

console.log(person.name);  // Output: Ankit
person.name = "Rahul";     // ❌ Silently fails
console.log(person.name);  // Output: Ankit
```

### `Object.defineProperties()` — Define Multiple Properties

```js
let person = {};

Object.defineProperties(person, {
  name: { value: "Ankit", writable: true, enumerable: true },
  age: { value: 20, writable: false, enumerable: true }
});

console.log(person);  // Output: { name: "Ankit", age: 20 }
```

### `Object.getOwnPropertyDescriptor()` — See Property Details

```js
let person = { name: "Ankit" };

let descriptor = Object.getOwnPropertyDescriptor(person, "name");
console.log(descriptor);
// Output: { value: "Ankit", writable: true, enumerable: true, configurable: true }
```

---

## Getters and Setters

**Getters** and **setters** let you define properties that **run a function** when accessed or changed — but look like regular properties from the outside.

### Getter — Runs when you READ a property

```js
let person = {
  firstName: "Ankit",
  lastName: "Kumar",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

console.log(person.fullName);  // Output: Ankit Kumar
// Notice: no parentheses () — it LOOKS like a property, but runs a function
```

### Setter — Runs when you SET a property

```js
let person = {
  firstName: "Ankit",
  lastName: "Kumar",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(value) {
    let parts = value.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1];
  }
};

person.fullName = "Rahul Sharma";  // Triggers the setter
console.log(person.firstName);     // Output: Rahul
console.log(person.lastName);      // Output: Sharma
console.log(person.fullName);      // Output: Rahul Sharma
```

### Validation with Setters

```js
let user = {
  _age: 0,  // convention: _ means "private"

  get age() {
    return this._age;
  },

  set age(value) {
    if (value < 0 || value > 150) {
      console.log("Invalid age!");
      return;
    }
    this._age = value;
  }
};

user.age = 25;
console.log(user.age);  // Output: 25

user.age = -5;          // Output: Invalid age!
console.log(user.age);  // Output: 25  (unchanged)

user.age = 200;         // Output: Invalid age!
console.log(user.age);  // Output: 25  (unchanged)
```

---

## Comparing Objects

Objects are compared by **reference**, not by value.

```js
let obj1 = { name: "Ankit" };
let obj2 = { name: "Ankit" };
let obj3 = obj1;

console.log(obj1 === obj2);  // Output: false  (different objects in memory!)
console.log(obj1 === obj3);  // Output: true   (same reference)
```

### How to Compare Object Values:

```js
// Method 1: JSON.stringify (simple cases)
let a = { name: "Ankit", age: 20 };
let b = { name: "Ankit", age: 20 };

console.log(JSON.stringify(a) === JSON.stringify(b));  // Output: true

// ⚠️ Key order matters!
let c = { age: 20, name: "Ankit" };
console.log(JSON.stringify(a) === JSON.stringify(c));  // Output: false  (different key order)

// Method 2: Manual comparison
function isEqual(obj1, obj2) {
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => obj1[key] === obj2[key]);
}

console.log(isEqual(a, b));  // Output: true
console.log(isEqual(a, c));  // Output: true  (order doesn't matter ✅)
```

---

## Converting Objects

### Object to Array

```js
let person = { name: "Ankit", age: 20 };

console.log(Object.keys(person));     // Output: ["name", "age"]
console.log(Object.values(person));   // Output: ["Ankit", 20]
console.log(Object.entries(person));  // Output: [["name","Ankit"], ["age",20]]
```

### Array to Object

```js
let entries = [["name", "Ankit"], ["age", 20]];
let obj = Object.fromEntries(entries);
console.log(obj);  // Output: { name: "Ankit", age: 20 }
```

### Object to JSON String

```js
let person = { name: "Ankit", age: 20 };

let json = JSON.stringify(person);
console.log(json);         // Output: '{"name":"Ankit","age":20}'
console.log(typeof json);  // Output: string

// Pretty print:
console.log(JSON.stringify(person, null, 2));
// Output:
// {
//   "name": "Ankit",
//   "age": 20
// }
```

### JSON String to Object

```js
let json = '{"name":"Ankit","age":20}';

let person = JSON.parse(json);
console.log(person);       // Output: { name: "Ankit", age: 20 }
console.log(person.name);  // Output: Ankit
```

---

## Useful Patterns & Tricks

### Check if Object is Empty

```js
let obj = {};

console.log(Object.keys(obj).length === 0);  // Output: true  (empty!)

let person = { name: "Ankit" };
console.log(Object.keys(person).length === 0);  // Output: false  (not empty)

// As a function:
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
```

### Count Properties

```js
let person = { name: "Ankit", age: 20, city: "Delhi" };
console.log(Object.keys(person).length);  // Output: 3
```

### Remove a Property Immutably (Without Mutating)

```js
let person = { name: "Ankit", age: 20, city: "Delhi" };

// Using destructuring + rest:
let { city, ...personWithoutCity } = person;
console.log(personWithoutCity);  // Output: { name: "Ankit", age: 20 }
console.log(person);             // Output: { name: "Ankit", age: 20, city: "Delhi" }  (unchanged!)
```

### Conditional Properties

```js
let includeAge = true;
let includeCity = false;

let person = {
  name: "Ankit",
  ...(includeAge && { age: 20 }),
  ...(includeCity && { city: "Delhi" })
};

console.log(person);  // Output: { name: "Ankit", age: 20 }
// city was NOT included because includeCity is false
```

### Default Values with Spread

```js
function createUser(options) {
  let defaults = { role: "user", active: true, theme: "light" };
  return { ...defaults, ...options };
}

console.log(createUser({ name: "Ankit" }));
// Output: { role: "user", active: true, theme: "light", name: "Ankit" }

console.log(createUser({ name: "Ankit", role: "admin" }));
// Output: { role: "admin", active: true, theme: "light", name: "Ankit" }
```

### Nullish Coalescing for Object Properties

```js
let user = { name: "Ankit", bio: "", score: 0 };

// || treats "", 0, false as falsy — gives wrong defaults
console.log(user.bio || "No bio");      // Output: "No bio"  ❌ (bio IS empty string, not missing)
console.log(user.score || 100);         // Output: 100  ❌ (score IS 0, not missing)

// ?? only treats null/undefined as "missing"
console.log(user.bio ?? "No bio");      // Output: ""  ✅ (keeps the empty string)
console.log(user.score ?? 100);         // Output: 0  ✅ (keeps the 0)
console.log(user.city ?? "Unknown");    // Output: "Unknown"  ✅ (city doesn't exist)
```

---

## Quick Summary of Object Methods

| Method                          | What It Does                              |
|---------------------------------|-------------------------------------------|
| `Object.keys(obj)`             | Get all keys as array                     |
| `Object.values(obj)`           | Get all values as array                   |
| `Object.entries(obj)`          | Get key-value pairs as array              |
| `Object.fromEntries(arr)`      | Convert array of pairs to object          |
| `Object.assign(target, src)`   | Copy properties (shallow)                 |
| `Object.freeze(obj)`           | Make object completely immutable           |
| `Object.seal(obj)`             | Allow changes, block add/delete           |
| `Object.preventExtensions(obj)`| Block adding new properties               |
| `Object.create(proto)`         | Create object with specified prototype    |
| `Object.defineProperty()`      | Define property with fine control         |
| `Object.getOwnPropertyDescriptor()` | Get property details               |
| `Object.isFrozen(obj)`         | Check if frozen                           |
| `Object.isSealed(obj)`         | Check if sealed                           |
| `structuredClone(obj)`         | Deep copy                                |
| `JSON.stringify(obj)`          | Convert to JSON string                    |
| `JSON.parse(str)`              | Convert JSON string to object             |

---

> **Key Takeaways**:
> 1. Use **dot notation** for simple access, **bracket notation** for dynamic/special keys
> 2. Use **optional chaining** `?.` to safely access nested properties
> 3. Use **spread `...`** for shallow copying and merging
> 4. Use **`structuredClone()`** for deep copying
> 5. Use **destructuring** `{ name, age } = obj` to extract values cleanly
> 6. **Never use arrow functions** for object methods (they don't have their own `this`)
> 7. Use `Object.keys/values/entries` for looping — avoid `for...in` unless you check `hasOwnProperty`
> 8. Use `??` (nullish coalescing) instead of `||` for default values 🎯
