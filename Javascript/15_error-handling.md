# Error Handling in JavaScript

## What is Error Handling?

Errors are **inevitable** in programming — a user enters wrong data, a server goes down, a file doesn't exist. **Error handling** is how you **catch** these problems and deal with them **gracefully** instead of your app crashing. Think of it like a safety net — even if something goes wrong, your app doesn't fall.

```js
// ❌ Without error handling — the entire program crashes
const data = JSON.parse("this is not JSON");  // 💥 SyntaxError!
console.log("This line never runs");

// ✅ With error handling — we catch the error and handle it
try {
  const data = JSON.parse("this is not JSON");
} catch (error) {
  console.log("Oops! Invalid JSON");  // Output: Oops! Invalid JSON
}
console.log("This line DOES run! ✅");  // Output: This line DOES run! ✅
```

---

## `try...catch`

The most basic way to handle errors. Wrap risky code in `try`, and if something goes wrong, `catch` handles it.

```js
try {
  // Code that MIGHT throw an error
  const result = riskyOperation();
} catch (error) {
  // Code that runs IF an error happens
  console.log("Something went wrong:", error.message);
}
```

### Basic Example:

```js
try {
  let x = 10;
  let y = x.toUpperCase();  // ❌ Numbers don't have toUpperCase!
} catch (error) {
  console.log(error.name);     // Output: TypeError
  console.log(error.message);  // Output: x.toUpperCase is not a function
}

console.log("Program continues normally");  // Output: Program continues normally
```

### Only Errors Inside `try` Are Caught:

```js
// ❌ This error is OUTSIDE try — not caught!
// const a = undefinedVar;  // 💥 ReferenceError crashes the program

try {
  const a = undefinedVar;  // ✅ This error IS caught
} catch (error) {
  console.log("Caught:", error.message);  // Output: Caught: undefinedVar is not defined
}
```

### `try...catch` Only Works for Runtime Errors:

```js
// ❌ Syntax errors are NOT caught by try...catch
// try {
//   let x = ;;;  // SyntaxError — JS can't even parse this!
// } catch (e) { }

// ✅ Runtime errors ARE caught
try {
  eval("let x = ;;;");  // Runtime syntax error (eval runs at runtime)
} catch (error) {
  console.log("Caught:", error.message);  // Output: Caught: Unexpected token ';'
}
```

---

## The Error Object

When an error occurs, JavaScript creates an **Error object** with useful information:

```js
try {
  null.toString();
} catch (error) {
  console.log(error.name);      // Output: TypeError
  console.log(error.message);   // Output: Cannot read properties of null (reading 'toString')
  console.log(error.stack);     // Output: Full stack trace (shows WHERE the error happened)
  console.log(typeof error);    // Output: object
  console.log(error instanceof Error);  // Output: true
}
```

### Properties of an Error:

| Property   | What It Contains                              |
|------------|-----------------------------------------------|
| `name`     | Type of error (`TypeError`, `ReferenceError`) |
| `message`  | Human-readable description                    |
| `stack`    | Stack trace — where the error happened        |
| `cause`    | The original error that caused this one (ES2022) |

---

## Built-in Error Types

JavaScript has **7 built-in error types**:

### 1. `Error` — Generic Error

```js
throw new Error("Something went wrong");
// Error: Something went wrong
```

### 2. `TypeError` — Wrong Type

Happens when you use a value in the wrong way.

```js
try {
  null.toString();               // can't call methods on null
  // let x = 5; x();             // number is not a function
  // undefined.property;         // can't read property of undefined
} catch (e) {
  console.log(e.name);  // Output: TypeError
}
```

### 3. `ReferenceError` — Variable Doesn't Exist

```js
try {
  console.log(nonExistentVar);  // variable was never declared
} catch (e) {
  console.log(e.name);     // Output: ReferenceError
  console.log(e.message);  // Output: nonExistentVar is not defined
}
```

### 4. `SyntaxError` — Invalid Code Structure

```js
try {
  eval("let x = {");  // incomplete object literal
} catch (e) {
  console.log(e.name);  // Output: SyntaxError
}
```

### 5. `RangeError` — Value Out of Range

```js
try {
  const arr = new Array(-1);         // negative array length
  // (1).toFixed(200);               // too many decimal places
  // function f() { f(); } f();      // ❌ Maximum call stack exceeded
} catch (e) {
  console.log(e.name);  // Output: RangeError
}
```

### 6. `URIError` — Invalid URI

```js
try {
  decodeURIComponent("%");  // invalid URI encoding
} catch (e) {
  console.log(e.name);  // Output: URIError
}
```

### 7. `EvalError` — Error in eval() (rare)

```js
// Rarely occurs in modern JS — kept for backward compatibility
// const e = new EvalError("eval error");
```

### Summary Table:

| Error Type       | When It Happens                                  |
|------------------|--------------------------------------------------|
| `Error`          | Generic errors                                   |
| `TypeError`      | Wrong type usage (`null.x`, calling non-function) |
| `ReferenceError` | Using undeclared variable                        |
| `SyntaxError`    | Invalid code syntax                              |
| `RangeError`     | Value out of allowed range                       |
| `URIError`       | Invalid URI encoding/decoding                    |
| `EvalError`      | Problems with eval() (very rare)                 |

---

## `throw` — Creating Your Own Errors

You can **throw** your own errors when something goes wrong in your logic:

```js
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Both arguments must be numbers");
  }
  if (b === 0) {
    throw new Error("Cannot divide by zero!");
  }
  return a / b;
}

try {
  console.log(divide(10, 2));     // Output: 5
  console.log(divide(10, 0));     // ❌ Throws Error
} catch (error) {
  console.log(error.message);     // Output: Cannot divide by zero!
}

try {
  divide("hello", 5);             // ❌ Throws TypeError
} catch (error) {
  console.log(error.name);        // Output: TypeError
  console.log(error.message);     // Output: Both arguments must be numbers
}
```

### You Can Throw Anything (But Shouldn't):

```js
// ✅ GOOD — throw Error objects
throw new Error("Something failed");
throw new TypeError("Expected a string");

// ⚠️ Works but BAD — throw non-Error values (no stack trace!)
throw "Something failed";          // string
throw 404;                          // number
throw { status: 500, msg: "Oops" }; // object
throw false;                        // boolean

// Why it's bad:
try {
  throw "just a string";
} catch (error) {
  console.log(error.message);  // Output: undefined  (strings don't have .message!)
  console.log(error.stack);    // Output: undefined  (no stack trace!)
  console.log(error);          // Output: just a string
}
```

> **Always throw `new Error()` or its subclasses** — never throw primitives!

---

## `finally` — Always Runs

`finally` block runs **no matter what** — whether there was an error or not. Perfect for cleanup tasks.

```js
try {
  console.log("Step 1: Try block");
  // throw new Error("Oops!");  // uncomment to test error path
  console.log("Step 2: No error!");
} catch (error) {
  console.log("Step 3: Caught error:", error.message);
} finally {
  console.log("Step 4: Finally — ALWAYS runs!");
}

// Without error:
// Output: Step 1: Try block
// Output: Step 2: No error!
// Output: Step 4: Finally — ALWAYS runs!

// With error (uncomment the throw):
// Output: Step 1: Try block
// Output: Step 3: Caught error: Oops!
// Output: Step 4: Finally — ALWAYS runs!
```

### `finally` Even Runs After `return`:

```js
function getData() {
  try {
    return "data from try";
  } finally {
    console.log("Cleanup in finally");  // ← Still runs!
  }
}

const result = getData();
// Output: Cleanup in finally
console.log(result);  // Output: data from try
```

### Real-World: File/Connection Cleanup

```js
class DatabaseConnection {
  #connected = false;

  connect() {
    this.#connected = true;
    console.log("📡 Connected to database");
  }

  query(sql) {
    if (!this.#connected) throw new Error("Not connected!");
    console.log(`📊 Executing: ${sql}`);
    // Simulate a random failure:
    if (Math.random() > 0.5) throw new Error("Query timeout!");
    return [{ id: 1, name: "Ankit" }];
  }

  disconnect() {
    this.#connected = false;
    console.log("🔌 Disconnected from database");
  }
}

const db = new DatabaseConnection();

try {
  db.connect();
  const users = db.query("SELECT * FROM users");
  console.log("Users:", users);
} catch (error) {
  console.log("❌ Error:", error.message);
} finally {
  db.disconnect();  // ✅ ALWAYS disconnect — even if query fails!
}
// Output (success): 📡 Connected → 📊 Executing → Users: [...] → 🔌 Disconnected
// Output (failure): 📡 Connected → 📊 Executing → ❌ Error: Query timeout! → 🔌 Disconnected
```

### `try...finally` Without `catch`:

```js
function timer() {
  console.time("operation");
  try {
    // Some operation...
    for (let i = 0; i < 1000000; i++) {}
    return "done";
  } finally {
    console.timeEnd("operation");  // ✅ Always logs the time
  }
}

timer();  // Output: operation: 2.xxx ms
```

---

## Custom Error Classes

Create your own error types for **specific** error scenarios:

```js
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`);
    this.name = "NotFoundError";
    this.resource = resource;
    this.id = id;
    this.statusCode = 404;
  }
}

class AuthenticationError extends Error {
  constructor(message = "Authentication failed") {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

class PermissionError extends Error {
  constructor(action) {
    super(`You don't have permission to ${action}`);
    this.name = "PermissionError";
    this.action = action;
    this.statusCode = 403;
  }
}

// Using custom errors:
function validateUser(data) {
  if (!data.name || data.name.trim() === "") {
    throw new ValidationError("name", "Name is required");
  }
  if (!data.email || !data.email.includes("@")) {
    throw new ValidationError("email", "Valid email is required");
  }
  if (data.age < 0 || data.age > 150) {
    throw new ValidationError("age", "Age must be between 0 and 150");
  }
  return true;
}

try {
  validateUser({ name: "", email: "test", age: 200 });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`❌ Validation failed on '${error.field}': ${error.message}`);
    // Output: ❌ Validation failed on 'name': Name is required
  }
}

try {
  throw new NotFoundError("User", 42);
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log(`${error.statusCode}: ${error.message}`);
    // Output: 404: User with id 42 not found
  }
}
```

---

## Catching Specific Error Types

Use `instanceof` to handle different errors differently:

```js
function processInput(input) {
  if (typeof input !== "string") {
    throw new TypeError("Input must be a string");
  }

  const parsed = JSON.parse(input);  // might throw SyntaxError

  if (!parsed.id) {
    throw new ValidationError("id", "ID is required");
  }

  return parsed;
}

function handleInput(input) {
  try {
    const result = processInput(input);
    console.log("✅ Success:", result);
  } catch (error) {
    if (error instanceof TypeError) {
      console.log("⚠️ Type error:", error.message);
    } else if (error instanceof SyntaxError) {
      console.log("⚠️ Invalid JSON format:", error.message);
    } else if (error instanceof ValidationError) {
      console.log(`⚠️ Validation error on '${error.field}':`, error.message);
    } else {
      console.log("❌ Unknown error:", error.message);
      throw error;  // re-throw unknown errors
    }
  }
}

handleInput(42);                           // Output: ⚠️ Type error: Input must be a string
handleInput("not json");                   // Output: ⚠️ Invalid JSON format: ...
handleInput('{"name":"Ankit"}');           // Output: ⚠️ Validation error on 'id': ID is required
handleInput('{"id":1,"name":"Ankit"}');    // Output: ✅ Success: { id: 1, name: "Ankit" }
```

---

## Re-throwing Errors

Sometimes you catch an error, check it, and if it's not what you expected, **throw it again** for someone else to handle:

```js
function readConfig(json) {
  try {
    const config = JSON.parse(json);
    if (!config.apiKey) {
      throw new ValidationError("apiKey", "API key is required in config");
    }
    return config;
  } catch (error) {
    if (error instanceof SyntaxError) {
      // We know how to handle this — convert to a better message
      throw new Error("Config file is not valid JSON");
    }
    throw error;  // Re-throw anything else (like ValidationError)
  }
}

try {
  readConfig("not json");
} catch (error) {
  console.log(error.message);  // Output: Config file is not valid JSON
}

try {
  readConfig('{"name":"App"}');
} catch (error) {
  console.log(error.message);  // Output: API key is required in config
}
```

---

## Error `cause` (ES2022)

Chain errors to track **why** an error happened:

```js
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (originalError) {
    // Wrap the original error with context:
    throw new Error(`Failed to fetch user ${id}`, {
      cause: originalError  // ← attach the original error
    });
  }
}

try {
  // await fetchUser(123);
  throw new Error("Failed to fetch user 123", {
    cause: new Error("HTTP 500")
  });
} catch (error) {
  console.log(error.message);        // Output: Failed to fetch user 123
  console.log(error.cause.message);  // Output: HTTP 500
}
```

---

## Nested `try...catch`

You can nest them — inner catch handles specific errors, outer catch handles the rest:

```js
function processOrder(order) {
  try {
    // Outer try — handles general failures
    console.log("Processing order...");

    try {
      // Inner try — handles payment specifically
      if (!order.payment) {
        throw new Error("No payment method provided");
      }
      console.log(`Payment processed: ${order.payment}`);
    } catch (paymentError) {
      console.log(`⚠️ Payment issue: ${paymentError.message}`);
      console.log("Switching to default payment...");
      order.payment = "Cash on Delivery";
    }

    // Continue with the rest
    if (!order.address) {
      throw new Error("No delivery address");
    }

    console.log(`✅ Order confirmed! Payment: ${order.payment}, Address: ${order.address}`);
  } catch (error) {
    console.log(`❌ Order failed: ${error.message}`);
  }
}

processOrder({ payment: null, address: "Delhi" });
// Output:
// Processing order...
// ⚠️ Payment issue: No payment method provided
// Switching to default payment...
// ✅ Order confirmed! Payment: Cash on Delivery, Address: Delhi

processOrder({ payment: "UPI", address: null });
// Output:
// Processing order...
// Payment processed: UPI
// ❌ Order failed: No delivery address
```

---

## Error Handling with Promises

### `.catch()` Method:

```js
function fetchData(url) {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error("URL is required"));
      return;
    }
    if (!url.startsWith("http")) {
      reject(new TypeError("Invalid URL format"));
      return;
    }
    // Simulate fetch:
    setTimeout(() => {
      resolve({ data: "Some data from " + url });
    }, 1000);
  });
}

// Using .then().catch()
fetchData("https://api.example.com")
  .then(result => {
    console.log("✅", result);
    // Output: ✅ { data: "Some data from https://api.example.com" }
  })
  .catch(error => {
    console.log("❌", error.message);
  });

fetchData("")
  .then(result => console.log(result))
  .catch(error => console.log("❌", error.message));
// Output: ❌ URL is required
```

### `.catch()` Catches Errors in `.then()` Too:

```js
Promise.resolve("hello")
  .then(value => {
    console.log(value);       // Output: hello
    throw new Error("Broke in then!");  // error inside .then()
    return value.toUpperCase();
  })
  .then(value => {
    console.log("This won't run");
  })
  .catch(error => {
    console.log("Caught:", error.message);  // Output: Caught: Broke in then!
  });
```

### `.finally()` with Promises:

```js
function loadData() {
  console.log("⏳ Loading...");

  return fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
      if (!response.ok) throw new Error("HTTP Error");
      return response.json();
    })
    .then(data => {
      console.log("✅ Got:", data.name);
      return data;
    })
    .catch(error => {
      console.log("❌ Failed:", error.message);
    })
    .finally(() => {
      console.log("⏳ Loading complete (success or failure)");
    });
}
```

---

## Error Handling with Async/Await

### `try...catch` with `async/await`:

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
    console.log(`❌ Failed to get user: ${error.message}`);
    return null;  // return a fallback value
  } finally {
    console.log("Request completed");
  }
}

// await getUser(1);
// Output: ✅ User: Leanne Graham
// Output: Request completed

// await getUser(99999);
// Output: ❌ Failed to get user: HTTP Error: 404
// Output: Request completed
```

### Handling Multiple Async Operations:

```js
async function fetchMultipleUsers(ids) {
  const results = [];
  const errors = [];

  // Method 1: Loop with individual error handling
  for (const id of ids) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!response.ok) throw new Error(`User ${id}: HTTP ${response.status}`);
      const user = await response.json();
      results.push(user);
    } catch (error) {
      errors.push({ id, error: error.message });
    }
  }

  console.log(`✅ Loaded: ${results.length}, ❌ Failed: ${errors.length}`);
  return { results, errors };
}

// Method 2: Promise.allSettled (parallel, handles each result)
async function fetchAllUsers(ids) {
  const promises = ids.map(id =>
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
  );

  const results = await Promise.allSettled(promises);

  const succeeded = results.filter(r => r.status === "fulfilled").map(r => r.value);
  const failed = results.filter(r => r.status === "rejected").map(r => r.reason);

  console.log(`✅ ${succeeded.length} succeeded, ❌ ${failed.length} failed`);
  return { succeeded, failed };
}
```

### Promise.all vs Promise.allSettled for Error Handling:

```js
// Promise.all — fails FAST (one failure = everything fails)
try {
  const results = await Promise.all([
    fetch("/api/users"),
    fetch("/api/BAD_URL"),    // ❌ This fails
    fetch("/api/products")     // This gets cancelled
  ]);
} catch (error) {
  console.log("Everything failed because one failed:", error.message);
}

// Promise.allSettled — never fails, shows individual results
const results = await Promise.allSettled([
  Promise.resolve("User data"),
  Promise.reject(new Error("Failed")),
  Promise.resolve("Product data")
]);

results.forEach((result, i) => {
  if (result.status === "fulfilled") {
    console.log(`#${i + 1} ✅:`, result.value);
  } else {
    console.log(`#${i + 1} ❌:`, result.reason.message);
  }
});
// Output:
// #1 ✅: User data
// #2 ❌: Failed
// #3 ✅: Product data
```

---

## Global Error Handling

### In Browsers:

```js
// Catch ALL unhandled errors (last resort)
window.onerror = function(message, source, line, col, error) {
  console.log("🔥 Global error:", message);
  console.log("📄 File:", source, "Line:", line);
  // Send to error tracking service
  return true;  // prevents default browser error handling
};

// Catch unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.log("🔥 Unhandled promise rejection:", event.reason.message);
  event.preventDefault();
});
```

### In Node.js:

```js
// Catch unhandled exceptions
process.on("uncaughtException", (error) => {
  console.error("🔥 Uncaught Exception:", error.message);
  // Log the error, clean up, then exit
  process.exit(1);
});

// Catch unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("🔥 Unhandled Rejection:", reason);
});
```

---

## Error Handling Patterns

### Pattern 1: Result Object (No Throwing)

Instead of throwing, return an object with success/failure info:

```js
function safeDivide(a, b) {
  if (b === 0) {
    return { success: false, error: "Cannot divide by zero" };
  }
  return { success: true, value: a / b };
}

const result = safeDivide(10, 0);
if (result.success) {
  console.log("Result:", result.value);
} else {
  console.log("Error:", result.error);  // Output: Error: Cannot divide by zero
}

// More structured version:
function safeParseJSON(json) {
  try {
    return { ok: true, data: JSON.parse(json) };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

const r1 = safeParseJSON('{"name":"Ankit"}');
console.log(r1);  // Output: { ok: true, data: { name: "Ankit" } }

const r2 = safeParseJSON("not json");
console.log(r2);  // Output: { ok: false, error: "..." }
```

### Pattern 2: Default Values on Error

```js
function safeGet(obj, path, defaultValue = undefined) {
  try {
    return path.split(".").reduce((current, key) => current[key], obj) ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

const user = { profile: { name: "Ankit", address: { city: "Delhi" } } };

console.log(safeGet(user, "profile.name"));            // Output: Ankit
console.log(safeGet(user, "profile.address.city"));     // Output: Delhi
console.log(safeGet(user, "profile.phone", "N/A"));     // Output: N/A
console.log(safeGet(user, "x.y.z", "default"));         // Output: default
```

### Pattern 3: Retry on Failure

```js
async function retry(fn, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.log(`Attempt ${attempt}/${maxRetries} failed: ${error.message}`);

      if (attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts`, { cause: error });
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
}

// Usage:
// const data = await retry(() => fetch("/api/data").then(r => r.json()), 3, 1000);
```

### Pattern 4: Error Boundary (Wrapper)

```js
function withErrorHandling(fn, errorHandler) {
  return function(...args) {
    try {
      const result = fn(...args);
      // Handle async functions too:
      if (result instanceof Promise) {
        return result.catch(errorHandler);
      }
      return result;
    } catch (error) {
      return errorHandler(error);
    }
  };
}

// Usage:
const safeParse = withErrorHandling(
  (json) => JSON.parse(json),
  (error) => {
    console.log("Parse failed:", error.message);
    return null;
  }
);

console.log(safeParse('{"a":1}'));   // Output: { a: 1 }
console.log(safeParse("bad json"));  // Output: Parse failed: ... → null
```

---

## `catch` Without Error Variable (Optional Catch Binding)

If you don't need the error details, you can skip the variable (ES2019):

```js
// ✅ Before ES2019 — had to include the variable even if unused
try {
  JSON.parse("bad");
} catch (error) {  // `error` is required but unused
  console.log("Invalid JSON");
}

// ✅ ES2019+ — skip the variable
try {
  JSON.parse("bad");
} catch {  // no variable needed!
  console.log("Invalid JSON");  // Output: Invalid JSON
}
```

---

## Common Mistakes

### Mistake 1: Swallowing Errors Silently

```js
// ❌ BAD — error is caught but nothing happens (silent failure)
try {
  criticalOperation();
} catch (error) {
  // empty catch — the worst thing you can do!
}

// ✅ GOOD — at least log the error
try {
  criticalOperation();
} catch (error) {
  console.error("Operation failed:", error);
  // Or send to error tracking: reportError(error);
}
```

### Mistake 2: Catching Too Broadly

```js
// ❌ BAD — catches ALL errors, including bugs
try {
  const data = processData(input);
  cosole.log(data);  // ← Typo! "cosole" instead of "console"
} catch (error) {
  console.log("Invalid input");  // ← Wrong! It was a typo, not invalid input!
}

// ✅ GOOD — catch specific errors
try {
  const data = processData(input);
  console.log(data);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Invalid input:", error.message);
  } else {
    throw error;  // re-throw unexpected errors (like typos)
  }
}
```

### Mistake 3: Using try...catch for Flow Control

```js
// ❌ BAD — using errors for normal program flow
function isValidEmail(email) {
  try {
    if (!email.includes("@")) throw new Error("invalid");
    return true;
  } catch {
    return false;
  }
}

// ✅ GOOD — use normal conditions
function isValidEmail(email) {
  return typeof email === "string" && email.includes("@") && email.includes(".");
}
```

### Mistake 4: Forgetting Async Error Handling

```js
// ❌ BAD — try...catch doesn't catch async errors this way
try {
  setTimeout(() => {
    throw new Error("Timeout error!");  // NOT caught by outer try!
  }, 1000);
} catch (error) {
  console.log("This never runs");
}

// ✅ GOOD — handle errors inside the async callback
setTimeout(() => {
  try {
    throw new Error("Timeout error!");
  } catch (error) {
    console.log("Caught:", error.message);  // Output: Caught: Timeout error!
  }
}, 1000);
```

---

## Real-World: Form Validation

```js
class FormValidator {
  #errors = [];

  validate(formData) {
    this.#errors = [];

    this.#validateRequired(formData, "name", "Name");
    this.#validateEmail(formData.email);
    this.#validatePassword(formData.password);
    this.#validateAge(formData.age);

    if (this.#errors.length > 0) {
      throw new ValidationError("form", this.#errors.join("; "));
    }

    return true;
  }

  #validateRequired(data, field, label) {
    if (!data[field] || data[field].trim() === "") {
      this.#errors.push(`${label} is required`);
    }
  }

  #validateEmail(email) {
    if (!email) {
      this.#errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.#errors.push("Email format is invalid");
    }
  }

  #validatePassword(password) {
    if (!password) {
      this.#errors.push("Password is required");
    } else if (password.length < 8) {
      this.#errors.push("Password must be at least 8 characters");
    } else if (!/[A-Z]/.test(password)) {
      this.#errors.push("Password must contain an uppercase letter");
    } else if (!/[0-9]/.test(password)) {
      this.#errors.push("Password must contain a number");
    }
  }

  #validateAge(age) {
    if (age !== undefined) {
      if (typeof age !== "number" || age < 13 || age > 120) {
        this.#errors.push("Age must be between 13 and 120");
      }
    }
  }
}

const validator = new FormValidator();

try {
  validator.validate({
    name: "Ankit",
    email: "ankit@mail.com",
    password: "MyPass123",
    age: 20
  });
  console.log("✅ Form is valid!");
  // Output: ✅ Form is valid!
} catch (error) {
  console.log("❌ Form errors:", error.message);
}

try {
  validator.validate({
    name: "",
    email: "bad-email",
    password: "short",
    age: 5
  });
} catch (error) {
  console.log("❌ Errors:", error.message);
  // Output: ❌ Errors: Name is required; Email format is invalid; Password must be at least 8 characters; Age must be between 13 and 120
}
```

---

## Quick Summary

| Concept                  | Description                                                    |
|--------------------------|----------------------------------------------------------------|
| `try...catch`            | Wrap risky code in `try`, handle errors in `catch`              |
| `finally`                | Always runs — cleanup code (close connections, stop loading)    |
| `throw`                  | Create and throw your own errors                               |
| Error object             | Has `name`, `message`, `stack`, `cause`                        |
| Built-in errors          | `TypeError`, `ReferenceError`, `SyntaxError`, `RangeError`, `URIError` |
| Custom errors            | `class MyError extends Error` — for specific scenarios         |
| `instanceof`             | Check error type: `error instanceof TypeError`                  |
| Re-throwing              | Catch, check, and throw again if you can't handle it           |
| `.catch()`               | Error handling for Promises                                    |
| `try...catch` with async | Use with `await` for async error handling                      |
| `Promise.allSettled`     | Get results of all promises regardless of failures             |
| Optional catch binding   | `catch { }` without error variable (ES2019)                    |
| Error `cause`            | Chain errors with `{ cause: originalError }` (ES2022)          |
| Global handlers          | `window.onerror`, `unhandledrejection`, `process.on`           |

---

> **Key Takeaways**:
> 1. Always wrap **risky operations** in `try...catch` (JSON parsing, API calls, file ops)
> 2. Use `finally` for **cleanup** — it runs no matter what
> 3. **Throw Error objects**, never primitives — you need `message` and `stack`
> 4. Create **custom error classes** for specific error types
> 5. Use `instanceof` to handle **different errors differently**
> 6. Don't **swallow errors silently** — at least log them
> 7. For async code, use `try...catch` with `await` or `.catch()` with promises 🎯
