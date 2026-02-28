# Tables in HTML

## What Are Tables?

Tables display **data in rows and columns** — like spreadsheets. Think of an Excel sheet: rows go left-to-right, columns go top-to-bottom.

```html
<table>
    <tr>
        <td>Row 1, Column 1</td>
        <td>Row 1, Column 2</td>
    </tr>
    <tr>
        <td>Row 2, Column 1</td>
        <td>Row 2, Column 2</td>
    </tr>
</table>
```

---

## Core Table Tags

| Tag         | Full Name        | Purpose                          |
|-------------|------------------|----------------------------------|
| `<table>`   | Table            | Container for the whole table    |
| `<tr>`      | Table Row        | Creates a row                    |
| `<td>`      | Table Data       | Creates a regular cell           |
| `<th>`      | Table Header     | Creates a header cell (bold, centered) |

```html
<table border="1">
    <tr>
        <th>Name</th>       <!-- Header cell (bold) -->
        <th>Age</th>
        <th>City</th>
    </tr>
    <tr>
        <td>Ankit</td>      <!-- Data cell -->
        <td>25</td>
        <td>Delhi</td>
    </tr>
    <tr>
        <td>Priya</td>
        <td>23</td>
        <td>Mumbai</td>
    </tr>
</table>

<!-- Shows:
┌───────┬─────┬────────┐
│ Name  │ Age │ City   │  ← header (bold)
├───────┼─────┼────────┤
│ Ankit │ 25  │ Delhi  │
├───────┼─────┼────────┤
│ Priya │ 23  │ Mumbai │
└───────┴─────┴────────┘
-->
```

---

## Table Structure — `<thead>`, `<tbody>`, `<tfoot>`

Organize your table into **sections** for better structure and styling:

```html
<table border="1">
    <!-- Table Header -->
    <thead>
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
        </tr>
    </thead>

    <!-- Table Body -->
    <tbody>
        <tr>
            <td>Laptop</td>
            <td>$999</td>
            <td>2</td>
        </tr>
        <tr>
            <td>Mouse</td>
            <td>$29</td>
            <td>5</td>
        </tr>
        <tr>
            <td>Keyboard</td>
            <td>$79</td>
            <td>3</td>
        </tr>
    </tbody>

    <!-- Table Footer -->
    <tfoot>
        <tr>
            <td>Total</td>
            <td>$2,270</td>
            <td>10</td>
        </tr>
    </tfoot>
</table>
```

**Why use these?**
- Better **semantics** (screen readers know which is the header)
- **CSS styling** — style header, body, footer differently
- When printing, `<thead>` repeats on every page automatically
- `<tfoot>` always appears at the bottom even if body is long

---

## Table Caption — `<caption>`

Gives your table a **title**:

```html
<table border="1">
    <caption>Student Marks — Semester 1</caption>
    <thead>
        <tr>
            <th>Name</th>
            <th>Math</th>
            <th>Science</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Ankit</td>
            <td>95</td>
            <td>88</td>
        </tr>
    </tbody>
</table>

<!-- Caption appears above (or below with CSS) the table -->
```

---

## Spanning — Merging Cells

### `colspan` — Merge Columns (Horizontal):

```html
<table border="1">
    <tr>
        <th colspan="3">Student Information</th>  <!-- Spans 3 columns -->
    </tr>
    <tr>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
    </tr>
    <tr>
        <td>Ankit</td>
        <td>25</td>
        <td>Delhi</td>
    </tr>
</table>

<!-- Shows:
┌──────────────────────────┐
│   Student Information    │  ← spans all 3 columns
├────────┬──────┬──────────┤
│ Name   │ Age  │ City     │
├────────┼──────┼──────────┤
│ Ankit  │ 25   │ Delhi    │
└────────┴──────┴──────────┘
-->
```

### `rowspan` — Merge Rows (Vertical):

```html
<table border="1">
    <tr>
        <th>Name</th>
        <th>Subject</th>
        <th>Score</th>
    </tr>
    <tr>
        <td rowspan="2">Ankit</td>  <!-- Spans 2 rows -->
        <td>Math</td>
        <td>95</td>
    </tr>
    <tr>
        <!-- No <td> for Name — already covered by rowspan -->
        <td>Science</td>
        <td>88</td>
    </tr>
</table>

<!-- Shows:
┌───────┬─────────┬───────┐
│ Name  │ Subject │ Score │
├───────┼─────────┼───────┤
│       │ Math    │ 95    │
│ Ankit ├─────────┼───────┤
│       │ Science │ 88    │
└───────┴─────────┴───────┘
-->
```

### Combined `colspan` + `rowspan`:

```html
<table border="1">
    <tr>
        <th rowspan="2">Name</th>
        <th colspan="2">Scores</th>
    </tr>
    <tr>
        <th>Math</th>
        <th>Science</th>
    </tr>
    <tr>
        <td>Ankit</td>
        <td>95</td>
        <td>88</td>
    </tr>
    <tr>
        <td>Priya</td>
        <td>92</td>
        <td>91</td>
    </tr>
</table>

<!-- Shows:
┌───────┬──────────────┐
│       │   Scores     │
│ Name  ├──────┬───────┤
│       │ Math │ Sci   │
├───────┼──────┼───────┤
│ Ankit │ 95   │ 88    │
├───────┼──────┼───────┤
│ Priya │ 92   │ 91    │
└───────┴──────┴───────┘
-->
```

---

## Column Groups — `<colgroup>` & `<col>`

Style entire columns at once:

```html
<table border="1">
    <colgroup>
        <col style="background-color: lightyellow;">           <!-- Column 1 -->
        <col style="background-color: lightblue;">             <!-- Column 2 -->
        <col span="2" style="background-color: lightgreen;">   <!-- Columns 3 & 4 -->
    </colgroup>
    <thead>
        <tr>
            <th>Name</th>
            <th>Math</th>
            <th>Science</th>
            <th>English</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Ankit</td>
            <td>95</td>
            <td>88</td>
            <td>82</td>
        </tr>
    </tbody>
</table>
```

---

## Styling Tables with CSS

By default, tables look plain. Here's how to make them look good:

```html
<style>
    /* Basic table styling */
    table {
        border-collapse: collapse;   /* Merge borders (no double lines) */
        width: 100%;
        font-family: Arial, sans-serif;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 12px 15px;
        text-align: left;
    }

    /* Header styling */
    thead {
        background-color: #333;
        color: white;
    }

    /* Zebra stripes */
    tbody tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    /* Hover effect */
    tbody tr:hover {
        background-color: #ddd;
    }

    /* Footer styling */
    tfoot {
        background-color: #f9f9f9;
        font-weight: bold;
    }

    /* Caption */
    caption {
        font-size: 1.2em;
        margin-bottom: 10px;
        font-weight: bold;
    }
</style>
```

### `border-collapse` — Most Important CSS Property for Tables:

```html
<!-- separate (default) — each cell has its own border (gap between) -->
<table style="border-collapse: separate; border-spacing: 5px;">

<!-- collapse — borders merge into one line (clean look) -->
<table style="border-collapse: collapse;">
```

---

## Scope Attribute — For Accessibility

Helps screen readers understand the relationship between headers and data:

```html
<table>
    <thead>
        <tr>
            <th scope="col">Name</th>       <!-- This header is for the column -->
            <th scope="col">Age</th>
            <th scope="col">City</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Ankit</th>      <!-- This header is for the row -->
            <td>25</td>
            <td>Delhi</td>
        </tr>
    </tbody>
</table>
```

| `scope` value | Meaning                       |
|---------------|-------------------------------|
| `col`         | Header for the column below   |
| `row`         | Header for the row beside it  |
| `colgroup`    | Header for a group of columns |
| `rowgroup`    | Header for a group of rows    |

---

## Real-World Examples

### Pricing Table:

```html
<table border="1">
    <caption>Pricing Plans</caption>
    <thead>
        <tr>
            <th>Feature</th>
            <th>Free</th>
            <th>Pro</th>
            <th>Enterprise</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Storage</td>
            <td>5 GB</td>
            <td>100 GB</td>
            <td>Unlimited</td>
        </tr>
        <tr>
            <td>Users</td>
            <td>1</td>
            <td>10</td>
            <td>Unlimited</td>
        </tr>
        <tr>
            <td>Support</td>
            <td>Email</td>
            <td>Priority</td>
            <td>24/7 Phone</td>
        </tr>
        <tr>
            <td>Price</td>
            <td>Free</td>
            <td>$19/mo</td>
            <td>$99/mo</td>
        </tr>
    </tbody>
</table>
```

### Schedule/Timetable:

```html
<table border="1">
    <caption>Weekly Schedule</caption>
    <thead>
        <tr>
            <th>Time</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>9:00 AM</td>
            <td>Math</td>
            <td>English</td>
            <td>Science</td>
        </tr>
        <tr>
            <td>10:00 AM</td>
            <td colspan="2">Lab Session</td>  <!-- Spans 2 days -->
            <td>Art</td>
        </tr>
        <tr>
            <td>11:00 AM</td>
            <td>History</td>
            <td>Math</td>
            <td>English</td>
        </tr>
    </tbody>
</table>
```

---

## Tables — Do's and Don'ts

```html
<!-- ✅ DO use tables for TABULAR DATA -->
<table>
    <tr><th>Name</th><th>Email</th></tr>
    <tr><td>Ankit</td><td>ankit@mail.com</td></tr>
</table>

<!-- ❌ DON'T use tables for PAGE LAYOUT -->
<!-- This was common in the 1990s — DON'T do this! -->
<table>
    <tr>
        <td>Navigation</td>
        <td>Main Content</td>
        <td>Sidebar</td>
    </tr>
</table>
<!-- Use CSS Flexbox or Grid for layouts instead! -->

<!-- ❌ DON'T forget thead, tbody -->
<!-- ❌ DON'T skip <th> for header cells (use <th>, not <td> with bold) -->
```

---

> **Key Takeaways**:
> 1. `<table>` → `<tr>` (rows) → `<td>` (data cells) or `<th>` (header cells)
> 2. Use `<thead>`, `<tbody>`, `<tfoot>` to organize your table into sections
> 3. `colspan` merges cells horizontally, `rowspan` merges cells vertically
> 4. Add `border-collapse: collapse` in CSS for clean-looking tables
> 5. Use `scope="col"` or `scope="row"` on `<th>` for accessibility
> 6. Use tables for **data** only, never for **page layout** — use CSS Grid/Flexbox
> 7. Add `<caption>` for a table title — it helps both users and screen readers 🎯
