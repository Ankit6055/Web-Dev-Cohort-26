# Audio, Video & Embeds in HTML

## Video — `<video>`

Embed video directly in your page — no plugins needed:

```html
<video src="video.mp4" controls width="640" height="360">
    Your browser does not support the video tag.
</video>
```

The text inside `<video>` shows only if the browser doesn't support the tag (very rare today).

### Video Attributes:

```html
<video 
    src="video.mp4"
    controls          <!-- Shows play/pause, volume, fullscreen -->
    width="640"       <!-- Width in pixels -->
    height="360"      <!-- Height in pixels -->
    autoplay          <!-- Starts playing automatically -->
    muted             <!-- Muted by default (required for autoplay in most browsers) -->
    loop              <!-- Replays when it ends -->
    poster="thumb.jpg" <!-- Thumbnail image shown before playing -->
    preload="auto"    <!-- How much to load before playing -->
>
</video>
```

| Attribute  | Purpose                                        |
|-----------|------------------------------------------------|
| `controls` | Shows play, pause, volume, seek bar            |
| `autoplay` | Auto-plays (needs `muted` in most browsers)    |
| `muted`    | Starts muted                                   |
| `loop`     | Loops forever                                  |
| `poster`   | Preview image before playing                   |
| `preload`  | `auto` (load all), `metadata` (just info), `none` |
| `width`    | Video width                                    |
| `height`   | Video height                                   |

### Multiple Formats with `<source>`:

Different browsers support different formats. Provide multiple for compatibility:

```html
<video controls width="640" height="360" poster="preview.jpg">
    <source src="video.webm" type="video/webm">   <!-- Best quality/size -->
    <source src="video.mp4" type="video/mp4">      <!-- Most compatible -->
    <source src="video.ogv" type="video/ogg">      <!-- Open format -->
    Your browser does not support HTML video.
</video>

<!-- Browser picks the FIRST format it supports -->
```

### Video Formats:

| Format | Extension | Support                       |
|--------|-----------|-------------------------------|
| MP4    | `.mp4`    | All browsers (most common)    |
| WebM   | `.webm`   | Chrome, Firefox, Edge, Opera  |
| Ogg    | `.ogv`    | Firefox, Chrome, Opera        |

### Autoplay Rules:

```html
<!-- ❌ Most browsers BLOCK this (intrusive) -->
<video src="video.mp4" autoplay controls></video>

<!-- ✅ Autoplay works when MUTED -->
<video src="video.mp4" autoplay muted controls></video>

<!-- ✅ Background/hero video (no controls, muted, loops) -->
<video autoplay muted loop playsinline 
       style="width: 100%; object-fit: cover;">
    <source src="hero-bg.mp4" type="video/mp4">
</video>
```

---

## Audio — `<audio>`

Works just like `<video>`, but for sound:

```html
<audio src="song.mp3" controls>
    Your browser does not support the audio tag.
</audio>
```

### Audio Attributes:

```html
<audio 
    src="podcast.mp3"
    controls           <!-- play/pause, volume, seek bar -->
    autoplay            <!-- auto-plays (often blocked) -->
    muted               <!-- starts muted -->
    loop                <!-- repeats -->
    preload="metadata"  <!-- load only metadata first -->
>
</audio>
```

### Multiple Formats:

```html
<audio controls>
    <source src="song.ogg" type="audio/ogg">
    <source src="song.mp3" type="audio/mpeg">
    <source src="song.wav" type="audio/wav">
    Your browser does not support audio.
</audio>
```

### Audio Formats:

| Format | Extension | Support                     |
|--------|-----------|------------------------------|
| MP3    | `.mp3`    | All browsers (most common)   |
| WAV    | `.wav`    | All browsers (large files)   |
| Ogg    | `.ogg`    | Firefox, Chrome, Opera       |
| AAC    | `.aac`    | Safari, Chrome, Edge         |
| WebM   | `.weba`   | Chrome, Firefox, Opera       |

---

## Subtitles & Captions — `<track>`

Add subtitles, captions, or chapters to video/audio:

```html
<video controls width="640">
    <source src="video.mp4" type="video/mp4">

    <!-- Subtitles -->
    <track src="subtitles-en.vtt" kind="subtitles" srclang="en" label="English" default>
    <track src="subtitles-hi.vtt" kind="subtitles" srclang="hi" label="Hindi">

    <!-- Captions (includes sound descriptions) -->
    <track src="captions-en.vtt" kind="captions" srclang="en" label="English CC">
</video>
```

### WebVTT File Format (`.vtt`):

```
WEBVTT

00:00:01.000 --> 00:00:04.000
Hello and welcome to this tutorial!

00:00:05.000 --> 00:00:08.000
Today we'll learn about HTML video.

00:00:09.000 --> 00:00:12.000
Let's get started!
```

| `kind` Value    | Purpose                                    |
|-----------------|---------------------------------------------|
| `subtitles`     | Translation of dialogue                     |
| `captions`      | Dialogue + sound descriptions (for deaf)    |
| `descriptions`  | Describes what's happening (for blind)      |
| `chapters`      | Chapter titles for navigation               |
| `metadata`      | Data for scripts (not visible)              |

---

## Embedding External Content — `<iframe>`

Embed **another webpage** inside your page — YouTube videos, Google Maps, tweets, etc.

```html
<iframe 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    width="560" 
    height="315" 
    title="YouTube Video"
    frameborder="0"
    allowfullscreen
></iframe>
```

### Common Embeds:

```html
<!-- YouTube Video -->
<iframe 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    width="560" height="315" 
    title="Video title"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
</iframe>

<!-- Google Maps -->
<iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!..." 
    width="600" height="450" 
    title="Google Map"
    style="border: 0;" 
    loading="lazy"
    allowfullscreen>
</iframe>

<!-- Another webpage -->
<iframe src="https://example.com" width="100%" height="500" title="Example Site"></iframe>
```

### iframe Attributes:

| Attribute        | Purpose                                         |
|------------------|--------------------------------------------------|
| `src`            | URL to embed                                     |
| `width/height`   | Dimensions                                      |
| `title`          | Description (accessibility) — **Required**       |
| `allow`          | Permissions (camera, microphone, fullscreen)      |
| `allowfullscreen`| Allow fullscreen mode                            |
| `loading="lazy"` | Load only when visible (performance)             |
| `sandbox`        | Security restrictions                            |

### iframe Security — `sandbox`:

```html
<!-- Highly restricted — no scripts, no forms, no popups -->
<iframe src="https://untrusted-site.com" sandbox></iframe>

<!-- Allow specific things -->
<iframe src="https://example.com" 
        sandbox="allow-scripts allow-same-origin allow-forms">
</iframe>
```

| Sandbox Value         | What It Allows                    |
|-----------------------|-----------------------------------|
| `allow-scripts`       | Run JavaScript                    |
| `allow-forms`         | Submit forms                      |
| `allow-same-origin`   | Access cookies/storage            |
| `allow-popups`        | Open new windows/tabs             |
| `allow-modals`        | Use alert(), confirm()            |

---

## `<embed>` and `<object>` — Other Embeds

### `<embed>` — Simple Embed:

```html
<!-- PDF -->
<embed src="document.pdf" type="application/pdf" width="600" height="400">

<!-- Flash (obsolete, but for reference) -->
<embed src="game.swf" type="application/x-shockwave-flash" width="500" height="400">
```

### `<object>` — With Fallback:

```html
<object data="document.pdf" type="application/pdf" width="600" height="400">
    <p>Your browser doesn't support PDFs. 
       <a href="document.pdf">Download PDF</a>
    </p>
</object>
```

### When to Use Which:

| Element    | Use For                                  |
|------------|------------------------------------------|
| `<video>`  | Video files you host                     |
| `<audio>`  | Audio files you host                     |
| `<iframe>` | External pages (YouTube, Maps, etc.)     |
| `<embed>`  | PDFs, plugins                            |
| `<object>` | PDFs with fallback content               |

---

## Responsive Media

### Responsive Video:

```html
<!-- Make video responsive (fills container width) -->
<video controls style="width: 100%; max-width: 800px; height: auto;">
    <source src="video.mp4" type="video/mp4">
</video>

<!-- Responsive iframe (YouTube) — needs a wrapper -->
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <iframe 
        src="https://www.youtube.com/embed/VIDEO_ID"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        frameborder="0" 
        allowfullscreen>
    </iframe>
</div>
<!-- 56.25% = 9/16 aspect ratio (16:9) -->
```

---

## `<picture>` for Art Direction (Recap from Images)

```html
<!-- Different videos/images based on screen size -->
<video controls>
    <source src="video-hd.mp4" type="video/mp4" media="(min-width: 1200px)">
    <source src="video-sd.mp4" type="video/mp4">
</video>
```

---

## Real-World Examples

### Video Player with Subtitles:

```html
<figure>
    <video controls width="100%" poster="course-thumbnail.jpg" preload="metadata">
        <source src="lesson-1.webm" type="video/webm">
        <source src="lesson-1.mp4" type="video/mp4">
        <track src="subs-en.vtt" kind="subtitles" srclang="en" label="English" default>
        <track src="subs-hi.vtt" kind="subtitles" srclang="hi" label="Hindi">
        Your browser does not support HTML video.
    </video>
    <figcaption>Lesson 1: Introduction to HTML</figcaption>
</figure>
```

### Podcast Player:

```html
<article>
    <h3>Episode 42: The Future of Web Dev</h3>
    <p>Released: <time datetime="2026-03-01">March 1, 2026</time></p>
    <audio controls preload="metadata" style="width: 100%;">
        <source src="ep42.mp3" type="audio/mpeg">
        <source src="ep42.ogg" type="audio/ogg">
    </audio>
    <p>
        <a href="ep42.mp3" download>Download MP3</a> | 
        <a href="transcript.html">Read Transcript</a>
    </p>
</article>
```

### Embedded Map with Lazy Loading:

```html
<section>
    <h2>Find Us</h2>
    <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18..." 
        width="100%" 
        height="400" 
        style="border: 0; border-radius: 8px;"
        title="Our office location"
        loading="lazy"
        allowfullscreen>
    </iframe>
    <address>
        123 Tech Street, Connaught Place<br>
        New Delhi, India 110001
    </address>
</section>
```

---

## Quick Reference

| Tag        | Purpose                         | Self-Closing |
|------------|----------------------------------|:---:|
| `<video>`  | Embed video files                | No  |
| `<audio>`  | Embed audio files                | No  |
| `<source>` | Multiple media formats           | Yes |
| `<track>`  | Subtitles/captions for media     | Yes |
| `<iframe>` | Embed external pages             | No  |
| `<embed>`  | Embed plugins/PDFs               | Yes |
| `<object>` | Embed with fallback              | No  |

---

> **Key Takeaways**:
> 1. `<video>` and `<audio>` let you embed media directly — always add `controls`
> 2. Use `<source>` tags for multiple formats — browser picks the first it supports
> 3. `autoplay` needs `muted` to work in most browsers
> 4. Add `<track>` for subtitles/captions — use `.vtt` (WebVTT) format
> 5. `<iframe>` embeds external pages (YouTube, Maps) — always add `title` for accessibility
> 6. Use `sandbox` on `<iframe>` for security when embedding untrusted content
> 7. Add `loading="lazy"` to iframes and videos below the fold for performance 🎯
