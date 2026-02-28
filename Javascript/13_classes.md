# Classes in JavaScript

## What is a Class?

A **class** is a **blueprint** for creating objects. Think of it like a **cookie cutter** — the class is the cutter, and each object you create is a cookie. Every cookie has the same shape, but can have different decorations (values).

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age}`);
  }
}

const ankit = new Person("Ankit", 20);
const rahul = new Person("Rahul", 22);

ankit.greet();  // Output: Hi, I'm Ankit and I'm 20
rahul.greet();  // Output: Hi, I'm Rahul and I'm 22
```

> **Important**: Classes are just **syntactic sugar** over prototypes. Under the hood, it's the same old prototype-based inheritance.

---

## Class Syntax Breakdown

```js
class ClassName {
  // 1. Constructor — runs when you do `new ClassName()`
  constructor(param1, param2) {
    this.prop1 = param1;  // instance property
    this.prop2 = param2;
  }

  // 2. Methods — shared by all instances (on the prototype)
  method1() {
    // ...
  }

  // 3. Getter
  get something() {
    return this.prop1;
  }

  // 4. Setter
  set something(value) {
    this.prop1 = value;
  }

  // 5. Static method — called on the class, NOT on instances
  static helperMethod() {
    // ...
  }
}
```

---

## The `constructor` Method

The `constructor` is a special method that runs **automatically** when you create a new object with `new`. It sets up the object's properties.

```js
class Car {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.speed = 0;  // default value
  }

  accelerate(amount) {
    this.speed += amount;
    console.log(`${this.brand} going at ${this.speed} km/h`);
  }
}

const car = new Car("Toyota", "Camry", 2024);
console.log(car.brand);  // Output: Toyota
console.log(car.speed);  // Output: 0

car.accelerate(60);   // Output: Toyota going at 60 km/h
car.accelerate(40);   // Output: Toyota going at 100 km/h
```

### Rules:
- A class can have **only ONE** constructor
- If you don't write one, JavaScript adds an empty one automatically
- `constructor` returns `this` automatically (don't manually return stuff)

```js
class Simple {
  // No constructor written — JS adds: constructor() {}
}

const s = new Simple();
console.log(s);  // Output: Simple {}
```

---

## Class Methods

Methods defined in a class are placed on the **prototype** — they're shared by all instances (memory efficient).

```js
class Calculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(n) {
    this.value += n;
    return this;  // for chaining
  }

  subtract(n) {
    this.value -= n;
    return this;
  }

  multiply(n) {
    this.value *= n;
    return this;
  }

  reset() {
    this.value = 0;
    return this;
  }

  result() {
    return this.value;
  }
}

const calc = new Calculator(10);
const answer = calc.add(5).multiply(2).subtract(3).result();
console.log(answer);  // Output: 27  →  (10 + 5) * 2 - 3

// Methods are on the prototype:
console.log(calc.__proto__ === Calculator.prototype);    // Output: true
console.log(typeof Calculator.prototype.add);            // Output: function
```

---

## Class Fields (Properties Without Constructor)

You can declare properties **directly in the class body** without the constructor. These are called **class fields** (ES2022).

```js
class User {
  // Class fields — set on each instance
  role = "user";
  isActive = true;
  loginCount = 0;

  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  login() {
    this.loginCount++;
    console.log(`${this.name} logged in (${this.loginCount} times)`);
  }
}

const u = new User("Ankit", "ankit@mail.com");
console.log(u.role);      // Output: user
console.log(u.isActive);  // Output: true

u.login();  // Output: Ankit logged in (1 times)
u.login();  // Output: Ankit logged in (2 times)
```

---

## Private Fields and Methods (`#`)

Use `#` prefix to make properties and methods **truly private** — they can't be accessed from outside the class.

```js
class BankAccount {
  #balance;        // private field
  #pin;            // private field

  constructor(owner, balance, pin) {
    this.owner = owner;
    this.#balance = balance;
    this.#pin = pin;
  }

  // Public method
  deposit(amount) {
    if (amount <= 0) {
      console.log("Invalid amount");
      return;
    }
    this.#balance += amount;
    console.log(`Deposited ₹${amount}. New balance: ₹${this.#balance}`);
  }

  // Public method that uses private method
  withdraw(amount, pin) {
    if (!this.#verifyPin(pin)) {
      console.log("Wrong PIN!");
      return;
    }
    if (amount > this.#balance) {
      console.log("Insufficient funds!");
      return;
    }
    this.#balance -= amount;
    console.log(`Withdrew ₹${amount}. Remaining: ₹${this.#balance}`);
  }

  // Private method
  #verifyPin(pin) {
    return this.#pin === pin;
  }

  getBalance(pin) {
    if (!this.#verifyPin(pin)) return "Wrong PIN!";
    return `₹${this.#balance}`;
  }
}

const account = new BankAccount("Ankit", 10000, 1234);

account.deposit(5000);           // Output: Deposited ₹5000. New balance: ₹15000
account.withdraw(3000, 1234);    // Output: Withdrew ₹3000. Remaining: ₹12000
account.withdraw(1000, 9999);    // Output: Wrong PIN!
console.log(account.getBalance(1234));  // Output: ₹12000

// Trying to access private fields:
// console.log(account.#balance);  // ❌ SyntaxError: Private field
// console.log(account.#pin);      // ❌ SyntaxError: Private field
// account.#verifyPin(1234);       // ❌ SyntaxError: Private method

// They don't show up anywhere:
console.log(Object.keys(account));       // Output: ["owner"]
console.log(account.hasOwnProperty("#balance"));  // Output: false
```

---

## Getters and Setters

**Getters** let you access a method like a property. **Setters** let you set a value with validation.

```js
class Circle {
  constructor(radius) {
    this.radius = radius;  // triggers the setter
  }

  // Getter — access like a property
  get area() {
    return Math.PI * this.radius ** 2;
  }

  get circumference() {
    return 2 * Math.PI * this.radius;
  }

  get diameter() {
    return this.radius * 2;
  }

  // Setter — validates before setting
  set diameter(d) {
    this.radius = d / 2;
  }

  // Setter with validation
  set radius(value) {
    if (value < 0) {
      throw new Error("Radius cannot be negative!");
    }
    this._radius = value;  // use _radius to avoid infinite loop
  }

  get radius() {
    return this._radius;
  }
}

const c = new Circle(5);

// Use getters like properties (no parentheses!)
console.log(c.area);           // Output: 78.53981633974483
console.log(c.circumference);  // Output: 31.41592653589793
console.log(c.diameter);       // Output: 10

// Setter
c.diameter = 20;               // sets radius to 10
console.log(c.radius);         // Output: 10
console.log(c.area.toFixed(2)); // Output: 314.16

// Validation:
// const bad = new Circle(-5);  // ❌ Error: Radius cannot be negative!
```

---

## Static Methods and Properties

**Static** members belong to the **class itself**, not to instances. You call them on the class name.

```js
class MathHelper {
  // Static properties
  static PI = 3.14159265;
  static E = 2.71828182;

  // Static methods
  static add(a, b) {
    return a + b;
  }

  static random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
}

// Call on the CLASS, not on instances:
console.log(MathHelper.PI);             // Output: 3.14159265
console.log(MathHelper.add(5, 3));      // Output: 8
console.log(MathHelper.random(1, 10));  // Output: (random number 1-10)
console.log(MathHelper.clamp(15, 0, 10)); // Output: 10

// ❌ Can't use on instances:
// const m = new MathHelper();
// m.add(5, 3);  // Error: m.add is not a function
```

### Common Use: Factory Methods

```js
class User {
  constructor(name, role, active) {
    this.name = name;
    this.role = role;
    this.active = active;
  }

  // Static factory methods — alternative ways to create objects
  static createAdmin(name) {
    return new User(name, "admin", true);
  }

  static createGuest() {
    return new User("Guest", "guest", false);
  }

  static fromJSON(json) {
    const data = JSON.parse(json);
    return new User(data.name, data.role, data.active);
  }

  describe() {
    console.log(`${this.name} (${this.role}) - ${this.active ? "Active" : "Inactive"}`);
  }
}

const admin = User.createAdmin("Ankit");
const guest = User.createGuest();
const fromData = User.fromJSON('{"name":"Rahul","role":"editor","active":true}');

admin.describe();    // Output: Ankit (admin) - Active
guest.describe();    // Output: Guest (guest) - Inactive
fromData.describe(); // Output: Rahul (editor) - Active
```

### Static Blocks (ES2022)

Run code once when the class is defined — useful for complex static initialization:

```js
class Config {
  static settings;

  static {
    // This runs ONCE when the class is first loaded
    console.log("Initializing Config...");
    Config.settings = {
      theme: "dark",
      language: "en",
      debug: false
    };
  }
}

// Output: Initializing Config...  (runs automatically)
console.log(Config.settings.theme);  // Output: dark
```

---

## Inheritance with `extends`

Use `extends` to create a **child class** that inherits from a **parent class**.

```js
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    console.log(`${this.name} says ${this.sound}!`);
  }

  eat(food) {
    console.log(`${this.name} is eating ${food}`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "Woof");  // Call parent's constructor
    this.tricks = [];
  }

  fetch(item) {
    console.log(`${this.name} fetches the ${item}!`);
  }

  learnTrick(trick) {
    this.tricks.push(trick);
    console.log(`${this.name} learned: ${trick}`);
  }

  showTricks() {
    console.log(`${this.name}'s tricks: ${this.tricks.join(", ") || "none yet"}`);
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name, "Meow");
  }

  purr() {
    console.log(`${this.name} is purring... 🐱`);
  }
}

const dog = new Dog("Buddy");
dog.speak();            // Output: Buddy says Woof!  (inherited)
dog.eat("bone");        // Output: Buddy is eating bone  (inherited)
dog.fetch("ball");      // Output: Buddy fetches the ball!  (own method)
dog.learnTrick("sit");  // Output: Buddy learned: sit
dog.learnTrick("roll"); // Output: Buddy learned: roll
dog.showTricks();       // Output: Buddy's tricks: sit, roll

const cat = new Cat("Whiskers");
cat.speak();   // Output: Whiskers says Meow!  (inherited)
cat.purr();    // Output: Whiskers is purring... 🐱

console.log(dog instanceof Dog);    // Output: true
console.log(dog instanceof Animal); // Output: true
console.log(cat instanceof Dog);    // Output: false
```

---

## The `super` Keyword

`super` is used to **call the parent class's constructor or methods**.

### `super()` in Constructor

You **must** call `super()` before using `this` in a child class constructor:

```js
class Shape {
  constructor(color) {
    this.color = color;
  }
}

class Rectangle extends Shape {
  constructor(color, width, height) {
    super(color);  // ← Must call FIRST, before using `this`
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

const rect = new Rectangle("blue", 10, 5);
console.log(rect.color);   // Output: blue  (set by parent)
console.log(rect.area());  // Output: 50
```

```js
// ❌ What happens without super():
class Bad extends Shape {
  constructor(color) {
    // this.color = color;
    // ❌ ReferenceError: Must call super constructor before accessing 'this'
  }
}
```

### `super.method()` — Calling Parent Methods

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }

  toString() {
    return `Animal: ${this.name}`;
  }
}

class Dog extends Animal {
  speak() {
    // Call parent's speak() and extend it:
    const parentMessage = super.speak();
    return `${parentMessage}... Woof! Woof!`;
  }

  toString() {
    return `Dog -> ${super.toString()}`;
  }
}

const dog = new Dog("Buddy");
console.log(dog.speak());     // Output: Buddy makes a sound... Woof! Woof!
console.log(dog.toString());  // Output: Dog -> Animal: Buddy
```

---

## Method Overriding

A child class can **replace** a parent's method with its own version:

```js
class Notification {
  constructor(message) {
    this.message = message;
    this.date = new Date();
  }

  send() {
    console.log(`[Notification] ${this.message}`);
  }

  format() {
    return `${this.date.toLocaleDateString()}: ${this.message}`;
  }
}

class EmailNotification extends Notification {
  constructor(message, to) {
    super(message);
    this.to = to;
  }

  // Override send() completely
  send() {
    console.log(`📧 Email to ${this.to}: ${this.message}`);
  }
}

class SMSNotification extends Notification {
  constructor(message, phone) {
    super(message);
    this.phone = phone;
  }

  // Override send() but also call parent's version
  send() {
    super.send();  // Log the generic notification
    console.log(`📱 SMS to ${this.phone}: ${this.message}`);
  }
}

const email = new EmailNotification("Your order shipped!", "ankit@mail.com");
email.send();
// Output: 📧 Email to ankit@mail.com: Your order shipped!

const sms = new SMSNotification("OTP is 4321", "+91-9999999999");
sms.send();
// Output:
// [Notification] OTP is 4321
// 📱 SMS to +91-9999999999: OTP is 4321
```

---

## Polymorphism

**Polymorphism** means different classes can be used the same way — each class responds differently to the same method call.

```js
class Shape {
  area() {
    return 0;
  }

  describe() {
    console.log(`This shape has an area of ${this.area().toFixed(2)}`);
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

class Triangle extends Shape {
  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }

  area() {
    return 0.5 * this.base * this.height;
  }
}

// Same method, different behavior:
const shapes = [
  new Circle(5),
  new Rectangle(10, 4),
  new Triangle(6, 8)
];

shapes.forEach(shape => shape.describe());
// Output:
// This shape has an area of 78.54
// This shape has an area of 40.00
// This shape has an area of 24.00

// Calculate total area:
const totalArea = shapes.reduce((sum, shape) => sum + shape.area(), 0);
console.log(`Total area: ${totalArea.toFixed(2)}`);  // Output: Total area: 142.54
```

---

## Mixins — Adding Functionality from Multiple Sources

JavaScript doesn't support multiple inheritance (a class can only extend ONE class). But **mixins** let you combine functionality:

```js
// Mixin 1: Serializable behavior
const Serializable = (Base) => class extends Base {
  toJSON() {
    return JSON.stringify(this);
  }

  static fromJSON(json) {
    return Object.assign(new this(), JSON.parse(json));
  }
};

// Mixin 2: Timestamped behavior
const Timestamped = (Base) => class extends Base {
  constructor(...args) {
    super(...args);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  touch() {
    this.updatedAt = new Date();
  }
};

// Mixin 3: Validatable behavior
const Validatable = (Base) => class extends Base {
  validate() {
    for (let [key, value] of Object.entries(this)) {
      if (value === null || value === undefined || value === "") {
        throw new Error(`${key} cannot be empty!`);
      }
    }
    return true;
  }
};

// Combine all mixins:
class User extends Serializable(Timestamped(Validatable(Object))) {
  constructor(name, email) {
    super();
    this.name = name;
    this.email = email;
  }
}

const user = new User("Ankit", "ankit@mail.com");

// From Timestamped:
console.log(user.createdAt);  // Output: 2026-03-01T...

// From Serializable:
console.log(user.toJSON());
// Output: {"name":"Ankit","email":"ankit@mail.com","createdAt":"...","updatedAt":"..."}

// From Validatable:
console.log(user.validate());  // Output: true

const badUser = new User("", "");
// badUser.validate();  // ❌ Error: name cannot be empty!
```

### Simple Mixin with `Object.assign`:

```js
const canFly = {
  fly() {
    console.log(`${this.name} is flying!`);
  }
};

const canSwim = {
  swim() {
    console.log(`${this.name} is swimming!`);
  }
};

const canWalk = {
  walk() {
    console.log(`${this.name} is walking!`);
  }
};

class Duck {
  constructor(name) {
    this.name = name;
  }
}

// Mix abilities into Duck's prototype:
Object.assign(Duck.prototype, canFly, canSwim, canWalk);

const donald = new Duck("Donald");
donald.fly();   // Output: Donald is flying!
donald.swim();  // Output: Donald is swimming!
donald.walk();  // Output: Donald is walking!
```

---

## `instanceof` and Type Checking

```js
class Vehicle {
  constructor(type) {
    this.type = type;
  }
}

class Car extends Vehicle {
  constructor() {
    super("car");
  }
}

class ElectricCar extends Car {
  constructor() {
    super();
    this.battery = 100;
  }
}

const tesla = new ElectricCar();

console.log(tesla instanceof ElectricCar); // Output: true
console.log(tesla instanceof Car);         // Output: true
console.log(tesla instanceof Vehicle);     // Output: true
console.log(tesla instanceof Object);      // Output: true

// Check exact class:
console.log(tesla.constructor === ElectricCar);  // Output: true
console.log(tesla.constructor.name);             // Output: ElectricCar
```

---

## Abstract-like Classes

JavaScript doesn't have `abstract` classes natively, but you can simulate them:

```js
class AbstractShape {
  constructor() {
    if (new.target === AbstractShape) {
      throw new Error("Cannot instantiate AbstractShape directly!");
    }
  }

  // "Abstract" method — forces child to implement
  area() {
    throw new Error("area() must be implemented by subclass!");
  }

  // "Abstract" method
  perimeter() {
    throw new Error("perimeter() must be implemented by subclass!");
  }

  // Concrete method (shared by all children)
  describe() {
    console.log(`Area: ${this.area().toFixed(2)}, Perimeter: ${this.perimeter().toFixed(2)}`);
  }
}

// const s = new AbstractShape();  // ❌ Error: Cannot instantiate AbstractShape directly!

class Square extends AbstractShape {
  constructor(side) {
    super();
    this.side = side;
  }

  area() {
    return this.side ** 2;
  }

  perimeter() {
    return 4 * this.side;
  }
}

const sq = new Square(5);
sq.describe();  // Output: Area: 25.00, Perimeter: 20.00
```

---

## Class Expressions

Just like function expressions, classes can be **expressions** — stored in variables:

```js
// Named class expression
const MyClass = class NamedClass {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }
};

const obj = new MyClass(42);
console.log(obj.getValue());        // Output: 42
console.log(MyClass.name);          // Output: NamedClass
// console.log(new NamedClass(42)); // ❌ Error: NamedClass is not defined (outside)

// Anonymous class expression
const AnotherClass = class {
  greet() {
    return "Hello!";
  }
};

console.log(new AnotherClass().greet());  // Output: Hello!
```

### Returning Classes from Functions:

```js
function createClass(greeting) {
  return class {
    greet() {
      console.log(greeting);
    }
  };
}

const HelloClass = createClass("Hello, World!");
const HiClass = createClass("Hi there!");

new HelloClass().greet();  // Output: Hello, World!
new HiClass().greet();     // Output: Hi there!
```

---

## Classes vs Constructor Functions — Side by Side

```js
// === CLASS ===
class PersonClass {
  #id;  // private

  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.#id = Math.random();
  }

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }

  static create(name, age) {
    return new PersonClass(name, age);
  }
}

// === CONSTRUCTOR FUNCTION (equivalent) ===
function PersonFunc(name, age) {
  this.name = name;
  this.age = age;
  // No easy way to do private fields without closures/WeakMap
}

PersonFunc.prototype.greet = function() {
  console.log(`Hi, I'm ${this.name}`);
};

PersonFunc.create = function(name, age) {
  return new PersonFunc(name, age);
};
```

### Key Differences:

| Feature                   | Class                          | Constructor Function          |
|---------------------------|--------------------------------|-------------------------------|
| Syntax                    | Clean, organized               | Spread across multiple lines  |
| Hoisting                  | ❌ NOT hoisted                 | ✅ Hoisted (declarations)     |
| Private fields (`#`)      | ✅ Built-in                    | ❌ Needs workarounds          |
| `new` required            | ✅ Enforced automatically      | ⚠️ Optional (can forget)     |
| `strict mode`             | ✅ Always in strict mode       | ❌ Not by default             |
| Methods enumerable        | ❌ Non-enumerable              | ✅ Enumerable                 |
| `super` keyword           | ✅ Available                   | ❌ Not available              |

```js
// Class is NOT hoisted:
// const p = new Person("Ankit");  // ❌ ReferenceError!
// class Person { ... }

// Constructor function IS hoisted:
const p = new PersonFunc("Ankit");  // ✅ Works!
function PersonFunc(name) {
  this.name = name;
}

// Class forces new:
// PersonClass("Ankit");  // ❌ TypeError: Cannot call a class as a function

// Constructor doesn't:
PersonFunc("Ankit");  // ⚠️ No error, but `this` becomes window/undefined
```

---

## Iterating a Class — Making a Class Iterable

You can make your class work with `for...of` by implementing `Symbol.iterator`:

```js
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
}

const range = new Range(1, 5);

for (const num of range) {
  console.log(num);
}
// Output: 1  2  3  4  5

// Also works with spread:
console.log([...new Range(3, 7)]);  // Output: [3, 4, 5, 6, 7]

// And destructuring:
const [a, b, c] = new Range(10, 15);
console.log(a, b, c);  // Output: 10 11 12
```

---

## Real-World Example: Todo List

```js
class Todo {
  #id;
  #completed;

  constructor(title) {
    this.#id = Date.now() + Math.random();
    this.title = title;
    this.#completed = false;
    this.createdAt = new Date();
  }

  get id() {
    return this.#id;
  }

  get completed() {
    return this.#completed;
  }

  toggle() {
    this.#completed = !this.#completed;
    return this;
  }

  toString() {
    return `${this.#completed ? "✅" : "⬜"} ${this.title}`;
  }
}

class TodoList {
  #todos = [];

  add(title) {
    const todo = new Todo(title);
    this.#todos.push(todo);
    console.log(`Added: ${title}`);
    return todo;
  }

  remove(id) {
    this.#todos = this.#todos.filter(t => t.id !== id);
  }

  toggle(id) {
    const todo = this.#todos.find(t => t.id === id);
    if (todo) todo.toggle();
  }

  get pending() {
    return this.#todos.filter(t => !t.completed);
  }

  get done() {
    return this.#todos.filter(t => t.completed);
  }

  get count() {
    return {
      total: this.#todos.length,
      pending: this.pending.length,
      done: this.done.length
    };
  }

  display() {
    console.log("\n📋 Todo List:");
    console.log("─".repeat(30));
    if (this.#todos.length === 0) {
      console.log("  (empty)");
    }
    this.#todos.forEach(t => console.log(`  ${t}`));
    console.log("─".repeat(30));
    const c = this.count;
    console.log(`  Total: ${c.total} | Done: ${c.done} | Pending: ${c.pending}\n`);
  }
}

// Usage:
const list = new TodoList();

const t1 = list.add("Learn JavaScript");   // Output: Added: Learn JavaScript
const t2 = list.add("Build a project");    // Output: Added: Build a project
const t3 = list.add("Get a job");          // Output: Added: Get a job

list.toggle(t1.id);  // mark as done

list.display();
// Output:
// 📋 Todo List:
// ──────────────────────────────
//   ✅ Learn JavaScript
//   ⬜ Build a project
//   ⬜ Get a job
// ──────────────────────────────
//   Total: 3 | Done: 1 | Pending: 2
```

---

## Real-World Example: Event-Driven Class

```js
class EventEmitter {
  #events = {};

  on(event, listener) {
    if (!this.#events[event]) this.#events[event] = [];
    this.#events[event].push(listener);
    return this;
  }

  off(event, listener) {
    if (this.#events[event]) {
      this.#events[event] = this.#events[event].filter(l => l !== listener);
    }
    return this;
  }

  emit(event, ...args) {
    if (this.#events[event]) {
      this.#events[event].forEach(l => l(...args));
    }
    return this;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }
}

// A Chat class that uses events:
class Chat extends EventEmitter {
  #messages = [];

  send(user, text) {
    const message = { user, text, time: new Date() };
    this.#messages.push(message);
    this.emit("message", message);
  }

  get history() {
    return this.#messages;
  }
}

const chat = new Chat();

chat.on("message", (msg) => {
  console.log(`[${msg.user}]: ${msg.text}`);
});

chat.once("message", () => {
  console.log("(First message received!)");
});

chat.send("Ankit", "Hello everyone!");
// Output:
// [Ankit]: Hello everyone!
// (First message received!)

chat.send("Rahul", "Hey Ankit!");
// Output:
// [Rahul]: Hey Ankit!
// (no "first message" — once() ran only once)
```

---

## Quick Summary

| Concept                | Description                                                    |
|------------------------|----------------------------------------------------------------|
| `class`                | Blueprint for creating objects (syntactic sugar over prototypes)|
| `constructor()`        | Special method that runs on `new` — sets up properties         |
| Methods                | Functions on the prototype — shared by all instances           |
| Class fields           | Properties declared directly in class body (ES2022)            |
| Private `#`            | Truly private — can't be accessed outside the class            |
| `get` / `set`          | Access methods like properties, with optional validation       |
| `static`               | Belongs to the class, not instances (`Class.method()`)         |
| `extends`              | Create child class that inherits from parent                   |
| `super`                | Call parent's constructor (`super()`) or methods (`super.method()`) |
| Method overriding      | Child replaces parent's method with its own                    |
| Polymorphism           | Different classes, same interface, different behavior          |
| Mixins                 | Combine functionality from multiple sources                    |
| `instanceof`           | Check if object belongs to a class's chain                     |
| Abstract classes       | Simulated with `new.target` and error-throwing methods         |
| Class expressions      | Classes stored in variables or returned from functions         |
| `Symbol.iterator`      | Make a class iterable with `for...of`                          |

---

> **Key Takeaways**:
> 1. Classes are **blueprints** — use `new ClassName()` to create objects
> 2. The `constructor` runs **automatically** — set up properties there
> 3. Methods go on the **prototype** — shared and memory efficient
> 4. Use `#` for **truly private** fields and methods
> 5. `extends` + `super` for **inheritance** — child gets everything from parent
> 6. `static` methods belong to the **class itself**, not instances
> 7. Classes are just **syntactic sugar** — prototypes under the hood 🎯
