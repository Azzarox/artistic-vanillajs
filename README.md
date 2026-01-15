# Artistic

A photo sharing Single Page Application built with **Vanilla JavaScript** and **lit-html** for templating, featuring user authentication, real-time database operations, and full CRUD functionality—all without relying on a front-end framework.

**[Live Demo](https://fir-project-39721.web.app/)**

---

## Requirements

- Node.js
- Firebase CLI (`npm install -g firebase-tools`)

---

## Quick Start

```bash
# Clone repository
git clone <repository-url>
cd artistic-vanillajs

# Install dependencies
npm install

# Start development server
npm start
```

### Demo Credentials

| Email            | Password |
|------------------|----------|
| `test@test.com`  | `tester` |

---

## Tech Stack

- JavaScript (ES6+)
- lit-html
- page.js
- Firebase (Authentication, Firestore)
- Algolia (instantsearch.js)
- Webpack

---

## Project Structure

```
src/
├── views/        # Page components (catalog, details, profile, auth, etc.)
├── templates/    # Reusable lit-html templates (layout, navigation, modals)
├── middlewares/  # Route guards and authentication checks
├── utils/        # Helper functions (validation, error handling)
├── app.js        # Application entry point and route definitions
└── searchUI.js   # Algolia search configuration
```

---

## Scripts

- `npm start` – Start lite-server for development
- `npm run watch` – Watch mode, rebuild on file changes
- `npm run build` – Production build (optimized & minified)
- `npm run deploy` – Build and deploy to Firebase Hosting

---

## Features

- **User Authentication** – Sign-up/sign-in with Firebase Auth
- **Photo Management** – Create, edit, and delete photos
- **Social Interactions** – Like and comment system with ownership-based permissions
- **Search** – Full-text search powered by Algolia
- **User Profiles** – Editable profiles with personal galleries
- **Responsive Design** – Works across all device sizes

---

## Permissions

| Action           | Guest | Authenticated | Owner Only |
|------------------|:-----:|:-------------:|:----------:|
| Browse photos    | Yes   | Yes           | Yes        |
| Search           | Yes   | Yes           | Yes        |
| Create photo     | —     | Yes           | Yes        |
| Edit/Delete photo| —     | —             | Yes        |
| Like photo       | —     | Yes           | —          |
| Comment          | —     | Yes           | —          |
| Edit profile     | —     | Yes           | Yes        |

---

## Notes

- New `.css` files must be imported in `app.js` for Webpack to include them in the bundle
- Price functionality is currently disabled due to backend restrictions
