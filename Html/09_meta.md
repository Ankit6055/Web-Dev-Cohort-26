# Head, Meta Tags & SEO in HTML

## The `<head>` Section

The `<head>` contains **metadata** — information ABOUT the page that the user doesn't see directly. It tells the browser and search engines how to handle your page.

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <meta name="description" content="A great website about web development">
    <link rel="stylesheet" href="style.css">
    <script src="app.js" defer></script>
</head>
```

---

## Essential Meta Tags

### 1. Character Encoding:

```html
<!-- ALWAYS include this first — tells browser which characters to use -->
<meta charset="UTF-8">

<!-- UTF-8 supports ALL languages and emoji 🎉 -->
<!-- Without it, special characters may show as ??? or garbled text -->
```

### 2. Viewport — Responsive Design:

```html
<!-- Makes your site look good on phones and tablets -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 
    width=device-width  → match the screen width
    initial-scale=1.0   → don't zoom in/out by default
-->

<!-- Without this, your site looks TINY on mobile (zoomed out) -->
```

### 3. Title — The Tab Title:

```html
<title>My Website — Home</title>
<!-- Shows in: browser tab, bookmarks, search results -->

<!-- ✅ GOOD titles -->
<title>Ankit's Blog — Learn Web Development</title>
<title>iPhone 16 Pro — Buy Online | Apple India</title>

<!-- ❌ BAD titles -->
<title>Page</title>          <!-- Too generic -->
<title>website</title>       <!-- Not descriptive -->
<title>hjksdadj</title>      <!-- Meaningless -->
```

### 4. Description — For Search Results:

```html
<meta name="description" content="Learn HTML, CSS, and JavaScript with simple tutorials. Perfect for beginners.">

<!-- This appears below your title in Google search results -->
<!-- Keep it 150-160 characters -->
```

### 5. Author:

```html
<meta name="author" content="Ankit">
```

### 6. Keywords (Less Important Now):

```html
<!-- Google doesn't use this anymore, but some engines might -->
<meta name="keywords" content="HTML, CSS, JavaScript, web development, tutorial">
```

---

## Open Graph Tags — Social Media Sharing

When you share a link on Facebook, Twitter, WhatsApp — the preview card comes from these tags:

```html
<!-- Basic Open Graph (works on Facebook, LinkedIn, WhatsApp) -->
<meta property="og:title" content="Learn HTML in 2026">
<meta property="og:description" content="A complete guide to HTML for beginners">
<meta property="og:image" content="https://mysite.com/images/og-image.jpg">
<meta property="og:url" content="https://mysite.com/html-guide">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Ankit's Blog">
```

### Twitter Card Tags:

```html
<!-- Twitter uses its own tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Learn HTML in 2026">
<meta name="twitter:description" content="A complete guide to HTML">
<meta name="twitter:image" content="https://mysite.com/images/twitter-card.jpg">
<meta name="twitter:site" content="@ankitdev">
```

### What the Preview Looks Like:

```
┌──────────────────────────────────┐
│  [Image: og-image.jpg]          │
├──────────────────────────────────┤
│  mysite.com                     │
│  Learn HTML in 2026             │
│  A complete guide to HTML for   │
│  beginners                      │
└──────────────────────────────────┘
```

---

## Favicon — Tab Icon

```html
<head>
    <!-- Standard favicon -->
    <link rel="icon" href="/favicon.ico" type="image/x-icon">

    <!-- PNG favicon (recommended) -->
    <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
    <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16">

    <!-- SVG favicon (scales perfectly) -->
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">

    <!-- Apple Touch Icon (when added to home screen) -->
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">

    <!-- Android/PWA manifest -->
    <link rel="manifest" href="/site.webmanifest">
</head>
```

---

## Linking CSS & JavaScript

### CSS:

```html
<head>
    <!-- External stylesheet -->
    <link rel="stylesheet" href="style.css">

    <!-- From CDN -->
    <link rel="stylesheet" href="https://cdn.example.com/bootstrap.min.css">

    <!-- Inline CSS -->
    <style>
        body { font-family: Arial, sans-serif; }
        h1 { color: blue; }
    </style>
</head>
```

### JavaScript:

```html
<!-- At the end of body (traditional) -->
<body>
    <!-- ... content ... -->
    <script src="app.js"></script>
</body>

<!-- In head with defer (modern — recommended) -->
<head>
    <script src="app.js" defer></script>
</head>

<!-- In head with async (for independent scripts) -->
<head>
    <script src="analytics.js" async></script>
</head>

<!-- Inline JavaScript -->
<script>
    console.log("Hello!");
</script>
```

### `defer` vs `async`:

| Attribute | When It Downloads    | When It Runs                    |
|-----------|---------------------|---------------------------------|
| (none)    | Immediately         | Immediately (blocks HTML parsing)|
| `defer`   | In parallel         | After HTML is fully parsed      |
| `async`   | In parallel         | As soon as downloaded           |

```html
<!-- ✅ Use defer for your main scripts -->
<script src="app.js" defer></script>

<!-- ✅ Use async for independent scripts (analytics, ads) -->
<script src="analytics.js" async></script>

<!-- ❌ Don't put scripts in <head> without defer/async -->
<script src="app.js"></script>  <!-- Blocks page rendering! -->
```

---

## Preloading & Performance

### Preload — Load Critical Resources Early:

```html
<!-- Tell the browser: "You'll need these soon, start loading NOW" -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="hero.jpg" as="image">
<link rel="preload" href="critical.css" as="style">
```

### Prefetch — Load Resources for Next Page:

```html
<!-- Hint: "User will probably visit this page next" -->
<link rel="prefetch" href="/about.html">
<link rel="prefetch" href="/about.css" as="style">
```

### Preconnect — Early Connection to External Domains:

```html
<!-- Start connecting to domains early (DNS + TCP + TLS) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdn.example.com">

<!-- DNS prefetch only (lighter) -->
<link rel="dns-prefetch" href="https://analytics.example.com">
```

---

## Google Fonts — How to Add:

```html
<head>
    <!-- Preconnect for faster loading -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Load the font -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
```

---

## Robots & Crawlers

Tell search engines how to handle your page:

```html
<!-- Allow indexing (default) -->
<meta name="robots" content="index, follow">

<!-- Don't index this page -->
<meta name="robots" content="noindex, nofollow">

<!-- Don't cache this page -->
<meta name="robots" content="noindex, noarchive">
```

| Value       | Meaning                                    |
|-------------|---------------------------------------------|
| `index`     | Search engines CAN show this page           |
| `noindex`   | Search engines should NOT show this page    |
| `follow`    | Search engines CAN follow links on this page|
| `nofollow`  | Search engines should NOT follow links      |
| `noarchive` | Don't show a cached version                 |

---

## Other Useful Meta Tags

### Redirect After X Seconds:

```html
<!-- Redirect to another page after 5 seconds -->
<meta http-equiv="refresh" content="5; url=https://example.com">

<!-- Refresh the page every 30 seconds -->
<meta http-equiv="refresh" content="30">
```

### Theme Color (Mobile Browser):

```html
<!-- Colors the address bar on mobile -->
<meta name="theme-color" content="#4285f4">
```

### Disable Phone Number Detection:

```html
<!-- Stop Safari from auto-linking phone numbers -->
<meta name="format-detection" content="telephone=no">
```

### Content Security Policy:

```html
<!-- Security: only allow scripts/styles from your own domain -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

---

## Canonical URL — Prevent Duplicate Content

```html
<!-- Tell search engines: THIS is the main version of this page -->
<link rel="canonical" href="https://mysite.com/html-guide">

<!-- Example: These 3 URLs all show the same page:
    https://mysite.com/html-guide
    https://mysite.com/html-guide?ref=twitter
    https://www.mysite.com/html-guide
    
    canonical tells Google: use the first one
-->
```

---

## Language & Direction

```html
<!-- Page language -->
<html lang="en">        <!-- English -->
<html lang="hi">        <!-- Hindi -->
<html lang="en-US">     <!-- American English -->

<!-- Text direction (for Arabic, Hebrew, etc.) -->
<html lang="ar" dir="rtl">    <!-- Right-to-left -->
<html lang="en" dir="ltr">    <!-- Left-to-right (default) -->
```

---

## Complete Head Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Character encoding -->
    <meta charset="UTF-8">
    
    <!-- Responsive viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Page title -->
    <title>My Awesome Website — Home</title>
    
    <!-- SEO -->
    <meta name="description" content="A clear, 150-char description of your page">
    <meta name="author" content="Ankit">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://mysite.com/">
    
    <!-- Open Graph (social sharing) -->
    <meta property="og:title" content="My Awesome Website">
    <meta property="og:description" content="The best website for learning web dev">
    <meta property="og:image" content="https://mysite.com/og-image.jpg">
    <meta property="og:url" content="https://mysite.com/">
    <meta property="og:type" content="website">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="My Awesome Website">
    <meta name="twitter:description" content="The best website for learning web dev">
    <meta name="twitter:image" content="https://mysite.com/twitter-image.jpg">
    
    <!-- Favicon -->
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    
    <!-- Theme color -->
    <meta name="theme-color" content="#4285f4">
    
    <!-- Preconnect to external resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="style.css">
    
    <!-- JavaScript (deferred) -->
    <script src="app.js" defer></script>
</head>
<body>
    <!-- Your content here -->
</body>
</html>
```

---

> **Key Takeaways**:
> 1. **Always** include `charset="UTF-8"` and `viewport` meta tags — they're essential
> 2. Write a good `<title>` (tab title + search results) and `<meta description>` (search snippet)
> 3. Add **Open Graph** tags so your links look good when shared on social media
> 4. Use `defer` for scripts, `preconnect` for external domains — faster loading
> 5. Set `<link rel="canonical">` to prevent duplicate content in search engines
> 6. Use `<meta name="robots">` to control what search engines do with your page
> 7. Copy the complete head template above as a starting point for every project 🎯
