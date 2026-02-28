# Forms & Inputs in HTML

## What Are Forms?

Forms let users **send data** to a server — login, sign up, search, checkout, etc. Every time you fill in a form on a website, you're using HTML forms.

```html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    <button type="submit">Submit</button>
</form>
```

---

## The `<form>` Element

```html
<form action="/api/signup" method="POST">
    <!-- form fields go here -->
</form>
```

| Attribute  | Purpose                                          |
|------------|--------------------------------------------------|
| `action`   | URL where the form data is sent                  |
| `method`   | HTTP method — `GET` or `POST`                    |
| `enctype`  | How data is encoded (needed for file uploads)    |
| `autocomplete` | `on` or `off` — browser autofill            |
| `novalidate` | Disables built-in browser validation           |

### GET vs POST:

```html
<!-- GET — data appears in the URL (for searches, filters) -->
<form action="/search" method="GET">
    <input name="q" type="text">
    <!-- URL becomes: /search?q=hello -->
</form>

<!-- POST — data is hidden in the request body (for sensitive data) -->
<form action="/login" method="POST">
    <input name="password" type="password">
    <!-- Data NOT visible in URL -->
</form>
```

| GET                            | POST                              |
|--------------------------------|-----------------------------------|
| Data visible in URL            | Data hidden in request body       |
| Bookmarkable                   | Not bookmarkable                  |
| Limited data size (~2000 chars)| No size limit                     |
| For searching, filtering       | For login, signup, file uploads   |

---

## Input Types — The Complete List

### Text Inputs:

```html
<!-- Basic text -->
<input type="text" placeholder="Enter your name">

<!-- Password (hidden characters) -->
<input type="password" placeholder="Enter password">

<!-- Email (validates email format) -->
<input type="email" placeholder="you@example.com">

<!-- URL (validates URL format) -->
<input type="url" placeholder="https://example.com">

<!-- Phone number -->
<input type="tel" placeholder="+91 1234567890">

<!-- Search (has clear button in some browsers) -->
<input type="search" placeholder="Search...">
```

### Number Inputs:

```html
<!-- Number with spinner -->
<input type="number" min="0" max="100" step="5" value="50">

<!-- Slider -->
<input type="range" min="0" max="100" step="10" value="50">
```

### Date & Time Inputs:

```html
<!-- Date picker -->
<input type="date" value="2026-03-01">

<!-- Date + Time -->
<input type="datetime-local" value="2026-03-01T10:00">

<!-- Month -->
<input type="month" value="2026-03">

<!-- Week -->
<input type="week" value="2026-W09">

<!-- Time -->
<input type="time" value="10:30">
```

### Other Inputs:

```html
<!-- Color picker -->
<input type="color" value="#ff0000">

<!-- File upload -->
<input type="file" accept=".jpg,.png,.pdf">

<!-- Multiple files -->
<input type="file" multiple accept="image/*">

<!-- Hidden field (not visible, but sent with form) -->
<input type="hidden" name="userId" value="12345">
```

---

## Labels — Always Use Them!

Labels tell users **what** each input is for. Clicking a label focuses the input.

```html
<!-- Method 1: for + id (recommended) -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- Method 2: Wrap input inside label -->
<label>
    Email:
    <input type="email" name="email">
</label>

<!-- ❌ BAD — no label, user doesn't know what to enter -->
<input type="text" name="something">

<!-- ❌ BAD — using placeholder as label -->
<input type="text" placeholder="Email">
<!-- Placeholder disappears when typing! -->
```

**Why labels matter:**
- Clicking the label focuses the input (better UX)
- Screen readers read the label aloud
- Required for accessibility

---

## Placeholders, Values & Defaults

```html
<!-- placeholder — hint text (disappears when typing) -->
<input type="text" placeholder="Enter your name">

<!-- value — pre-filled value -->
<input type="text" value="Ankit">

<!-- Both together -->
<input type="email" value="ankit@mail.com" placeholder="Your email">
```

---

## Textarea — Multi-line Text

```html
<label for="message">Message:</label>
<textarea id="message" name="message" rows="5" cols="40" 
          placeholder="Type your message here..."></textarea>

<!-- rows = height, cols = width -->
<!-- Use CSS for better sizing: -->
<textarea style="width: 100%; height: 150px; resize: vertical;"></textarea>

<!-- resize options: none, vertical, horizontal, both -->
```

---

## Select Dropdown — `<select>`

```html
<label for="country">Country:</label>
<select id="country" name="country">
    <option value="">-- Select a country --</option>
    <option value="in">India</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="jp" selected>Japan</option>  <!-- Pre-selected -->
</select>
```

### Option Groups:

```html
<select name="car">
    <optgroup label="Japanese">
        <option value="toyota">Toyota</option>
        <option value="honda">Honda</option>
    </optgroup>
    <optgroup label="German">
        <option value="bmw">BMW</option>
        <option value="audi">Audi</option>
    </optgroup>
</select>
```

### Multiple Selection:

```html
<select name="skills" multiple size="5">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
    <option value="react">React</option>
    <option value="node">Node.js</option>
</select>
<!-- Hold Ctrl/Cmd to select multiple -->
```

---

## Checkboxes & Radio Buttons

### Checkboxes — Multiple Selections:

```html
<p>Select your hobbies:</p>

<label>
    <input type="checkbox" name="hobbies" value="reading"> Reading
</label>
<label>
    <input type="checkbox" name="hobbies" value="gaming" checked> Gaming
</label>
<label>
    <input type="checkbox" name="hobbies" value="cooking"> Cooking
</label>

<!-- checked = pre-checked by default -->
<!-- Multiple can be selected -->
```

### Radio Buttons — Single Selection:

```html
<p>Select your gender:</p>

<label>
    <input type="radio" name="gender" value="male"> Male
</label>
<label>
    <input type="radio" name="gender" value="female"> Female
</label>
<label>
    <input type="radio" name="gender" value="other" checked> Other
</label>

<!-- SAME name = only ONE can be selected -->
<!-- Different name = independent groups -->
```

---

## Buttons

```html
<!-- Submit button — sends the form -->
<button type="submit">Submit</button>

<!-- Reset button — clears all fields -->
<button type="reset">Clear Form</button>

<!-- Regular button — for JavaScript actions -->
<button type="button" onclick="alert('Hi!')">Click Me</button>

<!-- Input as button (older way) -->
<input type="submit" value="Submit">
<input type="reset" value="Reset">
<input type="button" value="Click Me">

<!-- Use <button> over <input> — more flexible (can have icons, images inside) -->
<button type="submit">
    🚀 Submit Form
</button>
```

---

## Fieldset & Legend — Grouping Fields

```html
<form>
    <fieldset>
        <legend>Personal Information</legend>

        <label for="fname">First Name:</label>
        <input type="text" id="fname" name="fname"><br><br>

        <label for="lname">Last Name:</label>
        <input type="text" id="lname" name="lname"><br><br>

        <label for="age">Age:</label>
        <input type="number" id="age" name="age">
    </fieldset>

    <fieldset>
        <legend>Account Details</legend>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email"><br><br>

        <label for="pass">Password:</label>
        <input type="password" id="pass" name="pass">
    </fieldset>

    <button type="submit">Sign Up</button>
</form>

<!-- Shows a bordered box around each group with a title -->
```

---

## Datalist — Autocomplete Suggestions

```html
<label for="browser">Favorite Browser:</label>
<input type="text" id="browser" name="browser" list="browsers">

<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
    <option value="Opera">
</datalist>

<!-- User can type OR pick from dropdown suggestions -->
<!-- Unlike <select>, user can also type custom values -->
```

---

## Output Element

Shows the **result** of a calculation:

```html
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
    <input type="number" id="a" name="a" value="0"> +
    <input type="number" id="b" name="b" value="0"> =
    <output name="result" for="a b">0</output>
</form>
```

---

## Form Validation — Built-in Browser Validation

HTML has built-in validation — no JavaScript needed!

### Required Field:

```html
<input type="text" name="name" required>
<!-- Shows error if submitted empty -->
```

### Min/Max Length:

```html
<input type="text" minlength="3" maxlength="20">
<textarea minlength="10" maxlength="500"></textarea>
```

### Min/Max Values (Numbers):

```html
<input type="number" min="1" max="100" step="1">
```

### Pattern — Custom Regex Validation:

```html
<!-- Only letters -->
<input type="text" pattern="[A-Za-z]+" title="Letters only">

<!-- Indian phone number -->
<input type="tel" pattern="[0-9]{10}" title="10-digit phone number">

<!-- Strong password: 8+ chars, upper, lower, number -->
<input type="password" 
       pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
       title="Must contain at least 8 characters, one uppercase, one lowercase, and one number">
```

### All Validation Attributes:

| Attribute     | Purpose                                   | Example                     |
|---------------|-------------------------------------------|-----------------------------|
| `required`    | Field must be filled                      | `required`                  |
| `minlength`   | Minimum text length                       | `minlength="3"`             |
| `maxlength`   | Maximum text length                       | `maxlength="100"`           |
| `min`         | Minimum number/date value                 | `min="0"`                   |
| `max`         | Maximum number/date value                 | `max="100"`                 |
| `step`        | Allowed number intervals                  | `step="5"`                  |
| `pattern`     | Regex pattern to match                    | `pattern="[A-Z]{3}"`       |
| `type="email"`| Validates email format                    | Auto-validates              |
| `type="url"`  | Validates URL format                      | Auto-validates              |

---

## Common Input Attributes

```html
<input 
    type="text"
    name="username"        <!-- Field name (sent to server) -->
    id="username"          <!-- Unique ID (for label linking) -->
    value="default"        <!-- Pre-filled value -->
    placeholder="Hint..."  <!-- Placeholder text -->
    required               <!-- Must be filled -->
    disabled               <!-- Can't interact (grayed out, NOT sent) -->
    readonly               <!-- Can't edit, but IS sent -->
    autofocus              <!-- Auto-focuses on page load -->
    autocomplete="off"     <!-- Disable browser autofill -->
    tabindex="2"           <!-- Tab order -->
    size="30"              <!-- Visual width (characters) -->
    maxlength="50"         <!-- Max characters allowed -->
>
```

### `disabled` vs `readonly`:

```html
<!-- disabled — grayed out, can't interact, NOT sent with form -->
<input type="text" value="Can't touch this" disabled>

<!-- readonly — can't edit, but value IS sent with form -->
<input type="text" value="Read only but sent" readonly>
```

---

## File Upload

```html
<form action="/upload" method="POST" enctype="multipart/form-data">
    <!-- ⚠️ enctype="multipart/form-data" is REQUIRED for file uploads! -->

    <label for="avatar">Profile Picture:</label>
    <input type="file" id="avatar" name="avatar" accept="image/*">

    <label for="docs">Documents:</label>
    <input type="file" id="docs" name="docs" multiple accept=".pdf,.doc,.docx">

    <button type="submit">Upload</button>
</form>
```

| `accept` value | What it allows                 |
|----------------|--------------------------------|
| `image/*`      | Any image file                 |
| `video/*`      | Any video file                 |
| `audio/*`      | Any audio file                 |
| `.pdf`         | Only PDF files                 |
| `.jpg,.png`    | Only JPG and PNG               |

---

## Meter & Progress

### Progress Bar:

```html
<!-- Shows a progress bar -->
<label for="download">Download Progress:</label>
<progress id="download" value="70" max="100">70%</progress>
<!-- Shows: [████████░░] 70% -->
```

### Meter — Gauge Display:

```html
<!-- Shows a measurement within a range -->
<label for="disk">Disk Usage:</label>
<meter id="disk" value="0.7" min="0" max="1" low="0.3" high="0.7" optimum="0.2">
    70%
</meter>
<!-- Changes color: green (OK), yellow (warning), red (danger) -->
```

---

## Complete Form Example

```html
<form action="/api/register" method="POST">
    <h2>Registration Form</h2>

    <fieldset>
        <legend>Personal Info</legend>

        <label for="fullname">Full Name: *</label><br>
        <input type="text" id="fullname" name="fullname" 
               required minlength="2" maxlength="50"><br><br>

        <label for="email">Email: *</label><br>
        <input type="email" id="email" name="email" 
               required placeholder="you@example.com"><br><br>

        <label for="phone">Phone:</label><br>
        <input type="tel" id="phone" name="phone" 
               pattern="[0-9]{10}" placeholder="1234567890"><br><br>

        <label for="dob">Date of Birth:</label><br>
        <input type="date" id="dob" name="dob" 
               min="1950-01-01" max="2010-12-31"><br><br>
    </fieldset>

    <fieldset>
        <legend>Account</legend>

        <label for="username">Username: *</label><br>
        <input type="text" id="username" name="username" 
               required pattern="[a-zA-Z0-9_]{3,20}" 
               title="3-20 characters, letters, numbers, underscore"><br><br>

        <label for="password">Password: *</label><br>
        <input type="password" id="password" name="password" 
               required minlength="8"><br><br>

        <label for="role">Role:</label><br>
        <select id="role" name="role">
            <option value="user" selected>User</option>
            <option value="admin">Admin</option>
        </select><br><br>
    </fieldset>

    <fieldset>
        <legend>Preferences</legend>

        <p>Gender:</p>
        <label><input type="radio" name="gender" value="male"> Male</label>
        <label><input type="radio" name="gender" value="female"> Female</label>
        <label><input type="radio" name="gender" value="other"> Other</label>
        <br><br>

        <p>Interests:</p>
        <label><input type="checkbox" name="interests" value="tech"> Technology</label>
        <label><input type="checkbox" name="interests" value="sports"> Sports</label>
        <label><input type="checkbox" name="interests" value="music"> Music</label>
        <br><br>

        <label for="bio">Bio:</label><br>
        <textarea id="bio" name="bio" rows="4" cols="40" 
                  maxlength="300" placeholder="Tell us about yourself..."></textarea>
    </fieldset>

    <br>
    <label>
        <input type="checkbox" name="terms" required> 
        I agree to the <a href="/terms">Terms & Conditions</a> *
    </label>
    <br><br>

    <button type="submit">🚀 Register</button>
    <button type="reset">🔄 Clear</button>
</form>
```

---

> **Key Takeaways**:
> 1. `<form>` wraps all inputs; `action` = where data goes, `method` = GET or POST
> 2. Always use `<label>` with every input — link them via `for` + `id`
> 3. Use the right `type` — `email`, `password`, `number`, `date`, etc. for built-in validation
> 4. `required`, `minlength`, `maxlength`, `pattern` give you validation without JavaScript
> 5. Use `<fieldset>` + `<legend>` to group related fields
> 6. `<select>` for dropdowns, checkboxes for multi-select, radio for single-select
> 7. File uploads need `enctype="multipart/form-data"` on the form 🎯
