# Git Basics - Complete Guide

## Understanding .git Directory

The `.git` directory is a **hidden folder** created when you initialize a Git repository. This folder contains all the version control information, including commit history, branches, and configuration files.

**Key Points:**
- Hidden files and folders start with a dot (`.`)
- The `.git` folder should not be manually modified
- Deleting this folder removes all Git history from your project

---

## Viewing Hidden Files

To see hidden files including `.git`, use the `-a` flag with the `ls` command:

```bash
ls -a
```

**What it shows:**
- All files including hidden ones (those starting with `.`)
- `.` (current directory)
- `..` (parent directory)
- `.git` (Git repository folder)

---

## The Git Workflow

Git follows a three-stage workflow:

1. **Working Directory** - where you make changes
2. **Staging Area** - where you prepare changes for commit
3. **Repository** - where committed changes are permanently stored

---

## Adding Files to Staging Area

The `git add` command moves files from your working directory to the staging area (not directly to remote repository as your notes suggested).

### Add a specific file:
```bash
git add <filename>
```

### Add all changed files:
```bash
git add .
```

### Add multiple specific files:
```bash
git add file1.txt file2.js
```

**Purpose:** Staging allows you to selectively choose which changes to include in your next commit.

---

## Committing Changes

After staging files, commit them to save a snapshot of your project:

```bash
git commit -m "Your descriptive commit message"
```

**Best Practices:**
- Write clear, concise commit messages
- Use present tense ("Add feature" not "Added feature")
- Describe what the commit does, not what you did
- Examples: "Fix login bug", "Add user authentication", "Update documentation"

---

## Checking Repository Status

View the current state of your working directory and staging area:

```bash
git status
```

**Information shown:**
- Which branch you're on
- Files that are staged for commit (green)
- Files that are modified but not staged (red)
- Untracked files (files not yet added to Git)

---

## Viewing Commit History

### Detailed commit log:
```bash
git log
```

**Shows:**
- Full commit hash (SHA)
- Author name and email
- Date and time of commit
- Full commit message

### Condensed one-line format:
```bash
git log --oneline
```

**Shows:**
- Abbreviated commit hash
- Commit message only
- Much easier to scan through many commits

**Example output:**
```
a3f5c2d Add user login feature
b8e4d1a Fix navigation bug
c9f2e3b Update README
```

---

## Comparing Changes

### View unstaged changes:
```bash
git diff
```

Shows differences between your working directory and the staging area (what you've changed but haven't staged yet).

### Compare two commits:
```bash
git diff commitHash1 commitHash2
```

**Example:**
```bash
git diff a3f5c2d b8e4d1a
```

**Shows:**
- Lines added (in green with `+`)
- Lines removed (in red with `-`)
- Which files were changed

---

## Undoing Changes

### Revert a commit:
```bash
git revert commitHash
```

**How it works:**
- Creates a **new commit** that undoes the changes from the specified commit
- Preserves history (doesn't delete the original commit)
- Safe to use on commits that have been pushed to remote
- Git will open an editor for you to write a revert commit message

**Example:**
```bash
git revert a3f5c2d
```

This creates a new commit that reverses all changes made in commit `a3f5c2d`.

**Important:** `git revert` is different from `git reset` - revert is safer for shared repositories because it doesn't rewrite history.

---

## Quick Reference Cheat Sheet

| Command | Purpose |
|---------|---------|
| `ls -a` | Show all files including hidden ones |
| `git add <file>` | Stage a specific file |
| `git commit -m "message"` | Commit staged changes with a message |
| `git status` | Check current repository status |
| `git log` | View detailed commit history |
| `git log --oneline` | View condensed commit history |
| `git diff` | View unstaged changes |
| `git diff hash1 hash2` | Compare two commits |
| `git revert hash` | Undo a commit safely |

---

## Common Workflow Example

```bash
# 1. Check current status
git status

# 2. Make changes to your files
# (edit files in your editor)

# 3. View what changed
git diff

# 4. Stage the changes
git add .

# 5. Commit with a message
git commit -m "Add new feature"

# 6. View commit history
git log --oneline
```