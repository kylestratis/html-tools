# HTML Tools Project Guidelines

This document defines the conventions, philosophy, and technical standards for the HTML Tools collection.

## Project Information

- **GitHub Repository**: https://github.com/kylestratis/html-tools
- **GitHub Username**: kylestratis
- **Live Site**: https://tools.kylestratis.com
- **Repository Name**: html-tools

## Core Philosophy

**Simplicity above all else.** These tools prioritize:

- **Zero dependencies**: No frameworks, no npm, no build steps
- **Privacy-first**: All processing happens in the browser - no data leaves the client
- **Single-file architecture**: Each tool is one HTML file with inline CSS and JavaScript
- **Hosting independence**: Tools work anywhere - GitHub Pages, local filesystem, any static host
- **Accessibility**: Works on any modern browser without special requirements

**Inspired by**: [Simon Willison's HTML Tools](https://tools.simonwillison.net) and his [philosophy on simple tools](https://simonwillison.net/2025/Dec/10/html-tools/)

## Technical Standards

### File Structure
```
html-tools/
├── index.html           # Landing page listing all tools
├── tool-name.html       # Individual tool (kebab-case naming)
├── tool-name.txt        # (Optional) Conversation that generated the tool
├── another-tool.html
├── another-tool.txt     # (Optional) Conversation record
└── README.md
```

**Note:** `.txt` files are optional and only used for AI-generated tools to preserve the conversation history.

### Tool Architecture

Each tool MUST:
- Be a single, self-contained HTML file
- Include all CSS inline in a `<style>` block
- Include all JavaScript inline in a `<script>` block
- Work offline once loaded (no external dependencies unless absolutely necessary)
- Be responsive and mobile-friendly
- Process all data client-side only

### Naming Conventions

- **Tool files**: Use kebab-case (e.g., `vibe-counter.html`, `color-picker.html`)
- **IDs and classes**: Use kebab-case for CSS, camelCase for JavaScript variables
- **Tool names**: Clear, descriptive names that explain what the tool does

## Code Style

### HTML
- Use semantic HTML5 elements
- Include proper meta tags (charset, viewport)
- Write descriptive, clear page titles

### CSS
- Use modern CSS (flexbox, grid) for layouts
- Mobile-first responsive design
- Consistent color scheme across tools (currently purple gradient: `#667eea` to `#764ba2`)
- Clean, readable styles with appropriate spacing
- **MUST include dark mode support** (see Dark Mode Implementation section below)

### JavaScript
- Use vanilla JavaScript (no libraries unless essential)
- Prefer modern ES6+ syntax
- Add comments for complex logic
- Use `const` and `let` (no `var`)
- Handle edge cases gracefully

## Data Persistence Patterns

When tools need to remember data:
- **URL parameters**: For shareable state and bookmarkable configurations
- **localStorage**: For secrets (API keys) and larger datasets that shouldn't be in URLs
- **Never use servers**: All state management is client-side only

## Dark Mode Implementation

**ALL tools MUST include dark mode support.** This is a required feature for both existing and new tools.

### Requirements

1. **Respect system preference**: Check `prefers-color-scheme` media query
2. **Manual toggle**: Provide a button to override system preference
3. **Persistent choice**: Store user's manual selection in localStorage
4. **Consistent across all pages**: Dark mode preference persists across all tools
5. **Smooth transitions**: Use CSS transitions for theme switching

### Implementation Pattern

#### 1. CSS Variables (in `<style>` block)

Define color variables for light mode (`:root`) and dark mode (`body.dark-mode`):

```css
:root {
    /* Light mode colors */
    --bg-primary: #f8f9fa;
    --bg-secondary: #ffffff;
    --text-primary: #333;
    --text-secondary: #666;
    --border-color: #e0e0e0;
    --accent-primary: #667eea;
    --accent-secondary: #764ba2;
    /* Add more as needed for your tool */
}

body.dark-mode {
    /* Dark mode colors */
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #e0e0e0;
    --text-secondary: #b0b0b0;
    --border-color: #404040;
    --accent-primary: #8b9eff;
    --accent-secondary: #9d6bc7;
    /* Override all light mode variables */
}

/* Use variables in your styles */
body {
    background: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
}
```

#### 2. Toggle Button (in `<style>` block)

```css
.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 50px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    z-index: 1000;
}

.theme-toggle:hover {
    transform: scale(1.05);
}

@media (max-width: 600px) {
    .theme-toggle {
        top: 10px;
        right: 10px;
        padding: 8px 16px;
        font-size: 18px;
    }
}
```

#### 3. HTML Toggle Button (in `<body>`)

Add this as the first element inside `<body>`:

```html
<button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
    <span class="theme-icon">🌙</span>
</button>
```

#### 4. JavaScript (in `<script>` block)

Add this at the end of your JavaScript:

```javascript
// Dark mode functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Check for saved theme preference or default to system preference
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Set theme
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.textContent = '🌙';
    }
    localStorage.setItem('theme', theme);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Initialize theme on page load
setTheme(getPreferredTheme());

// Listen for toggle button clicks
themeToggle.addEventListener('click', toggleTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});
```

### Special Considerations

#### For Canvas-based Tools

If your tool uses the Canvas API, you'll need to redraw when the theme changes:

```javascript
// In setTheme function, add:
function setTheme(theme) {
    // ... existing theme setting code ...

    // Redraw canvas with new colors if applicable
    if (typeof drawGame === 'function') {
        drawGame();
    }
}

// In your draw function, get colors from CSS variables:
function drawCanvas() {
    const textColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--canvas-text').trim();
    ctx.fillStyle = textColor;
    // ... rest of drawing code
}
```

#### For Gradient Backgrounds

For tools with gradient backgrounds, define gradient colors as CSS variables:

```css
:root {
    --bg-gradient-start: #667eea;
    --bg-gradient-end: #764ba2;
}

body.dark-mode {
    --bg-gradient-start: #1a1a2e;
    --bg-gradient-end: #16213e;
}

body {
    background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
}
```

### Testing Dark Mode

Before committing, verify:
- [ ] Theme toggle button is visible and accessible
- [ ] All text is readable in both modes
- [ ] All interactive elements work in both modes
- [ ] Theme preference persists across page reloads
- [ ] System preference is respected on first visit
- [ ] Manual toggle overrides system preference
- [ ] Transitions are smooth (not jarring)
- [ ] Canvas/dynamic content updates with theme

## Adding a New Tool

### 1. Create the Tool
Create `new-tool.html` following the single-file architecture:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tool Name - HTML Tools</title>
    <style>
        /* Inline CSS here */
    </style>
</head>
<body>
    <!-- Tool UI here -->
    <script>
        // Inline JavaScript here
    </script>
</body>
</html>
```

### 2. Update the Landing Page
Add the tool to `index.html` in the tools list:

```html
<li class="tool-item">
    <h3><a href="new-tool.html">Tool Name</a></h3>
    <p class="tool-description">
        Clear, concise description of what the tool does.
    </p>
    <ul class="tool-features">
        <li>Key feature 1</li>
        <li>Key feature 2</li>
        <li>Key feature 3</li>
    </ul>
</li>
```

### 3. Update Documentation
Add the tool to `README.md` under "Available Tools":

```markdown
### [Tool Name](new-tool.html)
Brief description of the tool.

**Features:**
- Feature 1
- Feature 2
- Feature 3
```

### 4. Commit and Deploy
```bash
git add new-tool.html index.html README.md
git commit -m "Add [Tool Name] tool"
git push
```

GitHub Pages will automatically deploy the update.

### 5. Document the Conversation (AI-Generated Tools Only)

**When a tool is created through an AI conversation (e.g., Claude Code, ChatGPT):**

Create a text file with the same name as the HTML file to preserve the conversation that generated it:

```bash
# For tool: token-cost-calculator.html
# Create: token-cost-calculator.txt
```

**File Structure:**
```
html-tools/
├── token-cost-calculator.html    # The tool
├── token-cost-calculator.txt     # The conversation that created it
├── another-tool.html
├── another-tool.txt
└── ...
```

**What to include in the conversation file:**
- Only the user's prompts from the conversation
- Date of creation
- Simple format with each prompt numbered

**Example format:**
```
Tool Name - User Prompts
========================

Date: December 18, 2024

---

PROMPT 1:
[User's first prompt here]

---

PROMPT 2:
[User's second prompt here]

---

END OF CONVERSATION LOG
```

**Why:**
- Provides context for what the user originally requested
- Documents the requirements without implementation clutter
- Helps understand the tool's purpose
- Useful for future modifications

**Note:** This is only required for AI-generated tools. Tools created manually don't need this documentation unless the developer finds it helpful.

## Design Patterns

### Common UI Elements
- **Text areas**: For paste/input workflows
- **File inputs**: For local file processing
- **Copy buttons**: For easy output copying
- **Clear/Reset buttons**: To start fresh
- **Real-time updates**: Show results as user types/interacts

### Useful Features
- Copy-to-clipboard functionality
- File upload/download capabilities
- URL-based sharing of state
- Keyboard shortcuts for common actions
- Clear error messages

### Browser APIs to Leverage
- Clipboard API (copy/paste)
- File API (upload/download)
- LocalStorage (persistent data)
- URL API (shareable state)
- Canvas API (image manipulation)

## Tool Ideas & Inspiration

Good candidates for HTML tools:
- Text transformations (case conversion, formatting, analysis)
- Data format conversions (JSON, CSV, XML, etc.)
- Encoders/decoders (base64, URL encoding, etc.)
- Color utilities (pickers, converters, palette generators)
- Image tools (resize, crop, format conversion)
- Debugging utilities (showing hidden data like EXIF, clipboard formats)
- Calculators and converters

**Look for**:
- CORS-enabled APIs that can be called from the browser
- Common repetitive tasks that benefit from a simple interface
- Data transformations that are annoying to do manually
- Debugging needs that reveal invisible information

## Quality Standards

Before committing a new tool, ensure:
- [ ] Works in Chrome, Firefox, and Safari
- [ ] Responsive on mobile devices
- [ ] All data processing is client-side
- [ ] No console errors
- [ ] Clear instructions/placeholder text
- [ ] Handles edge cases and errors gracefully
- [ ] Code is readable and commented where necessary
- [ ] Added to index.html and README.md
- [ ] **Dark mode implemented and tested** (required for all tools)

## Anti-Patterns

**Avoid**:
- ❌ External dependencies (npm packages, frameworks)
- ❌ Build processes or compilation steps
- ❌ Server-side processing
- ❌ Sending user data to external services
- ❌ Complex state management
- ❌ Over-engineering simple tools
- ❌ Framework-specific patterns (React, Vue, etc.)

## Hosting

- **Platform**: GitHub Pages
- **Domain**: tools.kylestratis.com
- **Deployment**: Automatic on push to main branch
- **SSL/HTTPS**: Managed by Cloudflare

## License

All tools are released under the MIT license - free to use, modify, and distribute.
