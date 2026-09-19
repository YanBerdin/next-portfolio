export const ROUGE_CARDINAL_SITE_URL = "https://compagnie-rouge-cardinal.fr";
export const ROUGE_CARDINAL_REPO_URL = "https://github.com/YanBerdin/rougecardinalcompany";

export const caseStudyIntro = {
  eyebrow: "Étude de cas",
  title: "Rouge Cardinal",
  summary:
    "Application fullstack en production pour une compagnie de théâtre professionnelle : site public accessible WCAG 2.2 AA, back-office de 14 sections et médiathèque, sur une sécurité en profondeur à sept couches. Conçue et livrée seul.",
  stack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Supabase",
    "PostgreSQL 17",
    "Tailwind CSS",
    "Zod",
    "Vitest",
    "Playwright",
    "Sentry",
  ],
};

export const contextSection = {
  title: "Contexte",
  paragraphs: [
    "Une compagnie de théâtre professionnelle diffusait ses spectacles, son agenda et sa revue de presse via des supports dispersés, sans moyen de les mettre à jour elle-même.",
    "Le besoin réel n'était pas un site vitrine : c'était un outil d'édition que l'équipe peut utiliser sans crainte de casser la page publique - spectacles, événements, presse, partenaires, médias, contenu de chaque section.",
  ],
  constraints: [
    "Équipe éditoriale non technique, avec des niveaux d'autorisation différents.",
    "Aucune administration système à assumer côté client : hébergement managé obligatoire (Vercel + Supabase Cloud).",
    "Collecte de données personnelles (contact, newsletter) donc obligations RGPD réelles.",
    "Accessibilité WCAG 2.2 niveau AA exigée sur le site public comme sur le back-office.",
    "Collaboration future avec un autre développeur : chaque choix devait rester maintenable et évolutif.",
  ],
};

export const architectureDecisions = [
  {
    title: "L'autorisation vit dans PostgreSQL, pas seulement dans l'application",
    decision:
      "Les droits d'accès sont exprimés en RLS PostgreSQL combinée aux GRANT sur les 36 tables, doublés de guards TypeScript côté serveur - sept couches de défense, du edge réseau jusqu'aux triggers d'audit.",
    why: [
      "Supabase expose la base via une API REST générée : une autorisation posée uniquement dans les handlers Next.js serait contournable en appelant l'API directement.",
      "Une règle oubliée dans un nouveau handler ne provoque plus de fuite de données : la base refuse la ligne.",
      "Les vues d'administration ont été passées en SECURITY INVOKER explicite avec un rôle propriétaire dédié, car le défaut PostgreSQL SECURITY DEFINER contournait justement les RLS.",
    ],
    tradeoff:
      "Le débogage est plus rude qu'avec des conditions en TypeScript, et chaque politique demande son propre test. Le coût est payé une fois, à l'écriture.",
  },
  {
    title: "Un modèle de rôles hiérarchique plutôt qu'une matrice de permissions",
    decision:
      "Trois rôles ordonnés - user(0) < editor(1) < admin(2) - évalués par les fonctions SQL has_min_role() et is_admin(), et par les guards requireMinRole() / requireBackofficeAccess() / requireAdminOnly() côté serveur.",
    why: [
      "Les besoins réels sont hiérarchiques : un admin peut tout ce que peut un editor. Une matrice permission par ressource aurait été du sur-design pour trois rôles.",
      "Un seul point de changement : protéger une nouvelle table revient à appeler has_min_role(), pas à étendre une grille de droits.",
      "Le rôle est porté par app_metadata du JWT - contrôlé serveur, non modifiable par le client - et rejoué en base par les politiques RLS : l'UI ne peut pas afficher plus que ce que la base autorise.",
    ],
    tradeoff:
      "Les deux couches doivent rester synchronisées, et un futur rôle transverse (un correcteur qui ne touche qu'à la presse) ne rentre pas dans l'ordre total : il imposera d'introduire des permissions nommées.",
  },
  {
    title: "Un schéma déclaratif versionné, jamais de modification via l'interface",
    decision:
      "Le dossier supabase/schemas/ est la source de vérité ; les migrations - 115 à ce jour - en sont générées et suivies en Git, puis appliquées par la CI. Le studio Supabase n'est utilisé qu'en lecture.",
    why: [
      "Un schéma modifié à la main n'est reproductible sur aucun autre environnement, et la divergence ne se découvre qu'en production.",
      "Une politique de sécurité est du code : elle doit passer par une revue de diff comme le reste, et une campagne d'audit de 17 rounds sur 73 objets n'aurait pas été traçable autrement.",
      "Recréer une base vierge pour les tests d'intégration et end-to-end devient une opération scriptée, pas un rituel manuel.",
    ],
    tradeoff:
      "Chaque correction, même triviale, coûte une migration. En contrepartie l'historique du schéma est lisible ligne à ligne.",
  },
];

export const measuredResults = [
  {
    label: "Validation JWT",
    value: "~300 ms → 2-5 ms",
    detail:
      "Chaque vérification d'authentification passait par getUser(), c'est-à-dire un aller-retour réseau vers Supabase, y compris dans le middleware. Le passage aux JWT Signing Keys asymétriques (ES256) permet à getClaims() de vérifier la signature localement : environ cent fois plus rapide, et une dépendance réseau de moins sur le chemin critique. getUser() reste utilisé quand le profil complet est nécessaire.",
  },
  {
    label: "Couverture RLS",
    value: "36 / 36 tables",
    detail:
      "Aucune table applicative n'est accessible sans politique explicite, et les 11 vues d'administration sont en SECURITY INVOKER. Les vérifications sont rejouées par la CI.",
  },
  {
    label: "Schéma",
    value: "36 tables · 115 migrations",
    detail:
      "Versioning applicatif sur 9 types d'entités, triggers d'audit immuables sur les tables sensibles, extensions pgcrypto, pg_trgm et unaccent.",
  },
  {
    label: "Couche d'accès aux données",
    value: "48 modules DAL · 26 schémas Zod",
    detail:
      "Modules server-only retournant un DALResult<T>, entrées et sorties validées par Zod, variables d'environnement typées et vérifiées au démarrage (T3 Env).",
  },
  {
    label: "Tests unitaires et d'intégration",
    value: "159 / 159 · 81 / 81",
    detail:
      "Vitest sur les unités critiques, plus 81 tests d'intégration ciblant les politiques RLS et le journal d'audit, la sécurité testée là où elle est écrite.",
  },
  {
    label: "Tests end-to-end",
    value: "Playwright multi-rôles",
    detail:
      "Parcours public, authentification et permissions validés par rôle (anonyme, user, editor, admin).",
  },
];

export const productScreens = {
  title: "Le produit en situation",
  intro:
    "Deux vues du back-office illustrent l'outil livré à l'équipe : l'administration quotidienne et le pilotage de l'activité.",
  items: [
    {
      title: "Back-office multi-rôles",
      description:
        "Le tableau de bord centralise les 14 sections éditoriales, la médiathèque, les comptes et le journal d'audit. La navigation et les actions disponibles s'adaptent au rôle connecté.",
      imagePath: "/Backoffice-Dashboard_compagnie-rouge-cardinal.fr.jpeg",
      width: 1905,
      height: 907,
      imageAlt:
        "Tableau de bord du back-office Rouge Cardinal avec navigation latérale, indicateurs de contenu et accès aux sections d'administration.",
    },
    {
      title: "Tableau de bord analytique",
      description:
        "Les métriques de trafic, pages populaires, opérations d'administration et incidents Sentry sont réunis dans une même vue pour suivre l'usage et la santé de la production.",
      imagePath: "/analytique_compagnie-rouge-cardinal.fr.jpeg",
      width: 1876,
      height: 935,
      imageAlt:
        "Tableau de bord analytique Rouge Cardinal présentant les pages populaires, l'activité d'administration et les erreurs de production Sentry.",
    },
  ],
};

export const securitySection = {
  title: "Sécurité",
  intro: "La sécurité est organisée en sept couches de défense en profondeur.",
  layers: [
    {
      step: "1",
      name: "Réseau",
      detail: "Vercel Edge, protection DDoS et terminaison SSL.",
    },
    {
      step: "2",
      name: "Middleware",
      detail: "Vérification du JWT via getClaims() en 2-5 ms, puis isRoleAtLeast().",
    },
    {
      step: "3",
      name: "Server Actions",
      detail: "Guards requireBackofficeAccess() / requireAdminOnly() et validation Zod.",
    },
    {
      step: "4",
      name: "RLS PostgreSQL",
      detail: "Politiques sur toutes les tables applicatives, adossées à has_min_role().",
    },
    {
      step: "5",
      name: "Fonctions base de données",
      detail: "Rétention RGPD en SECURITY DEFINER, avec search_path figé.",
    },
    {
      step: "6",
      name: "Storage RLS",
      detail: "Bucket medias public en lecture, sauvegardes réservées au service_role.",
    },
    {
      step: "7",
      name: "Audit et supervision",
      detail: "Triggers d'audit immuables et alertes Sentry sur les incidents P0/P1.",
    },
  ],
  roleModel: {
    title: "Modèle d'autorisation hiérarchique",
    body: "user (0) < editor (1) < admin (2) - fonction SQL has_min_role() doublée des guards TypeScript de lib/auth/roles.ts.",
  },
  principles: [
    "Zero trust",
    "Moindre privilège",
    "Défense en profondeur",
    "Auditabilité",
    "Fail-secure",
  ],
  headers: {
    title: "En-têtes de sécurité (OWASP A05)",
    items: [
      "Content-Security-Policy",
      "Strict-Transport-Security",
      "X-Frame-Options",
      "X-Content-Type-Options",
      "Referrer-Policy",
      "Permissions-Policy",
    ],
  },
};

export const qualitySection = [
  {
    title: "Tests",
    body: "Vitest pour les unités critiques (autorisation, validation, environnement) et pour les politiques RLS. Playwright rejoue les parcours sous chaque rôle : un droit trop large se voit comme un test rouge, pas comme un incident.",
  },
  {
    title: "Intégration continue",
    body: "GitHub Actions exécute lint, typecheck et tests à chaque push, déploie, sauvegarde la base chaque semaine et surveille la révocation des accès. Les migrations sont appliquées par la CI, jamais à la main.",
  },
  {
    title: "Observabilité",
    body: "Sentry instrumenté sur les trois runtimes (client, serveur, edge), health checks et analytics. Les erreurs de production remontent avec leur contexte utilisateur et leur trace serveur.",
  },
  {
    title: "RGPD et sécurité applicative",
    body: "Rétention automatisée par une Edge Function hebdomadaire, journal d'audit immuable, rate limiting sur les formulaires, en-têtes OWASP A05 (CSP, HSTS, X-Frame-Options, Referrer-Policy) et cookies httpOnly / secure / sameSite. Emails transactionnels via Resend et React Email.",
  },
];
