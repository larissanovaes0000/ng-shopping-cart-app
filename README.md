# Angular Shopping Cart Application

This project is an Angular shopping cart application developed for a technical assessment.
It implements a complete shopping flow with product listing, cart management, sorting, and product creation,
using a mock backend and a global state architecture.

This README consolidates all project information in one place, including setup instructions, commands,
mock API details, architectural notes, and known technical constraints.

---

## Project Context

The application was developed as part of a technical challenge focused on:

- Fixing existing issues
- Implementing missing features
- Improving architecture and state management
- Ensuring the application is testable and maintainable

The project intentionally uses Angular 9, as required by the challenge.

---

## Tech Stack

- Angular 9.1.x
- RxJS 6.x
- TypeScript 3.8
- Bootstrap 4
- SCSS (global variables, typography, and reset)
- JSON Server (mock backend)
- Node.js 14.x (recommended)

---

## Figma

Design reference:

https://www.figma.com/design/QGFswDNwqstQuFSk7DabB8/Vendas?node-id=391-141&t=CrvfmsOhWnkpKNQK-0

---

## Architecture Overview

- Component-based architecture with clear separation of concerns
- Global state management using RxJS `BehaviorSubject`
- Centralized services:
  - `ProductsService`
  - `CartService`
- Reactive forms with validation and user feedback
- Async data flow using Observables and `async` pipe
- Cart and products state persistence via `localStorage`
- Responsive layout using CSS Grid and media queries

---

## Features Implemented

- Product listing
- Add/remove products from cart
- Quantity control per product
- Cart dropdown in the navbar
- Total quantity and total amount calculation
- Sorting products by price
- Product creation through a form
- Input validation with visual feedback
- Placeholder handling for invalid image URLs
- Responsive behavior (desktop/mobile)

---

## Setup

### Requirements

- Node.js 14.x (recommended)
- npm 6.x
- Package name: `ng-shopping-cart-app`

> This project uses Angular 9.
> If you are using Node.js 17+, see the OpenSSL workaround section below.

### Install Dependencies

```bash
npm install
```

`postinstall` automatically applies a compatibility fix for the Angular 9 toolchain (`DEP0060` warning from `circular-dependency-plugin`).

### Run the Full Local Environment

```bash
npm start
```

This command runs both services simultaneously:

- Angular app: http://localhost:4200
- JSON Server API: http://localhost:3000

### Run Services Separately (Optional)

Angular application only:

```bash
npm run start:web
```

Mock API only:

```bash
npm run start:api
```

### Run Tests

Single run:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

### Build the Application

```bash
npm run build
```

### Deploy to GitHub Pages

Install dependencies first (includes `angular-cli-ghpages`), then publish:

```bash
npm run publish:gh-pages
```

Notes:

- The script currently uses `--base-href /ng-shopping-cart-app/`.
- If your repository name is different, update `build:gh-pages` in `package.json`.
- A `404.html` file is generated from `index.html` to support Angular routes on GitHub Pages.
- In production (`environment.prod.ts`), the app runs without a backend API and uses `assets/products.json` + `localStorage`.
- After publishing, enable GitHub Pages in repository settings using the `gh-pages` branch.

---

## OpenSSL Workaround (Node 17+)

Angular 9 relies on an older Webpack version that is not compatible with OpenSSL 3 (Node.js 17+).

If you encounter this error:

```text
ERR_OSSL_EVP_UNSUPPORTED
```

Use the legacy OpenSSL provider.

Windows (PowerShell):

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run build
```

Windows (CMD):

```cmd
set NODE_OPTIONS=--openssl-legacy-provider
npm run build
```

Recommended solution: use Node.js 14.x, which works without any workaround.

---

## Mock API (JSON Server)

The application uses `json-server` as a mock backend.

### How to Start the API

Automatically when running:

```bash
npm start
```

Or manually:

```bash
npm run start:api
```

### API Base URL

`http://localhost:3000`

### Available Endpoints

- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

### Data Source

`db.json` (located at the project root)

For GitHub Pages/production mode, seed data is loaded from `src/assets/products.json`.

---

## State Management Details

- Cart state is managed with `BehaviorSubject<CartItem[]>`
- Products state is managed with `BehaviorSubject<Product[]>`
- Multiple components subscribe to the same global state:
  - Navbar
  - Product item
  - Cart component
- All state updates flow through centralized services
- Cart state is persisted in `localStorage`
- On application reload, the state is restored automatically

---

## Styling Strategy

Global SCSS architecture:

- `_colors.scss`
- `_fonts.scss`
- `_reset.scss`

Shared styles are imported through a global SCSS entry point.
Components rely on global variables to avoid repetitive imports.
The responsive layout is handled with media queries and CSS Grid.

---

## Known Limitations

- Angular version is intentionally kept at v9
- OpenSSL workaround is required when using Node.js 17+
- `json-server` is used for development and testing only

---

## Notes for Reviewers

- The project prioritizes architecture, clarity, and maintainability
- No framework upgrade was performed to respect the original challenge constraints
- All known environment issues are documented in this file
- The application runs with a single command: `npm start`

---

## Submission Notes

Before uploading or sharing the project, ensure:

- `node_modules` is not included
- The repository contains:
  - `package.json`
  - `package-lock.json`
  - `db.json`
  - Source code
  - This `README.md` file

---

## Author

Developed by Larissa Novaes  
Angular Shopping Cart - Technical Assessment
