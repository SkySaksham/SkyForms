# SkyForms Frontend

> **Lightweight, local-first Vanilla JavaScript Single Page Application (SPA) for AI-powered form creation, editing, and publishing.**

---

## ⚡ Overview

SkyForms Frontend is built with **modern Vanilla JavaScript (ES6+ Modules)** without heavy UI frameworks. It features a custom SPA router, local-first state persistence, event-weighted background synchronization, and instant natural language form generation powered by an LLM backend.

---

## 🚀 Working Features

### 1. 🤖 AI Form Generation
- **Prompt to Form**: Generates structured forms from natural language prompts (minimum 25 characters) via backend LLM endpoint (`POST /llm_form`).
- Accessible from both the Landing Page and Home Dashboard.
- Automatically assigns client UUIDs and transitions directly into the draft editor.

### 2. 📝 Visual Form Editor (`/draft?draft=<id>`)
- **Question Management**: Add, update, and delete questions with validation (title required, character limits).
- **Supported Question Types**:
  - Short Answer (`short`)
  - Long Answer / Paragraph (`paragraph`)
  - Date (`date`)
  - Checkbox (`checkbox`)
- **Drag & Drop Reordering**: Fluid question reordering powered by `Sortable.js`.
- **Inline Controls**: Rapid question type switching and required field toggling directly on cards.
- **Form Renaming**: Modal to update draft form title.

### 3. 👁️ Preview & Publishing Flow (`/publish?draft=<id>`)
- **Live Form Preview**: Form review container displaying all questions in their final interactive layout.
- **Publish Modal**: Confirmation modal triggering `POST /submit_form`.
- **Publish Conflict Handling**: Gracefully handles stale drafts and forms already published from other sessions.

### 4. 👤 Authentication & Dashboard (`/home`)
- **Google Sign-In**: Integrated Google Identity Services (GSI) OAuth (`POST /auth/signin`).
- **Session Verification**: Automated startup token check (`GET /auth/verify`) with route guards.
- **Home Dashboard**:
  - User profile card with email and secure logout (`POST /auth/logout`).
  - Active/Inactive status list of published forms (`yourForms`).
  - Quick-access draft forms list (`draftForms`) and "Create New Draft" action.
  - Inline AI prompt generator box.

### 5. 🔄 Local-First Storage & Event-Weighted Sync
- **Local Cache**: Instant offline/local persistence in `localStorage` (`SkyForms__<userId>`).
- **Event-Weighted Synchronization**: Changes accumulate weights (`add: 5`, `updateOrder: 5`, `delete: 5`, `updateQ: 4`, `minor: 2`, `updateN: 5`); sync triggers when threshold (15) is met (`POST /updatedraft`).
- **Version Tracking & Conflict Resolution**: Incremental draft versioning with rollback on failure and automatic remote merge when receiving stale status.
- **Runtime Validation**: Strict schema enforcement using `Zod` (`userInfoSchema`, `draftFormSchema`, `questionSchema`, `dataSchema`).

### 6. 🧭 Custom SPA Router
- Client-side routing using the HTML5 History API (`history.pushState` / `popstate`).
- Component lifecycle hooks (`init()` and `destroy()`) for event listener cleanup and memory leak prevention.

---

## 🚧 Roadmap & Upcoming Features

- [ ] Public respondent form interface & sharable form URLs.
- [ ] Response collection, storage, and submission confirmation views.
- [ ] Response analytics and CSV/data export.
- [ ] Additional question formats (multiple choice radio options, dropdowns, file upload).

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Core** | Vanilla JavaScript (ES6+ Modules), HTML5, CSS3 |
| **Dev Server / Bundler** | [Vite](https://vite.dev/) (Port 5500) |
| **Validation** | [Zod](https://zod.dev/) (via ESM CDN) |
| **Interactions** | [Sortable.js](https://sortablejs.github.io/Sortable/) (Drag & Drop) |
| **Auth** | Google Identity Services (GSI) |
| **Styling & Motion** | Modular CSS + [Animate.css](https://animate.style/) |

---

## 📁 Project Structure

```
SkyForms_Frontend/
├── index.html                   # HTML entry point & external scripts
├── main.js                      # App bootstrapper, auth check & sync setup
├── route.js                     # Vanilla SPA router (/, /home, /draft, /publish)
├── store.js                     # In-memory reactive application state
├── package.json                 # Vite dev scripts
│
├── api/                         # Backend HTTP client integrations
│   ├── googleAuth.js            # Google GSI initialization & token exchange
│   ├── getUserHomePageData.js   # User forms & drafts loader (/userdata)
│   ├── llmResponse.js           # AI form generation client (/llm_form)
│   ├── logout.js                # Logout request (/auth/logout)
│   ├── updateDraftServer.js     # Draft update & form publish endpoints
│   └── verifyJwt.js             # Session verification (/auth/verify)
│
├── components/                  # Modular, reusable UI components
│   ├── addUpdateQcard.js        # Question creation & editing modal
│   ├── editor.js                # Form question cards, bottom bar & name editor
│   ├── homePageComponents.js    # Profile card, forms lists, prompt box
│   ├── loader.js                # Loading spinner overlays
│   ├── navBar.js                # Top navigation component
│   └── previewPublish.js        # Form preview layout & publish confirmation
│
├── logic/                       # Core domain & synchronization logic
│   ├── draftClass.js            # Draft state, question CRUD, versioning
│   └── syncClass.js             # LocalStorage caching, server sync & conflict handling
│
├── pages/                       # Routable page views
│   ├── landingPage.js           # Hero view, card showcase & AI prompt input
│   ├── homePage.js              # User dashboard & form manager
│   ├── editorPage.js            # Form builder with Sortable drag-and-drop
│   └── publishPage.js           # Form review and publish workflow
│
├── schema/
│   └── dataSchema.js            # Zod schemas for user, forms, drafts, questions
│
└── style/                       # Scoped stylesheets per page and component
```

---

## 🏁 Getting Started

### 1. Prerequisites
- **Node.js** (v18+)
- Running **SkyForms Backend** at `http://127.0.0.1:8000`

### 2. Installation & Run
```bash
# Navigate to frontend directory
cd SkyForms_Frontend

# Install dependencies
npm install

# Start local dev server (http://127.0.0.1:5500)
npm run dev
```

### 3. Build & Preview
```bash
npm run build
npm run preview
```
