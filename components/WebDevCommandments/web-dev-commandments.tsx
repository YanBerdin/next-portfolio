"use client"

import { Code, Minimize, Zap, Lock, Shield, Layers, Scale, FileCheck, FileText, TestTube } from "lucide-react"
import { motion } from "framer-motion"
import "@/app/web-dev-commandments.css"
import "@/app/accessibility-cards.css"
import { useState } from "react"

export default function WebDevCommandments() {
  // État pour suivre la carte active (retournée)
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Gestionnaire pour les événements clavier et clic
  const handleCardInteraction = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>, index: number) => {
    // Si c'est un événement clavier, on vérifie que c'est Enter ou Espace
    if ('key' in e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveCard(activeCard === index ? null : index);
      }
    } else {
      // Si c'est un événement clic
      setActiveCard(activeCard === index ? null : index);
    }
  };

  // Données des commandements
  const commandements = [
    {
      id: 1,
      title: "Lisibilité",
      icon: <Code className="icon" />,
      description: "Mon code doit être clair, structuré, avec des noms explicites, pour être compréhensible facilement par un autre dev."
    },
    {
      id: 2,
      title: "Simplicité",
      icon: <Minimize className="icon" />,
      description: "Mon code doit éviter toute complexité inutile, en se concentrant uniquement sur l'essentiel."
    },
    {
      id: 3,
      title: "Performance",
      icon: <Zap className="icon" />,
      description: "Mon code doit être efficace, en optimisant l'utilisation des ressources."
    },
    {
      id: 4,
      title: "Sécurité",
      icon: <Lock className="icon" />,
      description: "Mon code doit protéger contre les vulnérabilités et garantir la sûreté des données et des interactions."
    },
    {
      id: 5,
      title: "Robustesse",
      icon: <Shield className="icon" />,
      description: "Mon code doit gérer les erreurs, valider les entrées, et garantir sa fiabilité."
    },
    {
      id: 6,
      title: "Modularité",
      icon: <Layers className="icon" />,
      description: "Mon code doit être organisé en parties indépendantes et réutilisables, chacune ayant une responsabilité claire."
    },
    {
      id: 7,
      title: "Scalabilité",
      icon: <Scale className="icon" />,
      description: "Mon code doit être conçu pour permettre des évolutions ou des ajouts sans nécessiter de réécrire l'ensemble."
    },
    {
      id: 8,
      title: "Conformité",
      icon: <FileCheck className="icon" />,
      description: "Mon code doit respecter les standards et conventions de codage adoptés par la communauté ou l'équipe."
    },
    {
      id: 9,
      title: "Documentation",
      icon: <FileText className="icon" />,
      description: "Mon code doit être accompagné d'instructions claires qui facilitent sa compréhension et sa maintenance."
    },
    {
      id: 10,
      title: "Testabilité",
      icon: <TestTube className="icon" />,
      description: "Mon code doit être facilement testable, idéalement avec des tests automatisés qui assurent son bon fonctionnement."
    }
  ];

  return (
    <div className="info">
      <motion.h2
        className="heading mb-16 text-white-100 mt-16"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        aria-label="Les 10 commandements du développeur web"
      >
        Les
        <span className="heading bg-gradient-to-b from-[#9f96f5]  to-[#6c47d2] text-transparent bg-clip-text edge:text-purple">
          {" "}
          10 commandements
          {" "}
        </span>
        du{" "}
        <span className="heading inline bg-gradient-to-r from-[#cf96f5]  to-[#8f47d2] text-transparent bg-clip-text edge:text-purple">
          développeur web
        </span>
      </motion.h2>

      <motion.div className=" w-11/12 bg-slate-900/[0.9] border border-slate-800 backdrop-blur-xl rounded-lg text-slate-100 p-8 md:p-14 mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.section
          className="commandments-container"
          role="list"
          aria-label="Liste des 10 commandements du développeur web"
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {commandements.map((item, index) => (
            <div
              className="flip-card"
              role="listitem"
              key={`commandment-${item.id}`}
            >
              <div
                className={`flip-card-inner ${activeCard === index ? 'flipped' : ''}`}
                tabIndex={0}
                aria-label={`Carte de la ${item.title}, ${activeCard === index ? 'actuellement retournée' : 'cliquez ou appuyez sur Entrée pour voir la description'}`}
                aria-expanded={activeCard === index ? "true" : "false"}
                aria-controls={`card-content-${item.id}`}
                onKeyDown={(e) => handleCardInteraction(e, index)}
                onClick={(e) => handleCardInteraction(e, index)}
              >
                <div className="flip-card-front">
                  <div className="icon-container" aria-hidden="true">
                    {item.icon}
                  </div>
                  <h5 className="title max-sm:text-xl text-2xl" id={`card-title-${item.id}`}>
                    {item.title}
                  </h5>
                </div>
                <div
                  className="flip-card-back"
                  id={`card-content-${item.id}`}
                  aria-labelledby={`card-title-${item.id}`}
                >
                  {/*<p className="title text-md md:text-lg lg:text-xl">{item.title}</p>*/}
                  <p className="text-white-100 text-sm md:text-md xl:text-lg">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.section>
      </motion.div>
    </div>
  )
}
