# Semantic HTML

## What is Semantic HTML?

**Semantic** = "relating to meaning." Semantic HTML uses tags that **describe the meaning** of the content, not just how it looks.

```html
<!-- ❌ Non-semantic — What is this? A header? Footer? Sidebar? No idea. -->
<div class="header">
    <div class="nav">...</div>
</div>
<div class="main">...</div>
<div class="footer">...</div>

<!-- ✅ Semantic — Crystal clear what each section is! -->
<header>
    <nav>...</nav>
</header>
<main>...</main>
<footer>...</footer>
```

Think of it like this: `<div>` is like a plain cardboard box — you don't know what's inside. `<header>`, `<nav>`, `<main>`, `<footer>` are **labeled boxes** — everyone knows what they contain.

---

## Why Use Semantic HTML?

| Benefit              | Explanation                                       |
|----------------------|---------------------------------------------------|
| **Accessibility**    | Screen readers understand your page structure      |
| **SEO**              | Google knows which content is important            |
| **Readability**      | Other developers (and future you) understand the code |
| **Maintainability**  | Easier to find and edit sections                   |
| **Styling**          | Can target elements directly without class names   |

---

## Page Structure Tags

### The Big Picture:

```html
<body>
    <header>         <!-- Top of the page (logo, nav) -->
        <nav></nav>  <!-- Navigation links -->
    </header>

    <main>           <!-- Main unique content (only ONE per page) -->
        <article>    <!-- Self-contained content (blog post, product) -->
            <section></section>  <!-- Themed group within article -->
        </article>
        <aside></aside>  <!-- Sidebar / related content -->
    </main>

    <footer></footer>  <!-- Bottom of the page (copyright, links) -->
</body>
```

---

## `<header>` — Page or Section Header

```html
<!-- Page header (top of the page) -->
<header>
    <img src="logo.png" alt="Site Logo">
    <h1>My Website</h1>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
    </nav>
</header>

<!-- Article header (top of a blog post) -->
<article>
    <header>
        <h2>How to Learn HTML</h2>
        <p>By Ankit | March 1, 2026</p>
    </header>
    <p>Content of the article...</p>
</article>
```

**Note:** You can have **multiple** `<header>` elements — one for the page, one for each article/section.

---

## `<nav>` — Navigation

Wraps the **main navigation links** on your page:

```html
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>

<!-- You can have multiple navs -->
<nav aria-label="Main navigation">...</nav>   <!-- Primary nav -->
<nav aria-label="Footer links">...</nav>       <!-- Footer nav -->
```

**Don't** use `<nav>` for every group of links — only for **major navigation blocks**.

---

## `<main>` — The Main Content

Contains the **primary unique content** of the page. Only **ONE** per page.

```html
<body>
    <header>...</header>

    <main>
        <!-- Everything unique to THIS page goes here -->
        <h1>About Us</h1>
        <p>We are a web development company...</p>
    </main>

    <footer>...</footer>
</body>
```

What goes in `<main>`: Content that is **unique** to this page.
What does NOT go in `<main>`: Navigation, logo, footer, sidebar (things repeated on every page).

---

## `<article>` — Self-Contained Content

Content that **makes sense on its own** — if you pulled it out and put it somewhere else, it would still make sense.

```html
<!-- Blog post -->
<article>
    <h2>JavaScript Promises Explained</h2>
    <p>Published: March 1, 2026</p>
    <p>Promises are like ordering food at a restaurant...</p>
</article>

<!-- Product card -->
<article>
    <h3>MacBook Pro</h3>
    <img src="macbook.jpg" alt="MacBook Pro">
    <p>$1999 — The most powerful laptop.</p>
    <button>Add to Cart</button>
</article>

<!-- Comment -->
<article>
    <header>
        <strong>Ankit</strong>
        <time datetime="2026-03-01">March 1, 2026</time>
    </header>
    <p>Great article! Very helpful.</p>
</article>
```

**Use `<article>` for:** Blog posts, news articles, product cards, comments, social media posts, forum threads.

---

## `<section>` — Themed Grouping

Groups **related content** together, usually with a heading:

```html
<main>
    <section>
        <h2>Our Services</h2>
        <p>We offer web design, development, and SEO.</p>
    </section>

    <section>
        <h2>Our Team</h2>
        <p>Meet the people behind the work.</p>
    </section>

    <section>
        <h2>Contact Us</h2>
        <p>Get in touch with us today.</p>
    </section>
</main>
```

### `<section>` vs `<div>`:

```html
<!-- Use <section> when content has a THEME/HEADING -->
<section>
    <h2>Related Products</h2>
    <article>...</article>
    <article>...</article>
</section>

<!-- Use <div> when you just need a CONTAINER for styling -->
<div class="grid-container">
    <div class="card">...</div>
    <div class="card">...</div>
</div>
```

---

## `<aside>` — Sidebar / Related Content

Content that is **related to**, but **separate from**, the main content:

```html
<main>
    <article>
        <h2>How to Learn CSS</h2>
        <p>CSS is used for styling web pages...</p>
    </article>

    <aside>
        <h3>Related Articles</h3>
        <ul>
            <li><a href="/html-basics">HTML Basics</a></li>
            <li><a href="/js-intro">JavaScript Intro</a></li>
        </ul>

        <h3>Subscribe</h3>
        <form>
            <input type="email" placeholder="Your email">
            <button>Subscribe</button>
        </form>
    </aside>
</main>
```

**Use `<aside>` for:** Sidebars, related links, ads, author info, pull quotes, glossary.

---

## `<footer>` — Page or Section Footer

```html
<!-- Page footer -->
<footer>
    <nav>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
    </nav>
    <p>&copy; 2026 My Website. All rights reserved.</p>
</footer>

<!-- Article footer -->
<article>
    <h2>Blog Post Title</h2>
    <p>Content...</p>
    <footer>
        <p>Tags: HTML, CSS, JavaScript</p>
        <p>Share: <a href="#">Twitter</a> | <a href="#">Facebook</a></p>
    </footer>
</article>
```

---

## Other Semantic Tags

### `<time>` — Date/Time:

```html
<p>Published on <time datetime="2026-03-01">March 1, 2026</time></p>
<p>Event starts at <time datetime="14:30">2:30 PM</time></p>
<p>Duration: <time datetime="PT2H30M">2 hours 30 minutes</time></p>

<!-- The datetime attribute is machine-readable -->
<!-- The text inside is human-readable -->
```

### `<address>` — Contact Information:

```html
<address>
    Contact us at <a href="mailto:info@example.com">info@example.com</a><br>
    123 Main Street, Delhi, India
</address>
```

### `<details>` + `<summary>` — Collapsible Content:

```html
<details>
    <summary>Click to see more</summary>
    <p>This content is hidden by default and shows when clicked!</p>
    <p>No JavaScript needed — pure HTML!</p>
</details>

<!-- open attribute = expanded by default -->
<details open>
    <summary>FAQ: How does it work?</summary>
    <p>It just works out of the box!</p>
</details>
```

### `<dialog>` — Modal/Popup:

```html
<dialog id="myDialog">
    <h2>Hello!</h2>
    <p>This is a dialog box.</p>
    <button onclick="document.getElementById('myDialog').close()">Close</button>
</dialog>

<button onclick="document.getElementById('myDialog').showModal()">
    Open Dialog
</button>
```

### `<figure>` + `<figcaption>` — Media with Caption:

```html
<figure>
    <img src="chart.png" alt="Sales chart">
    <figcaption>Figure 1: Monthly sales for 2026</figcaption>
</figure>

<!-- Works for code too: -->
<figure>
    <pre><code>console.log("Hello!");</code></pre>
    <figcaption>Example: Hello World in JavaScript</figcaption>
</figure>
```

### `<mark>` — Highlighted Text:

```html
<p>Search results for "HTML": We found <mark>HTML</mark> in 5 places.</p>
```

### `<abbr>` — Abbreviation:

```html
<p>Learn <abbr title="HyperText Markup Language">HTML</abbr> today!</p>
```

---

## `<article>` vs `<section>` vs `<div>`

| Tag         | Use When...                                          |
|-------------|------------------------------------------------------|
| `<article>` | Content makes sense **on its own** (blog post, card) |
| `<section>` | Grouping **themed content** with a heading           |
| `<div>`     | Just need a **container** for styling (no meaning)   |

```html
<!-- Article inside Section -->
<section>
    <h2>Latest Blog Posts</h2>
    <article>
        <h3>Post 1</h3>
        <p>Content...</p>
    </article>
    <article>
        <h3>Post 2</h3>
        <p>Content...</p>
    </article>
</section>

<!-- Section inside Article -->
<article>
    <h2>Complete Guide to HTML</h2>
    <section>
        <h3>Chapter 1: Basics</h3>
        <p>Content...</p>
    </section>
    <section>
        <h3>Chapter 2: Forms</h3>
        <p>Content...</p>
    </section>
</article>
```

---

## Complete Semantic Page Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Blog</title>
</head>
<body>
    <header>
        <h1>Tech Blog</h1>
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section>
            <h2>Latest Articles</h2>

            <article>
                <header>
                    <h3>Understanding Semantic HTML</h3>
                    <p>By <address style="display:inline">Ankit</address> | 
                       <time datetime="2026-03-01">March 1, 2026</time>
                    </p>
                </header>

                <figure>
                    <img src="semantic.png" alt="Semantic HTML diagram">
                    <figcaption>Semantic vs Non-Semantic HTML</figcaption>
                </figure>

                <section>
                    <h4>Why It Matters</h4>
                    <p>Semantic HTML improves <mark>accessibility</mark> and SEO...</p>
                </section>

                <footer>
                    <p>Tags: <a href="/tags/html">HTML</a>, <a href="/tags/web">Web</a></p>
                </footer>
            </article>
        </section>

        <aside>
            <section>
                <h3>About the Author</h3>
                <p>Ankit is a web developer who loves teaching.</p>
            </section>

            <section>
                <h3>Popular Posts</h3>
                <ul>
                    <li><a href="/js-promises">JS Promises</a></li>
                    <li><a href="/css-grid">CSS Grid</a></li>
                </ul>
            </section>

            <details>
                <summary>Newsletter</summary>
                <form>
                    <label for="sub-email">Email:</label>
                    <input type="email" id="sub-email" required>
                    <button type="submit">Subscribe</button>
                </form>
            </details>
        </aside>
    </main>

    <footer>
        <nav aria-label="Footer navigation">
            <a href="/privacy">Privacy</a> |
            <a href="/terms">Terms</a>
        </nav>
        <p><small>&copy; 2026 Tech Blog. All rights reserved.</small></p>
    </footer>
</body>
</html>
```

---

## Quick Reference

| Tag          | Purpose                                    |
|-------------|---------------------------------------------|
| `<header>`  | Page or section header                      |
| `<nav>`     | Navigation links                            |
| `<main>`    | Primary page content (ONE per page)         |
| `<article>` | Self-contained content                      |
| `<section>` | Themed group with a heading                 |
| `<aside>`   | Sidebar / related content                   |
| `<footer>`  | Page or section footer                      |
| `<figure>`  | Media with caption                          |
| `<time>`    | Date/time (machine-readable)                |
| `<details>` | Collapsible content                         |
| `<dialog>`  | Modal/popup                                 |
| `<mark>`    | Highlighted text                            |
| `<address>` | Contact information                         |

---

> **Key Takeaways**:
> 1. Use semantic tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`) instead of `<div>` for everything
> 2. `<main>` = only ONE per page; `<article>` = self-contained; `<section>` = themed group
> 3. `<div>` is for **styling containers only** — use it when no semantic tag fits
> 4. Semantic HTML helps **accessibility**, **SEO**, and **code readability**
> 5. `<details>` + `<summary>` gives you **collapsible content** with zero JavaScript
> 6. `<time datetime="...">` makes dates machine-readable for search engines
> 7. If content makes sense on its own → `<article>`. If it groups related things → `<section>` 🎯
