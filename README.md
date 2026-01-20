# Learn Chrome Debugger

A comprehensive guide and hands-on examples for mastering Chrome DevTools debugging across different JavaScript frameworks.

## Overview

This project provides practical examples and tutorials to help developers learn how to effectively use Chrome DevTools for debugging JavaScript applications. Whether you're debugging a vanilla JavaScript project or a modern framework like Next.js or Nuxt, this repository will guide you through the essential debugging techniques.

## What You'll Learn

### Core Debugging Concepts

- **Setting Breakpoints**: Learn how to pause code execution at specific lines
- **Conditional Breakpoints**: Break only when certain conditions are met
- **Logpoints**: Log values without modifying your source code
- **Step Through Code**: Navigate through your code line by line
  - Step Over (F10): Execute the current line and move to the next
  - Step Into (F11): Dive into function calls
  - Step Out (Shift+F11): Complete the current function and return to caller

### Watch Expressions and Scope

- Monitor variable values in real-time
- Understand local, closure, and global scopes
- Evaluate expressions on the fly in the Console

### Call Stack Navigation

- Trace the execution path that led to the current point
- Navigate between different stack frames
- Understand async call stacks

### Network Debugging

- Inspect HTTP requests and responses
- Analyze request timing and waterfall charts
- Debug API calls and response data

### Source Maps

- Debug original source code instead of bundled/minified code
- Configure source maps for various build tools
- Troubleshoot source map issues

## Project Structure

```
learn-chrome-debugger/
├── README.md
└── arc/
    ├── nuxt/          # Nuxt.js debugging examples
    └── nextjs/        # Next.js debugging examples
```

## Framework-Specific Debugging

### Next.js (`arc/nextjs/`)

Learn to debug Next.js applications including:
- Server-side rendering (SSR) debugging
- API routes debugging
- Client-side hydration issues
- Middleware debugging
- Server Components vs Client Components

### Nuxt (`arc/nuxt/`)

Learn to debug Nuxt applications including:
- Universal (SSR) mode debugging
- Static site generation debugging
- Vuex/Pinia state debugging
- Middleware and plugins debugging
- Composables and auto-imports

## Getting Started

### Prerequisites

- Google Chrome browser (latest version recommended)
- Node.js (v18 or higher)
- Basic understanding of JavaScript/TypeScript

### Opening Chrome DevTools

There are several ways to open Chrome DevTools:

1. **Keyboard Shortcuts**:
   - Windows/Linux: `Ctrl + Shift + I` or `F12`
   - macOS: `Cmd + Option + I`

2. **Right-click** on any element and select "Inspect"

3. **Chrome Menu**: Menu (⋮) → More tools → Developer tools

### Essential DevTools Panels

| Panel | Purpose |
|-------|---------|
| **Elements** | Inspect and modify the DOM and CSS |
| **Console** | View logs, run JavaScript, and see errors |
| **Sources** | Debug JavaScript with breakpoints |
| **Network** | Monitor network requests |
| **Performance** | Analyze runtime performance |
| **Application** | Inspect storage, service workers, and more |

## Debugging Tips and Tricks

### Quick Console Tricks

```javascript
// Log with labels
console.log('user:', user);

// Table format for arrays/objects
console.table(arrayOfObjects);

// Group related logs
console.group('API Call');
console.log('Request:', request);
console.log('Response:', response);
console.groupEnd();

// Measure execution time
console.time('operation');
// ... code to measure
console.timeEnd('operation');
```

### Breakpoint Types

1. **Line-of-code breakpoints**: Click the line number in Sources panel
2. **Conditional breakpoints**: Right-click line number → "Add conditional breakpoint"
3. **DOM breakpoints**: Right-click element → "Break on" → subtree/attribute/removal
4. **XHR/Fetch breakpoints**: Sources → XHR/fetch Breakpoints → Add URL pattern
5. **Event listener breakpoints**: Sources → Event Listener Breakpoints → Select events
6. **Exception breakpoints**: Sources → Toggle "Pause on exceptions"

### Using the `debugger` Statement

Add `debugger;` in your code to create a programmatic breakpoint:

```javascript
function processData(data) {
  debugger; // Execution will pause here when DevTools is open
  return data.map(item => item.value);
}
```

## Common Debugging Scenarios

### Debugging Async/Await

Enable "Async" checkbox in the Call Stack panel to see the full async call stack.

### Debugging Event Handlers

Use Event Listener Breakpoints in the Sources panel to pause on specific DOM events.

### Finding Memory Leaks

Use the Memory panel to take heap snapshots and compare memory usage over time.

### Debugging Network Issues

1. Open Network panel
2. Reproduce the issue
3. Look for red (failed) requests
4. Check request/response headers and body
5. Use "Preserve log" to keep logs across page navigations

## Resources

- [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools/)
- [Debugging JavaScript in Chrome DevTools](https://developer.chrome.com/docs/devtools/javascript/)
- [Next.js Debugging Guide](https://nextjs.org/docs/advanced-features/debugging)
- [Nuxt DevTools](https://devtools.nuxtjs.org/)

## Contributing

Contributions are welcome! If you have debugging tips, examples, or improvements:

1. Fork the repository
2. Create a feature branch
3. Add your examples or improvements
4. Submit a pull request

## License

MIT License - feel free to use this for learning and teaching purposes.
