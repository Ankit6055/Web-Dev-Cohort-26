# Object-Oriented Programming (OOP) in JavaScript

## What is OOP?

OOP is a way of organizing your code by grouping related **data** (properties) and **behavior** (methods) into **objects**. Think of it like the real world — everything is an object. A car has properties (color, speed) and behaviors (drive, brake). OOP lets you model your code the same way.

```js
// Without OOP — scattered data and functions
let playerName = "Ankit";
let playerHealth = 100;
let playerScore = 0;

function takeDamage(amount) {
  playerHealth -= amount;
}

// With OOP — everything organized inside an object
class Player {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.score = 0;
  }

  takeDamage(amount) {
    this.health -= amount;
    console.log(`${this.name} took ${amount} damage. Health: ${this.health}`);
  }
}

const player = new Player("Ankit");
player.takeDamage(20);  // Output: Ankit took 20 damage. Health: 80
```

---

## The 4 Pillars of OOP

OOP is built on **4 core principles**. Let's go through each one:

```
┌──────────────────────────────────────┐
│         4 Pillars of OOP             │
├──────────┬───────────┬──────────┬────┤
│ Encapsu- │ Abstrac-  │ Inheri-  │Poly│
│ lation   │ tion      │ tance    │mor-│
│          │           │          │phi-│
│ Hide     │ Show only │ Reuse    │sm  │
│ internal │ what's    │ code     │    │
│ details  │ needed    │ from     │Same│
│          │           │ parent   │name│
│          │           │          │diff│
│          │           │          │work│
└──────────┴───────────┴──────────┴────┘
```

---

## Pillar 1: Encapsulation

**Encapsulation** = **bundling data + methods together** and **hiding** the internal details. Like a TV remote — you press buttons (public interface), but don't see the circuits inside (private internals).

### Why?
- Protects data from accidental changes
- Controls how data is accessed and modified
- Makes code easier to maintain

```js
// ❌ Without Encapsulation — data is exposed and unprotected
const user = {
  name: "Ankit",
  password: "12345",  // anyone can read or change this!
  balance: 10000
};

user.balance = -999;    // ⚠️ No validation! Now balance is negative!
user.password = "";     // ⚠️ Empty password allowed!
console.log(user.password);  // ⚠️ Password visible to everyone!
```

```js
// ✅ With Encapsulation — data is protected
class BankAccount {
  #balance;       // private — can't access from outside
  #password;      // private
  #failedAttempts = 0;

  constructor(owner, balance, password) {
    this.owner = owner;
    this.#balance = balance;
    this.#password = password;
  }

  // Controlled access through methods
  deposit(amount) {
    if (amount <= 0) {
      console.log("❌ Amount must be positive");
      return;
    }
    this.#balance += amount;
    console.log(`✅ Deposited ₹${amount}. Balance: ₹${this.#balance}`);
  }

  withdraw(amount, password) {
    if (!this.#authenticate(password)) return;
    if (amount <= 0) {
      console.log("❌ Amount must be positive");
      return;
    }
    if (amount > this.#balance) {
      console.log("❌ Insufficient funds");
      return;
    }
    this.#balance -= amount;
    console.log(`✅ Withdrew ₹${amount}. Balance: ₹${this.#balance}`);
  }

  // Getter — controlled read access
  get balance() {
    return `₹${this.#balance}`;
  }

  // Private method — internal logic hidden
  #authenticate(password) {
    if (this.#failedAttempts >= 3) {
      console.log("🔒 Account locked! Too many failed attempts.");
      return false;
    }
    if (password !== this.#password) {
      this.#failedAttempts++;
      console.log(`❌ Wrong password! (${3 - this.#failedAttempts} attempts left)`);
      return false;
    }
    this.#failedAttempts = 0;
    return true;
  }
}

const account = new BankAccount("Ankit", 10000, "secret123");

account.deposit(5000);                // Output: ✅ Deposited ₹5000. Balance: ₹15000
account.withdraw(3000, "secret123");  // Output: ✅ Withdrew ₹3000. Balance: ₹12000
account.withdraw(1000, "wrong");      // Output: ❌ Wrong password! (2 attempts left)

console.log(account.balance);         // Output: ₹12000  (getter — controlled access)
// console.log(account.#balance);     // ❌ SyntaxError: Private field
// console.log(account.#password);    // ❌ SyntaxError: Private field
// account.#authenticate("x");        // ❌ SyntaxError: Private method
```

### Encapsulation Levels:

| Level     | How                          | Access                        |
|-----------|------------------------------|-------------------------------|
| Public    | `this.name = ...`            | Anywhere                      |
| Private   | `#name`                      | Only inside the class         |
| Protected | Convention: `_name`          | "Please don't touch" (not enforced) |

```js
class Example {
  publicProp = "anyone can see me";     // public
  _protectedProp = "please don't touch"; // convention only — still accessible
  #privateProp = "truly hidden";         // enforced by JS engine

  show() {
    console.log(this.publicProp);      // ✅
    console.log(this._protectedProp);  // ✅
    console.log(this.#privateProp);    // ✅
  }
}

const e = new Example();
console.log(e.publicProp);      // ✅ Output: anyone can see me
console.log(e._protectedProp);  // ⚠️ Output: please don't touch (works but shouldn't)
// console.log(e.#privateProp); // ❌ SyntaxError
```

---

## Pillar 2: Abstraction

**Abstraction** = **hiding complexity** and showing only what's necessary. Like driving a car — you use the steering wheel and pedals (simple interface), but don't think about the engine, transmission, or fuel injection (complex internals).

### Why?
- Simplifies how you use an object
- Reduces complexity for the user of the code
- You can change internals without breaking external code

```js
// ❌ Without Abstraction — user deals with complexity
class NoAbstraction {
  sendHTTPRequest(url, method, headers, body) { /* ... */ }
  parseJSON(response) { /* ... */ }
  handleError(error) { /* ... */ }
  retryRequest(url, method, headers, body, retries) { /* ... */ }
  validateResponse(response) { /* ... */ }
}
// User has to know ALL these details to fetch data 😵
```

```js
// ✅ With Abstraction — simple interface, complex internals hidden
class API {
  #baseURL;
  #retries;
  #timeout;

  constructor(baseURL, options = {}) {
    this.#baseURL = baseURL;
    this.#retries = options.retries || 3;
    this.#timeout = options.timeout || 5000;
  }

  // Simple public interface:
  async get(endpoint) {
    return this.#request("GET", endpoint);
  }

  async post(endpoint, data) {
    return this.#request("POST", endpoint, data);
  }

  async put(endpoint, data) {
    return this.#request("PUT", endpoint, data);
  }

  async delete(endpoint) {
    return this.#request("DELETE", endpoint);
  }

  // Complex internals — hidden from the user:
  async #request(method, endpoint, data = null) {
    const url = `${this.#baseURL}${endpoint}`;
    let lastError;

    for (let attempt = 1; attempt <= this.#retries; attempt++) {
      try {
        const response = await this.#fetchWithTimeout(url, {
          method,
          headers: this.#getHeaders(),
          body: data ? JSON.stringify(data) : null
        });

        return this.#handleResponse(response);
      } catch (error) {
        lastError = error;
        console.log(`Attempt ${attempt} failed. Retrying...`);
        await this.#delay(1000 * attempt);  // exponential backoff
      }
    }
    throw lastError;
  }

  async #fetchWithTimeout(url, options) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.#timeout);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      return response;
    } finally {
      clearTimeout(timer);
    }
  }

  #getHeaders() {
    return { "Content-Type": "application/json" };
  }

  async #handleResponse(response) {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  #delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage — SO SIMPLE! All complexity is hidden:
const api = new API("https://api.example.com");

// const users = await api.get("/users");
// const newUser = await api.post("/users", { name: "Ankit" });
// await api.delete("/users/123");

// User doesn't know about retries, timeouts, headers, error handling...
// They just call .get(), .post(), etc.
```

### Another Example — Password Hasher:

```js
class PasswordManager {
  // Simple interface:
  hash(password) {
    const salt = this.#generateSalt();
    const hashed = this.#hashWithSalt(password, salt);
    return `${salt}:${hashed}`;
  }

  verify(password, stored) {
    const [salt, hash] = stored.split(":");
    return this.#hashWithSalt(password, salt) === hash;
  }

  // Complex internals hidden:
  #generateSalt() {
    return Math.random().toString(36).substring(2, 15);
  }

  #hashWithSalt(password, salt) {
    let hash = 0;
    const combined = salt + password;
    for (let i = 0; i < combined.length; i++) {
      hash = ((hash << 5) - hash) + combined.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }
}

const pm = new PasswordManager();
const hashed = pm.hash("myPassword123");
console.log(hashed);                        // Output: randomsalt:a1b2c3d4 (example)
console.log(pm.verify("myPassword123", hashed));  // Output: true
console.log(pm.verify("wrongPassword", hashed));  // Output: false

// User doesn't care HOW it's hashed — they just call hash() and verify()
```

### Encapsulation vs Abstraction:

| Encapsulation                               | Abstraction                                    |
|---------------------------------------------|------------------------------------------------|
| **Hides data** (private fields)             | **Hides complexity** (implementation details)  |
| "Don't touch my internal state"             | "You don't need to know how it works"          |
| Controls **access** to properties           | Provides a **simple interface**                |
| Uses `#private` fields, getters/setters     | Uses public methods that hide complex logic    |
| Protects integrity of data                  | Reduces cognitive load for the user            |

---

## Pillar 3: Inheritance

**Inheritance** = a child class **gets everything** from a parent class and can add or change things. Like how you inherit traits from your parents — you have their genes but also your own unique features.

### Why?
- **Reuse code** — don't repeat yourself
- **Organize** related classes in a hierarchy
- **Extend** existing functionality

```js
// Parent class
class Vehicle {
  #fuel;

  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.#fuel = 100;
    this.speed = 0;
  }

  start() {
    console.log(`🔑 ${this.make} ${this.model} started`);
  }

  drive(km) {
    this.#fuel -= km * 0.1;
    this.speed = Math.min(km * 2, 200);
    console.log(`🚗 Driving at ${this.speed} km/h. Fuel: ${this.#fuel.toFixed(0)}%`);
  }

  stop() {
    this.speed = 0;
    console.log(`🛑 ${this.make} ${this.model} stopped`);
  }

  get fuel() {
    return `${this.#fuel.toFixed(0)}%`;
  }

  toString() {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

// Child class — inherits everything from Vehicle
class Car extends Vehicle {
  #doors;

  constructor(make, model, year, doors = 4) {
    super(make, model, year);  // call parent's constructor
    this.#doors = doors;
  }

  honk() {
    console.log(`${this} goes BEEP BEEP! 📯`);
  }

  toString() {
    return `${super.toString()} (${this.#doors}-door)`;
  }
}

// Another child class
class Motorcycle extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.hasSidecar = false;
  }

  wheelie() {
    if (this.speed > 50) {
      console.log(`🏍️ ${this.make} is doing a wheelie!`);
    } else {
      console.log("Need more speed for a wheelie!");
    }
  }

  attachSidecar() {
    this.hasSidecar = true;
    console.log("🏍️ Sidecar attached!");
  }
}

// Grandchild class — inherits from Car which inherits from Vehicle
class ElectricCar extends Car {
  #batteryLevel;

  constructor(make, model, year) {
    super(make, model, year);
    this.#batteryLevel = 100;
  }

  charge() {
    this.#batteryLevel = 100;
    console.log(`🔋 ${this.make} fully charged!`);
  }

  // Override drive
  drive(km) {
    this.#batteryLevel -= km * 0.2;
    console.log(`⚡ Silent driving. Battery: ${this.#batteryLevel.toFixed(0)}%`);
  }
}

// Usage:
const car = new Car("Toyota", "Camry", 2024);
car.start();       // Output: 🔑 Toyota Camry started  (inherited)
car.drive(50);     // Output: 🚗 Driving at 100 km/h. Fuel: 95%  (inherited)
car.honk();        // Output: 2024 Toyota Camry (4-door) goes BEEP BEEP! 📯  (own)

const bike = new Motorcycle("Yamaha", "R15", 2023);
bike.start();      // Output: 🔑 Yamaha R15 started  (inherited)
bike.drive(80);    // Output: 🚗 Driving at 160 km/h. Fuel: 92%  (inherited)
bike.wheelie();    // Output: 🏍️ Yamaha is doing a wheelie!  (own)

const tesla = new ElectricCar("Tesla", "Model 3", 2025);
tesla.start();     // Output: 🔑 Tesla Model 3 started  (inherited from Vehicle)
tesla.drive(30);   // Output: ⚡ Silent driving. Battery: 94%  (overridden)
tesla.honk();      // Output: 2025 Tesla Model 3 (4-door) goes BEEP BEEP! 📯  (inherited from Car)
tesla.charge();    // Output: 🔋 Tesla fully charged!  (own)
```

### Inheritance Hierarchy:

```
         Vehicle
        /       \
      Car      Motorcycle
      |
  ElectricCar
```

### Types of Inheritance in JS:

| Type             | Example                       | Support     |
|------------------|-------------------------------|-------------|
| Single           | `Dog extends Animal`          | ✅ Yes      |
| Multi-level      | `ElectricCar → Car → Vehicle` | ✅ Yes      |
| Multiple         | `Dog extends Animal, Pet`     | ❌ No (use mixins) |
| Hierarchical     | `Car, Bike both extend Vehicle`| ✅ Yes     |

---

## Pillar 4: Polymorphism

**Polymorphism** = "many forms" — the same method name behaves **differently** depending on the object. Like the word "open" — you can open a door, open a file, open a browser — same word, different actions.

### Why?
- Write **flexible** code that works with different types
- Use a **common interface** for different objects
- Easy to add new types without changing existing code

### Type 1: Method Overriding (Runtime Polymorphism)

A child class provides its **own version** of a parent's method:

```js
class Payment {
  constructor(amount) {
    this.amount = amount;
  }

  process() {
    console.log(`Processing ₹${this.amount} payment...`);
  }

  receipt() {
    return `Payment of ₹${this.amount}`;
  }
}

class CreditCardPayment extends Payment {
  constructor(amount, cardNumber) {
    super(amount);
    this.cardNumber = cardNumber;
  }

  // Override process()
  process() {
    const masked = "****-" + this.cardNumber.slice(-4);
    console.log(`💳 Charging ₹${this.amount} to card ${masked}`);
  }

  receipt() {
    return `💳 ${super.receipt()} via Credit Card`;
  }
}

class UPIPayment extends Payment {
  constructor(amount, upiId) {
    super(amount);
    this.upiId = upiId;
  }

  process() {
    console.log(`📱 UPI payment of ₹${this.amount} to ${this.upiId}`);
  }

  receipt() {
    return `📱 ${super.receipt()} via UPI`;
  }
}

class CashPayment extends Payment {
  process() {
    console.log(`💵 Cash payment of ₹${this.amount} received`);
  }

  receipt() {
    return `💵 ${super.receipt()} in Cash`;
  }
}

// POLYMORPHISM IN ACTION — same method, different behavior:
const payments = [
  new CreditCardPayment(5000, "1234567890"),
  new UPIPayment(2000, "ankit@upi"),
  new CashPayment(500)
];

payments.forEach(p => {
  p.process();
  console.log(p.receipt());
  console.log("---");
});
// Output:
// 💳 Charging ₹5000 to card ****-7890
// 💳 Payment of ₹5000 via Credit Card
// ---
// 📱 UPI payment of ₹2000 to ankit@upi
// 📱 Payment of ₹2000 via UPI
// ---
// 💵 Cash payment of ₹500 received
// 💵 Payment of ₹500 in Cash
// ---

// Notice: We called .process() on all of them — each behaved differently!
// We didn't need to know WHICH payment type — polymorphism handled it.
```

### Type 2: Method Overloading (Compile-time Polymorphism)

JavaScript doesn't have true overloading, but you can **simulate** it:

```js
class Logger {
  // Simulate overloading — same method name, different parameter handling
  log(...args) {
    if (args.length === 0) {
      console.log("[LOG] Empty log");
    } else if (args.length === 1 && typeof args[0] === "string") {
      console.log(`[LOG] ${args[0]}`);
    } else if (args.length === 1 && typeof args[0] === "object") {
      console.log("[LOG]", JSON.stringify(args[0], null, 2));
    } else if (args.length === 2) {
      const [level, message] = args;
      console.log(`[${level.toUpperCase()}] ${message}`);
    } else {
      console.log("[LOG]", ...args);
    }
  }
}

const logger = new Logger();
logger.log();                          // Output: [LOG] Empty log
logger.log("Hello");                   // Output: [LOG] Hello
logger.log({ name: "Ankit", age: 20 }); // Output: [LOG] { "name": "Ankit", "age": 20 }
logger.log("error", "Something broke"); // Output: [ERROR] Something broke
logger.log(1, 2, 3);                   // Output: [LOG] 1 2 3
```

### Type 3: Duck Typing

"If it walks like a duck and quacks like a duck, it's a duck." — JavaScript doesn't care about the TYPE, only if it has the right METHODS.

```js
// These classes don't inherit from each other at all!
class Duck {
  swim() { console.log("Duck is swimming 🦆"); }
  quack() { console.log("Quack!"); }
}

class Person {
  swim() { console.log("Person is swimming 🏊"); }
  quack() { console.log("Person: Quack! (imitating)"); }
}

class RubberDuck {
  swim() { console.log("Rubber duck floating 🛁"); }
  quack() { console.log("Squeak!"); }
}

// Polymorphism via duck typing — we don't care about the type,
// only that they have swim() and quack():
function makeItSwimAndQuack(thing) {
  thing.swim();
  thing.quack();
}

makeItSwimAndQuack(new Duck());
// Output: Duck is swimming 🦆
//         Quack!

makeItSwimAndQuack(new Person());
// Output: Person is swimming 🏊
//         Person: Quack! (imitating)

makeItSwimAndQuack(new RubberDuck());
// Output: Rubber duck floating 🛁
//         Squeak!

// All 3 work even though they're completely unrelated classes!
```

---

## Composition vs Inheritance

Sometimes inheritance isn't the best choice. **Composition** = building objects by **combining** small, focused pieces instead of inheriting from a big parent.

**Rule of thumb**: "Prefer **composition** over inheritance" — a famous software design principle.

### The Problem with Inheritance:

```js
// Inheritance problem — what if a class needs abilities from multiple parents?

class Animal {
  eat() { console.log("eating"); }
}

class FlyingAnimal extends Animal {
  fly() { console.log("flying"); }
}

class SwimmingAnimal extends Animal {
  swim() { console.log("swimming"); }
}

// A duck can fly AND swim... which one does it extend? 🤔
// class Duck extends FlyingAnimal, SwimmingAnimal {}  // ❌ Not possible!
```

### The Solution with Composition:

```js
// Define abilities as independent functions:
const canEat = (state) => ({
  eat() {
    state.energy += 10;
    console.log(`${state.name} is eating. Energy: ${state.energy}`);
  }
});

const canFly = (state) => ({
  fly() {
    state.energy -= 20;
    console.log(`${state.name} is flying! Energy: ${state.energy}`);
  }
});

const canSwim = (state) => ({
  swim() {
    state.energy -= 10;
    console.log(`${state.name} is swimming! Energy: ${state.energy}`);
  }
});

const canBark = (state) => ({
  bark() {
    console.log(`${state.name} says Woof!`);
  }
});

// Compose objects by mixing abilities:
function createDuck(name) {
  const state = { name, energy: 100 };
  return Object.assign(state, canEat(state), canFly(state), canSwim(state));
}

function createDog(name) {
  const state = { name, energy: 100 };
  return Object.assign(state, canEat(state), canSwim(state), canBark(state));
}

function createFish(name) {
  const state = { name, energy: 100 };
  return Object.assign(state, canEat(state), canSwim(state));
}

// Usage:
const duck = createDuck("Donald");
duck.eat();   // Output: Donald is eating. Energy: 110
duck.fly();   // Output: Donald is flying! Energy: 90
duck.swim();  // Output: Donald is swimming! Energy: 80

const dog = createDog("Buddy");
dog.eat();    // Output: Buddy is eating. Energy: 110
dog.bark();   // Output: Buddy says Woof!
dog.swim();   // Output: Buddy is swimming! Energy: 100
// dog.fly(); // ❌ TypeError: not a function (dogs can't fly!)

const fish = createFish("Nemo");
fish.eat();   // Output: Nemo is eating. Energy: 110
fish.swim();  // Output: Nemo is swimming! Energy: 100
// fish.fly();  // ❌ (fish can't fly)
// fish.bark(); // ❌ (fish can't bark)
```

### When to Use What:

| Use Inheritance When...                     | Use Composition When...                     |
|---------------------------------------------|---------------------------------------------|
| There's a clear "**is-a**" relationship     | There's a "**has-a**" or "**can-do**" relationship |
| `Dog` **is an** `Animal`                    | `Car` **has an** `Engine`                   |
| Child truly IS a type of parent             | Object just USES the functionality          |
| You want to reuse a big chunk of behavior   | You want to mix-and-match small behaviors   |
| Hierarchy is shallow (1-2 levels)           | Hierarchy would be deep/complex             |

---

## SOLID Principles (Bonus — Good OOP Practices)

### S — Single Responsibility Principle

A class should do **ONE thing** and do it well.

```js
// ❌ BAD — one class does everything
class UserManager {
  createUser(name) { /* ... */ }
  deleteUser(id) { /* ... */ }
  sendEmail(to, subject) { /* ... */ }      // ❌ Not user management!
  generateReport() { /* ... */ }             // ❌ Not user management!
  connectToDatabase() { /* ... */ }          // ❌ Not user management!
}

// ✅ GOOD — each class has one responsibility
class UserService {
  createUser(name) { /* ... */ }
  deleteUser(id) { /* ... */ }
}

class EmailService {
  sendEmail(to, subject) { /* ... */ }
}

class ReportGenerator {
  generateReport(data) { /* ... */ }
}
```

### O — Open/Closed Principle

Classes should be **open for extension** but **closed for modification**.

```js
// ❌ BAD — have to modify the class every time you add a new shape
class AreaCalculator {
  calculate(shape) {
    if (shape.type === "circle") {
      return Math.PI * shape.radius ** 2;
    } else if (shape.type === "rectangle") {
      return shape.width * shape.height;
    }
    // Need a new shape? Have to modify this class every time! ❌
  }
}

// ✅ GOOD — extend without modifying existing code
class Shape {
  area() {
    throw new Error("area() must be implemented");
  }
}

class Circle extends Shape {
  constructor(radius) { super(); this.radius = radius; }
  area() { return Math.PI * this.radius ** 2; }
}

class Rectangle extends Shape {
  constructor(w, h) { super(); this.width = w; this.height = h; }
  area() { return this.width * this.height; }
}

// Adding a new shape? Just create a new class — no existing code changes!
class Triangle extends Shape {
  constructor(base, height) { super(); this.base = base; this.height = height; }
  area() { return 0.5 * this.base * this.height; }
}

// Works with ANY shape — past, present, or future:
function totalArea(shapes) {
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}

console.log(totalArea([new Circle(5), new Rectangle(4, 6), new Triangle(3, 8)]));
// Output: 114.53981633974483
```

### L — Liskov Substitution Principle

Child classes should be usable **anywhere** the parent is expected.

```js
// ❌ BAD — Square breaks Rectangle's contract
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  area() { return this.width * this.height; }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
  // If someone changes width, height should change too... messy!
  set width(w) { this._width = w; this._height = w; }
  set height(h) { this._width = h; this._height = h; }
}

// ✅ GOOD — both are independent shapes
class Shape {
  area() { throw new Error("Implement me"); }
}

class GoodRectangle extends Shape {
  constructor(w, h) { super(); this.width = w; this.height = h; }
  area() { return this.width * this.height; }
}

class GoodSquare extends Shape {
  constructor(side) { super(); this.side = side; }
  area() { return this.side ** 2; }
}
```

### I — Interface Segregation Principle

Don't force a class to implement methods it doesn't need.

```js
// ❌ BAD — forcing every worker to implement all methods
class Worker {
  work() { /* ... */ }
  eat() { /* ... */ }
  sleep() { /* ... */ }
  attendMeeting() { /* ... */ }
}

// A Robot worker doesn't eat or sleep! 🤖

// ✅ GOOD — small, focused interfaces (simulated with mixins)
const Workable = (Base) => class extends Base {
  work() { console.log(`${this.name} is working`); }
};

const Eatable = (Base) => class extends Base {
  eat() { console.log(`${this.name} is eating`); }
};

const Sleepable = (Base) => class extends Base {
  sleep() { console.log(`${this.name} is sleeping`); }
};

class Human extends Eatable(Sleepable(Workable(Object))) {
  constructor(name) { super(); this.name = name; }
}

class Robot extends Workable(Object) {
  constructor(name) { super(); this.name = name; }
  // No eat() or sleep() — not needed! ✅
}

const human = new Human("Ankit");
human.work();   // Output: Ankit is working
human.eat();    // Output: Ankit is eating
human.sleep();  // Output: Ankit is sleeping

const robot = new Robot("R2D2");
robot.work();   // Output: R2D2 is working
// robot.eat(); // ❌ Not available (correctly)
```

### D — Dependency Inversion Principle

Depend on **abstractions** (interfaces), not on **concrete implementations**.

```js
// ❌ BAD — tightly coupled to a specific database
class UserRepository {
  #db;
  constructor() {
    this.#db = new MySQLDatabase();  // ❌ Hardcoded dependency!
  }
  getUser(id) { return this.#db.query(`SELECT * FROM users WHERE id=${id}`); }
}

// ✅ GOOD — depends on an abstraction (any database that has .query())
class UserRepository {
  #database;

  constructor(database) {  // ← Inject the dependency
    this.#database = database;
  }

  getUser(id) {
    return this.#database.query("users", { id });
  }
}

// Now you can swap databases easily:
class MySQL {
  query(table, filter) { console.log(`MySQL: SELECT from ${table}`); }
}

class MongoDB {
  query(collection, filter) { console.log(`MongoDB: find in ${collection}`); }
}

class InMemoryDB {
  #data = {};
  query(table, filter) { console.log(`Memory: lookup in ${table}`); }
}

// Swap without changing UserRepository:
const repo1 = new UserRepository(new MySQL());
const repo2 = new UserRepository(new MongoDB());
const repo3 = new UserRepository(new InMemoryDB());  // great for testing!
```

---

## OOP Design Patterns (Common Ones)

### Singleton — Only One Instance Ever

```js
class Database {
  static #instance;

  constructor(url) {
    if (Database.#instance) {
      return Database.#instance;  // return existing instance
    }
    this.url = url;
    this.connected = false;
    Database.#instance = this;
  }

  connect() {
    this.connected = true;
    console.log(`Connected to ${this.url}`);
  }

  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database("mongodb://localhost");
    }
    return Database.#instance;
  }
}

const db1 = new Database("mongodb://localhost");
const db2 = new Database("mongodb://other-url");

console.log(db1 === db2);  // Output: true  (same instance!)
console.log(db2.url);       // Output: mongodb://localhost  (first one's url)
```

### Observer — Notify When Something Changes

```js
class Store {
  #state;
  #listeners = [];

  constructor(initialState) {
    this.#state = initialState;
  }

  get state() {
    return { ...this.#state };  // return a copy
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.#notify();
  }

  subscribe(listener) {
    this.#listeners.push(listener);
    return () => {
      // return unsubscribe function
      this.#listeners = this.#listeners.filter(l => l !== listener);
    };
  }

  #notify() {
    this.#listeners.forEach(listener => listener(this.state));
  }
}

const store = new Store({ count: 0, name: "App" });

// Subscribe to changes:
const unsubscribe = store.subscribe((state) => {
  console.log("State changed:", state);
});

store.setState({ count: 1 });
// Output: State changed: { count: 1, name: "App" }

store.setState({ count: 2, name: "MyApp" });
// Output: State changed: { count: 2, name: "MyApp" }

unsubscribe();  // stop listening

store.setState({ count: 3 });
// No output — unsubscribed!
```

---

## Quick Summary

| Pillar         | What It Does                          | How in JS                          |
|----------------|---------------------------------------|------------------------------------|
| Encapsulation  | Hides data, controls access           | `#private` fields, getters/setters |
| Abstraction    | Hides complexity, shows simple API    | Public methods hiding private logic|
| Inheritance    | Child gets everything from parent     | `extends`, `super`                 |
| Polymorphism   | Same method, different behavior       | Method overriding, duck typing     |

| Concept              | Key Idea                                              |
|----------------------|-------------------------------------------------------|
| Composition          | Build by combining small pieces (prefer over inheritance) |
| SOLID                | 5 principles for writing maintainable OOP code        |
| Singleton            | Only one instance of a class                          |
| Observer             | Notify subscribers when state changes                 |
| Duck Typing          | If it has the right methods, treat it as the right type |

---

> **Key Takeaways**:
> 1. **Encapsulation** = hide data + control access with `#private` and getters/setters
> 2. **Abstraction** = simple public interface hiding complex internals
> 3. **Inheritance** = child `extends` parent, reuse code, add/override behavior
> 4. **Polymorphism** = same method name, different behavior per class
> 5. Prefer **composition over inheritance** when things get complex
> 6. **SOLID** principles make your OOP code cleaner and easier to maintain
> 7. JS uses **prototypal** OOP — classes are syntactic sugar, everything is objects 🎯
