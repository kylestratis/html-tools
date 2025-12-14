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
├── another-tool.html
└── README.md
```

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
