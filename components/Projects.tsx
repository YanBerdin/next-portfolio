"use client";

import Image from 'next/image'
import pilot from "../public/pilot.png";

export const Projects = () => {
  const projects = [
    {
      title: 'WF DESIGN & BUILD',
      description: 'Description du projet WF DESIGN & BUILD.',
      image: '/path/to/image.jpg',
      codeLink: 'https://github.com/user/project',
      liveLink: 'https://www.project-live-link.com'
    },
    // Ajoutez plus de projets ici...
  ]

  return (
    <>
      <section>
        <h2>My Recent Work</h2>
        {projects.map((project, index) => (
          <div key={index} className="project relative">
            <div className="project-image w-full h-full">
              <Image src={pilot} alt={project.title} width={500} height={300} />
            </div>
            <div className="project-details absolute w-full h-full flex flex-col justify-center align-center opacity-0" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.codeLink}>Code</a>
              <a href={project.liveLink}>View Project</a>
            </div>
          </div>
        ))}
        <a href="/archive">See more on Dribbble</a>
      </section>

      <section className="projets pb-2 m-0-auto w-full" id="projets">
        <h2>Projets récents</h2>
        <div className="projets-grid grid-col-1">
          <article className="grid-item item-1 relative grid-col-1 span-2">
              <Image src={pilot} alt="" />
                <div className="item-description absolute">
                  <h3>Titre du projet 1</h3>
                  <p>HTML, CSS & JS</p>
                </div>
            </article>
          <article className="grid-item item-2 relative grid-col-3 span-2">
            <Image src={pilot} alt="" />
              <div className="item-description absolute">
                <h3>Titre du projet 2</h3>
                <p>HTML, CSS & JS</p>
              </div>
          </article>
          <article className="grid-item item-3 relative">
            <Image src={pilot} alt="" />
              <div className="item-description absolute">
                <h3>Titre du projet 3</h3>
                <p>HTML, CSS & JS</p>
              </div>
          </article>
          <article className="grid-item item-4 relative">
            <Image src={pilot} alt=""/>
              <div className="item-description absolute">
                <h3>Titre du projet 4</h3>
                <p>HTML, CSS & JS</p>
              </div>
          </article>
          <article className="grid-item item-5 relative">
            <Image src={pilot} alt=""/>
              <div className="item-description absolute">
                <h3>Titre du projet 5</h3>
                <p>HTML, CSS & JS</p>
              </div>
          </article>
          <article className="grid-item item-6 relative">
            <Image src={pilot} alt=""/>
              <div className="item-description absolute">
                <h3>Titre du projet 6</h3>
                <p>HTML, CSS & JS</p>
              </div>
          </article>
        </div>
      </section>
    </>

  )

}
