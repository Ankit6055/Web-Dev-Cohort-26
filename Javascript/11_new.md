# The `new` Keyword in JavaScript

## What Does `new` Do?

The `new` keyword is used to **create a new object** from a constructor function or a class. It's like a **factory machine** — you give it a blueprint (constructor/class), and it spits out a brand new object.

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const ankit = new Person("Ankit", 20);
console.log(ankit);       // Output: Person { name: "Ankit", age: 20 }
console.log(ankit.name);  // Output: Ankit
```

Without `new`, it's just a regular function call — and things break:

```js
const broken = Person("Ankit", 20);  // ❌ No `new`
console.log(broken);                 // Output: undefined (function didn't return anything)
// In non-strict mode, `this` was window — so you just polluted the global object!
console.log(window.name);           // Output: Ankit  😱 (leaked to global!)
```

---

## What Happens Behind the Scenes When You Use `new`?

When you write `new Person("Ankit", 20)`, JavaScript does **4 things automatically**:

```js
// You write:
const ankit = new Person("Ankit", 20);

// JavaScript does this behind the scenes:

// Step 1: Create a new empty object
const obj = {};

// Step 2: Link the object's prototype to the constructor's prototype
Object.setPrototypeOf(obj, Person.prototype);
// or: obj.__proto__ = Person.prototype;

// Step 3: Call the constructor function with `this` = the new object
Person.call(obj, "Ankit", 20);
// Now obj = { name: "Ankit", age: 20 }

// Step 4: Return the object (if constructor doesn't return its own object)
// ankit = obj;
```

### The 4 Steps Summarized:

| Step | What Happens                                           |
|------|--------------------------------------------------------|
| 1    | Creates a **new empty object** `{}`                    |
| 2    | Sets the object's **prototype** to the constructor's `.prototype` |
| 3    | Runs the constructor with **`this` = the new object**  |
| 4    | **Returns** the new object (unless constructor returns a different object) |

---

## Using `new` with Constructor Functions

A **constructor function** is just a regular function that's designed to be used with `new`. By convention, they start with a **Capital Letter**.

```js
function Car(brand, year, color) {
  this.brand = brand;
  this.year = year;
  this.color = color;
  this.describe = function() {
    return `${this.color} ${this.brand} (${this.year})`;
  };
}

const car1 = new Car("Toyota", 2024, "Red");
const car2 = new Car("Honda", 2023, "Blue");

console.log(car1.describe());  // Output: Red Toyota (2024)
console.log(car2.describe());  // Output: Blue Honda (2023)

console.log(car1 instanceof Car);  // Output: true
console.log(typeof car1);          // Output: object
```

---

## Using `new` with Classes (ES6)

Classes are the **modern** way to create objects. Under the hood, they still use constructor functions and prototypes.

```js
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    console.log(`${this.name} says ${this.sound}!`);
  }
}

const dog = new Animal("Buddy", "Woof");
const cat = new Animal("Whiskers", "Meow");

dog.speak();  // Output: Buddy says Woof!
cat.speak();  // Output: Whiskers says Meow!

console.log(dog instanceof Animal);  // Output: true
```

> **Important**: Classes **must** be used with `new`. Calling a class without `new` throws an error.

```js
// const broken = Animal("Buddy", "Woof");
// ❌ Error: Class constructor Animal cannot be invoked without 'new'
```

---

## Using `new` with Built-in Constructors

JavaScript has built-in constructors you can use with `new`:

```js
// ✅ These work but are RARELY needed:
const obj = new Object();          // same as {}
const arr = new Array(1, 2, 3);    // same as [1, 2, 3]
const str = new String("Hello");   // creates String OBJECT (not primitive!)
const num = new Number(42);        // creates Number OBJECT
const bool = new Boolean(true);    // creates Boolean OBJECT
const date = new Date();           // ✅ This one is commonly used!
const regex = new RegExp("\\d+");  // same as /\d+/
const err = new Error("Oops!");    // ✅ This one is commonly used!
const map = new Map();             // ✅ Commonly used
const set = new Set();             // ✅ Commonly used
const promise = new Promise((resolve) => resolve("done"));  // ✅ Commonly used

console.log(date);     // Output: 2026-03-01T...
console.log(err);      // Output: Error: Oops!
```

### ⚠️ Don't Use `new` for Primitives!

```js
// ❌ BAD — creates wrapper objects, NOT primitives
const strObj = new String("Hello");
const numObj = new Number(42);
const boolObj = new Boolean(false);

console.log(typeof strObj);   // Output: object  (NOT "string"!)
console.log(typeof numObj);   // Output: object  (NOT "number"!)
console.log(typeof boolObj);  // Output: object  (NOT "boolean"!)

// This causes bugs:
const weirdBool = new Boolean(false);
if (weirdBool) {
  console.log("This runs!");  // ⚠️ This RUNS because objects are truthy!
  // Even though the value is false, the OBJECT is truthy!
}

// ✅ GOOD — use literals instead
const str = "Hello";
const num = 42;
const bool = false;
```

### Constructors That Work WITHOUT `new`:

Some built-in functions work differently with and without `new`:

```js
// Number, String, Boolean WITHOUT new = type conversion (useful!)
console.log(Number("42"));    // Output: 42  (primitive number)
console.log(String(42));      // Output: "42"  (primitive string)
console.log(Boolean(0));      // Output: false  (primitive boolean)

// WITH new = creates objects (avoid!)
console.log(new Number("42"));   // Output: Number { 42 }  (object!)
console.log(new String(42));     // Output: String { "42" }  (object!)
console.log(new Boolean(0));     // Output: Boolean { false }  (object!)
```

---

## What Constructors Return

### Default: Returns `this` (the new object)

If the constructor doesn't have a `return` statement, or returns a **primitive value**, JavaScript ignores it and returns `this`.

```js
function User(name) {
  this.name = name;
  // No return statement — JavaScript returns `this` automatically
}

const user = new User("Ankit");
console.log(user);  // Output: User { name: "Ankit" }
```

### Returning a Primitive — Ignored!

```js
function Weird(name) {
  this.name = name;
  return 42;          // ❌ Ignored! Primitives are ignored when using `new`
}

const w = new Weird("Ankit");
console.log(w);       // Output: Weird { name: "Ankit" }  (42 was ignored)
console.log(w.name);  // Output: Ankit
```

### Returning an Object — Overrides `this`!

If the constructor returns an **object**, that object replaces `this`:

```js
function Sneaky(name) {
  this.name = name;
  return { name: "Overridden!", age: 99 };  // returns a different object
}

const s = new Sneaky("Ankit");
console.log(s);       // Output: { name: "Overridden!", age: 99 }
console.log(s.name);  // Output: Overridden!  (not "Ankit"!)

// `this` was thrown away and replaced with the returned object!
```

### Summary:

| Constructor Returns | What You Get with `new`              |
|---------------------|--------------------------------------|
| Nothing (`undefined`)| The new object (`this`) ✅           |
| A primitive          | The new object (`this`) ✅ (primitive ignored) |
| An object            | The returned object ⚠️ (`this` thrown away) |

---

## `instanceof` — Check if Object Was Created with `new`

```js
function Car(brand) {
  this.brand = brand;
}

const car = new Car("Toyota");
const obj = { brand: "Honda" };

console.log(car instanceof Car);    // Output: true  (created with new Car)
console.log(obj instanceof Car);    // Output: false  (just a plain object)
console.log(car instanceof Object); // Output: true  (all objects are instances of Object)
```

With classes:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
}

const buddy = new Dog("Buddy");

console.log(buddy instanceof Dog);     // Output: true
console.log(buddy instanceof Animal);  // Output: true  (Dog extends Animal)
console.log(buddy instanceof Object);  // Output: true
```

---

## Prototype Chain with `new`

When you use `new`, the created object is **linked** to the constructor's `prototype`. This means it can access methods defined on the prototype.

```js
function Person(name) {
  this.name = name;
}

// Add a method to the prototype — shared by ALL Person instances
Person.prototype.greet = function() {
  console.log(`Hi, I'm ${this.name}`);
};

const ankit = new Person("Ankit");
const rahul = new Person("Rahul");

ankit.greet();  // Output: Hi, I'm Ankit
rahul.greet();  // Output: Hi, I'm Rahul

// Both use the SAME greet function from the prototype:
console.log(ankit.greet === rahul.greet);  // Output: true  (shared!)

// Check the prototype link:
console.log(ankit.__proto__ === Person.prototype);          // Output: true
console.log(Object.getPrototypeOf(ankit) === Person.prototype); // Output: true ✅ (proper way)
```

### Why Put Methods on Prototype?

```js
// ❌ BAD — methods inside constructor (duplicated for every object)
function BadPerson(name) {
  this.name = name;
  this.greet = function() {   // Each object gets its OWN copy
    console.log(`Hi, I'm ${this.name}`);
  };
}

const a = new BadPerson("A");
const b = new BadPerson("B");
console.log(a.greet === b.greet);  // Output: false  (two different functions in memory!)

// ✅ GOOD — methods on prototype (shared by all objects)
function GoodPerson(name) {
  this.name = name;
}

GoodPerson.prototype.greet = function() {
  console.log(`Hi, I'm ${this.name}`);
};

const c = new GoodPerson("C");
const d = new GoodPerson("D");
console.log(c.greet === d.greet);  // Output: true  (ONE function shared! memory efficient!)
```

---

## Protecting Against Missing `new`

What if someone forgets to use `new`? You can protect your constructor:

### Method 1: Check with `instanceof`

```js
function Person(name) {
  if (!(this instanceof Person)) {
    return new Person(name);  // call itself with `new`
  }
  this.name = name;
}

const p1 = new Person("Ankit");   // ✅ Works normally
const p2 = Person("Rahul");       // ✅ Also works! (auto-corrects)

console.log(p1);  // Output: Person { name: "Ankit" }
console.log(p2);  // Output: Person { name: "Rahul" }
```

### Method 2: `new.target` (ES6)

`new.target` tells you whether the function was called with `new`.

```js
function Person(name) {
  if (!new.target) {
    throw new Error("Must use 'new' to create a Person!");
  }
  this.name = name;
}

const p1 = new Person("Ankit");  // ✅ Works
// const p2 = Person("Rahul");   // ❌ Error: Must use 'new' to create a Person!
```

```js
// Classes do this automatically:
class User {
  constructor(name) {
    this.name = name;
  }
}

// const u = User("Ankit");  // ❌ Error: Cannot call a class as a function
const u = new User("Ankit"); // ✅ Works
```

### What is `new.target`?

```js
function Foo() {
  console.log(new.target);
}

Foo();       // Output: undefined  (called without new)
new Foo();   // Output: [Function: Foo]  (called with new)

// In a class:
class Bar {
  constructor() {
    console.log(new.target.name);
  }
}

class Baz extends Bar {}

new Bar();  // Output: Bar
new Baz();  // Output: Baz  (shows the actual class that was `new`-ed)
```

---

## Factory Functions vs Constructor Functions

There's another way to create objects **without** `new` — called **factory functions**:

```js
// Constructor function (uses new)
function PersonConstructor(name, age) {
  this.name = name;
  this.age = age;
}

const p1 = new PersonConstructor("Ankit", 20);

// Factory function (no new needed)
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hi, I'm ${this.name}`);
    }
  };
}

const p2 = createPerson("Ankit", 20);

console.log(p1);  // Output: PersonConstructor { name: "Ankit", age: 20 }
console.log(p2);  // Output: { name: "Ankit", age: 20, greet: [Function] }
```

### Comparison:

| Feature                  | Constructor (`new`)            | Factory Function              |
|--------------------------|--------------------------------|-------------------------------|
| Uses `new`               | ✅ Yes (required)              | ❌ No                         |
| `this` binding           | Automatic                      | Not needed                    |
| `instanceof` works       | ✅ Yes                         | ❌ No                         |
| Prototype methods        | ✅ Shared via prototype        | ❌ Each object gets own copy  |
| Forgetting `new`         | ⚠️ Breaks (unless protected)  | ✅ No problem                 |
| Can have private vars    | ❌ Not easily                  | ✅ Yes (via closures)         |
| Memory efficient         | ✅ (with prototype methods)    | ❌ (methods duplicated)       |

```js
// Factory function with private variables:
function createCounter(start = 0) {
  let count = start;  // private — can't be accessed from outside!

  return {
    increment() { count++; },
    decrement() { count--; },
    getCount() { return count; }
  };
}

const counter = createCounter(10);
counter.increment();
counter.increment();
console.log(counter.getCount());  // Output: 12
// console.log(counter.count);    // Output: undefined  (private!)
```

---

## Implementing Your Own `new`

Understanding how `new` works by building it yourself:

```js
function myNew(constructor, ...args) {
  // Step 1: Create empty object
  const obj = {};

  // Step 2: Link prototype
  Object.setPrototypeOf(obj, constructor.prototype);

  // Step 3: Call constructor with `this` = obj
  const result = constructor.apply(obj, args);

  // Step 4: Return the object (or the returned object if it's an object)
  return result instanceof Object ? result : obj;
}

// Test it:
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  console.log(`Hi, I'm ${this.name}`);
};

const ankit = myNew(Person, "Ankit", 20);
console.log(ankit);            // Output: { name: "Ankit", age: 20 }
ankit.greet();                 // Output: Hi, I'm Ankit
console.log(ankit instanceof Person);  // Output: true ✅
```

---

## Quick Summary

| Topic                    | Key Point                                                  |
|--------------------------|------------------------------------------------------------|
| What `new` does          | Creates object → links prototype → runs constructor → returns object |
| Constructor function     | Regular function designed for `new`, starts with Capital letter |
| Class                    | Modern syntax, `new` is required (enforced automatically)   |
| `instanceof`             | Checks if object was created from a constructor/class       |
| Return from constructor  | Primitives are ignored, objects override `this`              |
| `new.target`             | Tells you if `new` was used (undefined if not)              |
| Prototype                | Methods on prototype are shared by all instances (memory efficient) |
| Built-in constructors    | Use `new` for `Date`, `Map`, `Set`, `Error`, `Promise`. Avoid for `String`, `Number`, `Boolean` |
| Factory functions        | Alternative to `new` — simpler, supports private vars       |

---

> **Key Takeaways**:
> 1. `new` does **4 things**: create object, link prototype, run constructor, return object
> 2. Always use **Capital Letter** for constructor functions (`Person`, not `person`)
> 3. **Never** use `new String()`, `new Number()`, `new Boolean()` — use literals
> 4. **Do** use `new` for `Date`, `Map`, `Set`, `Error`, `Promise`, `RegExp`
> 5. Use `new.target` or `instanceof` to protect constructors against missing `new`
> 6. Put methods on the **prototype**, not inside the constructor (saves memory)
> 7. Classes enforce `new` automatically — no protection needed 🎯
