# HTML Entities & Special Characters

## What Are HTML Entities?

Some characters have special meaning in HTML — like `<` starts a tag and `&` starts an entity. If you want to **display** these characters as text, you need to use **entities** (escape codes).

```html
<!-- ❌ PROBLEM — browser thinks this is a tag -->
<p>5 < 10 and 10 > 5</p>
<!-- Browser sees <10 and tries to make a tag! -->

<!-- ✅ SOLUTION — use entities -->
<p>5 &lt; 10 and 10 &gt; 5</p>
<!-- Shows: 5 < 10 and 10 > 5 -->
```

---

## Entity Syntax

Two ways to write entities:

```html
<!-- 1. Named entity — &name; -->
&lt;     <!-- < -->
&gt;     <!-- > -->
&amp;    <!-- & -->

<!-- 2. Numeric entity — &#number; -->
&#60;    <!-- < -->
&#62;    <!-- > -->
&#38;    <!-- & -->

<!-- 3. Hex entity — &#xHEX; -->
&#x3C;   <!-- < -->
&#x3E;   <!-- > -->
&#x26;   <!-- & -->
```

---

## Reserved Characters — Must Use Entities

These characters have special meaning in HTML and **must** be escaped:

| Character | Entity Name | Numeric   | Description         |
|:---------:|-------------|-----------|---------------------|
| `<`       | `&lt;`      | `&#60;`   | Less than           |
| `>`       | `&gt;`      | `&#62;`   | Greater than        |
| `&`       | `&amp;`     | `&#38;`   | Ampersand           |
| `"`       | `&quot;`    | `&#34;`   | Double quote        |
| `'`       | `&apos;`    | `&#39;`   | Single quote (apostrophe) |

```html
<!-- Showing HTML code as text -->
<p>An HTML tag looks like: &lt;p&gt;Hello&lt;/p&gt;</p>
<!-- Shows: An HTML tag looks like: <p>Hello</p> -->

<!-- Showing an ampersand -->
<p>Tom &amp; Jerry</p>
<!-- Shows: Tom & Jerry -->

<!-- Quotes inside attributes -->
<p title="She said &quot;hello&quot;">Hover me</p>
```

---

## Whitespace Entities

```html
<!-- Non-breaking space — prevents line break between words -->
<p>100&nbsp;km</p>
<!-- "100" and "km" will always stay on the same line -->

<!-- Multiple spaces (HTML collapses normal spaces) -->
<p>Word1&nbsp;&nbsp;&nbsp;&nbsp;Word2</p>
<!-- Shows: Word1    Word2 -->
```

| Entity      | Name                    | Use Case                     |
|-------------|-------------------------|------------------------------|
| `&nbsp;`    | Non-breaking space      | Keep words together          |
| `&ensp;`    | En space (half em)      | Medium spacing               |
| `&emsp;`    | Em space (full em)      | Large spacing                |
| `&thinsp;`  | Thin space              | Subtle spacing               |
| `&zwj;`     | Zero-width joiner       | Combine emoji characters     |
| `&zwnj;`    | Zero-width non-joiner   | Prevent character joining    |

---

## Common Symbols

### Currency:

| Symbol | Entity      | Numeric    | Name              |
|:------:|-------------|-----------|-------------------|
| $      | `&dollar;`  | `&#36;`   | Dollar             |
| €      | `&euro;`    | `&#8364;` | Euro               |
| £      | `&pound;`   | `&#163;`  | Pound              |
| ¥      | `&yen;`     | `&#165;`  | Yen                |
| ₹      | —           | `&#8377;` | Indian Rupee       |
| ¢      | `&cent;`    | `&#162;`  | Cent               |

```html
<p>Price: &dollar;29.99</p>     <!-- Price: $29.99 -->
<p>Price: &euro;24.99</p>       <!-- Price: €24.99 -->
<p>Price: &#8377;999</p>        <!-- Price: ₹999 -->
```

### Math Symbols:

| Symbol | Entity      | Numeric    | Name               |
|:------:|-------------|-----------|---------------------|
| ×      | `&times;`   | `&#215;`  | Multiplication       |
| ÷      | `&divide;`  | `&#247;`  | Division             |
| ±      | `&plusmn;`  | `&#177;`  | Plus/Minus           |
| ≠      | `&ne;`      | `&#8800;` | Not equal            |
| ≤      | `&le;`      | `&#8804;` | Less than or equal   |
| ≥      | `&ge;`      | `&#8805;` | Greater than or equal|
| ∞      | `&infin;`   | `&#8734;` | Infinity             |
| √      | `&radic;`   | `&#8730;` | Square root          |
| π      | `&pi;`      | `&#960;`  | Pi                   |
| ∑      | `&sum;`     | `&#8721;` | Summation            |
| ∫      | `&int;`     | `&#8747;` | Integral             |

```html
<p>Area = &pi; &times; r<sup>2</sup></p>     <!-- Area = π × r² -->
<p>5 &ne; 6</p>                               <!-- 5 ≠ 6 -->
<p>x &ge; 0</p>                               <!-- x ≥ 0 -->
```

### Arrows:

| Symbol | Entity      | Name              |
|:------:|-------------|-------------------|
| ←      | `&larr;`    | Left arrow        |
| →      | `&rarr;`    | Right arrow       |
| ↑      | `&uarr;`    | Up arrow          |
| ↓      | `&darr;`    | Down arrow        |
| ↔      | `&harr;`    | Left-right arrow  |
| ⇐      | `&lArr;`    | Double left arrow |
| ⇒      | `&rArr;`    | Double right arrow|

```html
<p>Go &rarr; Next Page</p>        <!-- Go → Next Page -->
<p>Home &larr; Back</p>           <!-- Home ← Back -->
<p>&uarr; Scroll to Top</p>       <!-- ↑ Scroll to Top -->
```

### Typography:

| Symbol | Entity      | Name                    |
|:------:|-------------|-------------------------|
| ©      | `&copy;`    | Copyright               |
| ®      | `&reg;`     | Registered trademark    |
| ™      | `&trade;`   | Trademark               |
| °      | `&deg;`     | Degree                  |
| •      | `&bull;`    | Bullet                  |
| …      | `&hellip;`  | Ellipsis                |
| —      | `&mdash;`   | Em dash                 |
| –      | `&ndash;`   | En dash                 |
| «      | `&laquo;`   | Left guillemet          |
| »      | `&raquo;`   | Right guillemet         |
| "      | `&ldquo;`   | Left double quote       |
| "      | `&rdquo;`   | Right double quote      |
| '      | `&lsquo;`   | Left single quote       |
| '      | `&rsquo;`   | Right single quote      |

```html
<p>&copy; 2026 My Website</p>         <!-- © 2026 My Website -->
<p>Google&trade; is a search engine</p>  <!-- Google™ is a search engine -->
<p>Temperature: 25&deg;C</p>          <!-- Temperature: 25°C -->
<p>&ldquo;Hello,&rdquo; she said.</p> <!-- "Hello," she said. -->
<p>Pages 10&ndash;20</p>              <!-- Pages 10–20 -->
<p>Wait &mdash; what?</p>            <!-- Wait — what? -->
```

### Other Useful Symbols:

| Symbol | Entity       | Name              |
|:------:|-------------|-------------------|
| ☑      | `&#9745;`   | Checked box       |
| ☐      | `&#9744;`   | Empty box         |
| ★      | `&#9733;`   | Filled star       |
| ☆      | `&#9734;`   | Empty star         |
| ♥      | `&hearts;`  | Heart             |
| ♠      | `&spades;`  | Spade             |
| ♦      | `&diams;`   | Diamond           |
| ♣      | `&clubs;`   | Club              |
| ✓      | `&#10003;`  | Check mark        |
| ✗      | `&#10007;`  | Cross mark        |
| ⚡     | `&#9889;`   | Lightning bolt    |

```html
<!-- Star rating -->
<p>Rating: &#9733;&#9733;&#9733;&#9733;&#9734;</p>
<!-- Shows: Rating: ★★★★☆ -->

<!-- Checklist -->
<p>&#9745; Completed</p>   <!-- ☑ Completed -->
<p>&#9744; Pending</p>     <!-- ☐ Pending -->
```

---

## Emoji in HTML

You can use emoji directly in HTML (they're just Unicode characters):

```html
<!-- Direct emoji (just paste them) -->
<p>Hello! 👋 Welcome to my site 🌐</p>
<p>I ❤️ coding!</p>

<!-- Using numeric codes -->
<p>&#128075; Wave</p>     <!-- 👋 -->
<p>&#10084;&#65039; Heart</p> <!-- ❤️ -->
<p>&#128640; Rocket</p>   <!-- 🚀 -->
```

Since we use `<meta charset="UTF-8">`, all emoji work directly.

---

## When You MUST Use Entities

```html
<!-- 1. Reserved characters in HTML -->
<p>Use &lt;div&gt; for containers</p>

<!-- 2. Characters not on your keyboard -->
<p>Price: &#8377;999</p>  <!-- ₹ symbol -->

<!-- 3. Invisible/special spaces -->
<p>100&nbsp;km</p>

<!-- 4. Inside attribute values -->
<img alt="Tom &amp; Jerry" src="tj.jpg">
```

---

## Practical Examples

### Footer Copyright:

```html
<footer>
    <p>&copy; 2026 My Company&trade; &mdash; All Rights Reserved</p>
    <!-- © 2026 My Company™ — All Rights Reserved -->
</footer>
```

### Showing Code Snippets:

```html
<pre><code>
if (x &lt; 10 &amp;&amp; y &gt; 5) {
    console.log(&quot;Hello!&quot;);
}
</code></pre>

<!-- Shows:
if (x < 10 && y > 5) {
    console.log("Hello!");
}
-->
```

### Math Formula:

```html
<p>
    E = mc<sup>2</sup>, where c &asymp; 3 &times; 10<sup>8</sup> m/s
</p>
<!-- E = mc², where c ≈ 3 × 10⁸ m/s -->
```

### Breadcrumb Navigation:

```html
<nav>
    <a href="/">Home</a> &raquo;
    <a href="/products">Products</a> &raquo;
    <span>Laptop</span>
</nav>
<!-- Home » Products » Laptop -->
```

---

> **Key Takeaways**:
> 1. Use entities for reserved HTML characters: `&lt;` `&gt;` `&amp;` `&quot;` `&apos;`
> 2. `&nbsp;` keeps words from breaking across lines and adds extra spaces
> 3. Named entities (`&copy;`) are easier to remember; numeric (`&#169;`) work everywhere
> 4. Use `&copy;`, `&trade;`, `&reg;` for legal symbols in footers
> 5. Math symbols, arrows, and currency signs all have entity codes
> 6. Emoji work directly in HTML with UTF-8 encoding — just paste them
> 7. If `<meta charset="UTF-8">` is set, you can type most special characters directly 🎯
