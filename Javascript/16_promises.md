# Promises in JavaScript

## What is a Promise?

A **Promise** is an object that represents a value that might be available **now, later, or never**. Think of it like ordering food online — you place the order (Promise created), you wait (pending), and eventually either your food arrives (fulfilled) or the order gets cancelled (rejected).

```js
const order = new Promise((resolve, reject) => {
  const foodReady = true;

  if (foodReady) {
    resolve("🍕 Pizza delivered!");   // success
  } else {
    reject("❌ Order cancelled");     // failure
  }
});

order
  .then(result => console.log(result))     // Output: 🍕 Pizza delivered!
  .catch(error => console.log(error));
```

---

## Why Promises? — The Callback Problem

Before Promises, we used **callbacks** — and they led to ugly nested code called **"Callback Hell"**:

```js
// ❌ Callback Hell — deeply nested, hard to read
getUser(1, function(user) {
  getOrders(user.id, function(orders) {
    getOrderDetails(orders[0].id, function(details) {
      getProduct(details.productId, function(product) {
        console.log(product.name);
        // 4 levels deep... imagine 10! 😵
      });
    });
  });
});

// ✅ With Promises — flat chain, easy to read
getUser(1)
  .then(user => getOrders(user.id))
  .then(orders => getOrderDetails(orders[0].id))
  .then(details => getProduct(details.productId))
  .then(product => console.log(product.name))
  .catch(error => console.log("Something failed:", error));
```

---

## 3 States of a Promise

A Promise is always in one of these states:

```
┌─────────────┐
│   PENDING   │ ← Initial state (waiting)
└──────┬──────┘
       │
       ├── resolve() ──► FULFILLED (success ✅) → .then() runs
       │
       └── reject()  ──► REJECTED (failure ❌) → .catch() runs
```

```js
// State 1: Pending
const pending = new Promise((resolve, reject) => {
  // doing nothing yet...
});
console.log(pending);  // Output: Promise { <pending> }

// State 2: Fulfilled
const fulfilled = new Promise((resolve, reject) => {
  resolve("Done!");
});
console.log(fulfilled);  // Output: Promise { 'Done!' }

// State 3: Rejected
const rejected = new Promise((resolve, reject) => {
  reject("Failed!");
});
console.log(rejected);  // Output: Promise { <rejected> 'Failed!' }
```

### Important Rules:
- A Promise can only change state **ONCE** (pending → fulfilled OR pending → rejected)
- Once settled (fulfilled or rejected), it **never changes again**

```js
const promise = new Promise((resolve, reject) => {
  resolve("First");   // ✅ This one wins
  resolve("Second");  // ❌ Ignored — already resolved
  reject("Error");    // ❌ Ignored — already resolved
});

promise.then(value => console.log(value));  // Output: First
```

---

## Creating Promises

### `new Promise()`

```js
const promise = new Promise((resolve, reject) => {
  // resolve(value) → success
  // reject(reason) → failure
});
```

### Simulating Async Operations:

```js
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    console.log("⏳ Fetching user...");

    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "Ankit", age: 20 });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 2000);  // simulates 2-second delay
  });
}

fetchUser(1)
  .then(user => console.log("✅ Got user:", user))
  .catch(error => console.log("❌ Error:", error.message));

// Output (after 2 seconds):
// ⏳ Fetching user...
// ✅ Got user: { id: 1, name: "Ankit", age: 20 }

fetchUser(-1)
  .then(user => console.log("✅ Got user:", user))
  .catch(error => console.log("❌ Error:", error.message));

// Output (after 2 seconds):
// ⏳ Fetching user...
// ❌ Error: Invalid user ID
```

---

## `.then()` — Handle Success

`.then()` runs when the promise is **fulfilled**. Returns a **new Promise**, so you can chain.

```js
const promise = Promise.resolve(5);

promise
  .then(value => {
    console.log(value);      // Output: 5
    return value * 2;        // return a new value
  })
  .then(value => {
    console.log(value);      // Output: 10
    return value + 3;
  })
  .then(value => {
    console.log(value);      // Output: 13
  });
```

### `.then()` Can Take Two Arguments:

```js
promise.then(
  (value) => { /* success handler */ },
  (error) => { /* error handler */ }
);

// But .catch() is preferred for error handling (cleaner)
```

### What You Return From `.then()` Matters:

```js
// Return a value → next .then() gets it
Promise.resolve(1)
  .then(v => v + 1)        // returns 2
  .then(v => console.log(v));  // Output: 2

// Return a Promise → next .then() waits for it
Promise.resolve(1)
  .then(v => {
    return new Promise(resolve => {
      setTimeout(() => resolve(v + 10), 1000);
    });
  })
  .then(v => console.log(v));  // Output: 11 (after 1 second)

// Return nothing → next .then() gets undefined
Promise.resolve(1)
  .then(v => { console.log(v); })  // no return
  .then(v => console.log(v));      // Output: undefined
```

---

## `.catch()` — Handle Errors

`.catch()` runs when any promise in the chain is **rejected** or **throws** an error.

```js
Promise.reject("Something broke!")
  .catch(error => console.log("Caught:", error));
// Output: Caught: Something broke!
```

### `.catch()` Catches Errors Anywhere in the Chain:

```js
Promise.resolve("start")
  .then(value => {
    console.log(value);          // Output: start
    throw new Error("Oops!");    // error in the middle of the chain
  })
  .then(value => {
    console.log("This is skipped");  // ← doesn't run
  })
  .then(value => {
    console.log("This is also skipped");  // ← doesn't run
  })
  .catch(error => {
    console.log("Caught:", error.message);  // Output: Caught: Oops!
  });
```

### Recovering From Errors:

```js
Promise.reject("Failed!")
  .catch(error => {
    console.log("Error:", error);  // Output: Error: Failed!
    return "Recovered value";      // recovery!
  })
  .then(value => {
    console.log("Continued:", value);  // Output: Continued: Recovered value
  });
// The chain continues after .catch() if you return a value!
```

### Multiple `.catch()` Blocks:

```js
fetchUser(1)
  .then(user => {
    if (!user.email) throw new Error("No email");
    return sendEmail(user.email);
  })
  .catch(error => {
    // Handle email-specific error
    console.log("Email error:", error.message);
    return "skipped email";  // recover and continue
  })
  .then(result => {
    console.log("Next step:", result);
    return processPayment();
  })
  .catch(error => {
    // Handle payment-specific error
    console.log("Payment error:", error.message);
  });
```

---

## `.finally()` — Always Runs

Like `try...finally`, `.finally()` runs whether the promise was fulfilled or rejected. Perfect for **cleanup**.

```js
function loadData() {
  console.log("⏳ Loading...");

  return fetchUser(1)
    .then(user => {
      console.log("✅ Got:", user.name);
      return user;
    })
    .catch(error => {
      console.log("❌ Error:", error.message);
    })
    .finally(() => {
      console.log("⏳ Loading done (success or failure)");
      // Hide loading spinner, close connections, etc.
    });
}

loadData();
// Output:
// ⏳ Loading...
// ✅ Got: Ankit
// ⏳ Loading done (success or failure)
```

### `.finally()` Doesn't Receive Any Value:

```js
Promise.resolve("Hello")
  .finally(() => {
    // No access to the value here
    console.log("Cleanup");
  })
  .then(value => {
    console.log(value);  // Output: Hello (value passes through!)
  });
```

---

## Promise Chaining

Chaining is the **real power** of Promises — sequential async operations in a flat, readable way.

```js
function step1() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Step 1 complete");
      resolve(10);
    }, 1000);
  });
}

function step2(value) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Step 2 complete (received ${value})`);
      resolve(value * 2);
    }, 1000);
  });
}

function step3(value) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Step 3 complete (received ${value})`);
      resolve(value + 5);
    }, 1000);
  });
}

step1()
  .then(result => step2(result))
  .then(result => step3(result))
  .then(finalResult => {
    console.log(`Final result: ${finalResult}`);
  })
  .catch(error => {
    console.log("Error:", error.message);
  });

// Output (each after 1 second):
// Step 1 complete
// Step 2 complete (received 10)
// Step 3 complete (received 20)
// Final result: 25
```

### Common Mistake — Not Returning the Promise:

```js
// ❌ BAD — forgot to return the promise
step1()
  .then(result => {
    step2(result);  // no return! Next .then() doesn't wait for this
  })
  .then(result => {
    console.log(result);  // Output: undefined (didn't get step2's result)
  });

// ✅ GOOD — return the promise
step1()
  .then(result => {
    return step2(result);  // return it!
  })
  .then(result => {
    console.log(result);  // Output: 20 ✅
  });

// ✅ Even shorter with arrow functions:
step1()
  .then(result => step2(result))  // implicit return
  .then(result => console.log(result));  // Output: 20
```

---

## Promise Static Methods

### `Promise.resolve()` and `Promise.reject()` — Create Settled Promises

```js
// Create an already-fulfilled promise:
const p1 = Promise.resolve("Done!");
p1.then(v => console.log(v));  // Output: Done!

// Create an already-rejected promise:
const p2 = Promise.reject(new Error("Failed!"));
p2.catch(e => console.log(e.message));  // Output: Failed!

// Useful for normalizing — wrapping a value in a promise:
function getData(useCache) {
  if (useCache) {
    return Promise.resolve(cachedData);  // instant, but still a promise
  }
  return fetch("/api/data");  // async fetch
}
// Both return promises — caller handles them the same way
```

---

### `Promise.all()` — All Must Succeed

Runs multiple promises **in parallel**. Resolves when **ALL** succeed. Rejects if **ANY ONE** fails (fail-fast).

```js
const p1 = new Promise(resolve => setTimeout(() => resolve("User data"), 1000));
const p2 = new Promise(resolve => setTimeout(() => resolve("Posts data"), 2000));
const p3 = new Promise(resolve => setTimeout(() => resolve("Comments"), 1500));

console.time("all");

Promise.all([p1, p2, p3])
  .then(results => {
    console.log(results);
    // Output: ["User data", "Posts data", "Comments"]
    // All results in the SAME ORDER as the input array!
    console.timeEnd("all");
    // Output: all: ~2000ms (waits for the SLOWEST, not 1000+2000+1500)
  })
  .catch(error => {
    console.log("One failed:", error);
  });
```

### `Promise.all()` Fails Fast:

```js
const p1 = Promise.resolve("✅ Success");
const p2 = Promise.reject("❌ Failed!");     // this one fails
const p3 = Promise.resolve("✅ Also success");

Promise.all([p1, p2, p3])
  .then(results => {
    console.log("All succeeded:", results);  // never runs
  })
  .catch(error => {
    console.log("Caught:", error);  // Output: Caught: ❌ Failed!
    // You don't get ANY results — not even the successful ones!
  });
```

### Real-World: Parallel API Calls:

```js
async function getDashboardData(userId) {
  try {
    const [user, orders, notifications] = await Promise.all([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/orders/${userId}`).then(r => r.json()),
      fetch(`/api/notifications/${userId}`).then(r => r.json())
    ]);

    console.log("User:", user.name);
    console.log("Orders:", orders.length);
    console.log("Notifications:", notifications.length);
  } catch (error) {
    console.log("Dashboard failed to load:", error.message);
  }
}
```

---

### `Promise.allSettled()` — Get All Results (Success or Failure)

Waits for **ALL** promises to finish, regardless of success/failure. **Never rejects.**

```js
const p1 = Promise.resolve("User loaded");
const p2 = Promise.reject(new Error("Posts failed"));
const p3 = Promise.resolve("Comments loaded");

Promise.allSettled([p1, p2, p3])
  .then(results => {
    results.forEach((result, i) => {
      if (result.status === "fulfilled") {
        console.log(`#${i + 1} ✅:`, result.value);
      } else {
        console.log(`#${i + 1} ❌:`, result.reason.message);
      }
    });
  });

// Output:
// #1 ✅: User loaded
// #2 ❌: Posts failed
// #3 ✅: Comments loaded
```

### `Promise.all()` vs `Promise.allSettled()`:

| Feature              | `Promise.all()`                      | `Promise.allSettled()`              |
|----------------------|--------------------------------------|-------------------------------------|
| If one fails         | **Entire thing rejects** (fail-fast) | **Still returns all results**       |
| Result format        | `[value1, value2, ...]`              | `[{status, value/reason}, ...]`     |
| Use when             | All must succeed                     | Want results regardless of failures |
| Can reject?          | ✅ Yes                               | ❌ Never                            |

---

### `Promise.race()` — First One Wins

Returns the result of whichever promise **settles first** (fulfilled OR rejected).

```js
const fast = new Promise(resolve => setTimeout(() => resolve("🐇 Fast!"), 500));
const slow = new Promise(resolve => setTimeout(() => resolve("🐢 Slow!"), 2000));

Promise.race([fast, slow])
  .then(winner => console.log("Winner:", winner));
// Output: Winner: 🐇 Fast!  (after 500ms)
```

### Real-World: Timeout Pattern:

```js
function fetchWithTimeout(url, timeoutMs) {
  const fetchPromise = fetch(url).then(r => r.json());

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timed out!")), timeoutMs);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}

// If fetch takes more than 3 seconds, timeout wins:
fetchWithTimeout("https://api.example.com/data", 3000)
  .then(data => console.log("✅ Got data:", data))
  .catch(error => console.log("❌", error.message));
// Output (if slow): ❌ Request timed out!
```

---

### `Promise.any()` — First Success Wins

Returns the result of the first **fulfilled** promise. Only rejects if **ALL** fail.

```js
const p1 = Promise.reject("❌ Server 1 down");
const p2 = new Promise(resolve => setTimeout(() => resolve("✅ Server 2"), 2000));
const p3 = new Promise(resolve => setTimeout(() => resolve("✅ Server 3"), 1000));

Promise.any([p1, p2, p3])
  .then(winner => console.log("First success:", winner));
// Output: First success: ✅ Server 3  (fastest successful one)
// p1 failed but was ignored — any() only cares about successes
```

### `Promise.any()` All Fail:

```js
Promise.any([
  Promise.reject("Error 1"),
  Promise.reject("Error 2"),
  Promise.reject("Error 3")
])
  .catch(error => {
    console.log(error);            // Output: AggregateError: All promises were rejected
    console.log(error.errors);     // Output: ["Error 1", "Error 2", "Error 3"]
  });
```

### `Promise.race()` vs `Promise.any()`:

| Feature          | `Promise.race()`             | `Promise.any()`              |
|------------------|------------------------------|------------------------------|
| Returns          | First **settled** (any)      | First **fulfilled** (success)|
| If first rejects | Returns the rejection ❌     | Ignores it, waits for success|
| All fail         | Returns first rejection      | `AggregateError`             |

```js
const fail = new Promise((_, reject) => setTimeout(() => reject("❌"), 100));
const succeed = new Promise(resolve => setTimeout(() => resolve("✅"), 500));

Promise.race([fail, succeed]).catch(e => console.log("race:", e));
// Output: race: ❌  (first settled = the rejection)

Promise.any([fail, succeed]).then(v => console.log("any:", v));
// Output: any: ✅  (first fulfilled = the success)
```

---

## All 4 Static Methods Compared:

| Method              | Waits For       | Resolves When              | Rejects When              |
|---------------------|-----------------|----------------------------|---------------------------|
| `Promise.all()`     | All             | All succeed                | Any one fails (fail-fast) |
| `Promise.allSettled()` | All          | Always (all finish)        | Never                     |
| `Promise.race()`    | First settled   | First promise settles      | First promise rejects     |
| `Promise.any()`     | First success   | First promise succeeds     | All fail (AggregateError) |

---

## Microtask Queue — When Do Promises Run?

Promise callbacks (`.then`, `.catch`, `.finally`) run in the **microtask queue** — after the current code finishes but **before** things like `setTimeout`.

```js
console.log("1. Synchronous");

setTimeout(() => {
  console.log("4. setTimeout (macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise (microtask)");
});

console.log("2. Synchronous");

// Output ORDER:
// 1. Synchronous
// 2. Synchronous
// 3. Promise (microtask)     ← runs BEFORE setTimeout!
// 4. setTimeout (macrotask)
```

### Execution Priority:

```
1. Call Stack (synchronous code)  ← runs FIRST
2. Microtask Queue (Promises)     ← runs SECOND
3. Macrotask Queue (setTimeout)   ← runs LAST
```

```js
console.log("Start");

setTimeout(() => console.log("Timeout 1"), 0);
setTimeout(() => console.log("Timeout 2"), 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));

Promise.resolve()
  .then(() => console.log("Promise 3"));

console.log("End");

// Output:
// Start
// End
// Promise 1
// Promise 3
// Promise 2
// Timeout 1
// Timeout 2
```

---

## Promise Patterns

### Pattern 1: Sequential Execution

```js
// Execute promises one after another:
async function sequential(tasks) {
  const results = [];
  for (const task of tasks) {
    const result = await task();
    results.push(result);
  }
  return results;
}

// Each waits for the previous one to finish
const tasks = [
  () => new Promise(r => setTimeout(() => { console.log("Task 1"); r(1); }, 1000)),
  () => new Promise(r => setTimeout(() => { console.log("Task 2"); r(2); }, 1000)),
  () => new Promise(r => setTimeout(() => { console.log("Task 3"); r(3); }, 1000))
];

// sequential(tasks);
// Output (each 1 second apart): Task 1, Task 2, Task 3
// Total time: ~3 seconds
```

### Pattern 2: Parallel with Limit

```js
// Run N promises at a time (concurrency limit):
async function parallelLimit(tasks, limit) {
  const results = [];
  let index = 0;

  async function runNext() {
    const current = index++;
    if (current >= tasks.length) return;
    results[current] = await tasks[current]();
    await runNext();
  }

  // Start `limit` workers:
  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => runNext());
  await Promise.all(workers);
  return results;
}

// Only 2 tasks run at a time:
// await parallelLimit(tasks, 2);
```

### Pattern 3: Retry

```js
function retry(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    function attempt(current) {
      fn()
        .then(resolve)
        .catch(error => {
          console.log(`Attempt ${current}/${retries} failed`);
          if (current < retries) {
            setTimeout(() => attempt(current + 1), delay);
          } else {
            reject(new Error(`Failed after ${retries} attempts`, { cause: error }));
          }
        });
    }
    attempt(1);
  });
}

// retry(() => fetch("/flaky-api").then(r => r.json()), 3, 2000);
```

### Pattern 4: Promisifying Callbacks

Convert old callback-style functions into Promises:

```js
// Old callback-style:
function readFileCallback(path, callback) {
  setTimeout(() => {
    if (path) {
      callback(null, `Contents of ${path}`);
    } else {
      callback(new Error("Path is required"));
    }
  }, 1000);
}

// Promisified version:
function readFile(path) {
  return new Promise((resolve, reject) => {
    readFileCallback(path, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

// Now you can use .then() or async/await:
readFile("config.json")
  .then(data => console.log(data))      // Output: Contents of config.json
  .catch(error => console.log(error));

// Generic promisify function:
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  };
}

const readFilePromise = promisify(readFileCallback);
readFilePromise("app.js").then(console.log);  // Output: Contents of app.js
```

### Pattern 5: Cache Promise Results

```js
function createCachedFetch() {
  const cache = new Map();

  return function(url) {
    if (cache.has(url)) {
      console.log("📦 From cache:", url);
      return cache.get(url);  // return same promise
    }

    console.log("🌐 Fetching:", url);
    const promise = fetch(url).then(r => r.json());
    cache.set(url, promise);
    return promise;
  };
}

const cachedFetch = createCachedFetch();

// First call — fetches from network
// cachedFetch("/api/users");  // 🌐 Fetching: /api/users

// Second call — returns cached promise
// cachedFetch("/api/users");  // 📦 From cache: /api/users
```

---

## Common Mistakes

### Mistake 1: Nesting Promises (Creating Callback Hell Again)

```js
// ❌ BAD — nesting defeats the purpose of promises!
getUser(1).then(user => {
  getOrders(user.id).then(orders => {
    getDetails(orders[0].id).then(details => {
      console.log(details);  // nested mess!
    });
  });
});

// ✅ GOOD — flat chain
getUser(1)
  .then(user => getOrders(user.id))
  .then(orders => getDetails(orders[0].id))
  .then(details => console.log(details))
  .catch(error => console.log(error));
```

### Mistake 2: Forgetting to Return in `.then()`

```js
// ❌ BAD — missing return
fetchUser(1)
  .then(user => {
    fetchOrders(user.id);  // no return!
  })
  .then(orders => {
    console.log(orders);   // Output: undefined 😱
  });

// ✅ GOOD — return the promise
fetchUser(1)
  .then(user => {
    return fetchOrders(user.id);  // return!
  })
  .then(orders => {
    console.log(orders);   // Output: actual orders ✅
  });
```

### Mistake 3: Forgetting `.catch()`

```js
// ❌ BAD — unhandled rejection (crashes in Node.js)
fetchUser(-1).then(user => console.log(user));
// UnhandledPromiseRejectionWarning!

// ✅ GOOD — always handle errors
fetchUser(-1)
  .then(user => console.log(user))
  .catch(error => console.log("Handled:", error.message));
```

### Mistake 4: Using `Promise` Constructor Unnecessarily

```js
// ❌ BAD — wrapping a promise in another promise (anti-pattern)
function getUser(id) {
  return new Promise((resolve, reject) => {
    fetch(`/api/users/${id}`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

// ✅ GOOD — fetch already returns a promise!
function getUser(id) {
  return fetch(`/api/users/${id}`).then(response => response.json());
}
```

### Mistake 5: Creating Resolved Promise in a Loop

```js
// ❌ BAD — runs all at once (parallel, not sequential)
const ids = [1, 2, 3, 4, 5];
ids.forEach(id => {
  fetchUser(id).then(user => console.log(user.name));
});
// Order is not guaranteed!

// ✅ GOOD — sequential with reduce
ids.reduce((chain, id) => {
  return chain.then(() => fetchUser(id).then(user => console.log(user.name)));
}, Promise.resolve());

// ✅ BETTER — sequential with async/await
async function fetchAllUsers(ids) {
  for (const id of ids) {
    const user = await fetchUser(id);
    console.log(user.name);
  }
}
```

---

## Building Your Own Promise (Simplified)

Understanding how Promises work internally:

```js
class MyPromise {
  #state = "pending";
  #value = undefined;
  #callbacks = [];

  constructor(executor) {
    const resolve = (value) => {
      if (this.#state !== "pending") return;
      this.#state = "fulfilled";
      this.#value = value;
      this.#callbacks.forEach(cb => cb.onFulfilled(value));
    };

    const reject = (reason) => {
      if (this.#state !== "pending") return;
      this.#state = "rejected";
      this.#value = reason;
      this.#callbacks.forEach(cb => cb.onRejected(reason));
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handle = () => {
        try {
          if (this.#state === "fulfilled") {
            const result = onFulfilled ? onFulfilled(this.#value) : this.#value;
            resolve(result);
          } else if (this.#state === "rejected") {
            if (onRejected) {
              const result = onRejected(this.#value);
              resolve(result);
            } else {
              reject(this.#value);
            }
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.#state === "pending") {
        this.#callbacks.push({
          onFulfilled: () => handle(),
          onRejected: () => handle()
        });
      } else {
        queueMicrotask(handle);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      value => { callback(); return value; },
      reason => { callback(); throw reason; }
    );
  }
}

// Test it:
const p = new MyPromise((resolve) => {
  setTimeout(() => resolve("Hello from MyPromise!"), 1000);
});

p.then(value => console.log(value));
// Output (after 1 second): Hello from MyPromise!
```

---

## Quick Summary

| Concept                 | Description                                                  |
|-------------------------|--------------------------------------------------------------|
| Promise                 | Object representing a future value (pending → fulfilled/rejected) |
| `new Promise()`         | Create a promise with `resolve` and `reject` callbacks       |
| `.then()`               | Handle success — returns a new promise (chainable)           |
| `.catch()`              | Handle errors — catches rejections and thrown errors          |
| `.finally()`            | Always runs — cleanup, regardless of outcome                 |
| `Promise.resolve()`     | Create already-fulfilled promise                             |
| `Promise.reject()`      | Create already-rejected promise                              |
| `Promise.all()`         | All must succeed — parallel, fail-fast                       |
| `Promise.allSettled()`  | Get all results — never rejects                              |
| `Promise.race()`        | First settled wins (success or failure)                      |
| `Promise.any()`         | First success wins — ignores failures                        |
| Microtask queue          | Promises run after sync code, before setTimeout              |
| Chaining                | Flat sequential operations with `.then().then()`             |
| Promisify               | Convert callback-style functions to promises                 |

---

> **Key Takeaways**:
> 1. A Promise has **3 states**: pending → fulfilled (`resolve`) or rejected (`reject`)
> 2. Use `.then()` for success, `.catch()` for errors, `.finally()` for cleanup
> 3. **Always return** inside `.then()` — otherwise the chain breaks
> 4. **Always add `.catch()`** — unhandled rejections crash Node.js
> 5. Use `Promise.all()` for parallel tasks that ALL must succeed
> 6. Use `Promise.allSettled()` when you want results regardless of failures
> 7. Promise callbacks run in the **microtask queue** — after sync code, before setTimeout 🎯
