# Lists in HTML

## Three Types of Lists

HTML has 3 types of lists:

| Type                  | Tag    | Use Case                          |
|-----------------------|--------|-----------------------------------|
| **Unordered List**    | `<ul>` | Bullet points (order doesn't matter) |
| **Ordered List**      | `<ol>` | Numbered items (order matters)    |
| **Description List**  | `<dl>` | Term + definition pairs           |

---

## Unordered List — `<ul>`

A list with **bullets** (dots, circles, squares). Order doesn't matter.

```html
<h3>Grocery List</h3>
<ul>
    <li>Milk</li>
    <li>Eggs</li>
    <li>Bread</li>
    <li>Butter</li>
</ul>

<!-- Shows:
  • Milk
  • Eggs
  • Bread
  • Butter
-->
```

### Change Bullet Style with CSS:

```html
<!-- disc (default), circle, square, none -->
<ul style="list-style-type: circle;">
    <li>Item 1</li>  <!-- ○ Item 1 -->
    <li>Item 2</li>  <!-- ○ Item 2 -->
</ul>

<ul style="list-style-type: square;">
    <li>Item 1</li>  <!-- ▪ Item 1 -->
    <li>Item 2</li>  <!-- ▪ Item 2 -->
</ul>

<ul style="list-style-type: none;">
    <li>Item 1</li>  <!-- Item 1 (no bullet) -->
    <li>Item 2</li>  <!-- Item 2 (no bullet) -->
</ul>
```

---

## Ordered List — `<ol>`

A list with **numbers**. Order matters.

```html
<h3>How to Make Tea</h3>
<ol>
    <li>Boil water</li>
    <li>Add tea leaves</li>
    <li>Add milk and sugar</li>
    <li>Strain and serve</li>
</ol>

<!-- Shows:
  1. Boil water
  2. Add tea leaves
  3. Add milk and sugar
  4. Strain and serve
-->
```

### Attributes of `<ol>`:

```html
<!-- type — change the numbering style -->
<ol type="1">  <!-- 1, 2, 3 (default) -->
<ol type="A">  <!-- A, B, C -->
<ol type="a">  <!-- a, b, c -->
<ol type="I">  <!-- I, II, III (Roman) -->
<ol type="i">  <!-- i, ii, iii (Roman lowercase) -->

<!-- start — start from a specific number -->
<ol start="5">
    <li>This is number 5</li>   <!-- 5. This is number 5 -->
    <li>This is number 6</li>   <!-- 6. This is number 6 -->
</ol>

<!-- reversed — count backwards -->
<ol reversed>
    <li>Bronze</li>   <!-- 3. Bronze -->
    <li>Silver</li>   <!-- 2. Silver -->
    <li>Gold</li>     <!-- 1. Gold -->
</ol>

<!-- value — set a specific number for one item -->
<ol>
    <li>Item 1</li>           <!-- 1. Item 1 -->
    <li value="99">Item 99</li> <!-- 99. Item 99 -->
    <li>Item 100</li>          <!-- 100. Item 100 (continues from 99) -->
</ol>
```

---

## Description List — `<dl>`

For **term + definition** pairs — like a dictionary or FAQ:

```html
<h3>Web Terms</h3>
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language — the structure of web pages.</dd>

    <dt>CSS</dt>
    <dd>Cascading Style Sheets — styles the web page (colors, fonts, layout).</dd>

    <dt>JavaScript</dt>
    <dd>A programming language that makes web pages interactive.</dd>
</dl>

<!-- Shows:
HTML
    HyperText Markup Language — the structure of web pages.
CSS
    Cascading Style Sheets — styles the web page.
JavaScript
    A programming language that makes web pages interactive.
-->
```

| Tag    | Role                          |
|--------|-------------------------------|
| `<dl>` | Description List (container)  |
| `<dt>` | Description Term (the word)   |
| `<dd>` | Description Detail (the meaning) |

### Multiple Definitions Per Term:

```html
<dl>
    <dt>JavaScript</dt>
    <dd>A programming language for the web.</dd>
    <dd>Can run in browsers and servers (Node.js).</dd>
</dl>
```

### Multiple Terms Per Definition:

```html
<dl>
    <dt>JS</dt>
    <dt>JavaScript</dt>
    <dd>A programming language for the web.</dd>
</dl>
```

---

## Nested Lists — Lists Inside Lists

You can put lists inside other lists to create **sub-items**:

```html
<h3>Course Topics</h3>
<ul>
    <li>HTML
        <ul>
            <li>Tags</li>
            <li>Attributes</li>
            <li>Forms</li>
        </ul>
    </li>
    <li>CSS
        <ul>
            <li>Selectors</li>
            <li>Flexbox</li>
            <li>Grid</li>
        </ul>
    </li>
    <li>JavaScript
        <ul>
            <li>Variables</li>
            <li>Functions</li>
            <li>DOM</li>
        </ul>
    </li>
</ul>

<!-- Shows:
  • HTML
      ○ Tags
      ○ Attributes
      ○ Forms
  • CSS
      ○ Selectors
      ○ Flexbox
      ○ Grid
  • JavaScript
      ○ Variables
      ○ Functions
      ○ DOM
-->
```

### Mixed Nested Lists:

```html
<ol>
    <li>Set up your project
        <ul>
            <li>Create a folder</li>
            <li>Open VS Code</li>
        </ul>
    </li>
    <li>Write the HTML
        <ul>
            <li>Add DOCTYPE</li>
            <li>Add head and body</li>
        </ul>
    </li>
    <li>Open in browser</li>
</ol>

<!-- Shows:
  1. Set up your project
      • Create a folder
      • Open VS Code
  2. Write the HTML
      • Add DOCTYPE
      • Add head and body
  3. Open in browser
-->
```

---

## Common Use Cases

### Navigation Menu:

```html
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a>
            <ul>
                <li><a href="/services/web">Web Design</a></li>
                <li><a href="/services/app">App Development</a></li>
            </ul>
        </li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
```

### Breadcrumbs:

```html
<nav>
    <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li>Laptop</li>  <!-- current page, no link -->
    </ol>
</nav>
<!-- Home > Products > Laptop -->
```

### FAQ Section:

```html
<section>
    <h2>Frequently Asked Questions</h2>
    <dl>
        <dt>How do I sign up?</dt>
        <dd>Click the "Sign Up" button and fill in the form.</dd>

        <dt>Is it free?</dt>
        <dd>Yes! The basic plan is completely free.</dd>

        <dt>Can I cancel anytime?</dt>
        <dd>Yes, you can cancel your subscription at any time.</dd>
    </dl>
</section>
```

### To-Do List:

```html
<h3>Today's Tasks</h3>
<ul>
    <li><s>Wake up early</s> ✅</li>
    <li><s>Exercise</s> ✅</li>
    <li>Study HTML ⏳</li>
    <li>Build a project</li>
</ul>
```

---

## List Rules & Best Practices

```html
<!-- ✅ CORRECT — li must be direct child of ul/ol -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<!-- ❌ WRONG — can't put text directly in ul -->
<ul>
    Some random text   <!-- WRONG! -->
    <li>Item 1</li>
</ul>

<!-- ❌ WRONG — can't skip ul/ol and just use li -->
<li>Random item</li>   <!-- Where's the parent list? -->

<!-- ✅ li CAN contain any content -->
<ul>
    <li>
        <h3>Item Title</h3>
        <p>Item description goes here.</p>
        <img src="item.jpg" alt="Item image">
    </li>
</ul>
```

---

> **Key Takeaways**:
> 1. `<ul>` = bullets (unordered), `<ol>` = numbers (ordered), `<dl>` = definitions
> 2. Every list item goes in `<li>` (for ul/ol) or `<dt>`/`<dd>` (for dl)
> 3. `<li>` must be a **direct child** of `<ul>` or `<ol>`
> 4. Use `type`, `start`, `reversed` attributes on `<ol>` to customize numbering
> 5. **Nest** lists by putting a new `<ul>`/`<ol>` inside an `<li>`
> 6. Navigation menus are almost always built with `<ul>` lists
> 7. Use `list-style-type: none` in CSS to remove bullets for custom styling 🎯
