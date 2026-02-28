# Async/Await in JavaScript

## What is Async/Await?

`async/await` is **syntactic sugar** over Promises — it lets you write asynchronous code that **looks and reads like synchronous code**. No more `.then()` chains. Think of it like this: Promises are the engine, `async/await` is the steering wheel — same car, much easier to drive.

```js
// With Promises (.then chain):
function getUser() {
  return fetch("/api/user")
    .then(response => response.json())
    .then(user => {
      console.log(user.name);
      return user;
    })
    .catch(error => console.log(error));
}

// With async/await (same thing, cleaner):
async function getUser() {
  try {
    const response = await fetch("/api/user");
    const user = await response.json();
    console.log(user.name);
    return user;
  } catch (error) {
    console.log(error);
  }
}
```

---

## The `async` Keyword

Adding `async` before a function does **two things**:

1. Makes the function **always return a Promise**
2. Allows you to use `await` inside it

```js
// 1. async function ALWAYS returns a promise
async function greet() {
  return "Hello!";  // automatically wrapped in Promise.resolve()
}

greet().then(value => console.log(value));  // Output: Hello!

// It's the same as:
function greet() {
  return Promise.resolve("Hello!");
}

// 2. Even if you don't return anything:
async function noReturn() {
  console.log("Hi");
}

noReturn().then(value => console.log(value));
// Output: Hi
// Output: undefined  (async function returns Promise<undefined>)
```

### Works with All Function Types:

```js
// Function declaration
async function fetchData() { /* ... */ }

// Arrow function
const fetchData = async () => { /* ... */ };

// Object method
const obj = {
  async fetchData() { /* ... */ }
};

// Class method
class API {
  async fetchData() { /* ... */ }
}

// IIFE
(async () => {
  const data = await fetchData();
  console.log(data);
})();
```

---

## The `await` Keyword

`await` **pauses** the function execution until the Promise settles (resolves or rejects). It then returns the **resolved value**.

```js
async function demo() {
  console.log("Before await");

  const result = await new Promise(resolve => {
    setTimeout(() => resolve("Done!"), 2000);
  });

  console.log("After await:", result);
}

demo();
// Output:
// Before await
// (2 second pause)
// After await: Done!
```

### What `await` Does Step by Step:

```js
async function example() {
  // Step 1: Start
  console.log("Step 1");

  // Step 2: await pauses HERE — gives control back to the event loop
  const value = await Promise.resolve("Hello");
  // JavaScript goes and does other things while waiting...
  // When the promise resolves, it comes back here

  // Step 3: Continues after the promise resolves
  console.log("Step 2:", value);

  const value2 = await Promise.resolve("World");
  console.log("Step 3:", value2);
}

example();
console.log("This runs while example() is paused!");

// Output:
// Step 1
// This runs while example() is paused!
// Step 2: Hello
// Step 3: World
```

### `await` Only Works Inside `async` Functions:

```js
// ❌ Error — can't use await in regular function
function broken() {
  const data = await fetch("/api");  // SyntaxError!
}

// ✅ Works — inside async function
async function works() {
  const data = await fetch("/api");
}

// ✅ Top-level await (ES2022 — in modules only)
// In .mjs files or <script type="module">:
const response = await fetch("/api/data");
const data = await response.json();
console.log(data);
```

---

## Error Handling with `try...catch`

With Promises you use `.catch()`. With async/await, you use **`try...catch`** — just like synchronous code!

```js
async function getUser(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const user = await response.json();
    console.log(`✅ User: ${user.name}`);
    return user;

  } catch (error) {
    console.log(`❌ Failed: ${error.message}`);
    return null;

  } finally {
    console.log("Request complete");
  }
}

await getUser(1);
// Output:
// ✅ User: Leanne Graham
// Request complete

await getUser(99999);
// Output:
// ❌ Failed: HTTP Error: 404
// Request complete
```

### Catching Specific Errors:

```js
async function processData(input) {
  try {
    const parsed = JSON.parse(input);
    const response = await fetch(`/api/data/${parsed.id}`);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    if (error instanceof SyntaxError) {
      console.log("❌ Invalid JSON input");
    } else if (error.message.startsWith("Server error")) {
      console.log("❌ Server problem:", error.message);
    } else if (error instanceof TypeError) {
      console.log("❌ Network error (no internet?)");
    } else {
      console.log("❌ Unknown error:", error.message);
      throw error;  // re-throw unknown errors
    }
  }
}
```

---

## Sequential vs Parallel Execution

### Sequential — One After Another (Slow):

```js
function delay(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

// ❌ SLOW — each waits for the previous one
async function sequential() {
  console.time("sequential");

  const a = await delay(1000, "A");  // wait 1s
  const b = await delay(1000, "B");  // wait 1s
  const c = await delay(1000, "C");  // wait 1s

  console.log(a, b, c);              // Output: A B C
  console.timeEnd("sequential");     // Output: sequential: ~3000ms 😴
}
```

### Parallel — All at Once (Fast):

```js
// ✅ FAST — all start at the same time
async function parallel() {
  console.time("parallel");

  const [a, b, c] = await Promise.all([
    delay(1000, "A"),
    delay(1000, "B"),
    delay(1000, "C")
  ]);

  console.log(a, b, c);           // Output: A B C
  console.timeEnd("parallel");    // Output: parallel: ~1000ms 🚀
}
```

### When to Use Which:

```js
// SEQUENTIAL — when each step depends on the previous one
async function checkout() {
  const cart = await getCart();              // need cart first
  const total = await calculateTotal(cart); // need cart to calculate
  const order = await createOrder(total);   // need total to create order
  return order;
}

// PARALLEL — when tasks are independent
async function dashboard() {
  const [user, posts, notifications] = await Promise.all([
    getUser(),           // independent
    getPosts(),          // independent
    getNotifications()   // independent
  ]);
  return { user, posts, notifications };
}
```

### The "Start All, Await Later" Trick:

```js
// Start all promises first, THEN await them:
async function smartParallel() {
  console.time("smart");

  // Start all at the same time (no await yet):
  const promiseA = delay(1000, "A");
  const promiseB = delay(1000, "B");
  const promiseC = delay(1000, "C");

  // Now await them:
  const a = await promiseA;
  const b = await promiseB;
  const c = await promiseC;

  console.log(a, b, c);           // Output: A B C
  console.timeEnd("smart");       // Output: smart: ~1000ms 🚀
}
// Same as Promise.all() but you get individual variables
```

---

## Loops with Async/Await

### `for...of` — Sequential (each waits):

```js
async function processItems(items) {
  for (const item of items) {
    const result = await processItem(item);
    console.log(`Processed: ${result}`);
  }
  console.log("All done!");
}

// Processes one at a time: item1 → wait → item2 → wait → item3
```

### `for` Loop — Also Sequential:

```js
async function fetchUsers(ids) {
  const users = [];

  for (let i = 0; i < ids.length; i++) {
    const user = await fetchUser(ids[i]);
    users.push(user);
    console.log(`${i + 1}/${ids.length} loaded`);
  }

  return users;
}
```

### `Promise.all` + `map` — Parallel (all at once):

```js
async function fetchAllUsers(ids) {
  const users = await Promise.all(
    ids.map(id => fetchUser(id))
  );

  console.log(`Loaded ${users.length} users`);
  return users;
}
// All fetched at once — MUCH faster!
```

### ⚠️ `forEach` Doesn't Work with `await`:

```js
// ❌ BAD — forEach doesn't wait for async callbacks!
async function broken(items) {
  items.forEach(async (item) => {
    const result = await processItem(item);
    console.log(result);
  });

  console.log("Done!");
  // "Done!" prints BEFORE the items are processed! 😱
}

// ✅ GOOD — use for...of instead
async function works(items) {
  for (const item of items) {
    const result = await processItem(item);
    console.log(result);
  }

  console.log("Done!");  // Actually done now ✅
}
```

### Parallel with Concurrency Limit:

```js
async function parallelLimit(tasks, limit) {
  const results = [];
  const executing = new Set();

  for (const [index, task] of tasks.entries()) {
    const promise = task().then(result => {
      executing.delete(promise);
      results[index] = result;
    });

    executing.add(promise);

    if (executing.size >= limit) {
      await Promise.race(executing);  // wait for one to finish
    }
  }

  await Promise.all(executing);  // wait for remaining
  return results;
}

// Process 100 items, but only 5 at a time:
const tasks = Array.from({ length: 100 }, (_, i) =>
  () => delay(1000, `Item ${i + 1}`)
);

// await parallelLimit(tasks, 5);
```

---

## Async Iteration — `for await...of`

Loop over **async iterables** — things that produce values over time.

```js
// Async generator:
async function* fetchPages(url) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();

    yield data.items;  // gives items to the loop

    hasMore = data.hasNextPage;
    page++;
  }
}

// Consume with for await...of:
async function getAllItems() {
  const allItems = [];

  for await (const items of fetchPages("/api/products")) {
    allItems.push(...items);
    console.log(`Loaded page, total items: ${allItems.length}`);
  }

  return allItems;
}
```

### Simpler Example:

```js
async function* asyncNumbers() {
  for (let i = 1; i <= 5; i++) {
    await delay(500, i);
    yield i;
  }
}

async function main() {
  for await (const num of asyncNumbers()) {
    console.log(num);
  }
}

main();
// Output (each 500ms apart):
// 1
// 2
// 3
// 4
// 5
```

---

## Return Values from Async Functions

### Everything Returns a Promise:

```js
async function getNumber() {
  return 42;
}

// These are equivalent ways to get the value:

// 1. Using .then()
getNumber().then(value => console.log(value));  // Output: 42

// 2. Using await (inside another async function)
async function main() {
  const value = await getNumber();
  console.log(value);  // Output: 42
}
```

### Returning vs Awaiting in Return:

```js
// Both work the same:

async function version1() {
  return await fetch("/api/data");  // await then return
}

async function version2() {
  return fetch("/api/data");  // return the promise directly
}

// ⚠️ BUT there's a difference with try...catch:

async function withAwait() {
  try {
    return await fetch("/api/bad-url");  // ✅ Error IS caught here
  } catch (error) {
    console.log("Caught inside!");
    return null;
  }
}

async function withoutAwait() {
  try {
    return fetch("/api/bad-url");  // ⚠️ Error NOT caught here (promise returned before settling)
  } catch (error) {
    console.log("This might not catch the error!");
    return null;
  }
}

// Rule: Use `return await` inside try...catch
```

---

## Top-Level Await (ES2022)

In **ES modules** (`type: "module"` or `.mjs` files), you can use `await` at the top level — no wrapping in `async` needed.

```js
// In a module file (e.g., app.mjs):

// ✅ Top-level await
const response = await fetch("https://api.example.com/config");
const config = await response.json();

console.log("App started with config:", config);

export default config;
```

### Before Top-Level Await (Old Workaround):

```js
// ❌ The old way — IIFE wrapper
(async () => {
  const response = await fetch("/api/config");
  const config = await response.json();
  console.log(config);
})();
```

### Top-Level Await Blocks Module Loading:

```js
// module-a.mjs
console.log("Module A: start");
await delay(2000, "loaded");
console.log("Module A: done");

export const value = "A";

// module-b.mjs (imports module-a)
import { value } from "./module-a.mjs";
console.log("Module B: got", value);

// Output:
// Module A: start
// (2 second pause)
// Module A: done
// Module B: got A
// Module B waits for Module A's await to finish!
```

---

## Async/Await with Error Handling Patterns

### Pattern 1: Wrapper Function (Go-style)

Avoid repetitive `try...catch` blocks:

```js
// Helper that catches errors and returns [error, data]
async function to(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

// Usage — clean, no try...catch needed:
async function main() {
  const [err1, user] = await to(fetchUser(1));
  if (err1) {
    console.log("User fetch failed:", err1.message);
    return;
  }

  const [err2, orders] = await to(fetchOrders(user.id));
  if (err2) {
    console.log("Orders fetch failed:", err2.message);
    return;
  }

  console.log(`${user.name} has ${orders.length} orders`);
}
```

### Pattern 2: Higher-Order Error Handler

```js
function asyncHandler(fn) {
  return async function(...args) {
    try {
      return await fn(...args);
    } catch (error) {
      console.error(`Error in ${fn.name}:`, error.message);
      // Could send to error tracking service
      return null;
    }
  };
}

// Wrap any async function:
const safeGetUser = asyncHandler(async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
});

// No try...catch needed at the call site:
const user = await safeGetUser(1);  // errors are handled automatically
```

### Pattern 3: Express.js-style Error Handler

```js
// In Express.js (Node.js web framework):
const asyncRoute = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage:
app.get("/users/:id", asyncRoute(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new NotFoundError("User not found");
  res.json(user);
  // Errors automatically forwarded to error middleware!
}));
```

---

## Real-World Examples

### API Client:

```js
class APIClient {
  #baseURL;
  #token;

  constructor(baseURL, token) {
    this.#baseURL = baseURL;
    this.#token = token;
  }

  async #request(method, endpoint, body = null) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.#token}`
      }
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${this.#baseURL}${endpoint}`, options);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async getUsers() {
    return this.#request("GET", "/users");
  }

  async getUser(id) {
    return this.#request("GET", `/users/${id}`);
  }

  async createUser(data) {
    return this.#request("POST", "/users", data);
  }

  async updateUser(id, data) {
    return this.#request("PUT", `/users/${id}`, data);
  }

  async deleteUser(id) {
    return this.#request("DELETE", `/users/${id}`);
  }
}

// Usage:
const api = new APIClient("https://api.example.com", "my-token");

async function main() {
  try {
    const users = await api.getUsers();
    console.log(`Found ${users.length} users`);

    const newUser = await api.createUser({ name: "Ankit", email: "ankit@mail.com" });
    console.log("Created:", newUser);

    const updated = await api.updateUser(newUser.id, { name: "Ankit Kumar" });
    console.log("Updated:", updated);
  } catch (error) {
    console.log("API Error:", error.message);
  }
}
```

### Data Pipeline:

```js
async function dataPipeline(rawData) {
  console.log("🔄 Starting pipeline...");

  // Step 1: Validate
  const validated = await validate(rawData);
  console.log(`✅ Validated ${validated.length} records`);

  // Step 2: Transform
  const transformed = await transform(validated);
  console.log(`✅ Transformed ${transformed.length} records`);

  // Step 3: Enrich with external data (parallel!)
  const enriched = await Promise.all(
    transformed.map(record => enrichWithExternalData(record))
  );
  console.log(`✅ Enriched ${enriched.length} records`);

  // Step 4: Save to database (batches of 10)
  for (let i = 0; i < enriched.length; i += 10) {
    const batch = enriched.slice(i, i + 10);
    await saveBatch(batch);
    console.log(`💾 Saved batch ${Math.floor(i / 10) + 1}`);
  }

  console.log("🎉 Pipeline complete!");
  return enriched.length;
}
```

### Retry with Exponential Backoff:

```js
async function fetchWithRetry(url, options = {}) {
  const { retries = 3, backoff = 1000 } = options;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.log(`⚠️ Attempt ${attempt}/${retries} failed: ${error.message}`);

      if (attempt === retries) {
        throw new Error(`Failed after ${retries} attempts: ${error.message}`);
      }

      // Wait longer each time: 1s, 2s, 4s...
      const waitTime = backoff * Math.pow(2, attempt - 1);
      console.log(`⏳ Retrying in ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

// Usage:
try {
  const data = await fetchWithRetry("https://api.flaky-server.com/data", {
    retries: 3,
    backoff: 1000
  });
  console.log("Got data:", data);
} catch (error) {
  console.log("Gave up:", error.message);
}
```

### Loading Multiple Resources with Progress:

```js
async function loadResources(urls) {
  let loaded = 0;
  const total = urls.length;

  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        loaded++;
        console.log(`📦 Progress: ${loaded}/${total} (${Math.round(loaded/total*100)}%)`);
        return { url, data, status: "success" };
      } catch (error) {
        loaded++;
        console.log(`❌ Failed: ${url}`);
        return { url, error: error.message, status: "failed" };
      }
    })
  );

  const succeeded = results.filter(r => r.status === "success");
  const failed = results.filter(r => r.status === "failed");

  console.log(`\n✅ ${succeeded.length} loaded, ❌ ${failed.length} failed`);
  return results;
}
```

---

## Common Mistakes

### Mistake 1: Unnecessary Sequential Execution

```js
// ❌ SLOW — waiting for each one before starting the next
async function slow() {
  const users = await fetchUsers();      // wait 1s
  const products = await fetchProducts(); // wait 1s
  const orders = await fetchOrders();     // wait 1s
  // Total: ~3 seconds
}

// ✅ FAST — all run at the same time
async function fast() {
  const [users, products, orders] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
    fetchOrders()
  ]);
  // Total: ~1 second (as fast as the slowest one)
}
```

### Mistake 2: Using `forEach` with `await`

```js
// ❌ BAD — forEach doesn't respect await
async function bad(ids) {
  ids.forEach(async (id) => {
    const data = await fetchData(id);  // these all fire at once!
    console.log(data);
  });
  console.log("Done");  // prints BEFORE fetchData finishes!
}

// ✅ GOOD — for...of waits properly
async function good(ids) {
  for (const id of ids) {
    const data = await fetchData(id);
    console.log(data);
  }
  console.log("Done");  // ACTUALLY done now
}

// ✅ ALSO GOOD — parallel with Promise.all
async function goodParallel(ids) {
  const results = await Promise.all(ids.map(id => fetchData(id)));
  results.forEach(data => console.log(data));
  console.log("Done");
}
```

### Mistake 3: Not Handling Errors

```js
// ❌ BAD — unhandled rejection (crashes Node.js!)
async function noErrorHandling() {
  const data = await fetch("/api/bad-url");
  // If this fails, nothing catches it!
}

// ✅ GOOD — handle errors
async function withErrorHandling() {
  try {
    const data = await fetch("/api/bad-url");
  } catch (error) {
    console.log("Handled:", error.message);
  }
}

// ✅ ALSO GOOD — .catch() on the call
noErrorHandling().catch(error => console.log("Caught:", error.message));
```

### Mistake 4: Mixing Callbacks and Async/Await

```js
// ❌ BAD — mixing styles is confusing
async function mixed() {
  fetch("/api/data")
    .then(response => response.json())
    .then(data => {
      // now inside a callback, not async context
      const details = await getDetails(data.id);  // ❌ SyntaxError!
    });
}

// ✅ GOOD — stick with async/await
async function clean() {
  const response = await fetch("/api/data");
  const data = await response.json();
  const details = await getDetails(data.id);
}
```

### Mistake 5: Creating Unnecessary Async Functions

```js
// ❌ UNNECESSARY — just wrapping a promise in async
async function getUser(id) {
  return await fetch(`/api/users/${id}`).then(r => r.json());
}

// ✅ SIMPLER — just return the promise chain
function getUser(id) {
  return fetch(`/api/users/${id}`).then(r => r.json());
}

// ✅ OR fully async (if you need try...catch):
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

---

## Async/Await vs Promises — When to Use Which

| Scenario                              | Use                    | Why                                  |
|---------------------------------------|------------------------|--------------------------------------|
| Sequential async operations           | `async/await`          | Reads like synchronous code          |
| Simple single promise                 | `.then()`              | One-liner is fine                    |
| Parallel operations                   | `Promise.all()`        | Run all at once                      |
| Error handling                        | `try...catch`          | Cleaner than `.catch()` for complex flows |
| Chaining 2-3 things                   | Either works           | Personal preference                  |
| Complex flow with branches            | `async/await`          | if/else with await is natural        |
| Event handlers / callbacks            | `.then()`              | Can't make the outer function async  |
| Loops with async                      | `for...of` + `await`   | forEach doesn't work with await      |

---

## Execution Order — Understanding the Flow

```js
async function main() {
  console.log("1. Start of main");

  const promise = new Promise(resolve => {
    console.log("2. Inside Promise constructor (synchronous!)");
    resolve("resolved");
  });

  console.log("3. Before await");

  const value = await promise;
  // Everything AFTER this await runs as a microtask

  console.log("4. After await:", value);
}

console.log("A. Before main()");
main();
console.log("B. After main() call");

// Output:
// A. Before main()
// 1. Start of main
// 2. Inside Promise constructor (synchronous!)
// 3. Before await
// B. After main() call       ← this runs while main() is paused!
// 4. After await: resolved   ← resumes after synchronous code finishes
```

### Full Event Loop Example:

```js
async function asyncFunc() {
  console.log("3. async function start");
  await Promise.resolve();
  console.log("6. after await");
}

console.log("1. script start");

setTimeout(() => console.log("7. setTimeout"), 0);

asyncFunc();

new Promise(resolve => {
  console.log("4. promise constructor");
  resolve();
}).then(() => {
  console.log("5. promise .then()");
});

console.log("2. script end");

// Output:
// 1. script start
// 3. async function start
// 4. promise constructor
// 2. script end
// 6. after await           (microtask)
// 5. promise .then()       (microtask)
// 7. setTimeout            (macrotask)
```

---

## Quick Summary

| Concept                   | Description                                                    |
|---------------------------|----------------------------------------------------------------|
| `async`                   | Makes a function return a Promise, allows `await` inside       |
| `await`                   | Pauses execution until Promise settles, returns the value      |
| `try...catch`             | Error handling for async/await (replaces `.catch()`)           |
| Sequential                | `await` one after another — each waits for the previous        |
| Parallel                  | `Promise.all([...])` — all run at the same time                |
| `for...of` + `await`      | Sequential loop over async operations                         |
| `Promise.all` + `map`     | Parallel loop over async operations                           |
| `forEach` + `await`       | ❌ DOESN'T WORK — use `for...of` instead                      |
| Top-level `await`         | Allowed in ES modules (no async wrapper needed)               |
| `for await...of`          | Loop over async iterables/generators                           |
| `return await`            | Needed inside `try...catch` to catch errors properly          |
| Execution order           | sync code → microtasks (await/.then) → macrotasks (setTimeout) |

---

> **Key Takeaways**:
> 1. `async/await` is just **prettier syntax** for Promises — same thing underneath
> 2. `async` makes a function return a Promise, `await` pauses until it resolves
> 3. Use `try...catch` for error handling (always handle errors!)
> 4. Use `Promise.all()` for **parallel** tasks — don't `await` them one by one
> 5. **Never** use `forEach` with `await` — use `for...of` instead
> 6. `await` only pauses the **current function**, not the whole program
> 7. Use `return await` inside `try...catch`, plain `return` otherwise 🎯
