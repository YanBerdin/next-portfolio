---
applyTo: "lib/dal/**/*.ts"
description: APPLY SOLID principles and strict DAL patterns WHEN writing Data Access Layer code
---

# Data Access Layer (DAL) - SOLID Principles

> **Version:** 2.0  
> **Date:** Novembre 2025  
> **Objectif:** Garantir la conformité SOLID (90%+) pour tous les fichiers DAL

---

## 📚 Guides complémentaires

Ce guide **complète** (ne remplace pas) les instructions suivantes :

- ✅ `.github/instructions/1-clean-code.instructions.md` — Principes généraux (30 lignes/fonction, DRY, etc.)
- ✅ `.github/instructions/2-typescript.instructions.md` — Types stricts, validation Zod
- ✅ `.github/instructions/crud-server-actions-pattern.instructions.md` — Pattern UI/Actions
- ✅ `.github/instructions/next-backend.instructions.md` — Server Actions, API Routes

**Ordre de priorité en cas de conflit :**

1. Ce guide DAL (règles spécifiques)
2. Clean Code (règles générales)
3. TypeScript (typage strict)

---

## 🎯 Objectifs de conformité SOLID

| Principe | Score cible | Fichier de référence |
|----------|-------------|----------------------|
| **S**ingle Responsibility | 95%+ | `admin-home-hero.ts` |
| **O**pen/Closed | 95%+ | `admin-home-hero.ts` |
| **L**iskov Substitution | 90%+ | `admin-home-hero.ts` |
| **I**nterface Segregation | 95%+ | `admin-home-hero.ts` |
| **D**ependency Inversion | 95%+ | `admin-home-hero.ts` |

**Score global minimum requis : 90%** (22.5/25)

---

## 🔴 RÈGLE N°1 : Interdictions absolues dans le DAL

### ❌ Imports interdits

```typescript
// ❌ JAMAIS dans lib/dal/*.ts
import { revalidatePath } from "next/cache";           // Violation DIP
import { revalidateTag } from "next/cache";            // Violation DIP
import { sendEmail } from "@/lib/email/actions";        // Violation DIP
import { sendSMS } from "@/lib/sms/service";            // Violation DIP
import { sendPushNotification } from "@/lib/push";      // Violation DIP
import { logAnalytics } from "@/lib/analytics";         // Violation SRP
```

### ✅ Imports autorisés

```typescript
// ✅ Autorisés dans lib/dal/*.ts
import "server-only";                                   // OBLIGATOIRE
import { createClient } from "@/supabase/server";       // Client DB
import { createAdminClient } from "@/supabase/admin";   // Client admin
import { requireBackofficeAccess } from "@/lib/auth/roles"; // Auth guard (editor+)
import { z } from "zod";                                // Validation
import type { Database } from "@/lib/database.types";   // Types DB
```

### 🚨 Vérification automatique

**Checklist pre-commit :**

- [ ] Aucun import `next/cache` dans `lib/dal/`
- [ ] Aucun import `@/lib/email` dans `lib/dal/`
- [ ] Aucun import `@/lib/sms` dans `lib/dal/`
- [ ] Directive `"use server"` + `import "server-only"` présente

---

## 🔴 RÈGLE N°2 : Responsabilité unique (SRP)

### Principe

**1 fichier DAL = 1 table/entité = Opérations CRUD uniquement**

### ❌ INCORRECT : Multiples responsabilités

```typescript
// ❌ VIOLATION SRP : 10 responsabilités dans 1 fonction
export async function inviteUser(input: InviteUserInput) {
  await requireBackofficeAccess();                   // 1. Auth ✅
  const validated = InviteUserSchema.parse(input);   // 2. Validation ✅
  await checkInvitationRateLimit(...);               // 3. Rate limiting ❌
  await verifyUserDoesNotExist(...);                 // 4. User check ❌
  const { invitationUrl } = await generateLink(...); // 5. Link generation ❌
  const userId = await waitForAuthUser(...);         // 6. Polling ❌
  await createUserProfile(...);                      // 7. Profile DB ✅
  await sendInvitationEmail(...);                    // 8. Email ❌
  await logAuditRecord(...);                         // 9. Audit ❌
  revalidatePath("/admin/users");                    // 10. Cache ❌
}
```

### ✅ CORRECT : Responsabilité unique

```typescript
// ✅ DAL = Database operations only
export async function createUserProfile(
  input: UserProfileInput
): Promise<DALResult<UserProfile>> {
  await requireBackofficeAccess();
  const validated = UserProfileSchema.parse(input);
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .insert(validated)
    .select()
    .single();
  
  if (error) {
    return {
      success: false,
      error: `[ERR_USER_001] Failed to create profile: ${error.message}`,
    };
  }
  
  return { success: true, data };
}

// ✅ Autres responsabilités dans des helpers séparés
// lib/services/rate-limiting.ts
export async function checkInvitationRateLimit(userId: string) { /* ... */ }

// lib/services/auth-link-generator.ts
export async function generateUserInviteLink(email: string) { /* ... */ }

// lib/services/audit-logger.ts
export async function logInvitationAudit(userId: string) { /* ... */ }
```

### Règle de décomposition

**Si une fonction DAL contient :**

- Plus de 30 lignes → Splitter en helpers
- Plus de 3 opérations DB → Créer des fonctions atomiques
- Du code métier (calculs, transformations) → Extraire dans `lib/utils/`

---

## 🔴 RÈGLE N°3 : Pattern Email/SMS séparé (Warning System)

### Problème : Email dans le DAL

```typescript
// ❌ VIOLATION DIP : Email couplé au DAL
export async function inviteUser(input: InviteUserInput): Promise<DALResult> {
  const userId = await createUserProfile(input);
  
  // ❌ Import @/lib/email dans DAL
  try {
    await sendInvitationEmail(userId, input.email);
  } catch (error) {
    // ❌ Rollback sur erreur email
    await deleteUserProfile(userId);
    throw new Error("Failed to send email");
  }
  
  return { success: true, data: { userId } };
}
```

### ✅ SOLUTION : Pattern Warning

#### Étape 1 : DAL sans email

```typescript
// lib/dal/admin-users.ts
export async function createUserProfile(
  input: UserProfileInput
): Promise<DALResult<{ userId: string }>> {
  await requireBackofficeAccess();
  const validated = UserProfileSchema.parse(input);
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .insert(validated)
    .select("id")
    .single();
  
  if (error) {
    return {
      success: false,
      error: `[ERR_USER_001] Failed to create profile: ${error.message}`,
    };
  }
  
  // ✅ Pas d'email ici
  return { success: true, data: { userId: data.id } };
}
```

#### Étape 2 : Server Action avec Warning

```typescript
// lib/actions/admin-users-actions.ts
"use server";
import "server-only";
import { revalidatePath } from "next/cache";
import { createUserProfile } from "@/lib/dal/admin-users";
import { sendInvitationEmail } from "@/lib/email/actions";

export type ActionResult<T = unknown> = 
  | { success: true; data?: T; warning?: string }
  | { success: false; error: string };

export async function inviteUserAction(input: unknown): Promise<ActionResult> {
  try {
    // 1. Opération DB (DAL)
    const result = await createUserProfile(input);
    if (!result.success) {
      return { success: false, error: result.error ?? "Creation failed" };
    }
    
    // 2. Email séparé avec catch silencieux
    let emailSent = true;
    try {
      await sendInvitationEmail(result.data.userId, input.email);
    } catch (error) {
      console.error("[Email] Failed to send invitation:", error);
      emailSent = false;
    }
    
    // 3. Revalidation (uniquement dans Server Action)
    revalidatePath("/admin/users");
    
    // 4. Retour avec warning si email échoué
    return {
      success: true,
      data: result.data,
      ...(!emailSent && { 
        warning: "User created but invitation email could not be sent" 
      }),
    };
  } catch (err: unknown) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : "Unknown error" 
    };
  }
}
```

### Règles du Pattern Warning

1. ✅ **L'opération DB réussit toujours** (pas de rollback sur erreur email)
2. ✅ **L'erreur email ne fait pas échouer l'action** (catch silencieux)
3. ✅ **Un `warning` est retourné** si l'email échoue
4. ✅ **Log serveur** pour tracer l'erreur email
5. ✅ **Email séparé du DAL** (dans Server Action uniquement)

### Cas d'usage

- ✅ Email de confirmation (contact, newsletter, invitation)
- ✅ SMS de notification
- ✅ Push notifications
- ✅ Webhooks non-critiques

---

## 🔴 RÈGLE N°4 : Fonctions < 30 lignes

### Principe Clean Code

**Chaque fonction DAL doit :**

- Tenir en 1 écran (≤ 30 lignes)
- Avoir 1 seule responsabilité
- Être testable unitairement

### ❌ INCORRECT : Fonction God (50+ lignes)

```typescript
// ❌ VIOLATION SRP + Clean Code
export async function inviteUser(input: InviteUserInput): Promise<DALResult> {
  await requireBackofficeAccess();
  const validated = InviteUserSchema.parse(input);
  
  // Rate limiting check (10 lignes)
  const rateLimitKey = `invite:${validated.email}`;
  const count = await redis.get(rateLimitKey);
  if (count && parseInt(count) >= 5) {
    return { success: false, error: "Rate limit exceeded" };
  }
  await redis.setex(rateLimitKey, 3600, (count ? parseInt(count) : 0) + 1);
  
  // User existence check (8 lignes)
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("email", validated.email)
    .maybeSingle();
  if (existing) {
    return { success: false, error: "User already exists" };
  }
  
  // Link generation (12 lignes)
  const adminClient = await createAdminClient();
  const { data: authData } = await adminClient.auth.admin.inviteUserByEmail(
    validated.email
  );
  const inviteToken = authData.user.invite_token;
  const inviteUrl = `${process.env.NEXT_PUBLIC_URL}/auth/invite?token=${inviteToken}`;
  
  // Profile creation (8 lignes)
  const { data: profile, error } = await supabase
    .from("user_profiles")
    .insert({ email: validated.email, role: validated.role })
    .select()
    .single();
  if (error) {
    return { success: false, error: error.message };
  }
  
  // Audit logging (6 lignes)
  await supabase.from("audit_logs").insert({
    action: "user_invited",
    user_id: profile.id,
    metadata: { email: validated.email },
  });
  
  return { success: true, data: { userId: profile.id } };
}
// ❌ Total: 55 lignes (violation Clean Code)
```

### ✅ CORRECT : Décomposition en helpers

```typescript
// Helper 1: Rate limiting (< 30 lignes)
async function checkInvitationRateLimit(email: string): Promise<DALResult<null>> {
  const rateLimitKey = `invite:${email}`;
  const count = await redis.get(rateLimitKey);
  
  if (count && parseInt(count) >= 5) {
    return {
      success: false,
      error: "[ERR_USER_002] Rate limit exceeded (max 5 invites/hour)",
    };
  }
  
  await redis.setex(rateLimitKey, 3600, (count ? parseInt(count) : 0) + 1);
  return { success: true, data: null };
}

// Helper 2: User existence (< 30 lignes)
async function verifyUserDoesNotExist(email: string): Promise<DALResult<null>> {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  
  if (existing) {
    return {
      success: false,
      error: "[ERR_USER_003] User already exists",
    };
  }
  
  return { success: true, data: null };
}

// Helper 3: Link generation (< 30 lignes)
async function generateUserInviteLink(
  email: string
): Promise<DALResult<{ inviteUrl: string; userId: string }>> {
  const adminClient = await createAdminClient();
  
  const { data, error } = await adminClient.auth.admin.inviteUserByEmail(email);
  if (error) {
    return {
      success: false,
      error: `[ERR_USER_004] Failed to generate invite: ${error.message}`,
    };
  }
  
  const inviteToken = data.user.invite_token;
  const inviteUrl = `${process.env.NEXT_PUBLIC_URL}/auth/invite?token=${inviteToken}`;
  
  return { success: true, data: { inviteUrl, userId: data.user.id } };
}

// Helper 4: Profile creation (< 30 lignes)
async function createUserProfile(
  email: string,
  role: string
): Promise<DALResult<{ userId: string }>> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("user_profiles")
    .insert({ email, role })
    .select("id")
    .single();
  
  if (error) {
    return {
      success: false,
      error: `[ERR_USER_005] Failed to create profile: ${error.message}`,
    };
  }
  
  return { success: true, data: { userId: data.id } };
}

// Helper 5: Audit logging (< 30 lignes)
async function logInvitationAudit(userId: string, email: string): Promise<void> {
  const supabase = await createClient();
  
  await supabase.from("audit_logs").insert({
    action: "user_invited",
    user_id: userId,
    metadata: { email },
  });
}

// Main DAL function (orchestration, < 30 lignes)
export async function inviteUser(
  input: InviteUserInput
): Promise<DALResult<{ userId: string }>> {
  await requireBackofficeAccess();
  const validated = InviteUserSchema.parse(input);
  
  // 1. Rate limiting
  const rateLimitResult = await checkInvitationRateLimit(validated.email);
  if (!rateLimitResult.success) return rateLimitResult;
  
  // 2. User existence
  const existsResult = await verifyUserDoesNotExist(validated.email);
  if (!existsResult.success) return existsResult;
  
  // 3. Generate invite link
  const linkResult = await generateUserInviteLink(validated.email);
  if (!linkResult.success) return linkResult;
  
  // 4. Create profile
  const profileResult = await createUserProfile(
    validated.email,
    validated.role
  );
  if (!profileResult.success) return profileResult;
  
  // 5. Log audit
  await logInvitationAudit(profileResult.data.userId, validated.email);
  
  return { success: true, data: { userId: profileResult.data.userId } };
}
// ✅ Total: 27 lignes (conforme Clean Code)
```

### Avantages de la décomposition

1. ✅ **Testabilité** : Chaque helper peut être testé unitairement
2. ✅ **Réutilisabilité** : `checkRateLimit()` peut être utilisé ailleurs
3. ✅ **Lisibilité** : Fonction principale = orchestration claire
4. ✅ **Maintenance** : Modification isolée d'un helper
5. ✅ **SRP** : 1 helper = 1 responsabilité

---

## 🔴 RÈGLE N°5 : Interface DALResult cohérente

### Interface standard

```typescript
// lib/dal/types.ts
export interface DALResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  warning?: string; // Optionnel (pour Pattern Warning)
}
```

### ✅ Usage correct

```typescript
// ✅ Success avec data
export async function fetchUser(id: string): Promise<DALResult<User>> {
  const user = await db.user.findUnique({ where: { id } });
  
  if (!user) {
    return {
      success: false,
      error: "[ERR_USER_006] User not found",
    };
  }
  
  return { success: true, data: user };
}

// ✅ Success sans data (delete)
export async function deleteUser(id: string): Promise<DALResult<null>> {
  await db.user.delete({ where: { id } });
  return { success: true, data: null };
}

// ✅ Error avec code tracé
export async function updateUser(
  id: string,
  input: UserInput
): Promise<DALResult<User>> {
  const { data, error } = await supabase
    .from("users")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  
  if (error) {
    return {
      success: false,
      error: `[ERR_USER_007] Update failed: ${error.message}`,
    };
  }
  
  return { success: true, data };
}
```

### ❌ Erreurs courantes

```typescript
// ❌ Throw au lieu de return
export async function fetchUser(id: string): Promise<User> {
  const user = await db.user.findUnique({ where: { id } });
  if (!user) throw new Error("Not found"); // ❌ Pas de DALResult
  return user;
}

// ❌ Retour inconsistant
export async function fetchUser(id: string): Promise<User | null> {
  return await db.user.findUnique({ where: { id } });
  // ❌ Pas de gestion d'erreur standardisée
}

// ❌ Success sans data
export async function createUser(input: UserInput): Promise<DALResult> {
  const user = await db.user.create({ data: input });
  return { success: true }; // ❌ Manque data
}
```

### Error codes convention

**Format :** `[ERR_<ENTITY>_<NUMBER>] <Description>`

```typescript
// ✅ Exemples
"[ERR_USER_001] Failed to create user"
"[ERR_HERO_002] Failed to fetch hero slide"
"[ERR_SPECTACLE_003] Slug already exists"
"[ERR_TEAM_004] Member not found"
```

**Règles :**

- Entity en UPPERCASE (`USER`, `HERO`, `SPECTACLE`)
- Numéro à 3 chiffres (`001`, `002`, etc.)
- Message en anglais pour les logs
- Description claire de l'erreur

---

## 🔴 RÈGLE N°6 : Validation Zod systématique

### Principe

**Toujours valider l'input avec Zod avant les opérations DB**

### ✅ Pattern correct

```typescript
import { z } from "zod";

// Schéma Zod (dans lib/schemas/)
const UserInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(["admin", "user", "guest"]),
});

export type UserInput = z.infer<typeof UserInputSchema>;

// Fonction DAL avec validation
export async function createUser(input: UserInput): Promise<DALResult<User>> {
  await requireBackofficeAccess();
  
  // ✅ Validation Zod (throws si invalide)
  const validated = UserInputSchema.parse(input);
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .insert(validated)
    .select()
    .single();
  
  if (error) {
    return {
      success: false,
      error: `[ERR_USER_001] Creation failed: ${error.message}`,
    };
  }
  
  return { success: true, data };
}
```

### Try/catch pour validation

```typescript
export async function updateUser(
  id: string,
  input: unknown // ❌ Pas typé à l'entrée
): Promise<DALResult<User>> {
  try {
    await requireBackofficeAccess();
    
    // ✅ Validation avec safeParse
    const validated = UserInputSchema.partial().safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        error: `[ERR_USER_008] Invalid input: ${validated.error.message}`,
      };
    }
    
    // ... suite de la fonction
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
```

---

## 🔴 RÈGLE N°7 : Pas de revalidatePath() dans le DAL

### Principe DIP (Dependency Inversion)

**Le DAL ne doit pas dépendre de Next.js cache**

### ❌ INCORRECT

```typescript
// lib/dal/spectacles.ts
import { revalidatePath } from "next/cache"; // ❌ VIOLATION DIP

export async function createSpectacle(
  input: SpectacleInput
): Promise<DALResult<Spectacle>> {
  const { data, error } = await supabase
    .from("spectacles")
    .insert(input)
    .select()
    .single();
  
  if (error) {
    return { success: false, error: error.message };
  }
  
  revalidatePath("/admin/spectacles"); // ❌ VIOLATION DIP
  return { success: true, data };
}
```

### ✅ CORRECT : Revalidation dans Server Action

```typescript
// lib/dal/spectacles.ts
export async function createSpectacle(
  input: SpectacleInput
): Promise<DALResult<Spectacle>> {
  const { data, error } = await supabase
    .from("spectacles")
    .insert(input)
    .select()
    .single();
  
  if (error) {
    return { success: false, error: error.message };
  }
  
  // ✅ Pas de revalidatePath() ici
  return { success: true, data };
}

// lib/actions/spectacles-actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { createSpectacle } from "@/lib/dal/spectacles";

export async function createSpectacleAction(input: unknown) {
  const result = await createSpectacle(input);
  
  if (!result.success) {
    return { success: false, error: result.error };
  }
  
  // ✅ Revalidation uniquement dans Server Action
  revalidatePath("/admin/spectacles");
  revalidatePath("/spectacles");
  
  return { success: true, data: result.data };
}
```

---

## 📊 Checklist de conformité SOLID

### Pour chaque fichier DAL (`lib/dal/*.ts`)

#### Structure

- [ ] Directive `"use server"` en première ligne
- [ ] Import `"server-only"` en deuxième ligne
- [ ] Fichier < 300 lignes (sinon splitter par entité)
- [ ] 1 fichier = 1 table/entité

#### Imports

- [ ] Pas d'import `next/cache`
- [ ] Pas d'import `@/lib/email`
- [ ] Pas d'import `@/lib/sms`
- [ ] Pas d'import `@/lib/analytics`

#### Fonctions

- [ ] Toutes les fonctions < 30 lignes
- [ ] 1 responsabilité par fonction
- [ ] Validation Zod systématique
- [ ] Return type `DALResult<T>` cohérent

#### Sécurité

- [ ] `requireBackofficeAccess()` ou `requireAdminOnly()` au début
- [ ] Error codes tracés `[ERR_XXX_NNN]`
- [ ] Pas de secrets hardcodés
- [ ] Pas de `console.log()` avec données sensibles

#### Dépendances

- [ ] Pas de `revalidatePath()` dans le DAL
- [ ] Pas d'appels email/SMS dans le DAL
- [ ] Pas de logique métier complexe (extraire dans `lib/utils/`)

---

## 📈 Score SOLID : Comment évaluer

### Grille d'évaluation (sur 25 points)

| Principe | Points | Critères |
|----------|--------|----------|
| **S**ingle Responsibility | 5 | 1 responsabilité/fonction, pas d'email/SMS, pas de cache |
| **O**pen/Closed | 5 | Validation extensible, pas de logique hard-coded |
| **L**iskov Substitution | 5 | Interface `DALResult` cohérente, signatures prévisibles |
| **I**nterface Segregation | 5 | Dépendances minimales (Supabase + Auth uniquement) |
| **D**ependency Inversion | 5 | Pas de Next.js, email, SMS dans le DAL |

### Exemples de scores

**Fichier conforme (24/25 - 96%) :**

```typescript
// lib/dal/admin-home-hero.ts
"use server";
import "server-only";
import { createClient } from "@/supabase/server";
import { requireBackofficeAccess } from "@/lib/auth/roles";

export async function fetchAllHeroSlides(): Promise<HeroSlideDTO[]> {
  await requireBackofficeAccess();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("home_hero_slides")
    .select("*")
    .order("position", { ascending: true });
  
  if (error) throw new Error(`[ERR_HERO_001] ${error.message}`);
  return data ?? [];
}
// ✅ S: 5/5, O: 5/5, L: 5/5, I: 5/5, D: 4/5 (pas de DALResult)
```

**Fichier non-conforme (11/25 - 44%) :**

```typescript
// lib/dal/admin-users.ts (AVANT refactoring)
export async function inviteUser(input: InviteUserInput) {
  await requireBackofficeAccess();                   // S: ✅
  const validated = InviteUserSchema.parse(input);   // O: ✅
  await checkRateLimit(...);                         // S: ❌ (rate limiting)
  await verifyUserExists(...);                       // S: ❌ (validation métier)
  const link = await generateLink(...);              // S: ❌ (link generation)
  await createProfile(...);                          // S: ✅
  await sendEmail(...);                              // D: ❌ (email dans DAL)
  await logAudit(...);                               // S: ❌ (audit logging)
  revalidatePath("/admin/users");                    // D: ❌ (Next.js cache)
}
// ❌ S: 1/5, O: 3/5, L: 3/5, I: 2/5, D: 2/5 = 11/25
```

---

## 🎯 Plan de refactoring type

### Étape 1 : Identifier les violations

```bash
# Rechercher les imports interdits
grep -r "revalidatePath" lib/dal/
grep -r "@/lib/email" lib/dal/
grep -r "@/lib/sms" lib/dal/
```

### Étape 2 : Créer les Server Actions

```typescript
// lib/actions/[entity]-actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { createEntity, updateEntity, deleteEntity } from "@/lib/dal/[entity]";

export async function createEntityAction(input: unknown) {
  const result = await createEntity(input);
  if (!result.success) return result;
  
  revalidatePath("/admin/[entity]");
  return result;
}
```

### Étape 3 : Extraire la logique email

```typescript
// AVANT (DAL)
await sendEmail(...);

// APRÈS (Server Action)
let emailSent = true;
try {
  await sendEmail(...);
} catch (error) {
  console.error("[Email] Failed:", error);
  emailSent = false;
}
return {
  success: true,
  data: result.data,
  ...(!emailSent && { warning: "Email could not be sent" }),
};
```

### Étape 4 : Décomposer les fonctions > 30 lignes

```typescript
// AVANT (50+ lignes)
export async function complexOperation(input: Input) {
  // ... 50+ lignes
}

// APRÈS (helpers < 30 lignes)
async function step1Helper(...) { /* < 30 lignes */ }
async function step2Helper(...) { /* < 30 lignes */ }
async function step3Helper(...) { /* < 30 lignes */ }

export async function complexOperation(input: Input) {
  const result1 = await step1Helper(...);
  if (!result1.success) return result1;
  
  const result2 = await step2Helper(...);
  if (!result2.success) return result2;
  
  return await step3Helper(...);
}
// Total: < 30 lignes
```

### Étape 5 : Valider la conformité

```bash
# Vérifier que tous les DAL sont conformes
npm run test:dal-solid
```

---

## 📚 Exemples complets

### Exemple 1 : DAL conforme (100%)

```typescript
// lib/dal/compagnie.ts
"use server";
import "server-only";
import { createClient } from "@/supabase/server";

export type CompagnieValueRecord = {
  id: number;
  key: string;
  title: string;
  description: string;
  position: number;
  active: boolean;
};

/**
 * Fetch active company values
 * @param limit - Maximum number of values to return
 * @returns Array of company values ordered by position
 */
export async function fetchCompagnieValues(
  limit = 12
): Promise<CompagnieValueRecord[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("compagnie_values")
    .select("id, key, title, description, position, active")
    .eq("active", true)
    .order("position", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("[DAL] fetchCompagnieValues error:", error);
    return [];
  }

  return data ?? [];
}

// ✅ Score SOLID: 25/25 (100%)
// S: 5/5 (1 responsabilité)
// O: 5/5 (extensible via limit param)
// L: 5/5 (signature cohérente)
// I: 5/5 (1 seule dépendance: Supabase)
// D: 5/5 (pas de Next.js, email, SMS)
```

### Exemple 2 : DAL avec DALResult (96%)

```typescript
// lib/dal/admin-home-hero.ts
"use server";
import "server-only";
import { createClient } from "@/supabase/server";
import { requireBackofficeAccess } from "@/lib/auth/roles";
import type { HeroSlideInput, HeroSlideDTO } from "@/lib/schemas/home-content";
import { HeroSlideInputSchema } from "@/lib/schemas/home-content";

export interface DALResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Create new hero slide
 * @param input - Hero slide data
 * @returns Created hero slide or error
 */
export async function createHeroSlide(
  input: HeroSlideInput
): Promise<DALResult<HeroSlideDTO>> {
  try {
    await requireBackofficeAccess();
    
    // Validation Zod
    const validated = HeroSlideInputSchema.parse(input);
    
    // Generate unique slug if needed
    const supabase = await createClient();
    const slug = validated.slug || generateSlug(validated.title);
    const uniqueSlug = await ensureUniqueSlug(supabase, slug);
    
    // Database operation
    const { data, error } = await supabase
      .from("home_hero_slides")
      .insert({ ...validated, slug: uniqueSlug })
      .select()
      .single();

    if (error) {
      console.error("[DAL] createHeroSlide error:", error);
      return {
        success: false,
        error: `[ERR_HERO_003] Failed to create: ${error.message}`,
      };
    }

    return { success: true, data };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Generate URL-friendly slug from title
 * @internal
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Ensure slug is unique by adding suffix if needed
 * @internal
 */
async function ensureUniqueSlug(
  supabase: SupabaseClient,
  baseSlug: string
): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (counter < 100) {
    const { data: existing } = await supabase
      .from("home_hero_slides")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (!existing) return slug;

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  throw new Error("[ERR_HERO_009] Unable to generate unique slug");
}

// ✅ Score SOLID: 24/25 (96%)
// S: 5/5 (DB operations only, helpers isolés)
// O: 5/5 (extensible via Zod refinements)
// L: 5/5 (interface DALResult cohérente)
// I: 5/5 (dépendances minimales)
// D: 4/5 (pas de revalidatePath, mais helpers couplés)
```

### Exemple 3 : Pattern Warning complet

```typescript
// lib/dal/contact.ts
"use server";
import "server-only";
import { z } from "zod";
import { createClient } from "@/supabase/server";

const ContactMessageSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().email().toLowerCase(),
  message: z.string().trim().min(1).max(5000),
  consent: z.boolean().refine((v) => v === true),
});

export type ContactMessageInput = z.infer<typeof ContactMessageSchema>;

/**
 * Create contact message
 * @param input - Contact form data
 * @returns Success status (no data returned for RGPD)
 */
export async function createContactMessage(
  input: ContactMessageInput
): Promise<{ ok: boolean }> {
  const validated = ContactMessageSchema.parse(input);
  
  const supabase = await createClient();
  const payload = {
    firstname: validated.firstName,
    lastname: validated.lastName,
    email: validated.email,
    message: validated.message,
    consent: validated.consent,
  };

  // RGPD: Use .insert() without .select() to avoid RLS blocking
  const { error } = await supabase.from("messages_contact").insert(payload);
  
  if (error) {
    console.error("[DAL] createContactMessage error:", error);
    throw new Error("[ERR_CONTACT_001] Failed to submit contact message");
  }

  return { ok: true };
}

// lib/actions/contact-actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { createContactMessage } from "@/lib/dal/contact";
import { sendContactConfirmationEmail } from "@/lib/email/actions";

export type ActionResult = 
  | { success: true; warning?: string }
  | { success: false; error: string };

export async function submitContactAction(
  input: unknown
): Promise<ActionResult> {
  try {
    // 1. Database operation
    await createContactMessage(input);
    
    // 2. Email with silent catch (Pattern Warning)
    let emailSent = true;
    try {
      await sendContactConfirmationEmail(input.email);
    } catch (error) {
      console.error("[Email] Contact confirmation failed:", error);
      emailSent = false;
    }
    
    // 3. Revalidation
    revalidatePath("/contact");
    
    // 4. Return with warning if email failed
    return {
      success: true,
      ...(!emailSent && { 
        warning: "Message sent but confirmation email could not be delivered" 
      }),
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

// ✅ Score SOLID: 24/25 (96%)
// DAL: Pas d'email, pas de revalidatePath
// Server Action: Gestion email avec Pattern Warning
```

---

## 🔍 Tests et validation

### Test unitaire DAL

```typescript
// __tests__/dal/compagnie.test.ts
import { fetchCompagnieValues } from "@/lib/dal/compagnie";
import { createClient } from "@/supabase/server";

jest.mock("@/supabase/server");

describe("fetchCompagnieValues", () => {
  it("should return active values ordered by position", async () => {
    const mockData = [
      { id: 1, key: "value1", title: "Value 1", position: 1 },
      { id: 2, key: "value2", title: "Value 2", position: 2 },
    ];
    
    (createClient as jest.Mock).mockResolvedValue({
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            order: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue({
                data: mockData,
                error: null,
              }),
            }),
          }),
        }),
      }),
    });

    const result = await fetchCompagnieValues(2);
    
    expect(result).toEqual(mockData);
    expect(result).toHaveLength(2);
  });

  it("should return empty array on error", async () => {
    (createClient as jest.Mock).mockResolvedValue({
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            order: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue({
                data: null,
                error: { message: "Database error" },
              }),
            }),
          }),
        }),
      }),
    });

    const result = await fetchCompagnieValues();
    
    expect(result).toEqual([]);
  });
});
```

### Test d'intégration Server Action + DAL

```typescript
// __tests__/actions/contact-actions.test.ts
import { submitContactAction } from "@/lib/actions/contact-actions";
import { createContactMessage } from "@/lib/dal/contact";
import { sendContactConfirmationEmail } from "@/lib/email/actions";

jest.mock("@/lib/dal/contact");
jest.mock("@/lib/email/actions");
jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

describe("submitContactAction", () => {
  it("should return success with warning if email fails", async () => {
    (createContactMessage as jest.Mock).mockResolvedValue({ ok: true });
    (sendContactConfirmationEmail as jest.Mock).mockRejectedValue(
      new Error("SMTP error")
    );

    const result = await submitContactAction({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      message: "Test message",
      consent: true,
    });

    expect(result.success).toBe(true);
    expect(result.warning).toContain("confirmation email could not be delivered");
  });

  it("should return success without warning if email succeeds", async () => {
    (createContactMessage as jest.Mock).mockResolvedValue({ ok: true });
    (sendContactConfirmationEmail as jest.Mock).mockResolvedValue(undefined);

    const result = await submitContactAction({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      message: "Test message",
      consent: true,
    });

    expect(result.success).toBe(true);
    expect(result.warning).toBeUndefined();
  });
});
```

### Script de validation automatique

```typescript
// scripts/validate-dal-solid.ts
import * as fs from "fs";
import * as path from "path";

interface ValidationResult {
  file: string;
  score: number;
  violations: string[];
}

function validateDalFile(filePath: string): ValidationResult {
  const content = fs.readFileSync(filePath, "utf-8");
  const violations: string[] = [];
  let score = 25;

  // Check 1: "use server" + "server-only"
  if (!content.includes('"use server"')) {
    violations.push('Missing "use server" directive');
    score -= 2;
  }
  if (!content.includes('import "server-only"')) {
    violations.push('Missing "server-only" import');
    score -= 2;
  }

  // Check 2: Forbidden imports
  if (content.includes('from "next/cache"')) {
    violations.push("Forbidden import: next/cache (revalidatePath)");
    score -= 5;
  }
  if (content.includes("@/lib/email")) {
    violations.push("Forbidden import: @/lib/email");
    score -= 5;
  }
  if (content.includes("@/lib/sms")) {
    violations.push("Forbidden import: @/lib/sms");
    score -= 5;
  }

  // Check 3: revalidatePath() usage
  if (content.includes("revalidatePath(")) {
    violations.push("revalidatePath() called in DAL (use Server Action)");
    score -= 5;
  }

  // Check 4: Function length (approximation)
  const functions = content.match(/export async function \w+\([^)]*\)[^{]*{/g);
  if (functions) {
    functions.forEach((fn) => {
      const fnName = fn.match(/function (\w+)/)?.[1];
      const lines = content
        .split(fn)[1]
        ?.split("\n}")
        [0]?.split("\n").length || 0;
      
      if (lines > 30) {
        violations.push(`Function ${fnName} has ${lines} lines (max 30)`);
        score -= 2;
      }
    });
  }

  // Check 5: DALResult usage
  if (
    content.includes("Promise<") &&
    !content.includes("DALResult") &&
    !content.includes("Promise<void>") &&
    !content.includes("Promise<{ ok: boolean }>")
  ) {
    violations.push("Missing DALResult return type");
    score -= 3;
  }

  return {
    file: path.basename(filePath),
    score: Math.max(0, score),
    violations,
  };
}

function validateAllDal(): void {
  const dalDir = path.join(process.cwd(), "lib", "dal");
  const files = fs.readdirSync(dalDir).filter((f) => f.endsWith(".ts"));

  console.log("🔍 Validating DAL SOLID compliance...\n");

  const results: ValidationResult[] = files.map((file) =>
    validateDalFile(path.join(dalDir, file))
  );

  results.forEach((result) => {
    const status = result.score >= 22 ? "✅" : "❌";
    console.log(`${status} ${result.file} - Score: ${result.score}/25 (${Math.round((result.score / 25) * 100)}%)`);
    
    if (result.violations.length > 0) {
      result.violations.forEach((v) => console.log(`   - ${v}`));
    }
    console.log();
  });

  const avgScore =
    results.reduce((sum, r) => sum + r.score, 0) / results.length;
  const compliance = Math.round((avgScore / 25) * 100);

  console.log(`📊 Average compliance: ${compliance}%`);
  console.log(`🎯 Target: 90%+\n`);

  if (compliance < 90) {
    console.error("❌ DAL compliance below 90%. Please fix violations.");
    process.exit(1);
  }

  console.log("✅ All DAL files are SOLID compliant!");
}

validateAllDal();
```

```json
// package.json
{
  "scripts": {
    "test:dal-solid": "tsx scripts/validate-dal-solid.ts"
  }
}
```

---

## 📖 Références

### Documentation officielle

- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Next.js - Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Zod Validation](https://zod.dev/)
- [Clean Code by Robert C. Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)

### Guides internes

- `.github/instructions/1-clean-code.instructions.md` — Max 30 lignes/fonction
- `.github/instructions/2-typescript.instructions.md` — Types stricts
- `.github/instructions/crud-server-actions-pattern.instructions.md` — Pattern CRUD
- `.github/instructions/next-backend.instructions.md` — Server Actions

### Fichiers de référence (100% conformes)

- `lib/dal/compagnie.ts` — Score 25/25
- `lib/dal/dashboard.ts` — Score 25/25
- `lib/dal/home-hero.ts` — Score 25/25
- `lib/dal/home-partners.ts` — Score 25/25
- `lib/dal/admin-home-hero.ts` — Score 24/25 (référence CRUD)

---

## 📝 Changelog

| Version | Date | Changements |
|---------|------|-------------|
| 2.0 | 2025-11-28 | Version initiale complète avec Pattern Warning, helpers, exemples |
| 1.0 | 2025-11-27 | Draft initial (inclus dans analyse SOLID) |

---

## ✅ Résumé des règles

### Les 7 règles d'or du DAL SOLID

1. ✅ **Pas de `revalidatePath()`** dans le DAL (uniquement dans Server Actions)
2. ✅ **Pas d'email/SMS** dans le DAL (Pattern Warning dans Server Actions)
3. ✅ **Fonctions < 30 lignes** (décomposer en helpers si nécessaire)
4. ✅ **Validation Zod systématique** avant toute opération DB
5. ✅ **Interface `DALResult<T>` cohérente** pour tous les retours
6. ✅ **Error codes tracés** `[ERR_ENTITY_NNN]` pour debug
7. ✅ **Directive `"use server"` + `"server-only"`** obligatoire

### Objectif final

**🎯 Score SOLID minimum : 90% (22.5/25)**

---

**Maintenu par :** Équipe Backend Rouge-Cardinal  
**Contact :** <tech@rouge-cardinal.fr>  
**Dernière révision :** 28 novembre 2025
