# HTML Tools

A collection of simple, single-page HTML tools. Each tool runs entirely in your browser with no server-side processing, no frameworks, and no dependencies.

**Live Site**: [tools.kylestratis.com](https://tools.kylestratis.com)

## Philosophy

These tools follow a simple philosophy:
- **Zero dependencies**: Just HTML, CSS, and vanilla JavaScript
- **Privacy-first**: All processing happens in your browser
- **Fast and lightweight**: No build steps, no bloat
- **Accessible**: Works on any modern browser
- **Open source**: Free to use, modify, and learn from

## Available Tools

### [Vibe Counter](vibe-counter.html)
A real-time text analysis tool that counts characters, words, and letters as you type.

**Features:**
- Character count (with and without spaces)
- Letter count (alphabetic characters only)
- Word count
- Real-time updates as you type
- Clean, responsive interface

### [Word Matching Game](word-matching-game.html)
A fun interactive game where you find the word that matches the circled word.

**Features:**
- Randomly generated word puzzles with 3-4 letter words
- Visual interface with canvas-based word display
- Click-to-select interaction
- Instant feedback on answers
- Unlimited replays with the refresh button

## Adding New Tools

Each tool is a standalone HTML file with inline CSS and JavaScript. To add a new tool:

1. Create a new `.html` file in the root directory
2. Add the tool to the list in `index.html`
3. Update this README with the tool description
4. Commit and push to deploy

## Technical Details

- All tools are single HTML files with inline styles and scripts
- No external dependencies or frameworks
- No data collection or analytics
- Works offline once loaded
- Mobile-responsive

## Local Development

Simply open `index.html` or any tool file in your browser. No build process required.

## License

MIT
