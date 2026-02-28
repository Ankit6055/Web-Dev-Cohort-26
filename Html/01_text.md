# Text & Headings in HTML

## Headings — `<h1>` to `<h6>`

Headings define the **titles and subtitles** on your page. There are 6 levels — `<h1>` is the biggest, `<h6>` is the smallest.

```html
<h1>Heading 1 — Main Title (Biggest)</h1>
<h2>Heading 2 — Section Title</h2>
<h3>Heading 3 — Subsection</h3>
<h4>Heading 4 — Sub-subsection</h4>
<h5>Heading 5 — Small heading</h5>
<h6>Heading 6 — Smallest heading</h6>
```

### Rules for Headings:

```html
<!-- ✅ CORRECT — One h1 per page, then h2, h3... in order -->
<h1>My Blog</h1>
    <h2>Latest Post</h2>
        <h3>Introduction</h3>
        <h3>Main Content</h3>
    <h2>About Me</h2>

<!-- ❌ BAD — Don't skip levels -->
<h1>Title</h1>
<h4>Wait, where's h2 and h3?</h4>  <!-- Skipped! -->

<!-- ❌ BAD — Don't use headings just for big/small text -->
<h1>This is not a heading, I just want big text</h1>
<!-- Use CSS instead: <p style="font-size: 32px;">Big text</p> -->
```

**Think of headings like a book outline:**
- `<h1>` = Book Title (only ONE)
- `<h2>` = Chapter Titles
- `<h3>` = Sections within chapters
- `<h4>` = Sub-sections

---

## Paragraphs — `<p>`

The most common text element. Each `<p>` creates a block of text with spacing above and below:

```html
<p>This is the first paragraph. It has some text in it.</p>
<p>This is the second paragraph. Notice the gap between them.</p>

<!-- Browser automatically adds margin above and below paragraphs -->
```

### Paragraph Rules:

```html
<!-- Paragraphs IGNORE extra whitespace -->
<p>Hello      world.
   This is       on the
   same line.</p>
<!-- Shows: "Hello world. This is on the same line." -->

<!-- ❌ Can't put block elements inside <p> -->
<p>
    <div>This is wrong!</div>   <!-- Browser will break this -->
</p>

<!-- ✅ Can put inline elements inside <p> -->
<p>This has <strong>bold</strong> and <em>italic</em> text.</p>
```

---

## Text Formatting Tags

### Bold & Importance:

```html
<!-- <strong> — semantically IMPORTANT (bold + meaning) -->
<p><strong>Warning:</strong> Do not delete this file!</p>

<!-- <b> — visually bold (no extra meaning) -->
<p>The movie <b>Inception</b> was great.</p>

<!-- Use <strong> when the text is genuinely important -->
<!-- Use <b> when you just want it to look bold visually -->
```

### Italic & Emphasis:

```html
<!-- <em> — emphasis (italic + meaning, screen readers stress it) -->
<p>You <em>must</em> submit the form before Friday.</p>

<!-- <i> — visually italic (no extra meaning) -->
<p>The word <i>café</i> comes from French.</p>

<!-- Use <em> for emphasis -->
<!-- Use <i> for technical terms, foreign words, thoughts -->
```

### Underline:

```html
<!-- <u> — underline (use carefully, can be confused with links) -->
<p>This has a <u>spelling error</u>.</p>

<!-- Better to use CSS for underlining:
<span style="text-decoration: underline;">underlined</span> -->
```

### Strikethrough:

```html
<!-- <s> — no longer accurate/relevant -->
<p>Price: <s>$50</s> $29.99</p>

<!-- <del> — deleted text (semantic, for edits) -->
<p><del>Old info</del> <ins>New info</ins></p>
```

### All Formatting Tags at a Glance:

| Tag        | Purpose                       | Visual Result              |
|------------|-------------------------------|----------------------------|
| `<strong>` | Important text                | **Bold**                   |
| `<b>`      | Visual bold only              | **Bold**                   |
| `<em>`     | Emphasized text               | *Italic*                   |
| `<i>`      | Visual italic only            | *Italic*                   |
| `<u>`      | Underline (annotation)        | <u>Underlined</u>          |
| `<s>`      | No longer accurate            | ~~Strikethrough~~          |
| `<del>`    | Deleted text                  | ~~Deleted~~                |
| `<ins>`    | Inserted text                 | <u>Inserted</u>            |
| `<mark>`   | Highlighted text              | Highlighted (yellow bg)    |
| `<small>`  | Smaller text (fine print)     | Small text                 |
| `<sub>`    | Subscript                     | H₂O                       |
| `<sup>`    | Superscript                   | x²                        |

---

## Special Text Elements

### Highlighted Text — `<mark>`:

```html
<p>Search results for "HTML": We found <mark>HTML</mark> in 5 places.</p>
<!-- Shows "HTML" with a yellow background highlight -->
```

### Subscript & Superscript:

```html
<!-- Subscript — below the line -->
<p>Water formula: H<sub>2</sub>O</p>
<!-- Shows: H₂O -->

<!-- Superscript — above the line -->
<p>E = mc<sup>2</sup></p>
<!-- Shows: E = mc² -->

<p>Footnote reference<sup><a href="#note1">[1]</a></sup></p>
```

### Small Text:

```html
<p>Sign up now! <small>Terms and conditions apply.</small></p>
```

### Abbreviation — `<abbr>`:

```html
<p>Learn <abbr title="HyperText Markup Language">HTML</abbr> today!</p>
<!-- Hover over "HTML" and you'll see the full form as a tooltip -->
```

### Address:

```html
<address>
    Written by <a href="mailto:ankit@example.com">Ankit</a><br>
    123 Main Street<br>
    New Delhi, India
</address>
<!-- Browser shows it in italic by default -->
```

---

## Line Breaks & Horizontal Rules

### Line Break — `<br>`:

```html
<!-- Use <br> when you need a line break WITHIN the same block -->
<p>Roses are red,<br>
Violets are blue,<br>
HTML is fun,<br>
And so are you.</p>

<!-- ❌ DON'T use <br> for spacing between elements -->
<p>Paragraph 1</p>
<br><br><br>         <!-- BAD! Use CSS margin instead -->
<p>Paragraph 2</p>
```

### Horizontal Rule — `<hr>`:

```html
<h2>Chapter 1</h2>
<p>Content of chapter 1...</p>

<hr>  <!-- Draws a horizontal line — a visual separator -->

<h2>Chapter 2</h2>
<p>Content of chapter 2...</p>
```

---

## Preformatted Text & Code

### `<pre>` — Keeps Whitespace and Line Breaks:

```html
<pre>
    This    text
        preserves   ALL
    spaces     and
        line breaks!
</pre>

<!-- Perfect for ASCII art: -->
<pre>
  /\_/\
 ( o.o )
  > ^ <
</pre>
```

### `<code>` — Inline Code:

```html
<p>Use the <code>console.log()</code> function to print output.</p>
<!-- Shows "console.log()" in a monospace font -->
```

### `<pre>` + `<code>` — Code Blocks:

```html
<pre><code>
function greet(name) {
    return "Hello, " + name;
}

console.log(greet("Ankit"));
</code></pre>
```

### `<kbd>` — Keyboard Input:

```html
<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>
```

### `<samp>` — Sample Output:

```html
<p>The terminal shows: <samp>Error: file not found</samp></p>
```

### `<var>` — Variable:

```html
<p>The area of a triangle is <var>b</var> &times; <var>h</var> / 2</p>
```

---

## Quotations

### Blockquote — For Long Quotes:

```html
<blockquote cite="https://example.com/quote-source">
    <p>The only way to do great work is to love what you do.</p>
    <footer>— Steve Jobs</footer>
</blockquote>
<!-- Browser indents it from both sides by default -->
```

### Inline Quote — `<q>`:

```html
<p>Einstein said, <q>Imagination is more important than knowledge.</q></p>
<!-- Browser automatically adds quotation marks: "..." -->
```

### Citation — `<cite>`:

```html
<p><cite>The Great Gatsby</cite> is a classic novel.</p>
<!-- Shown in italic — used for titles of works -->
```

---

## `<div>` for Grouping Text:

```html
<div class="article">
    <h2>Article Title</h2>
    <p class="date">Published: March 1, 2026</p>
    <p>First paragraph of the article...</p>
    <p>Second paragraph of the article...</p>
</div>
```

---

## Real-World Example:

```html
<article>
    <h1>How to Learn HTML</h1>
    <p><small>By Ankit | March 2026</small></p>

    <h2>Introduction</h2>
    <p>HTML is the <strong>foundation</strong> of web development. 
       You <em>cannot</em> build websites without it.</p>

    <blockquote>
        <p>First, learn HTML. Then CSS. Then JavaScript.</p>
    </blockquote>

    <h2>Getting Started</h2>
    <p>To write HTML, you need a <mark>text editor</mark> like 
       <abbr title="Visual Studio Code">VS Code</abbr>.</p>

    <h3>Your First Steps</h3>
    <p>Create a file called <code>index.html</code> and start coding!</p>
    <p>The formula for success: Practice<sup>∞</sup></p>

    <hr>

    <p><small>&copy; 2026 — All rights reserved.</small></p>
</article>
```

---

> **Key Takeaways**:
> 1. Use `<h1>` to `<h6>` for headings — only ONE `<h1>` per page, don't skip levels
> 2. `<strong>` = important (bold with meaning), `<b>` = just visually bold
> 3. `<em>` = emphasized (italic with meaning), `<i>` = just visually italic
> 4. Use `<br>` for line breaks, NOT for creating spacing (use CSS)
> 5. `<pre>` preserves whitespace; `<code>` shows code in monospace font
> 6. `<blockquote>` for long quotes, `<q>` for inline quotes
> 7. Use semantic tags (`<strong>`, `<em>`, `<mark>`) over visual ones (`<b>`, `<i>`) — it helps screen readers and SEO 🎯
