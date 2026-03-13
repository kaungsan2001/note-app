# 📝 Notes App

A full-stack note-taking application built with a modern TypeScript stack. Users can create, view, edit, and delete personal notes, with an admin dashboard for platform-level management.

---

## ✨ Features

- **Authentication** — Sign up, sign in, and sign out with JWT-based sessions stored in HTTP-only cookies
- **Notes CRUD** — Create, read, update, and delete personal notes with title, content, and publish status
- **Paginated Note Feed** — Browse notes on the home page with server-side pagination
- **Role-based Access** — Admin panel for managing users and notes platform-wide
- **Dark / Light Mode** — Theme toggle powered by `next-themes`
- **Form Validation** — Client-side validation with `react-hook-form` + `zod`, server-side validation with `express-validator`

---

## 🏗️ Project Structure

```
notes/
├── back-end/     # Express + Bun API server
└── front-end/    # React + Vite SPA
```

---

## 🖥️ Back-end

### Tech Stack

| Tool                                                        | Purpose                        |
| ----------------------------------------------------------- | ------------------------------ |
| [Bun](https://bun.sh/)                                      | Runtime & package manager      |
| [Express 5](https://expressjs.com/)                         | HTTP server framework          |
| [Prisma 7](https://www.prisma.io/)                          | ORM & database migrations      |
| [PostgreSQL (Neon)](https://neon.tech/)                     | Serverless PostgreSQL database |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js)        | Password hashing               |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)  | JWT authentication             |
| [Multer](https://github.com/expressjs/multer)               | File / image upload handling   |
| [Helmet](https://helmetjs.github.io/)                       | Security headers               |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | Cookie parsing                 |
| [express-validator](https://express-validator.github.io/)   | Request validation             |

### Back-end Source Structure

```
back-end/src/
├── controllers/     # Route handler logic (authController, noteController, adminController)
├── db/              # Prisma client singleton
├── generated/       # Prisma generated client output
├── helper/          # Utility helpers (hasher, token, sendCookie, response)
├── middlewares/     # Express middlewares (auth, error, upload, validate)
├── routes/          # Route definitions (auth, note, admin, user)
├── validators/      # express-validator rule sets
└── index.ts         # App entry point
```

### Database Models

**User**

- `id`, `email` (unique), `name`, `password`, `role` (`"user"` / `"admin"`), `createdAt`

**Note**

- `id`, `title`, `content`, `publish` (boolean), `userId` (FK → User, cascade delete), `createdAt`, `updatedAt`

### API Endpoints

Base URL: `http://localhost:8080/api/v1`

#### Auth — `/auth`

| Method   | Path             | Description                          | Auth |
| -------- | ---------------- | ------------------------------------ | ---- |
| `POST`   | `/auth/sign-up`  | Register a new user                  |      |
| `POST`   | `/auth/sign-in`  | Log in and receive a JWT cookie      |      |
| `DELETE` | `/auth/sign-out` | Log out (clear the JWT cookie)       |      |
| `GET`    | `/auth/me`       | Get the currently authenticated user | ✅   |

#### User — `/user`

| Method | Path       | Description                          | Auth |
| ------ | ---------- | ------------------------------------ | ---- |
| `GET`  | `/user/me` | Get the currently authenticated user | ✅   |

#### Notes — `/notes`

| Method   | Path                    | Description                 | Auth |
| -------- | ----------------------- | --------------------------- | ---- |
| `GET`    | `/notes/`               | Get paginated list of notes | ✅   |
| `GET`    | `/notes/:noteId`        | Get a single note by ID     | ✅   |
| `POST`   | `/notes/create`         | Create a new note           | ✅   |
| `PUT`    | `/notes/update/:noteId` | Update a note by ID         | ✅   |
| `DELETE` | `/notes/:noteId`        | Delete a note by ID         | ✅   |

#### Admin — `/admin`

| Method   | Path                  | Description                  | Auth     |
| -------- | --------------------- | ---------------------------- | -------- |
| `GET`    | `/admin/stats`        | Get platform dashboard stats | ✅ Admin |
| `GET`    | `/admin/users`        | Get all users                | ✅ Admin |
| `DELETE` | `/admin/user/:userId` | Delete a user account        | ✅ Admin |
| `DELETE` | `/admin/note/:noteId` | Delete any note              | ✅ Admin |

### Getting Started — Back-end

**1. Install dependencies**

```bash
cd back-end
bun install
```

**2. Set up environment variables**

Create a `.env` file in the `back-end/` directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
JWT_SECRET="your-secret-key"
PORT=8080
```

**3. Run database migrations**

```bash
bunx prisma migrate dev
```

**4. (Optional) Seed the database**

```bash
bun run prisma/seed.ts
```

**5. Start the development server**

```bash
bun run dev
```

The server will start on `http://localhost:8080`.

**Available scripts**

| Script          | Description                                      |
| --------------- | ------------------------------------------------ |
| `bun run dev`   | Start dev server with hot reload (via `--watch`) |
| `bun run build` | Generate Prisma client and compile to `dist/`    |
| `bun run start` | Run the compiled production build                |

---

## 🌐 Front-end

### Tech Stack

| Tool                                                                      | Purpose                           |
| ------------------------------------------------------------------------- | --------------------------------- |
| [React 19](https://react.dev/)                                            | UI library (with React Compiler)  |
| [Vite 7](https://vitejs.dev/)                                             | Build tool & dev server           |
| [TypeScript](https://www.typescriptlang.org/)                             | Type safety                       |
| [React Router 7](https://reactrouter.com/)                                | Client-side routing               |
| [TanStack Query 5](https://tanstack.com/query)                            | Server state management & caching |
| [Axios](https://axios-http.com/)                                          | HTTP client                       |
| [Tailwind CSS 4](https://tailwindcss.com/)                                | Utility-first styling             |
| [shadcn/ui](https://ui.shadcn.com/)                                       | Accessible UI components          |
| [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Form handling & validation        |
| [Sonner](https://sonner.emilkowal.ski/)                                   | Toast notifications               |
| [next-themes](https://github.com/pacocoursey/next-themes)                 | Dark / light mode                 |
| [Phosphor Icons](https://phosphoricons.com/)                              | Icon library                      |
| [Lucide React](https://lucide.dev/)                                       | Supplementary icon library        |
| [JetBrains Mono](https://www.jetbrains.com/lp/mono/)                      | Monospace font (via Fontsource)   |

### Pages & Routes

| Path                 | Page                                | Layout |
| -------------------- | ----------------------------------- | ------ |
| `/`                  | `HomePage` — Paginated notes feed   | Home   |
| `/about`             | `AboutPage`                         | Home   |
| `/note/create`       | `NoteCreatePage` — Create note form | Home   |
| `/note/:noteId`      | `NoteDetailPage` — Note detail view | Home   |
| `/note/edit/:noteId` | `EditNotePage` — Edit note form     | Home   |
| `/sign-in`           | `SignInPage`                        | Auth   |
| `/sign-up`           | `SignUpPage`                        | Auth   |
| `/admin`             | `DashboardPage` — Admin panel       | Admin  |

### Getting Started — Front-end

**1. Install dependencies**

```bash
cd front-end
npm install
```

**2. Set up environment variables**

Create a `.env.local` file in the `front-end/` directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

**3. Start the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

> **Note:** Make sure the back-end server is running at `http://localhost:8080` before starting the front-end.

**Available scripts**

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite dev server                |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint across the project        |

---

## 🚀 Running the Full Stack

Open two terminals and run both servers simultaneously:

```bash
# Terminal 1 — Back-end
cd back-end && bun run dev

# Terminal 2 — Front-end
cd front-end && npm run dev
```

---

## 📁 Front-end Code Structure

```
front-end/src/
├── api/          # Axios API call functions (api, authApi, noteApi, adminApi)
├── assets/       # Static assets (images, icons)
├── components/
│   ├── ui/       # shadcn/ui base components
│   ├── web/      # App-specific components (Header, Sidebar, NoteCard, SignInForm, SignUpForm, Loading)
│   ├── mode-toggle.tsx    # Dark/light mode toggle button
│   └── theme-provider.tsx # next-themes provider wrapper
├── hooks/        # TanStack Query hooks (useAuth, useNote, useAdmin)
├── layouts/      # Route layout wrappers (HomeLayout, AuthLayout, AdminLayout)
├── lib/          # Shared utility functions (e.g. cn helper)
├── pages/
│   ├── auth/     # SignInPage, SignUpPage
│   ├── user/     # HomePage, NoteCreatePage, NoteDetailPage, EditNotePage, AboutPage
│   └── admin/    # DashboardPage
├── types/        # Shared TypeScript types
└── zod/          # Zod validation schemas
```

---

## 🔒 Authentication Flow

1. User signs in via `POST /api/v1/auth/sign-in`
2. The server sets a JWT in an **HTTP-only cookie** (no localStorage exposure)
3. The client uses the `useMe` hook on app mount to restore the authenticated user into React context (`AppContext`)
4. Protected API routes read and verify the cookie via `authMiddleware`
5. Sign-out calls `DELETE /api/v1/auth/sign-out`, clearing the cookie server-side

Set the `VITE_API_BASE_URL` environment variable in your Vercel project settings to point to your deployed back-end URL.
