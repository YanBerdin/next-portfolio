import { mySkills } from "@/data/index";

export const Skills = () => {
  return (
    <section aria-labelledby="stack-titre" className="mx-auto w-11/12 max-w-6xl">
      <h2
        id="stack-titre"
        className="heading text-3xl font-bold text-white-100 md:text-4xl"
      >
        Stack technique
      </h2>
      <p className="mt-3 max-w-2xl text-base text-slate-400">
        Classée selon ce que j&apos;ai réellement livré, pas selon ce que j&apos;ai croisé.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {mySkills.map((level) => (
          <article
            key={level.id}
            className="rounded-lg border border-slate-800 bg-slate-900/40 p-6"
          >
            <h3 className="text-lg font-semibold text-white-100">{level.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{level.desc}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {level.skillsList.map((skill) => (
                <li
                  key={skill}
                  className="rounded border border-slate-700 px-2.5 py-1 text-sm text-slate-300"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};
