# Prototypes in JavaScript

## What is a Prototype?

A **prototype** is like a **parent** that an object can inherit from. Every object in JavaScript has a hidden link to another object called its **prototype**. If you ask an object for something it doesn't have, it goes and checks its prototype — like asking your parent when you don't know the answer.

```js
const person = {
  greet() {
    console.log("Hello!");
  }
};

const ankit = Object.create(person); // ankit's prototype is `person`

ankit.greet();  // Output: Hello!
// ankit doesn't have greet() — but its prototype (person) does!

console.log(ankit.hasOwnProperty("greet"));  // Output: false  (it's inherited)
```

---

## Every Object Has a Prototype

When you create any object, it automatically gets a prototype:

```js
const obj = {};
console.log(Object.getPrototypeOf(obj));  // Output: [Object: null prototype] {}
// That's Object.prototype — the root of all objects!

const arr = [];
console.log(Object.getPrototypeOf(arr));  // Output: Array prototype (has push, pop, map, etc.)

const str = "Hello";
console.log(Object.getPrototypeOf(str));  // Output: String prototype (has toUpperCase, slice, etc.)
```

That's why you can do `"hello".toUpperCase()` even though you never defined `toUpperCase` — it comes from the **String prototype**.

---

## `__proto__` vs `prototype` — The Two Confusing Terms

This is the **#1 source of confusion**. Let's clear it up:

### `__proto__` (every object has this)

- It's the **actual link** to the object's parent (prototype).
- Every object has `__proto__`.
- It points to the prototype it inherits from.

### `prototype` (only functions have this)

- It's a **property on functions/classes**.
- It's the object that will become `__proto__` of instances created with `new`.
- Regular objects **don't** have `.prototype`.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hi, I'm ${this.name}`);
};

const ankit = new Person("Ankit");

// ankit.__proto__ points to Person.prototype
console.log(ankit.__proto__ === Person.prototype);  // Output: true

// Person.prototype is an object
console.log(Person.prototype);  // Output: { greet: [Function] }

// ankit doesn't have .prototype (it's not a function)
console.log(ankit.prototype);   // Output: undefined
```

### Visual Map:

```
Person (function)
  ├── .prototype  ──►  { greet: function, constructor: Person }
                              ▲
                              │
ankit (object)                │
  └── .__proto__  ────────────┘

// ankit.__proto__  ===  Person.prototype  ✅
```

### Quick Rule:

| Term          | Who Has It  | What It Points To                          |
|---------------|-------------|---------------------------------------------|
| `__proto__`   | Every object| The prototype it inherits from              |
| `.prototype`  | Functions only | The object given to instances as `__proto__` |

> **Note**: Use `Object.getPrototypeOf(obj)` instead of `obj.__proto__`. The `__proto__` syntax is old and not recommended, but good to know.

---

## The Prototype Chain

When you access a property, JavaScript looks for it in this order:

1. **The object itself** → found? Return it!
2. **Its prototype** (`__proto__`) → found? Return it!
3. **The prototype's prototype** → found? Return it!
4. ... keeps going up ...
5. **`Object.prototype`** → found? Return it!
6. **`null`** → not found, return `undefined`

This is called the **prototype chain**.

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating`);
};

function Dog(name, breed) {
  Animal.call(this, name);    // Call parent constructor
  this.breed = breed;
}

// Link Dog's prototype to Animal's prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;  // Fix the constructor reference

Dog.prototype.bark = function() {
  console.log(`${this.name} says Woof!`);
};

const buddy = new Dog("Buddy", "Labrador");

buddy.bark();     // Output: Buddy says Woof!  (found on Dog.prototype)
buddy.eat();      // Output: Buddy is eating  (found on Animal.prototype)
buddy.toString(); // Output: [object Object]  (found on Object.prototype)
```

### The Chain for `buddy`:

```
buddy  →  Dog.prototype  →  Animal.prototype  →  Object.prototype  →  null
  │           │                   │                    │
  ├─ name     ├─ bark()          ├─ eat()             ├─ toString()
  ├─ breed    ├─ constructor     │                    ├─ hasOwnProperty()
  │           │                  │                    ├─ valueOf()
```

```js
// Verify the chain:
console.log(buddy.__proto__ === Dog.prototype);                    // Output: true
console.log(buddy.__proto__.__proto__ === Animal.prototype);       // Output: true
console.log(buddy.__proto__.__proto__.__proto__ === Object.prototype); // Output: true
console.log(buddy.__proto__.__proto__.__proto__.__proto__);        // Output: null (end of chain)
```

---

## `Object.create()` — Creating Objects with a Specific Prototype

`Object.create(proto)` creates a new object and sets its prototype to whatever you pass in.

```js
const vehicle = {
  type: "vehicle",
  start() {
    console.log(`${this.name} is starting...`);
  },
  stop() {
    console.log(`${this.name} has stopped.`);
  }
};

const car = Object.create(vehicle);
car.name = "Tesla";
car.doors = 4;

car.start();  // Output: Tesla is starting...  (inherited from vehicle)
car.stop();   // Output: Tesla has stopped.  (inherited from vehicle)

console.log(car.type);    // Output: vehicle  (inherited)
console.log(car.doors);   // Output: 4  (own property)

console.log(Object.getPrototypeOf(car) === vehicle);  // Output: true
```

### Create Object with NO Prototype:

```js
const bare = Object.create(null);
bare.name = "I have no prototype!";

console.log(bare.name);          // Output: I have no prototype!
// console.log(bare.toString()); // ❌ Error! No Object.prototype in chain
// console.log(bare.hasOwnProperty("name")); // ❌ Error!

// Useful for creating a pure dictionary with zero inherited stuff
```

---

## Adding Methods to Prototypes

### On Constructor Functions:

```js
function Calculator(value) {
  this.value = value;
}

Calculator.prototype.add = function(n) {
  this.value += n;
  return this;  // for chaining
};

Calculator.prototype.subtract = function(n) {
  this.value -= n;
  return this;
};

Calculator.prototype.multiply = function(n) {
  this.value *= n;
  return this;
};

Calculator.prototype.result = function() {
  return this.value;
};

const calc = new Calculator(10);
const answer = calc.add(5).multiply(2).subtract(3).result();
console.log(answer);  // Output: 27  →  (10 + 5) * 2 - 3
```

### On Built-in Prototypes (⚠️ Be Careful):

You **can** add methods to built-in prototypes, but **you shouldn't** in production code:

```js
// ⚠️ Adding a method to ALL arrays
Array.prototype.last = function() {
  return this[this.length - 1];
};

console.log([1, 2, 3].last());      // Output: 3
console.log(["a", "b", "c"].last()); // Output: c

// ⚠️ Adding a method to ALL strings
String.prototype.reverse = function() {
  return this.split("").reverse().join("");
};

console.log("hello".reverse());  // Output: olleh
```

> **Why avoid modifying built-in prototypes?**
> - Your method name could clash with future JS features
> - Other libraries might do the same thing with different behavior
> - It's called **"monkey patching"** and breaks expectations

---

## `hasOwnProperty()` vs `in` — Own vs Inherited

```js
function Person(name) {
  this.name = name;
}

Person.prototype.species = "Human";

const ankit = new Person("Ankit");

// hasOwnProperty — checks ONLY the object itself
console.log(ankit.hasOwnProperty("name"));     // Output: true  (own property)
console.log(ankit.hasOwnProperty("species"));  // Output: false  (inherited from prototype)

// `in` operator — checks the WHOLE prototype chain
console.log("name" in ankit);     // Output: true  (own)
console.log("species" in ankit);  // Output: true  (inherited — but still "in" ankit)
console.log("toString" in ankit); // Output: true  (from Object.prototype!)
```

### Safe Iteration with `for...in`:

```js
function Car(brand) {
  this.brand = brand;
}

Car.prototype.type = "vehicle";

const car = new Car("Toyota");

// for...in loops over ALL properties (own + inherited)
for (let key in car) {
  console.log(key);
}
// Output:
// brand     ← own property
// type      ← inherited from prototype!

// ✅ Filter to only own properties:
for (let key in car) {
  if (car.hasOwnProperty(key)) {
    console.log(key);
  }
}
// Output:
// brand     ← only own property!

// ✅ Better: use Object.keys() (only own enumerable properties)
console.log(Object.keys(car));  // Output: ["brand"]
```

---

## Prototypal Inheritance — Objects Inheriting from Objects

JavaScript uses **prototypal inheritance**, not classical inheritance (like Java/C++). Objects inherit directly from other objects.

### Pattern 1: Object.create()

```js
const animal = {
  alive: true,
  eat() {
    console.log(`${this.name} is eating`);
  }
};

const dog = Object.create(animal);
dog.name = "Buddy";
dog.bark = function() {
  console.log("Woof!");
};

const puppy = Object.create(dog);
puppy.name = "Max";

puppy.bark();  // Output: Woof!  (from dog)
puppy.eat();   // Output: Max is eating  (from animal)
console.log(puppy.alive);  // Output: true  (from animal)

// Chain: puppy → dog → animal → Object.prototype → null
```

### Pattern 2: Constructor Function Inheritance

```js
function Shape(color) {
  this.color = color;
}

Shape.prototype.describe = function() {
  console.log(`A ${this.color} ${this.type}`);
};

function Circle(color, radius) {
  Shape.call(this, color);  // Call parent constructor
  this.type = "circle";
  this.radius = radius;
}

// Set up inheritance:
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

// Add Circle-specific method:
Circle.prototype.area = function() {
  return Math.PI * this.radius ** 2;
};

const c = new Circle("red", 5);
c.describe();                     // Output: A red circle  (inherited from Shape)
console.log(c.area().toFixed(2)); // Output: 78.54  (own method on Circle)
console.log(c instanceof Circle); // Output: true
console.log(c instanceof Shape);  // Output: true
```

### Pattern 3: Class Syntax (ES6) — Same Thing, Cleaner

```js
class Shape {
  constructor(color) {
    this.color = color;
  }

  describe() {
    console.log(`A ${this.color} ${this.type}`);
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);  // calls Shape's constructor
    this.type = "circle";
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

const c = new Circle("blue", 10);
c.describe();                      // Output: A blue circle
console.log(c.area().toFixed(2));  // Output: 314.16

// Under the hood, this is still prototypal inheritance!
console.log(c.__proto__ === Circle.prototype);                   // Output: true
console.log(Circle.prototype.__proto__ === Shape.prototype);     // Output: true
```

---

## Property Shadowing (Overriding)

If an object has a property with the **same name** as its prototype, the object's version **wins** (shadows the prototype's version):

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.sound = "...";
Animal.prototype.speak = function() {
  console.log(`${this.name} says ${this.sound}`);
};

const dog = new Animal("Buddy");
dog.sound = "Woof!";  // ← Shadows the prototype's "sound"

const cat = new Animal("Whiskers");
cat.sound = "Meow!";

const unknown = new Animal("Unknown");
// doesn't shadow — uses prototype's sound

dog.speak();     // Output: Buddy says Woof!  (own property)
cat.speak();     // Output: Whiskers says Meow!  (own property)
unknown.speak(); // Output: Unknown says ...  (prototype property)

// Delete the shadow to reveal the prototype version:
delete dog.sound;
dog.speak();     // Output: Buddy says ...  (back to prototype version)
```

---

## `Object.getPrototypeOf()` and `Object.setPrototypeOf()`

The **proper** way to get and set prototypes (instead of `__proto__`):

```js
const parent = {
  greet() {
    console.log("Hello from parent!");
  }
};

const child = {};

// Get prototype:
console.log(Object.getPrototypeOf(child) === Object.prototype);  // Output: true

// Set prototype:
Object.setPrototypeOf(child, parent);

child.greet();  // Output: Hello from parent!
console.log(Object.getPrototypeOf(child) === parent);  // Output: true
```

> ⚠️ `Object.setPrototypeOf()` is **slow** and should be avoided in performance-critical code. Use `Object.create()` instead when possible.

---

## The `constructor` Property

Every prototype has a `.constructor` property that points back to the function that created it:

```js
function Person(name) {
  this.name = name;
}

const ankit = new Person("Ankit");

console.log(ankit.constructor === Person);  // Output: true
console.log(ankit.constructor.name);        // Output: Person

// You can even create new objects using .constructor:
const clone = new ankit.constructor("Clone");
console.log(clone);  // Output: Person { name: "Clone" }
```

### ⚠️ Fixing Lost Constructor:

When you replace the entire prototype, the constructor reference gets lost:

```js
function Animal(name) {
  this.name = name;
}

function Dog(name) {
  Animal.call(this, name);
}

// ❌ This replaces Dog.prototype entirely — constructor is lost!
Dog.prototype = Object.create(Animal.prototype);

const buddy = new Dog("Buddy");
console.log(buddy.constructor === Dog);     // Output: false  ❌
console.log(buddy.constructor === Animal);  // Output: true  (wrong!)

// ✅ Fix: Set the constructor back
Dog.prototype.constructor = Dog;

const buddy2 = new Dog("Buddy");
console.log(buddy2.constructor === Dog);  // Output: true  ✅
```

---

## Checking the Prototype Chain

### `instanceof`

```js
function Animal() {}
function Dog() {}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const buddy = new Dog();

console.log(buddy instanceof Dog);     // Output: true
console.log(buddy instanceof Animal);  // Output: true
console.log(buddy instanceof Object);  // Output: true
```

### `isPrototypeOf()`

```js
console.log(Dog.prototype.isPrototypeOf(buddy));     // Output: true
console.log(Animal.prototype.isPrototypeOf(buddy));  // Output: true
console.log(Object.prototype.isPrototypeOf(buddy));  // Output: true
```

### `Object.getPrototypeOf()`

```js
console.log(Object.getPrototypeOf(buddy) === Dog.prototype);    // Output: true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // Output: true
```

---

## Prototype Methods Overview (Object.prototype)

Every object inherits these from `Object.prototype`:

```js
const obj = { name: "Ankit", age: 20 };

// toString() — converts to string
console.log(obj.toString());  // Output: [object Object]

// valueOf() — returns the primitive value
console.log(obj.valueOf());  // Output: { name: "Ankit", age: 20 }

// hasOwnProperty() — checks if property is own
console.log(obj.hasOwnProperty("name"));  // Output: true

// isPrototypeOf() — checks prototype chain
console.log(Object.prototype.isPrototypeOf(obj));  // Output: true

// propertyIsEnumerable()
console.log(obj.propertyIsEnumerable("name"));  // Output: true
```

### Customizing `toString()`:

```js
function Money(amount, currency) {
  this.amount = amount;
  this.currency = currency;
}

// Override toString() for your own type:
Money.prototype.toString = function() {
  return `${this.currency} ${this.amount.toFixed(2)}`;
};

const price = new Money(49.99, "₹");
console.log(price.toString());  // Output: ₹ 49.99
console.log(`Price: ${price}`); // Output: Price: ₹ 49.99  (toString auto-called)
```

---

## Prototype with ES6 Classes — Under the Hood

Classes are just **syntactic sugar** over prototypes:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }

  static create(name) {
    return new User(name);
  }
}

// What the class ACTUALLY does behind the scenes:
/*
function User(name) {
  this.name = name;
}

User.prototype.greet = function() {
  console.log(`Hi, I'm ${this.name}`);
};

User.create = function(name) {     // static → directly on the function
  return new User(name);
};
*/

// Proof:
console.log(typeof User);                         // Output: function
console.log(User.prototype.greet);                 // Output: [Function: greet]
console.log(User.prototype.constructor === User);  // Output: true

const u = new User("Ankit");
console.log(u.__proto__ === User.prototype);       // Output: true
```

### Class Inheritance = Prototype Chain:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name} eats`);
  }
}

class Dog extends Animal {
  bark() {
    console.log(`${this.name} barks`);
  }
}

const d = new Dog("Rex");

// Class inheritance is prototype chain:
console.log(d.__proto__ === Dog.prototype);                   // Output: true
console.log(Dog.prototype.__proto__ === Animal.prototype);    // Output: true
console.log(Animal.prototype.__proto__ === Object.prototype); // Output: true
```

---

## Performance: Where to Put Things

```js
// ❌ BAD: Method inside constructor (duplicated per instance)
function BadUser(name) {
  this.name = name;
  this.greet = function() {     // EACH object gets its OWN copy
    return `Hi, I'm ${this.name}`;
  };
}

const a = new BadUser("A");
const b = new BadUser("B");
console.log(a.greet === b.greet);  // Output: false  (two copies in memory!)

// ✅ GOOD: Method on prototype (shared by all instances)
function GoodUser(name) {
  this.name = name;
}

GoodUser.prototype.greet = function() {   // ONE copy, shared by all
  return `Hi, I'm ${this.name}`;
};

const c = new GoodUser("C");
const d = new GoodUser("D");
console.log(c.greet === d.greet);  // Output: true  (same function! memory efficient)
```

### What Goes Where:

| Where            | What to Put                              | Why                          |
|------------------|------------------------------------------|------------------------------|
| Constructor body | Instance properties (`this.name = ...`)  | Unique to each object        |
| `.prototype`     | Methods (`greet`, `toString`)            | Shared by all instances      |
| Static           | Utility functions (`User.create()`)      | Not tied to any instance     |

---

## Real-World Example: Event Emitter

```js
function EventEmitter() {
  this.events = {};
}

EventEmitter.prototype.on = function(event, listener) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(listener);
  return this;
};

EventEmitter.prototype.emit = function(event, ...args) {
  if (this.events[event]) {
    this.events[event].forEach(listener => listener(...args));
  }
  return this;
};

EventEmitter.prototype.off = function(event, listener) {
  if (this.events[event]) {
    this.events[event] = this.events[event].filter(l => l !== listener);
  }
  return this;
};

// Usage:
const emitter = new EventEmitter();

function onMessage(msg) {
  console.log(`Received: ${msg}`);
}

emitter.on("message", onMessage);
emitter.on("message", (msg) => console.log(`Also got: ${msg}`));

emitter.emit("message", "Hello!");
// Output:
// Received: Hello!
// Also got: Hello!

emitter.off("message", onMessage);
emitter.emit("message", "Hi again!");
// Output:
// Also got: Hi again!  (first listener was removed)
```

---

## Quick Summary

| Concept                      | Description                                                    |
|------------------------------|----------------------------------------------------------------|
| Prototype                    | A parent object that other objects inherit from                |
| `__proto__`                  | The link from an object to its prototype (every object has it) |
| `.prototype`                 | Property on functions — becomes `__proto__` of instances       |
| Prototype chain              | Object → Prototype → Prototype's Prototype → ... → null       |
| `Object.create(proto)`       | Creates object with custom prototype                           |
| `Object.getPrototypeOf()`    | Gets an object's prototype (preferred over `__proto__`)        |
| `hasOwnProperty()`          | Checks if property belongs to the object (not inherited)       |
| `instanceof`                | Checks if an object is in a constructor's prototype chain      |
| Property shadowing           | Object's own property hides the same-named prototype property  |
| Constructor property         | `prototype.constructor` points back to the constructor function|
| Classes                      | Syntactic sugar over prototypes — same mechanism underneath    |

---

> **Key Takeaways**:
> 1. **Everything** in JS is connected through the **prototype chain** — it's how inheritance works
> 2. `__proto__` = the link (on objects), `.prototype` = the blueprint (on functions)
> 3. Use `Object.getPrototypeOf()` instead of `__proto__`
> 4. Put **methods on the prototype**, not inside constructors — saves memory
> 5. `Object.create()` is the purest way to do prototypal inheritance
> 6. **Classes are just syntactic sugar** — under the hood, it's all prototypes
> 7. The chain always ends at `Object.prototype → null` 🎯
