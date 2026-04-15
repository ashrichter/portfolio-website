import Navbar from "@/components/navbar";
import { getAllExperiences } from "@/lib/loadmd";

import HomePage from "@/components/homepage";
import ExperienceArray from "@/components/_homepage/expviewer";
import About from "@/components/_homepage/about";
import Skills from "@/components/_homepage/skills";
import Contact from "@/components/_homepage/contact";
import Socials from "@/components/_homepage/socials";

import { SocialLinks } from "@/types";
import scJson from "@/../_content/socials.json";
import Intro from "@/components/_homepage/intro";
import { DelayedSuspense } from "@/components/delayedsus";

export default function Home() {
  const exparr = getAllExperiences();
  const sociallinks: SocialLinks[] = scJson;

  const workArr = exparr.filter((exp) => exp.category === "work");
  const eduArr = exparr.filter((exp) => exp.category === "education");

  return (
    <main>
      <DelayedSuspense delay={0}>
        <Navbar to_path="/projects" name="Projects" />
        <HomePage
          sections={{
            home: <Intro />,
            about: <About />,
            skills: <Skills />,
            experience: <ExperienceArray workArr={workArr} eduArr={eduArr} />,
            contact: <Contact />,
          }}
        />
        <Socials socials={sociallinks} />
      </DelayedSuspense>
    </main>
  );
}