
export const Repositories = [
    {
      id: 1,
      title: "DiscO'tech 💿",
      description: "🛠️ Technologies Utilisées : React | Redux | Axios | Interceptor | Rest API | PropTypes",
        explanationList: ["🎙️ Description : DiscO'tech, un hommage à l'école O’clock, est une application de référencement musical.",
        " ",
        "Les utilisateurs peuvent : Rechercher des artistes ou des albums, Explorer différents genres musicaux, Créer leurs propres playlists.",
        " ",
        "💡 Sécurisation de l'application :",
        "🔒 L’authentification, Le contrôle d’accès, L’intégrité des données, La confidentialité des données, La non-répudiation (envoi et réception de messages incontestables), La protection contre l’analyse du trafic",
        " ",
        "🚧 Défi : Gérer efficacement l'état global de l'application pour synchroniser les données entre les différents composants.",
        "✅ Utilisation Redux pour centraliser la gestion de l'état, ce qui a permis de synchroniser les données entre les composants de manière efficace.",
        " ",
        "🚧 Défi : Assurer la validation des données provenant des utilisateurs et du serveur pour éviter les erreurs et les comportements inattendus.",
        "✅ Utilisation de PropTypes pour valider les types de données dans les composants et mis en place d'une validation pour garantir l'intégrité des données, bien que les techniques de validation et d'échappement des données fournies par React protègent déjà l'application des attaques XSS (Cross Site Scripting).",
        " ",
        "🚧 Défi : Protéger l'application contre diverses vulnérabilités de sécurité.",
        " 🔒 Protection contre les attaques XSS par une double validation des données (côté client et serveur) et interdiction du stockage de Password et Login en clair dans le state.",
        " 🔒 Utilisation de tokens de synchronisation, aléatoires et à usage unique, pour sécuriser les formulaires et les méthodes d'écriture de données.",
        " 🔒 Configuration de CORS pour contrôler l'accès aux ressources.",
        " 🔒 Sécurisation de la connexion à l'API en utilisant des variables d'environnement (.env).",
        " 🔒 Implémentation d'une approche par token JWT pour l'authentification, avec utilisation d'interceptors Axios pour gérer automatiquement les tokens, évitant de passer l’id de l’utilisateur connecté.",
        " ",
        "🎯 Résultat : Implémentation des fonctionnalités utilisateur, sécurisation de l’application et optimisation pour le référencement et l’accessibilité. La gestion de l'état global avec Redux a permis de synchroniser efficacement les données avec le BackOffice.",
      ],
        className: "order-3 lg:order-2 lg:col-span-3 md:col-span-6 md:row-span-4 h-[13vh] h-auto md:min-h-[30vh] lg:min-h-[20vh] xl:min-h-[40vh]",
        imgClassName: "w-full h-full object-cover h-auto",
        titleClassName: "justify-end text-md md:text-lg lg:text-2xl",
        img: "/projectRefactor-assets/discotech-transp.png",
        alt:"illustrations des styles musicaux sur fond de palmiers au crépuscule",
        width: 320,
        height: 200,
        spareImg: "",
        demoLink: "https://discotech-git-master-yanberdins-projects.vercel.app/",
        githubLink: "https://github.com/YanBerdin/discOtech",
        technologies: ['Html', 'Css', 'JS', 'React', 'Redux', 'Axios', 'Interceptor', 'Rest API', 'PropTypes'],
    },
  
    {
      id: 2,
      title: "Github Explorer 🔎",
      description: "🛠️	Technologies Utilisées : React | Axios | Semantic UI | PropTypes | Sass",
      explanationList: [
        "🎙️ Description : Github Explorer permet de rechercher et d’explorer les dépôts GitHub..",
        "",
        "🚧 Défi : Développer une interface utilisateur responsive.",
        "✅ J'ai utilisé Semantic UI pour styliser les composants.",
        "",
        "🚧 Défi : Gérer efficacement l'affichage d'un grand nombre de résultats de l'API GitHub tout en maintenant de bonnes performances et une expérience utilisateur fluide.",
        "",
        " ✅ Requêtes API dynamiques : J'ai configuré les requêtes Axios pour inclure les paramètres de pagination (page et per_page) lors des appels à l'API GitHub, permettant de récupérer les données appropriées pour chaque page.",
        "",
        " ✅ Optimisation des performances : J'ai utilisé useEffect pour déclencher de nouvelles requêtes API uniquement lorsque la page actuelle change, évitant ainsi des appels API inutiles.",
        "",
        " ✅ Pagination : J'ai mis en place un système de pagination pour gérer efficacement un grand nombre de résultats..",
        "",
        " ✅ Gestion du chargement : J'ai implémenté un indicateur de chargement pour informer l'utilisateur lorsque de nouvelles données sont en cours de récupération.",
        "",
        " ✅ Gestion des erreurs : J'ai mis en place un système de gestion des erreurs pour afficher des messages appropriés en cas de problème avec l'API.",
        "",
        "🚧 Défi : Valider les types de données dans les composants.",
        "✅ J'ai utilisé PropTypes pour valider les types.",
        "",
        "🔒 La sécurité de l'application contre les attaques XSS (Cross Site Scripting) est garantie grâce aux techniques de validation et d'échappement des données fournies par React.",
        "🔒 Côté serveur, c’est l’API de Github qui se charge de valider l’intégrité des données reçues et empêcher l'injection de scripts malveillants.",
        "",
        "🎯 Résultat : Interface dynamique et responsive. Les utilisateurs peuvent rechercher des dépôts, afficher les informations essentielles et accéder directement aux dépôts sur GitHub."
      ],
      className: "",
      imgClassName: " absolute h-auto",
      titleClassName: "text-md md:text-lg lg:text-2xl justify-start h-auto",
      img: "/projectRefactor-assets/github-explorer.png",
      alt: "Page d'acceuil avec grille d'affichage des repositories GitHub",
      width: 320,
      height: 200,
      spareImg:"",
      demoLink:"https://new-react-github-explorer.vercel.app/",
      githubLink:"https://github.com/YanBerdin/create-react-github-explorer",
      technologies: ['Html', 'Css', 'JS', 'React', 'Axios', 'Semantic UI', 'Sass'],
    },
  
    {
      id: 3,
      title: "Shoes-Shop 👠",
      description: "🛠️	Technologies Utilisées : PHP | Apache | Singleton | Active Record | Composer | Bootstrap | Html | CSS",
      explanationList: [ " ",
      "🎙️ Description : Site e-commerce de vente de chaussures",
      " ",
      "⚓ Navigation principale :",
      "Accueil | Catégories | Types de produits | Marques | Catalogue",
      " ",
      "🏠 Page d'accueil avec 5 catégories mises en avant, Page du détail d'un produit, Page des produits + pagination pour chaque catégorie / type / marque.",
      " ",
      "🚧 Défi : Implémenter une architecture MVC pour un projet e-commerce.",
      "✅ J'ai mis en place une structure modulaire avec des classes abstraites et l'utilisation de namespaces pour une meilleure organisation du code.",
      " ",
      "🚧 Défi : Assurer la protection des informations sensibles des utilisateurs.",
      "🔒 Solution : J'ai implémenté un système d'encryptage des données utilisateur et mis en place des jetons de synchronisation à usage unique, dont l’accès est protégé par CORS, pour sécuriser les méthodes d'écriture de données.",
      " ",
      "🚧 Défi : Mettre en place un système d'authentification et de gestion des permissions.",
      "🔒 Solution : J'ai développé un système de rôles et de permissions, en utilisant des sessions sécurisées et en implémentant des contrôles d'accès sur chaque route sensible.",
      " ",
      "🚧 Défi : Sécuriser l'application contre les injections SQL, XSS et CSRF.",
      "🔒 Solution : J'ai mis en place des pratiques de codage sécurisé, notamment l'utilisation de requêtes préparées, l'échappement des données utilisateur et l'implémentation de tokens CSRF.",
      " ",
      "🎯 Résultat : Navigation facile entre les catégories, les types de produits et les marques. Le BackOffice offre une gestion efficace des données. Les mesures de sécurité mises en place ont renforcé la fiabilité de l’application. De plus, j'ai amélioré mes compétences en développement PHP, en architecture logicielle et en sécurité web."],
      className: "order-5 lg:order-4 md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 sm:right-3 md:right-5 bottom-0 sm:bottom-1 md:bottom-4 lg:bottom-5 sm:w-40 md:w-3/6 w-32 lg:right-10 xl:right-1 xl:-bottom-1 h-auto max-h-15vh",
      titleClassName: "text-md md:text-lg lg:text-2xl justify-center md:justify-start ",
      img: "/projectRefactor-assets/oshop-front1.png",
      alt:"page d'acceuil du site avec 3 chaussures en gros plan",
      width: 220,
      height: 100,
      spareImg: "",
      demoLink: "", //TODO Deployer
      githubLink: "https://github.com/YanBerdin/shoes-shop-frontoffice-php",
      technologies: ['Html', 'Css', 'JS', 'PHP', 'Composer', 'Bootstrap', 'Apache', 'Singleton', 'Active Record'],
    },
    
    {
      id: 4,
      title: "Shoes BackOffice 👠",
      description: "🛠️	Technologies Utilisées : PHP | MySQL | Apache | Singleton | Active Record | Composer | Bootstrap | Html | Css",
      explanationList: [ " ",
      "🎙️ Description : BackOffice du Site e-commerce de vente de chaussures Shoes-Shop .",
      " ",
      "🏭 Navigation principale du BackOffice :",
      "Accueil | Catégories | Types de produits | Marques | Tags | Login",
      " ",
      "🏠 Page d'accueil avec la liste des produits + liste des catégories.",
      " ",
      " Gestion des catégories / produits / types / marques / tags présentés en page d'accueil, accès autorisé aux rôles Admin et catalog manager.",
      " ",
      "Gestion des utilisateurs du back-office et modification du statut des commandes, accès autorisé au rôle Admin exclusivement.",
      " ",
      "🚧 Défi : Implémenter une architecture MVC pour un projet e-commerce.",
      "✅ J'ai mis en place une structure modulaire avec des classes abstraites et l'utilisation de namespaces pour une meilleure organisation du code.",
      " ",
      "🚧 Défi : Assurer la protection des informations sensibles des utilisateurs.",
      "🔒 Solution : J'ai implémenté un système d'encryptage des données utilisateur et mis en place des jetons de synchronisation à usage unique, dont l’accès est protégé par CORS, pour sécuriser les méthodes d'écriture de données.",
      " ",
      "🚧 Défi : Mettre en place un système d'authentification et de gestion des permissions.",
      "🔒 Solution : J'ai développé un système de rôles et de permissions, en utilisant des sessions sécurisées et en implémentant des contrôles d'accès sur chaque route sensible.",
      " ",
      "🚧 Défi : Sécuriser l'application contre les injections SQL, XSS et CSRF.",
      "🔒 Solution : J'ai mis en place des pratiques de codage sécurisé, notamment l'utilisation de requêtes préparées, l'échappement des données utilisateur et l'implémentation de tokens CSRF.",
      " ",
      "🎯 Résultat : Navigation facile entre les catégories, les types de produits et les marques. Le BackOffice offre une gestion efficace des données. Les mesures de sécurité mises en place ont renforcé la fiabilité de l’application. De plus, j'ai amélioré mes compétences en développement PHP, en architecture logicielle et en sécurité web."],
      className: "order-5 lg:order-4 md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 sm:right-3 md:right-5 bottom-0 sm:bottom-1 md:bottom-4 lg:bottom-5 sm:w-40 md:w-3/6 w-32 lg:right-10 xl:right-1 xl:-bottom-1 h-auto max-h-15vh",
      titleClassName: "text-md md:text-lg lg:text-2xl justify-center md:justify-start ",
      img: "/projectRefactor-assets/oshop-back2.png",
      alt:"page d'acceuil du site avec 3 chaussures en gros plan",
      width: 220,
      height: 100,
      spareImg: "",
      demoLink: "", //TODO Deployer
      githubLink: "https://github.com/YanBerdin/shoes-shop-backoffice-php",
      technologies: ['Html', 'Css', 'PHP', 'MySQL', 'Composer', 'Bootstrap', 'Apache', 'Singleton', 'Active Record'],
    },

    {
      id: 5,
      title: "My Portfolio 📁",
      description: "🛠️	Technologies Utilisées : Typescript | React | Next | Tailwind | Framer-Motion | Axios | PostCss | Shadcn | Aceternity | JS",
      explanationList: [
        "🎙️ Description : Portfolio personnel pour présenter mes projets et compétences.",
        "",
        "🚧 Défi : Créer un design moderne et responsive.",
        "✅ J'ai utilisé Tailwind CSS et Aceternity pour styliser les composants.",
        "",
        "🚧 Défi : Optimiser le référencement et l'accessibilité.",
        "✅ J'ai ajouté des balises sémantiques et des attributs ARIA pour améliorer l'accessibilité et l'indexation par les moteurs de recherche.",
        "",
        "🚧 Défi : Créer une interface utilisateur intuitive et interactive.",
        "✅ J'ai utilisé Framer Motion pour ajouter des animations fluides et interactives.",
        "",
        "🎯 Résultat : Portfolio moderne, responsive et interactif. Les visiteurs peuvent naviguer facilement entre les différentes sections et découvrir mes projets et compétences de manière intuitive."
      ],
      className: "order-2 lg:order-3 lg:col-span-3 md:col-span-3 md:row-span-2",
      imgClassName: "absolute left-0 sm:left-3 md:left-5 bottom-0 sm:bottom-1 md:bottom-4 lg:bottom-5 sm:w-40 md:w-3/6 w-32 lg:left-10 xl:left-1 xl:-bottom-1 h-auto max-h-15vh",
      titleClassName: "text-md md:text-lg lg:text-2xl justify-center md:justify-start",
      img: "/projectRefactor-assets/portfolio.png",
      alt:"page d'acceuil du site avec 3 chaussures en gros plan",
      width: 220,
      height: 100,
      spareImg: "",
      demoLink: "https://www.yanberdin.com",
      githubLink: "https://github.com/YanBerdin/next-portfolio",
      technologies: ['Html', 'Css', 'JS', 'React', 'Next', 'Tailwind', 'Typescript', 'Framer-Motion', 'Axios', 'PostCss'],
    },
   
    {
      id: 6,
      title: "Pokedex MVC 📚",
      description: "🛠️ Technologies Utilisées Apache | PHP | MySQL | Html | Css | Composer | AltoRouter | Bootstrap",
      explanationList: [
          "🎙️ Description : Cette application est un Pokédex interactif développé à des fins éducatives.",
          " ",
          "Les utilisateurs peuvent : Consulter une liste de Pokémon, Voir les détails de chaque Pokémon, y compris leurs types et statistiques, Filtrer les Pokémon par type.",
          " ",
          "💡 Sécurisation de l'application :",
          "🔒 Validation des Entrées, Préparation des Requêtes SQL, Gestion des Erreurs, Contrôles d'Accès",
          " ",
          "🚧 Défi : Gestion des Routes.",
          "✅ Utilisation d'AltoRouter pour une navigation fluide et une maintenance facile.",
          " ",
          "🚧 Défi : Affichage Dynamique des Données.",
          "✅ Utilisation de PHP pour générer dynamiquement les pages en fonction des données de la base de données.",
          " ",
          "🚧 Défi : Sécurité des Données.",
          "✅ Mise en place de requêtes préparées et de validations d'entrée pour sécuriser les interactions avec la base de données.",
          " ",
          "🚧 Défi : Design Responsive.",
          "✅ Intégration de Bootstrap pour assurer que l'application soit responsive et utilisable sur différents appareils.",
          " ",
          "🎯 Résultat : L'application permet aux utilisateurs de consulter une liste complète de Pokémon, voir les détails de chaque Pokémon, y compris leurs types et statistiques, filtrer les Pokémon par type, et naviguer facilement grâce à une interface utilisateur intuitive et responsive. Les mesures de sécurité mises en place assurent que l'application est robuste contre les attaques courantes, offrant ainsi une expérience utilisateur sécurisée et fiable."
      ],
      className: "order-3 lg:order-2 lg:col-span-3 md:col-span-6 md:row-span-4 h-[13vh] h-auto md:min-h-[30vh] lg:min-h-[20vh] xl:min-h-[40vh]",
      imgClassName: "w-full h-full object-cover h-auto",
      titleClassName: "justify-end text-md md:text-lg lg:text-2xl",
      img: "/projectRefactor-assets/pokedex.png",
      alt: "illustration de l'application Pokedex",
      width: 320,
      height: 200,
      spareImg: "",
      demoLink: "", //TODO A Deployer
      githubLink: "https://github.com/YanBerdin/Pokedex-php-yanberdin",
      technologies: ['Apache', 'PHP', 'MySQL', 'Html', 'Css', 'Composer', 'AltoRouter', 'Bootstrap']
    },

    {
      id:7,
      title: "Spotify Controller 🎵",
      description: "🛠️ Technologies Utilisées : React | Vite | Axios | Styled-components",
      explanationList: [
          "🎙️ Description : En construction ! SpotifyController est une application web qui permet aux utilisateurs de se connecter à leur compte Spotify, de visualiser leurs playlists, de lire des morceaux, et de gérer la lecture (lecture/pause, piste suivante/précédente).",
          " ",
          "Les utilisateurs peuvent : Se connecter à leur compte Spotify, Visualiser leurs playlists, Lire des morceaux, Gérer la lecture (lecture/pause, piste suivante/précédente).",
          " ",
          "💡 La sécurisation de l'application :",
          "🔒 Authentification OAuth, Gestion des Tokens, Sanitization des Entrées",
          " ",
          "🚧 Défi : Gestion des Tokens Expirés.",
          "✅ Implémentation de la gestion des erreurs pour détecter les tokens expirés et rediriger l'utilisateur vers la page de connexion.",
          " ",
          "🚧 Défi : Récupération des Données en Temps Réel.",
          "✅ Utilisation de `useEffect` pour récupérer les données de l'utilisateur et l'état de lecture en temps réel.",
          " ",
          "🚧 Défi : Gestion des Erreurs.",
          "✅ Utilisation d'un contexte de notification pour afficher des messages d'erreur à l'utilisateur de manière cohérente.",
          " ",
          "🚧 Défi : Performance.",
          "✅ Utilisation de `useCallback` pour optimiser les fonctions et éviter les rendus inutiles.",
          " ",
          "🚧 Défi : Maîtriser l'utilisation des styles-components",
          "✅ Utilisation de Styled-components pour styliser les composants de manière dynamique et réutilisable.",
          " ",
          "🎯 Résultat : L'application Soundify permet aux utilisateurs de se connecter à leur compte Spotify, de visualiser et de gérer leurs playlists, et de contrôler la lecture de la musique. Les utilisateurs peuvent voir les informations de leur compte, les playlists disponibles, et contrôler la lecture directement depuis l'application."
      ],
      className: "order-3 lg:order-2 lg:col-span-3 md:col-span-6 md:row-span-4 h-[13vh] h-auto md:min-h-[30vh] lg:min-h-[20vh] xl:min-h-[40vh]",
      imgClassName: "w-full h-full object-cover h-auto",
      titleClassName: "justify-end text-md md:text-lg lg:text-2xl",
      img: "/projectRefactor-assets/spotify-cont.png",
      alt: "illustration de l'application Spotify-Controller",
      width: 320,
      height: 200,
      spareImg: "",
      demoLink: "", //TODO Deployer
      githubLink: "https://github.com/YanBerdin/spotify-controller",
      technologies: ['Html', 'Css', 'JS', 'React', 'Vite', 'Axios', 'Styled-components']
    },

    {
      id: 8,
      title: "Weather Widget 🌦️",
      description: "🛠️	Technologies Utilisées : React | Axios | JS | Sass | PropTypes",
      explanationList: [
        "🎙️ Description : L'application présente 2 'Widgets Meteo' qui affichent les informations météorologiques actuelles. l'un par saisie de code postal, l'autre par géolocalisation",
        "💡 Sécurisation de l'application :",
        "🔒 Validation des Entrées, Requêtes API sécurisées, Gestion des Erreurs, Optimisation des Performances",
        "",
        "🚧 Défi : Requêtes API et gestion des erreurs.",
        "✅ Utilisation d'Axios pour effectuer les requêtes HTTP et gestion des erreurs avec des blocs `try-catch` et des messages d'alerte.",
        "",
        "🚧 Défi : Créer un design moderne et responsive.",
        "✅ J'ai utilisé Tailwind CSS pour styliser les composants.",
        "",
        "🚧 Défi : Optimiser le référencement et l'accessibilité." ,
        "✅ J'ai ajouté des balises sémantiques et des attributs ARIA pour améliorer l'accessibilité et l'indexation par les moteurs de recherche.",
        "",
        "🚧 Défi : Géolocalisation de l'utilisateur.",
        "✅ Utilisation de l'API de géolocalisation du navigateur pour obtenir les coordonnées de latitude et de longitude. En cas d'échec, afficher un message d'erreur approprié.",
        "",
        "🚧 Défi : Optimisation des performances.",
        "✅ Utilisation de hooks React comme `useState` et `useEffect` pour gérer l'état et les effets de manière efficace. Mémorisation des fonctions avec `useCallback` pour éviter les re-renders inutiles.",
        " ",
        "🎯 Résultat : Widget météo moderne, responsive et interactif. Les visiteurs peuvent consulter les prévisions météo actuelles et à venir de manière intuitive."
      ],
      className: "order-2 lg:order-3 lg:col-span-3 md:col-span-3 md:row-span-2",
      imgClassName: "absolute left-0 sm:left-3 md:left-5 bottom-0 sm:bottom-1 md:bottom-4 lg:bottom-5 sm:w-40 md:w-3/6 w-32 lg:left-10 xl:left-1 xl:-bottom-1 h-auto max-h-15vh",
      titleClassName: "text-md md:text-lg lg:text-2xl justify-center md:justify-start",
      img: "/projectRefactor-assets/meteo-widget.png",
      alt:"page d'acceuil du site avec 3 chaussures en gros plan",
      width: 220,
      height: 100,
      spareImg: "",
      demoLink: "https://yanberdin.github.io/React_Widget_Meteo/",
      githubLink: "https://github.com/YanBerdin/React_Widget_Meteo",
      technologies: ['Html', 'Css', 'JS', 'React', 'Axios', 'Sass'],
    }, 

    {
      id: 9,
      title: "Text to Speech 🎤",
      description: "🛠️ Technologies Utilisées : HTML | Css | JavaScript | API SpeechSynthesis | DOMPurify",
      explanationList: [
        "🎙️ Description : L'application 'Audio API Text to Speech' permet de convertir du texte en parole en utilisant l'API SpeechSynthesis.",
        " ",
        "Les utilisateurs peuvent : Entrer du texte, Choisir une voix, Ajuster le pitch et la vitesse, Écouter le texte lu à haute voix.",
        " ",
        "💡 Sécurisation de l'application :",
        "🔒 Validation des Entrées, Assainissement des Entrées, Utilisation de `defer` pour les Scripts, HTTPS",
        " ",
        "🚧 Défi : Sélection de la voix par défaut.",
        "✅ Implémentation d'une logique pour sélectionner automatiquement la voix par défaut ou une voix alternative si la voix par défaut n'est pas disponible.",
        " ",
        "🚧 Défi : Compatibilité multi-navigateurs.",
        "✅ Utilisation de l'API SpeechSynthesis, qui est supportée par les principaux navigateurs.",
        " ",
        "🚧 Défi : Sécurité des entrées utilisateur.",
        "✅ Utilisation de DOMPurify pour assainir les entrées utilisateur et prévenir les attaques XSS.",
        " ",
        "🎯 Résultat : L'application permet aux utilisateurs de convertir du texte en parole de manière intuitive et personnalisée. Elle offre une interface utilisateur simple et des options de personnalisation pour la voix, le pitch et la vitesse, tout en étant compatible avec plusieurs navigateurs et langues."
      ],
      className: "order-3 lg:order-2 lg:col-span-3 md:col-span-6 md:row-span-4 h-[13vh] h-auto md:min-h-[30vh] lg:min-h-[20vh] xl:min-h-[40vh]",
      imgClassName: "w-full h-full object-cover h-auto",
      titleClassName: "justify-end text-md md:text-lg lg:text-2xl",
      img: "/projectRefactor-assets/textToSpeech.png",
      alt: "illustration de l'application Audio API Text to Speech",
      width: 320,
      height: 200,
      spareImg: "",
      demoLink: "https://yanberdin.github.io/text_to_speech_web_app",
      githubLink: "https://github.com/YanBerdin/text_to_speech_web_app",
      technologies: ['Html', 'Css', 'JS']
    },

    {
      id: 10,
      title: "Soundpad-js-vanilla 🎧",
      description: "🛠️ Technologies Utilisées : HTML | CSS | JavaScript | Web Audio API",
      explanationList: [
          "🎙️ Description : L'application est une table de mixage sonore interactive qui permet aux utilisateurs de jouer différents sons en cliquant sur des pads ou en utilisant des raccourcis clavier.",
          " ",
          "🚧 Défi : Gestion des Événements.",
          "✅ Utilisation de `addEventListener` pour attacher des gestionnaires d'événements aux pads et au document pour les événements de clavier.",
          " ",
          "🚧 Défi : Préchargement des Fichiers Audio.",
          "✅ Utilisation de la méthode `preloadSamples` pour initialiser et précharger les fichiers audio dès le chargement de la page.",
          " ",
          "🚧 Défi : Synchronisation des Interactions.",
          "✅ Implémentation de gestionnaires d'événements pour les touches `keydown` et `keyup` afin de simuler les clics et gérer les états visuels des pads.",
          " ",
          "🚧 Défi : Expérience Utilisateur.",
          "✅ Utilisation de CSS pour styliser les pads et ajouter des effets visuels lors des interactions.",
          " ",
          "🎯 Résultat : L'application permet aux utilisateurs de jouer différents sons en temps réel avec une interface utilisateur réactive et visuellement attrayante. Les interactions clavier et souris sont synchronisées pour une expérience utilisateur fluide et agréable."
      ],
      className: "order-3 lg:order-2 lg:col-span-3 md:col-span-6 md:row-span-4 h-[13vh] h-auto md:min-h-[30vh] lg:min-h-[20vh] xl:min-h-[40vh]",
      imgClassName: "w-full h-full object-cover h-auto",
      titleClassName: "justify-end text-md md:text-lg lg:text-2xl",
      img: "/projectRefactor-assets/sound-pad.png",
      alt: "illustration de l'application Table de Mixage Sonore",
      width: 320,
      height: 200,
      spareImg: "",
      demoLink: "https://yanberdin.github.io/soundpad-js-vanilla",
      githubLink: "https://github.com/YanBerdin/soundpad-js-vanilla",
      technologies: ['Html', 'Css', 'JS']
    },

    {
    id: 11,
    title: "Task-Manager 📝",
    description: "🛠️ Technologies Utilisées : HTML | CSS | JS | Laravel | PHP | Eloquent | MySQL | Rest API",
    explanationList: [
        "🎙️ Description : L'application permet aux utilisateurs de créer, gérer et suivre leurs tâches quotidiennes.",
        " ",
        "Les utilisateurs peuvent : Ajouter de nouvelles tâches, Les marquer comme complètes, Les supprimer si nécessaire.",
        " ",
        "💡 Sécurisation de l'application :",
        "🔒 Gestion de l'état des tâches, Performance de la base de données, Interface utilisateur intuitive",
        " ",
        "🚧 Défi : Gestion de l'état des tâches.",
        "✅ Utilisation des API RESTful de Laravel pour mettre à jour l'état des tâches en temps réel et AJAX pour les notifications en direct.",
        " ",
        "🚧 Défi : Performance de la base de données.",
        "✅ Indexation des champs fréquemment recherchés dans MariaDB et utilisation de requêtes optimisées.",
        " ",
        "🚧 Défi : Interface utilisateur intuitive.",
        "✅ Utilisation de frameworks CSS comme Bootstrap pour une mise en page réactive et des composants UI réutilisables.",
        " ",
        "🎯 Résultat : L'application permet aux utilisateurs de gérer leurs tâches de manière efficace et intuitive. Les utilisateurs peuvent ajouter, modifier, marquer comme complètes et supprimer des tâches avec une interface réactive et des mises à jour en temps réel. Les performances de l'application sont optimisées pour gérer un grand nombre de tâches sans compromettre la vitesse ou la réactivité."
    ],
    className: "order-3 lg:order-2 lg:col-span-3 md:col-span-6 md:row-span-4 h-[13vh] h-auto md:min-h-[30vh] lg:min-h-[20vh] xl:min-h-[40vh]",
    imgClassName: "w-full h-full object-cover h-auto",
    titleClassName: "justify-end text-md md:text-lg lg:text-2xl",
    img: "/projectRefactor-assets/task-manager.png",
    alt: "illustration de l'application Task-Manager",
    width: 320,
    height: 200,
    spareImg: "",
    demoLink: "", //TODO Deployer
    githubLink: "https://github.com/YanBerdin/Laravel-Vanilla_JS-Task_Manager",
    technologies: ['Html', 'Css', 'PHP', 'Laravel', 'Eloquent', 'MySQL', 'Rest API','JS']
    },

    {
    id: 12,
    title: "Script Runner 🏃",
    description: "🛠️ Technologies Utilisées : HTML | CSS | JavaScript | DOMPurify",
    explanationList: [
        "🎙️ Description : Script Runner est un jeu de programmation qui permet aux utilisateurs de s'initier à la programmation en s'amusant.",
        " ",
        "Les utilisateurs peuvent : Déplacer un curseur rouge sur une grille, de la case 'Start' à la case 'End', en utilisant trois instructions : Turn Left, Turn Right, Move Forward.",
        " ",
        "💡 Sécurisation de l'application :",
        "🔒 Validation des Entrées, Assainissement des Entrées, En-têtes de Sécurité (CSP, X-Content-Type-Options, HSTS)",
        " ",
        "🚧 Défi : Créer un interpréteur pour un langage simple avec seulement trois instructions.",
        "✅ Utilisation de la méthode `trim()` pour nettoyer les entrées utilisateur et d'une boucle pour traiter chaque ligne de code une par une.",
        " ",
        "🚧 Défi : Assurer une performance fluide lors de l'exécution des instructions.",
        "✅ Utilisation de `window.setTimeout()` pour introduire des délais entre les instructions, permettant une exécution fluide et visible.",
        " ",
        "🚧 Défi : Gérer les erreurs de syntaxe et les instructions invalides.",
        "✅ Implémentation de messages d'erreur clairs et d'une validation des entrées utilisateur avant l'exécution.",
        " ",
        "🚧 Défi : Mettre à jour dynamiquement la grille en fonction des instructions exécutées.",
        "✅ Utilisation de JavaScript pour manipuler le DOM et mettre à jour les classes CSS des cellules de la grille.",
        " ",
        "🚧 Défi : Implémenter une fonctionnalité pour positionner aléatoirement le point de départ et d'arrivée sur la grille.",
        "✅ Décommenter et activer le code existant pour générer des positions aléatoires.",
        " ",
        "🎯 Résultat : L'application permet aux utilisateurs de saisir des instructions dans une zone de texte et de voir le curseur se déplacer sur la grille en fonction de ces instructions. Les utilisateurs peuvent réinitialiser le jeu à tout moment et recevoir des messages d'erreur en cas d'instructions invalides. L'application est sécurisée contre les attaques XSS grâce à l'utilisation de DOMPurify. De plus, les points de départ et d'arrivée peuvent être positionnés aléatoirement, ajoutant ainsi une dimension supplémentaire au jeu."
    ],
    className: "order-3 lg:order-2 lg:col-span-3 md:col-span-6 md:row-span-4 h-[13vh] h-auto md:min-h-[30vh] lg:min-h-[20vh] xl:min-h-[40vh]",
    imgClassName: "w-full h-full object-cover h-auto",
    titleClassName: "justify-end text-md md:text-lg lg:text-2xl",
    img: "/projectRefactor-assets/script-runner-game.png",
    alt: "illustration du jeu Script Runner",
    width: 320,
    height: 200,
    spareImg: "",
    demoLink: "https://yanberdin.github.io/script-runner-game-js",
    githubLink: "https://github.com/YanBerdin/script-runner-game-js",
    technologies: ['Html', 'Css', 'JS']
    },

];
  