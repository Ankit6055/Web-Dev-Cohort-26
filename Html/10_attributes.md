# Global Attributes & Data Attributes in HTML

## What Are Global Attributes?

Global attributes are attributes that work on **ANY** HTML element — not just specific ones. You can put them on `<div>`, `<p>`, `<span>`, `<img>`, or literally anything.

---

## `id` — Unique Identifier

Every `id` must be **unique** on the page — only ONE element can have it.

```html
<h1 id="main-title">Welcome</h1>
<div id="sidebar">Sidebar content</div>

<!-- Used for: -->
<!-- 1. CSS targeting -->
<style>
    #main-title { color: blue; }
</style>

<!-- 2. JavaScript selection -->
<script>
    document.getElementById("main-title").textContent = "Hello!";
</script>

<!-- 3. Anchor links -->
<a href="#sidebar">Jump to sidebar</a>

<!-- ❌ NEVER use the same id twice -->
<div id="box">One</div>
<div id="box">Two</div>  <!-- WRONG — duplicate id! -->
```

### Naming Rules:
- Must start with a **letter** (a-z, A-Z)
- Can contain letters, numbers, hyphens, underscores
- Case-sensitive (`myId` ≠ `myid`)
- No spaces

```html
<!-- ✅ Valid -->
<div id="main-content"></div>
<div id="section_2"></div>
<div id="navBar"></div>

<!-- ❌ Invalid -->
<div id="123abc"></div>      <!-- Can't start with number -->
<div id="my box"></div>      <!-- No spaces -->
```

---

## `class` — Reusable Group Name

Unlike `id`, classes can be **reused** on multiple elements, and one element can have **multiple classes**:

```html
<!-- Same class on multiple elements -->
<p class="highlight">Important text</p>
<p class="highlight">Also important</p>

<!-- Multiple classes on one element (space-separated) -->
<div class="card featured large">Card content</div>

<!-- CSS targets classes with a dot (.) -->
<style>
    .highlight { background: yellow; }
    .card { border: 1px solid #ddd; padding: 16px; }
    .featured { border-color: gold; }
    .large { font-size: 1.2em; }
</style>
```

### `id` vs `class`:

| Feature     | `id`                    | `class`                  |
|-------------|-------------------------|--------------------------|
| Uniqueness  | Must be unique          | Can be reused            |
| Per element | Only ONE id             | Multiple classes allowed |
| CSS selector| `#myId`                 | `.myClass`               |
| JS selector | `getElementById()`      | `getElementsByClassName()`|
| Specificity | Higher (stronger)       | Lower                   |

---

## `style` — Inline CSS

Apply CSS directly to an element (use sparingly):

```html
<p style="color: red; font-size: 18px; font-weight: bold;">
    Red bold text
</p>

<!-- ⚠️ Inline styles override external CSS -->
<!-- ❌ Avoid for maintainability — use CSS files instead -->
<!-- ✅ OK for quick testing or dynamic styles via JavaScript -->
```

---

## `title` — Tooltip on Hover

```html
<p title="This is extra information">Hover over me!</p>
<!-- Shows a small tooltip when you hover -->

<abbr title="HyperText Markup Language">HTML</abbr>
<!-- Hover to see the full form -->

<a href="/help" title="Go to help page">Help</a>
```

---

## `hidden` — Hide an Element

```html
<!-- Completely hides the element (like display: none) -->
<p hidden>You can't see me!</p>

<!-- Toggle with JavaScript -->
<p id="secret" hidden>Secret content</p>
<button onclick="document.getElementById('secret').hidden = false">
    Show secret
</button>
```

---

## `tabindex` — Keyboard Navigation Order

Controls the **Tab key order** for keyboard navigation:

```html
<!-- Default tab order follows HTML order -->
<input type="text" placeholder="First (tab 1)">
<input type="text" placeholder="Second (tab 2)">
<input type="text" placeholder="Third (tab 3)">

<!-- Custom tab order -->
<input type="text" tabindex="3" placeholder="Third">
<input type="text" tabindex="1" placeholder="First">
<input type="text" tabindex="2" placeholder="Second">

<!-- tabindex="0" — adds to natural tab order (for non-focusable elements) -->
<div tabindex="0">I can now receive keyboard focus!</div>

<!-- tabindex="-1" — focusable by JS only, not by Tab key -->
<div tabindex="-1" id="modal">Focus me with JavaScript</div>
```

| Value       | Behavior                                    |
|-------------|---------------------------------------------|
| Positive    | Tab to this FIRST (in order: 1, 2, 3...)    |
| `0`         | Follow natural HTML order                   |
| `-1`        | Only focusable via JavaScript, not Tab key  |

---

## `contenteditable` — Make Any Element Editable

```html
<!-- User can click and type to edit! -->
<div contenteditable="true">
    Click me and start typing!
</div>

<h2 contenteditable="true">Edit this heading</h2>

<table>
    <tr>
        <td contenteditable="true">Edit me</td>
        <td contenteditable="true">Edit me too</td>
    </tr>
</table>

<!-- Great for: rich text editors, inline editing -->
```

---

## `draggable` — Drag and Drop

```html
<img src="photo.jpg" alt="Drag me" draggable="true">
<div draggable="true">Drag this box</div>
<div draggable="false">Can't drag me</div>

<!-- Images and links are draggable by default -->
<!-- Other elements need draggable="true" -->
<!-- Actual drag-and-drop needs JavaScript event handlers -->
```

---

## `spellcheck` — Spell Checking

```html
<!-- Enable spell checking -->
<textarea spellcheck="true">Tihs has a speling eror</textarea>
<!-- Browser underlines misspelled words -->

<!-- Disable spell checking (for code editors, etc.) -->
<input type="text" spellcheck="false">
```

---

## `translate` — Translation Hint

```html
<!-- Tell translation tools to NOT translate this -->
<p>Use the <code translate="no">console.log()</code> function.</p>

<!-- Brand name — don't translate -->
<span translate="no">Google Chrome</span>
```

---

## `dir` — Text Direction

```html
<!-- Left to right (default for English) -->
<p dir="ltr">This is English text</p>

<!-- Right to left (Arabic, Hebrew) -->
<p dir="rtl">هذا نص عربي</p>

<!-- Auto-detect direction -->
<p dir="auto">Let the browser decide</p>
```

---

## `lang` — Language

```html
<html lang="en">  <!-- Page is in English -->

<!-- Different language for specific content -->
<p>The French word for hello is <span lang="fr">bonjour</span>.</p>

<!-- Helps: screen readers pronounce correctly, search engines, translators -->
```

---

## Data Attributes — `data-*`

Custom attributes YOU define to store extra data on any element. They start with `data-` followed by any name you want.

```html
<div 
    data-user-id="42" 
    data-role="admin" 
    data-color="blue"
>
    Ankit
</div>

<!-- Access in JavaScript: -->
<script>
    const div = document.querySelector("[data-user-id]");
    console.log(div.dataset.userId);   // "42"
    console.log(div.dataset.role);     // "admin"
    console.log(div.dataset.color);    // "blue"
</script>
```

### Naming Convention:

```html
<!-- HTML: data-kebab-case -->
<div data-user-name="Ankit" data-is-active="true"></div>

<!-- JavaScript: camelCase via .dataset -->
<script>
    // data-user-name  → dataset.userName
    // data-is-active  → dataset.isActive
    element.dataset.userName;    // "Ankit"
    element.dataset.isActive;    // "true" (always a string!)
</script>
```

### CSS Access:

```html
<style>
    /* Target elements with specific data attributes */
    [data-role="admin"] {
        color: red;
        font-weight: bold;
    }

    [data-color="blue"] {
        background: lightblue;
    }

    /* Show data attribute value */
    [data-tooltip]:hover::after {
        content: attr(data-tooltip);
        background: black;
        color: white;
        padding: 4px 8px;
    }
</style>

<span data-tooltip="This is a tooltip">Hover me</span>
```

### Real-World Data Attribute Examples:

```html
<!-- Product cards -->
<div class="product" data-product-id="101" data-price="29.99" data-category="electronics">
    <h3>Wireless Mouse</h3>
    <button onclick="addToCart(this.parentElement.dataset.productId)">
        Add to Cart
    </button>
</div>

<!-- Tabs -->
<button data-tab="overview" class="tab-btn active">Overview</button>
<button data-tab="features" class="tab-btn">Features</button>
<button data-tab="reviews" class="tab-btn">Reviews</button>

<div data-tab-content="overview">Overview content...</div>
<div data-tab-content="features" hidden>Features content...</div>
<div data-tab-content="reviews" hidden>Reviews content...</div>

<!-- Toggle (dark mode) -->
<button data-theme="dark" onclick="toggleTheme(this)">
    🌙 Dark Mode
</button>

<!-- Analytics tracking -->
<a href="/pricing" data-track="click" data-track-label="pricing-link">
    View Pricing
</a>
```

---

## ARIA Attributes — Accessibility

ARIA (Accessible Rich Internet Applications) attributes help screen readers understand your page:

```html
<!-- Role — tells screen reader what the element IS -->
<div role="button" tabindex="0">Click me</div>
<div role="alert">Something went wrong!</div>
<nav role="navigation">...</nav>

<!-- aria-label — invisible label -->
<button aria-label="Close dialog">✕</button>
<input type="search" aria-label="Search the site">

<!-- aria-hidden — hide from screen readers -->
<span aria-hidden="true">🎨</span>  <!-- Decorative emoji, skip it -->

<!-- aria-expanded — collapsible state -->
<button aria-expanded="false" onclick="toggleMenu()">Menu</button>

<!-- aria-required — required field -->
<input type="email" aria-required="true">

<!-- aria-describedby — links to description -->
<input type="password" aria-describedby="pw-hint">
<p id="pw-hint">Must be at least 8 characters.</p>
```

---

## All Global Attributes — Quick Reference

| Attribute          | Purpose                                    |
|-------------------|--------------------------------------------|
| `id`              | Unique identifier                           |
| `class`           | Reusable CSS class name(s)                  |
| `style`           | Inline CSS styles                           |
| `title`           | Tooltip on hover                            |
| `hidden`          | Hides the element                           |
| `tabindex`        | Keyboard tab order                          |
| `contenteditable` | Makes element editable                      |
| `draggable`       | Enables drag-and-drop                       |
| `spellcheck`      | Enable/disable spell checking               |
| `translate`       | Should translation tools translate this     |
| `dir`             | Text direction (ltr, rtl, auto)             |
| `lang`            | Language of the content                     |
| `data-*`          | Custom data attributes                      |
| `role`            | ARIA role                                   |
| `aria-*`          | ARIA accessibility attributes               |
| `accesskey`       | Keyboard shortcut to focus/activate         |
| `autocapitalize`  | Text capitalization on mobile               |
| `autofocus`       | Auto-focus on page load                     |
| `enterkeyhint`    | Label for Enter key on mobile keyboard      |
| `inputmode`       | Type of mobile keyboard to show             |
| `is`              | Custom element behavior                     |
| `part`            | CSS shadow DOM part name                    |
| `slot`            | Shadow DOM slot assignment                  |
| `nonce`           | Security nonce for CSP                      |

---

> **Key Takeaways**:
> 1. `id` = unique (one per page), `class` = reusable (many elements, many classes)
> 2. `data-*` attributes let you store **custom data** on any element — access via `dataset` in JS
> 3. `tabindex` controls keyboard navigation — use `0` for natural order, `-1` for JS-only focus
> 4. `contenteditable="true"` makes any element editable — great for rich text editors
> 5. `hidden` completely hides an element — toggle with JavaScript
> 6. Always add `lang` on `<html>` for accessibility and SEO
> 7. Use `aria-*` attributes to make custom components accessible to screen readers 🎯
