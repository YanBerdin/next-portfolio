"use client"

import { Code, Minimize, Zap, Lock, Shield, Layers, Scale, FileCheck, FileText, TestTube } from "lucide-react"
import { motion } from "framer-motion"
import "@/app/web-dev-commandments.css"

export default function WebDevCommandments() {
  return (
    <div className="info">

      <motion.h2 className="heading mb-16 text-white-100 mt-16"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }} // whileInView=
        transition={{ duration: 0.6 }}
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

      <section className="commandments-container">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="icon-container">
                <Code className="icon" />
              </div>
              <h5 className="title">
                {/* 1. <br /> */} Lisibilité
              </h5>
              {/* <h6>Tu écriras</h6> */}
            </div>
            <div className="flip-card-back">
              <p className="title">Lisibilité</p>
              <p>Mon code doit être clair, structuré, avec des noms explicites, pour être compréhensible facilement par un autre dev.</p>
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="icon-container">
                <Minimize className="icon" />
              </div>
              <h5 className="title">
                {/*  2. <br /> */} Simplicité
              </h5>
              {/* <h6>Tu respecteras</h6> */}
            </div>
            <div className="flip-card-back">
              <p className="title">Simplicité</p>
              <p>Mon code doit éviter toute complexité inutile, en se concentrant uniquement sur l&apos;essentiel.</p>
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="icon-container">
                <Zap className="icon" />
              </div>
              <h5 className="title">
                {/*  3. <br /> */} Performance
              </h5>
              {/* <h6>Tu optimiseras</h6> */}
            </div>
            <div className="flip-card-back">
              <p className="title">Performance</p>
              <p>Mon code doit être efficace, en optimisant l’utilisation des ressources.</p>
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="icon-container">
                <Lock className="icon" />
              </div>
              <h5 className="title">
                {/*  4. <br /> */} Sécurité
              </h5>
              {/* <h6>Tu garantiras</h6> */}
            </div>
            <div className="flip-card-back">
              <p className="title">Sécurité</p>
              <p>Mon code doit protéger contre les vulnérabilités et garantir la sûreté des données et des interactions.</p>
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="icon-container">
                <Shield className="icon" />
              </div>
              <h5 className="title">
                {/*  5. <br /> */} Robustesse
              </h5>
              {/* <h6>Tu concevras</h6> */}
            </div>
            <div className="flip-card-back">
              <p className="title">Robustesse</p>
              <p>Mon code doit gérer les erreurs, valider les entrées, et garantir sa fiabilité.</p>
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="icon-container">
                <Layers className="icon" />
              </div>
              <h5 className="title">
                {/*  6. <br /> */} Modularité
              </h5>
              {/* <h6>Tu planifieras</h6> */}
            </div>
            <div className="flip-card-back">
              <p className="title">Modularité</p>
              <p>Mon code doit être organisé en parties indépendantes et réutilisables, chacune ayant une responsabilité claire.</p>
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="icon-container">
                <Scale className="icon" />
              </div>
              <h5 className="title">
                {/*  7. <br /> */} Scalabilité
              </h5>
              {/* <h6>Tu favoriseras</h6>  */}
            </div>
            <div className="flip-card-back">
              <p className="title">Scalabilité</p>
              <p>Mon code doit être conçu pour permettre des évolutions ou des ajouts sans nécessiter de réécrire l’ensemble.</p>
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="icon-container">
                <FileCheck className="icon" />
              </div>
              <h5 className="title">
                {/*  8. <br /> */} Conformité
              </h5>
              {/* <h6>Tu écriras</h6> */}
            </div>
            <div className="flip-card-back">
              <p className="title">Conformité</p>
              <p>Mon code doit respecter les standards et conventions de codage adoptés par la communauté ou l’équipe.</p>
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="icon-container">
                <FileText className="icon" />
              </div>
              <h5 className="title">
                {/*  9. <br />*/} Documentation
              </h5>
              {/* <h6>Tu maintiendras</h6> */}
            </div>
            <div className="flip-card-back">
              <p className="title">Documentation</p>
              <p>Mon code doit être accompagné d’instructions claires qui facilitent son utilisation, sa compréhension et sa maintenance.</p>
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="icon-container">
                <TestTube className="icon" />
              </div>
              <h5 className="title">
                {/* 10. <br /> */} Testabilité
              </h5>
              {/*  <h6>Tu privilégieras</h6> */}
            </div>
            <div className="flip-card-back">
              <p className="title">Testabilité</p>
              <p>Mon code doit être facilement testable, idéalement avec des tests automatisés qui assurent son bon fonctionnement.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
