# Links & Navigation in HTML

## The Anchor Tag — `<a>`

The `<a>` tag creates **hyperlinks** — clickable text/images that take you to another page, section, file, or resource.

```html
<a href="https://google.com">Go to Google</a>
<!-- Shows: Go to Google (clickable, underlined, blue by default) -->
```

The `href` (**H**ypertext **REF**erence) attribute tells the browser **where** to go.

---

## Types of Links

### 1. External Links — To Other Websites:

```html
<a href="https://google.com">Google</a>
<a href="https://github.com">GitHub</a>
<a href="https://developer.mozilla.org">MDN Docs</a>
```

### 2. Internal Links — To Other Pages on Your Site:

```html
<!-- Same folder -->
<a href="about.html">About Us</a>

<!-- Subfolder -->
<a href="pages/contact.html">Contact</a>

<!-- Parent folder -->
<a href="../index.html">Home</a>
```

### 3. Anchor Links — To a Section on the Same Page:

```html
<!-- First, give the target section an id -->
<h2 id="about">About Us</h2>
<h2 id="services">Services</h2>
<h2 id="contact">Contact</h2>

<!-- Then link to it with # -->
<a href="#about">Go to About</a>
<a href="#services">Go to Services</a>
<a href="#contact">Go to Contact</a>
<a href="#">Back to Top</a>  <!-- # alone = top of page -->
```

### 4. Email Links:

```html
<a href="mailto:ankit@example.com">Email Me</a>
<!-- Opens the user's email app with "To: ankit@example.com" -->

<!-- With subject and body pre-filled -->
<a href="mailto:ankit@example.com?subject=Hello&body=Hi%20Ankit">
    Send Email with Subject
</a>
```

### 5. Phone Links:

```html
<a href="tel:+911234567890">Call Us: +91 123 456 7890</a>
<!-- On mobile: opens the phone dialer -->
```

### 6. Download Links:

```html
<a href="files/resume.pdf" download>Download My Resume</a>
<!-- Downloads the file instead of opening it -->

<!-- Suggest a different filename -->
<a href="files/resume.pdf" download="Ankit_Resume.pdf">Download</a>
```

---

## The `target` Attribute — Where to Open the Link

```html
<!-- _self — Same tab (default) -->
<a href="https://google.com" target="_self">Opens in same tab</a>

<!-- _blank — New tab -->
<a href="https://google.com" target="_blank">Opens in new tab</a>

<!-- ⚠️ IMPORTANT: Always add rel="noopener noreferrer" with _blank -->
<a href="https://google.com" target="_blank" rel="noopener noreferrer">
    Safe new tab link
</a>
```

### Why `rel="noopener noreferrer"`?

```html
<!-- Without it, the new tab can access your page via window.opener -->
<!-- This is a SECURITY RISK! -->

<!-- noopener — prevents the new page from controlling your page -->
<!-- noreferrer — doesn't send the URL of your page to the new page -->

<!-- ✅ ALWAYS use this for external links that open in new tabs -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
    Click Me
</a>
```

---

## Link States (Styled with CSS)

Links have 4 states that you can style differently:

```html
<!-- These are styled with CSS (just for understanding): -->

<style>
    /* Not visited yet */
    a:link { color: blue; }

    /* Already visited */
    a:visited { color: purple; }

    /* Mouse is hovering over it */
    a:hover { color: red; }

    /* Being clicked right now */
    a:active { color: green; }
</style>

<a href="https://example.com">This link changes color based on state</a>
```

The order matters in CSS: **L**o**V**e **HA**te → `:link`, `:visited`, `:hover`, `:active`

---

## Navigation — `<nav>`

The `<nav>` element wraps your **main navigation links**:

```html
<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/services">Services</a>
    <a href="/contact">Contact</a>
</nav>
```

### Navigation with a List (Most Common):

```html
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
```

---

## Absolute vs Relative Paths

### Absolute Path — Full URL:

```html
<!-- Starts with https:// — points to an exact location -->
<a href="https://example.com/about.html">About</a>
<img src="https://example.com/images/logo.png" alt="Logo">
```

### Relative Path — Relative to Current File:

```
Project Structure:
📁 my-website/
├── index.html        (you are here)
├── about.html
├── pages/
│   ├── contact.html
│   └── blog.html
└── images/
    └── logo.png
```

```html
<!-- From index.html: -->
<a href="about.html">About</a>              <!-- same folder -->
<a href="pages/contact.html">Contact</a>    <!-- into subfolder -->
<img src="images/logo.png" alt="Logo">      <!-- into subfolder -->

<!-- From pages/contact.html: -->
<a href="../index.html">Home</a>            <!-- go UP one folder -->
<a href="../about.html">About</a>           <!-- go UP, then same folder -->
<a href="blog.html">Blog</a>               <!-- same folder -->
<img src="../images/logo.png" alt="Logo">   <!-- go UP, then into images -->
```

### Path Shortcuts:

| Path          | Meaning                                  |
|---------------|------------------------------------------|
| `about.html`  | Same folder                              |
| `./about.html`| Same folder (explicit)                   |
| `../`         | Go UP one folder                         |
| `../../`      | Go UP two folders                        |
| `/about.html` | From the ROOT of the website             |

---

## Linking to Sections on Other Pages

```html
<!-- Link to a specific section on another page -->
<a href="about.html#team">Meet Our Team</a>
<!-- Goes to about.html, then scrolls to the element with id="team" -->

<a href="https://example.com/docs#installation">Installation Guide</a>
```

---

## Images as Links

```html
<!-- Wrap an <img> inside <a> to make it clickable -->
<a href="https://google.com">
    <img src="google-logo.png" alt="Google Logo" width="200">
</a>
```

---

## The `title` Attribute — Tooltip

```html
<a href="https://mdn.dev" title="Mozilla Developer Network">MDN</a>
<!-- Hover over "MDN" and you'll see "Mozilla Developer Network" as a tooltip -->
```

---

## Button vs Link

A common confusion — when to use which:

```html
<!-- Use <a> when it GOES SOMEWHERE (navigation) -->
<a href="/signup">Sign Up</a>

<!-- Use <button> when it DOES SOMETHING (action) -->
<button onclick="submitForm()">Submit</button>

<!-- ❌ DON'T use <a> as a button -->
<a href="#" onclick="doSomething()">Click me</a>  <!-- BAD! -->

<!-- ❌ DON'T use <button> for navigation -->
<button onclick="location.href='/about'">About</button>  <!-- BAD! -->
```

| Use Case            | Element    |
|---------------------|------------|
| Go to another page  | `<a>`      |
| Go to a section     | `<a>`      |
| Download a file     | `<a>`      |
| Submit a form       | `<button>` |
| Open a popup        | `<button>` |
| Toggle something    | `<button>` |

---

## Real-World Navigation Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Top navigation bar -->
    <header>
        <nav>
            <a href="/" class="logo">MySite</a>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- Main content with anchor links -->
    <main>
        <section id="intro">
            <h1>Welcome!</h1>
            <p>Jump to: 
                <a href="#features">Features</a> | 
                <a href="#pricing">Pricing</a> | 
                <a href="#faq">FAQ</a>
            </p>
        </section>

        <section id="features">
            <h2>Features</h2>
            <p>Our amazing features...</p>
        </section>

        <section id="pricing">
            <h2>Pricing</h2>
            <p>Our pricing plans...</p>
        </section>

        <section id="faq">
            <h2>FAQ</h2>
            <p>Common questions...</p>
        </section>
    </main>

    <!-- Footer with links -->
    <footer>
        <p>
            <a href="mailto:hello@mysite.com">Email Us</a> | 
            <a href="tel:+911234567890">Call Us</a> | 
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
        <p><a href="#intro">Back to Top ↑</a></p>
    </footer>
</body>
</html>
```

---

## Smooth Scrolling (Bonus)

By default, anchor links jump instantly. Add this CSS for smooth scrolling:

```html
<style>
    html {
        scroll-behavior: smooth;
    }
</style>

<a href="#section2">Scroll Smoothly to Section 2</a>

<!-- ... lots of content ... -->

<h2 id="section2">Section 2</h2>
```

---

> **Key Takeaways**:
> 1. `<a href="...">` creates links — the most important tag for navigation
> 2. Use `target="_blank"` + `rel="noopener noreferrer"` for external links opening in new tabs
> 3. `#id` links to a section on the same page; `page.html#id` links to a section on another page
> 4. `mailto:` for email links, `tel:` for phone links, `download` for file downloads
> 5. Use **relative paths** for internal links, **absolute paths** for external sites
> 6. `../` goes UP one folder — essential for linking between pages
> 7. Use `<a>` for navigation, `<button>` for actions — don't mix them up! 🎯
