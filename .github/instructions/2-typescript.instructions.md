---
applyTo: **/*.ts, **/*.tsx
description: APPLY TypeScript best practices WHEN writing TS code
---

# TypeScript best practices WHEN writing TS code

## Strict Typing

**Type everything explicitly:**

- Always declare return types for functions
- Always type function parameters
- Avoid implicit `any` through proper `tsconfig.json` settings

**Avoid `any`:**

- ❌ Never use `any` - it disables type checking
- ✅ Use `unknown` for unvalidated external data (API responses, user input, FormData)
- ✅ Use proper types or generics instead

**Type Assertions:**

- Avoid unsafe type assertions with `as` unless necessary
- ✅ Safe: `as const`, `as ComponentType`, event type assertions
- ❌ Unsafe: `as any`, casting between unrelated types
- Prefer type guards (`if (x instanceof Y)`) over assertions

**Type Guards:**

- Use type guards for runtime type validation:

  ```typescript
  function isString(value: unknown): value is string {
    return typeof value === 'string';
  }
  ```

- Combine with `unknown` for safe external data handling

**Generics:**

- Use descriptive type parameter names (not just `T`)
  - ✅ `<TData>`, `<TResponse>`, `<TEntity>`
  - ❌ `<T>`, `<U>` (except in very simple cases)
- Use generics for reusable, type-safe functions

## Interfaces vs Types

**Use `interface` for:**

- Object shapes that might be extended
- Public APIs and contracts
- React component props

  ```typescript
  interface UserProps {
    name: string;
    age: number;
  }
  ```

**Use `type` for:**

- Union types: `type Status = 'pending' | 'success' | 'error'`
- Intersection types: `type Entity = User & Timestamps`
- Primitive aliases: `type ID = string | number`
- Mapped types and utility types

## Nullability

**Handle null/undefined explicitly:**

- Use optional properties: `{ name?: string }` instead of `{ name: string | undefined }`
- Avoid returning both `null` AND `undefined` - pick one convention
  - ✅ `function find(): User | null`
  - ❌ `function find(): User | null | undefined`
- Use nullish coalescing: `value ?? defaultValue`
- Enable `strictNullChecks` in tsconfig

## Enumerations

**Prefer string literal unions:**

```typescript
// ✅ Preferred
type Role = 'admin' | 'user' | 'guest';

// ❌ Avoid (unless you need reverse mapping)
enum Role {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}
```

**When using enums:**

- Always use string enums (not numeric)
- Define values explicitly
- Use `const enum` for better tree-shaking (if supported)

## Error Handling

**In try-catch blocks:**

```typescript
try {
  // ...
} catch (error: unknown) {  // ✅ Always use unknown
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

**Custom error types:**

```typescript
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

## Validation Pattern

**For external/unvalidated data:**

```typescript
// ✅ Correct pattern with Zod or similar
function createUser(input: unknown) {
  const validated = UserSchema.parse(input); // Type-safe after validation
  // ... use validated data
}

// ❌ Wrong - assumes data is valid
function createUser(input: User) {
  // No runtime validation!
}
```

## Additional Rules

> **Readonly when possible** Use `readonly` for immutable data
> **Avoid type pollution** Don't export internal types unnecessarily
> **Consistent naming**
>
> - Types/Interfaces: `PascalCase`
> - Type parameters: `T` prefix (`TData`, `TProps`)
> - Avoid Hungarian notation in type names
