# Sky Forms

> **A Modern Vanilla JavaScript Single Page Application (SPA) for intelligent form creation and distribution**

> **⚠️ Work in Progress**
> Sky Forms is currently under active development. Features and APIs are subject to change.

---

## 📋 Table of Contents

- [About](#about)
- [Why Vanilla JavaScript?](#why-vanilla-javascript)
- [Current Progress](#current-progress)
- [Project Scope & Goals](#project-scope--goals)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Key Features](#key-features)

---

## About

**Sky Forms** is a sophisticated Single Page Application (SPA) built entirely with **vanilla JavaScript**, HTML, and CSS. It's designed to enable users to create, manage, and distribute forms with an intuitive drag-and-drop interface and intelligent form generation capabilities.

The application loads once and dynamically updates the interface without full page reloads, providing a seamless, fast user experience. This project demonstrates best practices in vanilla JavaScript SPA development, including custom routing, state management, reusable components, and modular architecture—all without relying on external frameworks.

---

## Why Vanilla JavaScript?

We deliberately chose **vanilla JavaScript** over popular frameworks (React, Vue, Angular) for several strategic reasons:

### 1. **Full Control & Flexibility**
   - No framework constraints or opinions dictating architecture
   - Complete control over DOM manipulation and rendering logic
   - Freedom to optimize exactly as needed for this use case

### 2. **Zero Dependencies**
   - No npm package bloat; only essential utilities (Sortable.js for drag-and-drop)
   - Faster initial load times and smaller bundle size
   - Easier deployment and maintenance
   - No dependency version conflicts or security updates to manage

### 3. **Educational Value**
   - Deep understanding of how SPAs actually work under the hood
   - Learning core web concepts: routing, state management, component patterns, event handling
   - No magic—every feature is explicitly written and understandable
   - Great foundation for understanding framework internals

### 4. **Performance**
   - Direct DOM access without virtual DOM overhead
   - Optimized rendering without framework reconciliation
   - Lightweight and fast on all devices, including older hardware

### 5. **Lightweight & Maintainable**
   - Simpler codebase that's easy to understand and modify
   - No breaking changes from framework updates
   - Built to last without dependency management headaches

---

## Current Progress

### ✅ Completed Components & Features

- **Landing Page** (`pages/landingPage.js`)
  - Welcome screen with animated UI using Animate.css
  - AI form description input (UI ready for AI integration)
  - Quick access to form editor
  - Responsive design with smooth animations

- **Custom Router** (`route.js`)
  - Full SPA routing without a framework
  - History API integration (browser back/forward support)
  - Dynamic page loading and rendering
  - Cleanup lifecycle hooks for components

- **Navigation Bar Component** (`components/navBar.js`)
  - Reusable navbar with configurable sections (left, middle, right)
  - Navigation schema pattern for consistency

- **Form Editor Page** (`pages/editorPage.js`)
  - Core form editing interface
  - Question management
  - Draft form storage and retrieval

- **Question Card Component** (`components/addUpdateQcard.js`)
  - Add/update question UI
  - Support for multiple question types (short, paragraph, MCQ, checkbox)
  - Question validation

- **Editor Logic Class** (`logic/editorClass.js`)
  - Draft management with auto-generated UUIDs
  - Question CRUD operations
  - Question type definitions
  - Question validation

- **Client-Side State Management** (`store.js`)
  - Centralized data store for forms, drafts, and user info
  - Test data for development
  - Simple, predictable state pattern

- **Styling System**
  - Modular CSS files per component and page
  - Responsive design
  - Smooth animations with Animate.css library

### 🚧 In Development / Upcoming Features

- **AI Form Generation** — Integrate API to generate forms from descriptions
- **Form Publishing** — Save and publish forms for distribution
- **Form Responses** — Collect and display form responses
- **User Authentication** — User accounts and form ownership
- **Form Analytics** — Response statistics and insights
- **Advanced Question Types** — Date pickers, file uploads, rating scales
- **Form Sharing** — Public links and permission management
- **Database Integration** — Persist forms and responses

---

## Project Scope & Goals

### Scope
Sky Forms aims to be a complete form creation and distribution platform that allows users to:
- Create forms through an intuitive visual editor or AI-assisted generation
- Configure multiple question types with validation rules
- Publish forms and collect responses
- Analyze response data and generate reports
- Manage form versions and duplicates

### Goals (End Vision)

**Phase 1: Form Creation Engine** (Current Phase)
- ✅ Custom SPA routing
- ✅ Reusable component architecture
- ✅ Question editor with multiple question types
- 🚧 AI-assisted form generation
- ⏳ Form persistence and retrieval

**Phase 2: Form Distribution**
- Form publishing and public sharing
- Unique form URLs
- Response collection
- Basic analytics

**Phase 3: Advanced Features**
- User authentication and form ownership
- Team collaboration features
- Advanced question types (date, file upload, rating)
- Form branching/conditional logic
- Response export (CSV, PDF)
- Template library

**Phase 4: Enterprise Features**
- Webhooks for form submissions
- API for third-party integration
- Advanced analytics and reporting
- Form versioning and rollback

---

## Architecture

### Vanilla JS SPA Pattern

Our architecture follows a clean, modular pattern without frameworks:

```
main.js (app initialization)
  ↓
route.js (SPA router & renderer)
  ↓
pages/ (full page components)
  ↓
components/ (reusable UI components)
  ↓
logic/ (business logic classes)
  ↓
store.js (centralized state)
  ↓
DOM (direct DOM manipulation & rendering)
```

### Key Architectural Patterns

1. **Component Pattern**
   - Each component is a pure JavaScript object/function
   - Returns DOM element and optional init/destroy lifecycle hooks
   - Reusable and composable

2. **Routing System**
   - Custom router using History API
   - No framework overhead
   - Browser back/forward support

3. **State Management**
   - Centralized `store.js` for app state
   - Direct mutation for simplicity (can be enhanced to immutable later)
   - Easy to trace data flow

4. **Business Logic Classes**
   - `Draft` class handles form creation and question management
   - Separation of concerns from UI components
   - Testable and reusable

---

## Tech Stack

| Category | Technology | Reason |
|----------|-----------|--------|
| **Frontend Framework** | Vanilla JavaScript (ES6+) | No bloat, full control |
| **Markup** | HTML5 | Semantic and accessible |
| **Styling** | CSS3 | Modular, component-scoped |
| **Animations** | Animate.css | Lightweight animation library |
| **Utilities** | Sortable.js | Drag-and-drop functionality |
| **Package Manager** | None required | Minimal dependencies |
| **Development** | Native ES6 modules | Browser-native support |

---

## Project Structure

```
SkyForms/
├── index.html              # Main HTML entry point
├── main.js                 # App initialization
├── route.js                # SPA router with history API
├── store.js                # Centralized state management
├── README.md               # This file
├── docs.md                 # Component schema documentation
│
├── pages/                  # Full page components
│   ├── landingPage.js      # Welcome/home page
│   └── editorPage.js       # Form editor page
│
├── components/             # Reusable UI components
│   ├── navBar.js           # Navigation bar component
│   ├── editor.js           # Main editor component
│   └── addUpdateQcard.js   # Question card add/update component
│
├── logic/                  # Business logic & data management
│   └── editorClass.js      # Draft & question management
│
└── style/                  # Component-scoped stylesheets
    ├── navBar.css
    ├── body.css
    ├── editor.css
    ├── landingPage.css
    └── addUpdateQcard.css
```

### File Responsibilities

| File | Purpose |
|------|---------|
| `main.js` | Entry point; initializes router |
| `route.js` | Handles SPA routing, page rendering, history |
| `store.js` | Global state container for forms, drafts, user data |
| `pages/*.js` | Full-screen page components; routable destinations |
| `components/*.js` | Reusable UI components; no routing |
| `logic/*.js` | Business logic, form operations, validation |
| `style/*.css` | Component-specific styles; modular approach |

---

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or package installation required

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SkyForms
   ```

2. Open in browser:
   ```bash
   # Simple HTTP server (Python)
   python -m http.server 8000
   
   # Or use any local server:
   # Node: npx http-server
   # VS Code: Live Server extension
   ```

3. Navigate to `http://localhost:8000`

### Development Workflow

- Edit any `.js`, `.css`, or `.html` file
- Refresh browser to see changes
- Check browser console for any errors
- Use browser DevTools for debugging

---

## Key Features

### ✨ Form Editor
- Add, edit, and delete questions
- Support for 4 question types:
  - Short Answer (single line text)
  - Long Answer (multi-line paragraph)
  - Multiple Choice (radio buttons)
  - Checkbox (multiple selections)
- Required field toggle
- Question descriptions/help text
- Drag-and-drop question reordering (via Sortable.js)

### 🎨 Responsive UI
- Mobile-friendly interface
- Smooth animations and transitions
- Intuitive form builder experience

### 💾 Client-Side Storage
- Draft forms stored in-memory (enhancement: localStorage/IndexedDB)
- Question validation before save
- UUID-based form identification

### 🧩 Component System
- Reusable components with lifecycle hooks
- Clean component interface (element, init, destroy)
- Easy to compose and extend

### 📱 Single Page Experience
- No full page reloads
- Fast navigation between pages
- Browser history integration (back/forward buttons work)

---

## Next Steps for Contributors

1. **AI Integration** — Connect form description input to AI API
2. **Persistence Layer** — Add localStorage or backend API storage
3. **Form Publishing** — Create response collection page
4. **Enhanced Routing** — Add route parameters for form IDs
5. **Testing** — Add unit and integration tests
6. **Documentation** — Expand component documentation and examples

---

## Notes for Developers

- All code uses ES6+ features and native ES modules
- No transpilation required for modern browsers
- Component lifecycle: `init()` runs after DOM insertion, `destroy()` runs before removal
- Always use `document.createElement()` for components, not `innerHTML` directly (to avoid XSS)
- State changes should trigger re-renders appropriately

---

**Built with ❤️ using vanilla JavaScript, because sometimes less is more.**

