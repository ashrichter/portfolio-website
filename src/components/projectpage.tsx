'use client';

import { Project } from "@/types";
import { useCallback, useEffect, useState } from "react";
import styles from '@/styles/projects.module.css';
import ProjectHolder from "@/components/_projectpage/projectholder";
import Navbar from "@/components/navbar";
import Pager from "@/components/_projectpage/pager";

export default function ProjectsPage(props: {
  projects: Project[];
  uniqueTags: Set<string>; // Using a Set enures uniqueness
}) {

  const [filteredEntries, setFilteredEntries] = useState<number[]>(
    Array.from({ length: props.projects.length }, (_, index) => index)
  ); // Stores project indexes into props.project instead of projects

  const [activeTag, setActiveTag] = useState<string>(""); // "" means "Show All" is active

  // Selected Project
  const [activeProject, setActiveProject] = useState<number>(-1); // -1 means show project list grid, 0 or higher means show single project at that index

  const changeKeybyHash = useCallback((keyStr: string) => {
    keyStr = keyStr.substring(1); // removes hash from project url

    const newIDX = parseInt(keyStr); // turns number back into an int


    // prevents errors if not a negative, non number or in range of project's indexes
    if (!isNaN(newIDX) && newIDX >= 0 && newIDX < props.projects.length) {
      setActiveProject(newIDX);
      window.scrollTo({ top: 0 }); // load at top of project's page
    } else {
      setActiveProject(-1); // if not valid project url, load project list page
    }
  }, [props.projects.length]);

  useEffect(() => {
    const handleHashChange = () => {
      changeKeybyHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [changeKeybyHash]);

  /** Logic to filter the projects by given tag */
  const filterbyTag = (tag: string) => {
    setActiveTag(tag);

    // if empty string, reset to show all indexes
    if (tag === "") {
      setFilteredEntries(
        Array.from({ length: props.projects.length }, (_, index) => index)
      );
      return;
    }

    const filtered: number[] = [];

    // if project contains tag store its index
    props.projects.forEach((project, index) => {
      if (project.tags.indexOf(tag) !== -1) {
        filtered.push(index);
      }
    });

    setFilteredEntries(filtered);
  };

  // Pager navigation that respects filtering
  /** Check if there is a project at the given index */
  const pagerHelper = (direction: -1 | 1) => { // next direction = 1, prev = -1
    let newIdx = filteredEntries.indexOf(activeProject); // index of project in filtered list
    if (newIdx === -1) return null; // if no next project available

    newIdx += direction;

    if (newIdx < 0 || newIdx >= filteredEntries.length) return null;

    return filteredEntries[newIdx];
  };

  /** Tag JSX[] */
  const tagsJsx = [
    <span
      key="all"
      className={activeTag === "" ? styles.activeTag : ""}
      onClick={() => filterbyTag("")}
    >
      Show All
    </span>
  ];

  props.uniqueTags.forEach(tag => {
    tagsJsx.push(
      <span
        key={tag}
        className={activeTag === tag ? styles.activeTag : ""}
        onClick={() => filterbyTag(tag)}
      >
        {tag}
      </span>
    );
  });

  return (
    <main>
      {activeProject === -1 ? (
        <>
          <Navbar to_path="/" name="Home" />

          <div className={styles.projectMainDiv}>
            <h2>My Projects,</h2>

            <div className={styles.filterTags}>
              {tagsJsx}
            </div>

            <hr />

            <div className={styles.projectsGrid}>
              {filteredEntries.map((_, arrIndex) => {
                const index =
                  filteredEntries[filteredEntries.length - 1 - arrIndex];

                const project = props.projects[index];

                return (
                  <ProjectHolder
                    key={index}
                    name={project.name}
                    duration={project.range}
                    image_src={
                      project.thumbnail
                        ? project.thumbnail
                        : project.images && project.images.length > 0
                        ? project.images[0]
                        : "/path/to/default/image.jpg"
                    }
                    shortDescription={project.shortDescription}
                    skills={project.skills}
                    projectKey={index}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <Pager
          project={props.projects[activeProject]}
          checkIndex={pagerHelper}
        />
      )}
    </main>
  );
}
