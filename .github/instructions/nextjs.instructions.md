---
applyTo: "**"
---

# Next.js 15. Best Practices (2025)

Last updated: September 2025

This document summarizes the latest, authoritative best practices for building, structuring, and maintaining Next.js applications. It is intended for use by LLMs and developers to ensure code quality, maintainability, security, and scalability.

---

## 1. Project Structure & Organization

- **Use the `app/` directory** (App Router) for all new projects. Prefer it over the legacy `pages/` directory.
- **Top-level folders:**
  - `app/` — Routing, layouts, pages, and route handlers
  - `public/` — Static assets (images, fonts, etc.)
  - `lib/` — Shared utilities, API clients, and logic
  - `components/` — Reusable UI components
  - `contexts/` — React context providers
  - `styles/` — Global and modular stylesheets
  - `hooks/` — Custom React hooks
  - `types/` — TypeScript type definitions
- **Colocation:** Place files (components, styles, tests) near where they are used, but avoid deeply nested structures.
- **Route Groups:** Use parentheses (e.g., `(admin)`) to group routes without affecting the URL path.
- **Private Folders:** Prefix with `_` (e.g., `_internal`) to opt out of routing and signal implementation details.

- **Feature Folders:** For large apps, group by feature (e.g., `app/dashboard/`, `app/auth/`).
- **Use `src/`** (optional): Place all source code in `src/` to separate from config files.

## 2.1. Server and Client Component Integration (App Router)

> [!CAUTION]
>**Never use `next/dynamic` with `{ ssr: false }` inside a Server Component.** This is not supported and will cause a build/runtime error.

> [!TIP]
>**Correct Approach:**

- If you need to use a Client Component (e.g., a component that uses hooks, browser APIs, or client-only libraries) inside a Server Component, you must:
  1. Move all client-only logic/UI into a dedicated Client Component (with `'use client'` at the top).
  2. Import and use that Client Component directly in the Server Component (no need for `next/dynamic`).
  3. If you need to compose multiple client-only elements (e.g., a navbar with a profile dropdown), create a single Client Component that contains all of them.

**Example:**

```tsx
// Server Component
import DashboardNavbar from "@/components/DashboardNavbar";

export default async function DashboardPage() {
  // ...server logic...
  return (
    <>
      <DashboardNavbar /> {/* This is a Client Component */}
      {/* ...rest of server-rendered page... */}
    </>
  );
}
```

**Why:**

- Server Components cannot use client-only features or dynamic imports with SSR disabled.
- Client Components can be rendered inside Server Components, but not the other way around.

**Summary:**
Always move client-only UI into a Client Component and import it directly in your Server Component. Never use `next/dynamic` with `{ ssr: false }` in a Server Component.

---

## 2. Component Best Practices

- **Component Types:**
  - **Server Components** (default): For data fetching, heavy logic, and non-interactive UI.
  - **Client Components:** Add `'use client'` at the top. Use for interactivity, state, or browser APIs.
- **When to Create a Component:**
  - If a UI pattern is reused more than once.
  - If a section of a page is complex or self-contained.
  - If it improves readability or testability.
- **Naming Conventions:**
  - Use `PascalCase` for component files and exports (e.g., `UserCard.tsx`).
  - Use `camelCase` for hooks (e.g., `useUser.ts`).
  - Use `snake_case` or `kebab-case` for static assets (e.g., `logo_dark.svg`).
  - Name context providers as `XyzProvider` (e.g., `ThemeProvider`).
- **File Naming:**
  - Match the component name to the file name.
  - For single-export files, default export the component.
  - For multiple related components, use an `index.ts` barrel file.
- **Component Location:**
  - Place shared components in `components/`.
  - Place route-specific components inside the relevant route folder.
- **Props:**
  - Use TypeScript interfaces for props.
  - Prefer explicit prop types and default values.
- **Testing:**
  - Co-locate tests with components (e.g., `UserCard.test.tsx`).

## 3. Naming Conventions (General)

- **Folders:** `kebab-case` (e.g., `user-profile/`)
- **Files:** `PascalCase` for components, `camelCase` for utilities/hooks, `kebab-case` for static assets
- **Variables/Functions:** `camelCase`
- **Types/Interfaces:** `PascalCase`
- **Constants:** `UPPER_SNAKE_CASE`

## 4. API Routes (Route Handlers)

- **Prefer API Routes over Edge Functions** unless you need ultra-low latency or geographic distribution.
- **Location:** Place API routes in `app/api/` (e.g., `app/api/users/route.ts`).
- **HTTP Methods:** Export async functions named after HTTP verbs (`GET`, `POST`, etc.).
- **Request/Response:** Use the Web `Request` and `Response` APIs. Use `NextRequest`/`NextResponse` for advanced features.
- **Dynamic Segments:** Use `[param]` for dynamic API routes (e.g., `app/api/users/[id]/route.ts`).
- **Validation:** Always validate and sanitize input. Use libraries like `zod` or `yup`.
- **Error Handling:** Return appropriate HTTP status codes and error messages.
- **Authentication:** Protect sensitive routes using middleware or server-side session checks.

## 5. Data Security & Access Patterns

### 5.1. Data Fetching Approaches

> [!NOTE]
> Choose **ONE** approach and avoid mixing them for consistency and security auditing:

1. **External HTTP APIs** - for existing large applications and organizations
2. **Data Access Layer (DAL)** - **RECOMMENDED** for new projects
3. **Component-Level Data Access** - for prototypes and learning only

### 5.2. Data Access Layer (DAL) - RECOMMENDED

Create a dedicated Data Access Layer for new projects:

```typescript
// lib/data/dal.ts
import "server-only"; // MANDATORY - prevents client-side execution
import { cache } from "react";
import { cookies } from "next/headers";

// Cached helper methods for consistent data access
export const getCurrentUser = cache(async () => {
  const token = cookies().get("AUTH_TOKEN");
  const decodedToken = await decryptAndValidate(token);

  // Don't include secret tokens or private information as public fields
  // Use classes to avoid accidentally passing the whole object to the client
  return new User(decodedToken.id);
});

// Authorization helper functions
function canSeeUsername(viewer: User) {
  return true; // Public info for now, but can change
}

function canSeePhoneNumber(viewer: User, team: string) {
  return viewer.isAdmin || team === viewer.team;
}

export async function getProfileDTO(slug: string) {
  // Use database API that supports safe templating of queries
  const [rows] = await sql`SELECT * FROM user WHERE slug = ${slug}`;
  const userData = rows[0];
  const currentUser = await getCurrentUser();

  // Only return data relevant for this query and not everything
  // Follow API minimization principles
  return {
    username: canSeeUsername(currentUser) ? userData.username : null,
    phonenumber: canSeePhoneNumber(currentUser, userData.team)
      ? userData.phonenumber
      : null,
  };
}
```

**DAL Requirements:**

- Only run on the server (`import 'server-only'`)
- Perform authorization checks
- Return safe, minimal Data Transfer Objects (DTOs)
- Only the DAL should access `process.env` secrets

### 5.2.1. Reads policy (No Server Actions for reads)

- Do not use Server Actions for data reads. Server Actions issue POSTs, are not cached, and serialize execution (hurting parallelism).
- Perform reads in Server Components (GET) and leverage `Suspense` to stream UI; keep mutations as Server Actions or API routes.
- Always centralize auth inside the DAL (e.g., `requireUser()` within each read), not only at page-level.

### 5.2.2. Cache invalidation after mutations

- Use `revalidatePath('/route')` or `revalidateTag('tag')` inside mutation Server Actions to invalidate server cache.
- Prefer route‑segment revalidation aligned with affected data. Keep ISR settings consistent with DAL usage.

### 5.2.3. Layouts pitfalls (static rendering)

- Avoid fetching server data in root/layouts to preserve static rendering of children routes.
- If session is needed in a navbar, make the navbar a Client Component and fetch session client‑side to keep siblings static when possible.

### 5.3. Component-Level Data Access (Prototypes Only)
>
> [!WARNING]
> ⚠️ **WARNING**: Only for prototypes and learning. High risk of data exposure.

```js
// ❌ BAD: Exposes all userData fields to client
export async function Page({ params: { slug } }) {
  const [rows] = await sql`SELECT * FROM user WHERE slug = ${slug}`;
  const userData = rows[0];

  // EXPOSED: This exposes all fields to the client
  return <Profile user={userData} />;
}

// ✅ GOOD: Sanitize data before passing to Client Component
export async function getUser(slug: string) {
  const [rows] = await sql`SELECT * FROM user WHERE slug = ${slug}`;
  const user = rows[0];

  // Return only the public fields
  return {
    name: user.name,
    avatar: user.avatar,
    // Never include: email, password, tokens, etc.
  };
}

export default async function Page({ params: { slug } }) {
  const publicProfile = await getUser(slug);
  return <Profile user={publicProfile} />;
}
```

**Migration Rule**: Always migrate to DAL when moving to production.

### 5.4. Server-Client Data Flow Security

**Server Components:**

- Run only on the server
- Can safely access environment variables, secrets, databases, and internal APIs

**Client Components:**

- Run on server during pre-rendering AND in browser
- Must follow browser security assumptions
- Must not access privileged data or server-only modules

> [!CAUTION]
> **Data Sanitization Pattern:**

```ts
// ❌ AVOID: Broad type interfaces
interface BadProfileProps {
  user: User; // Contains everything from database
}

// ✅ PREFER: Minimal, specific interfaces
interface ProfileProps {
  user: {
    name: string;
    avatar?: string;
    // Only what's needed for rendering
  };
}
```

### 5.5. Preventing Server-Only Code Execution on Client

**Always use `server-only` package:**

```bash
pnpm add server-only
```

```typescript
// At the top of every DAL module
import "server-only";

export async function getSecretData() {
  const apiKey = process.env.SECRET_API_KEY; // Safe - will error if used client-side
  // ...proprietary business logic...
}
```

**Benefits:**

- Build error if module imported in client environment
- Protects proprietary code and business logic
- Prevents accidental exposure of secrets

### 5.7. Concurrency and request semantics

- Reads via Server Actions become POST and are not cached; they may block mutations queued after long reads.
- Reads from Server Components (GET) enable better caching and parallelism; use `Suspense` to stream while data loads.

### 5.6. React Taint APIs (Experimental)

Enable in `next.config.js`:

```js
module.exports = {
  experimental: {
    taint: true,
  },
};
```

> [!CAUTION]
> Use to prevent accidental data exposure:

```typescript
import {
  experimental_taintObjectReference,
  experimental_taintUniqueValue,
} from "react";

// Taint sensitive objects or values
experimental_taintObjectReference("sensitive user data", sensitiveUserObject);
experimental_taintUniqueValue("API key leaked", process.env.API_KEY);
```

## 6. Server Actions Security

### 6.1. Built-in Security Features

> [!IMPORTANT]
>
> - **Secure Action IDs**: Encrypted, non-deterministic IDs (regenerated every 14 days)
> - **Dead Code Elimination**: Unused Server Actions removed from client bundle
> - **POST Method Only**: Prevents CSRF vulnerabilities
> - **Origin Verification**: Compares Origin and Host headers

### 6.2. Server Action Security Pattern

```ts
"use server";
import { auth } from "./lib/auth";
import { z } from "zod";

export async function secureUpdateAction(formData: FormData) {
  // 1. ALWAYS validate client input
  const schema = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
  });

  const result = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!result.success) {
    throw new Error("Invalid input");
  }

  // 2. ALWAYS verify authorization
  const { user } = await auth();
  if (!user) {
    throw new Error("You must be signed in to perform this action");
  }

  if (!canUpdateUser(user, result.data)) {
    throw new Error("Unauthorized");
  }

  // 3. Perform secure operation
  return await updateUserInDatabase(user.id, result.data);
}
```

### 6.3. Input Validation Rules

```typescript
// ❌ NEVER trust client data directly
export default async function Page({ searchParams }) {
  const isAdmin = searchParams.get("isAdmin");
  if (isAdmin === "true") {
    return <AdminPanel />; // Vulnerable!
  }
}

// ✅ ALWAYS re-verify server-side
export default async function Page() {
  const token = cookies().get("AUTH_TOKEN");
  const isAdmin = await verifyAdmin(token);
  if (isAdmin) {
    return <AdminPanel />;
  }
}
```

> [!IMPORTANT]
> **Validate ALL client inputs:**
>
>- Form data
>- URL parameters
>- Headers
>- searchParams
>- Cookies (re-verify, don't just trust)

### 6.4. Avoiding Side Effects During Rendering

```js

// ❌ BAD: Mutation during rendering
export default async function Page({ searchParams }) {
  if (searchParams.get('logout')) {
    cookies().delete('AUTH_TOKEN') // Side effect - dangerous!
  }
  return <UserProfile />
}

// ✅ GOOD: Use Server Actions for mutations
import { logout } from './actions'

export default function Page() {
  return (
    <>
      <UserProfile />
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </>
  )
}
```

> [!WARNING]
>**Rule**: Mutations should NEVER be side effects during rendering. Always use Server Actions.

### 6.6. Scope of Server Actions

- Reserve Server Actions for mutations and non‑idempotent operations. Keep data reads in Server Components/DAL to preserve GET semantics and caching.

### 6.5. Advanced Server Actions Configuration

For complex deployments:

```js
// next.config.js
module.exports = {
  experimental: {
    serverActions: {
      // For reverse proxies or multi-layered backends
      allowedOrigins: ["my-proxy.com", "*.my-proxy.com"],
    },
  },
};
```

For multi-server deployments:

```bash
# Consistent encryption across server instances
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=your-aes-gcm-encrypted-key
```

## 7. General Best Practices

- **TypeScript:** Use TypeScript for all code. Enable `strict` mode in `tsconfig.json`.
- **ESLint & Prettier:** Enforce code style and linting. Use the official Next.js ESLint config.
- **Environment Variables:** Store secrets in `.env.local`. Never commit secrets to version control.
- **Testing:** Use Jest, React Testing Library, or Playwright. Write tests for all critical logic and components.
- **Accessibility:** Use semantic HTML and ARIA attributes. Test with screen readers.
- **Performance:**
  - Use built-in Image and Font optimization.
  - Use Suspense and loading states for async data.
  - Avoid large client bundles; keep most logic in Server Components.
- **Security:**
  - Sanitize all user input.
  - Use HTTPS in production.
  - Set secure HTTP headers.
  - Follow Data Access Layer patterns for new projects.
  - Always use `'server-only'` for sensitive modules.
  - Validate and authorize all Server Actions.
- **Documentation:**
  - Write clear README and code comments.
  - Document public APIs and components.

## 8. Security Audit Checklist

When auditing a Next.js project:

- **Data Access Layer**: Is there an established DAL practice? Are database packages and environment variables only imported in the DAL?
- **"use client" files**: Do component props expect private data? Are type signatures overly broad?
- **"use server" files**: Are action arguments validated? Is the user re-authorized inside each action?
- **Dynamic routes** (`/[param]/`): Are params validated as user input?
- **middleware.tsx and route.tsx**: These have significant power - audit thoroughly
- **Regular security testing**: Perform penetration testing and vulnerability scanning

## 9. Migration Guidelines

### From Component-Level to DAL

```js
// Before: Direct database access in component
export async function UserPage({ params }) {
  const [rows] = await sql`SELECT * FROM users WHERE id = ${params.id}`;
  return <UserProfile user={rows[0]} />;
}

// After: Using DAL
import { getUserProfileDTO } from "@/lib/data/users";

export async function UserPage({ params }) {
  const userProfile = await getUserProfileDTO(params.id);
  return <UserProfile user={userProfile} />;
}
```

### Adding Security to Existing Actions

```typescript
// Before: Insecure action
"use server";
export async function updateUser(formData) {
  const name = formData.get("name");
  await sql`UPDATE users SET name = ${name}`;
}

// After: Secure action
("use server");
import { z } from "zod";
import { auth } from "@/lib/auth";

export async function updateUser(formData) {
  // Validation
  const schema = z.object({
    name: z.string().min(1).max(100),
  });
  const { name } = schema.parse({
    name: formData.get("name"),
  });

  // Authorization
  const { user } = await auth();
  if (!user) throw new Error("Unauthorized");

  // Secure operation
  await sql`UPDATE users SET name = ${name} WHERE id = ${user.id}`;
}
```

# Avoid Unnecessary Example Files

Do not create example/demo files (like ModalExample.tsx) in the main codebase unless the user specifically requests a live example, Storybook story, or explicit documentation component. Keep the repository clean and production-focused by default.

# Always use the latest documentation and guides

- For every nextjs related request, begin by searching for the most current nextjs documentation, guides, and examples.
- Use the following tools to fetch and search documentation if they are available:
  - `resolve_library_id` to resolve the package/library name in the docs.
  - `get_library_docs` for up to date documentation.
