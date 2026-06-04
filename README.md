# Notes App

A block-based notes editor built with React, TypeScript, drag and drop, and
Supabase. Users sign in with a magic link and can edit pages, reorder content
blocks, link pages, and upload cover images.

## Tech stack

- React 19 and TypeScript
- Vite and Vitest
- Supabase authentication, database, and storage
- dnd-kit and Immer

## Local setup

Requires Node.js 20.19 or newer.

```bash
npm install
cp .env.example .env
npm run dev
```

Add the public Supabase project URL and anon key to `.env`. Never use a
Supabase `service_role` key in this frontend application.

## Checks

```bash
npm run build
npm run lint
npm test
```
