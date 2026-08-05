# SkyForms

SkyForms is an end-to-end form building platform for creating, managing, and sharing forms.

The project is being developed as a Single Page Application using Vanilla JavaScript to explore frontend architecture without frameworks, including custom state management, routing, and page lifecycle management.

## Tech Stack

**Frontend**
- Vanilla JavaScript
- HTML
- CSS

**Backend**
- FastAPI
- Supabase (Authentication & PostgreSQL)

## Database Schema

<p align="center">
  <img src="images/db.png" alt="SkyForms Database Schema" width="900">
</p>

## Current Status

🚧 **Work in Progress**

Next Steps Are:
- Local data persistence, keeping in-memory and local state synchronized without polling, and repopulating in-memory state after validating the locally stored data model while removing stale draft versions.
- Event-driven local auto-save.
- Google OAuth integration.
- Post-reload HTTP-only JWT cookie verification on the server and repopulating in-memory state from locally stored state.
- Synchronizing both in-memory and local storage after successful authentication.
- Building the form preview experience.
- Implementing the draft-to-published form workflow.

The project is actively evolving, and the scope and feature set will continue to expand as development progresses.