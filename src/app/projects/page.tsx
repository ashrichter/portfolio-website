import { DelayedSuspense } from "@/components/delayedsus";
import ProjectsPage from "@/components/projectpage";
import { getAllProjects } from "@/lib/loadmd";

export default function Page() {
  const projects = getAllProjects();
  
  // Creates set of tags for filtering projects
  // const uniqueTags = new Set<string>();
  // projects.forEach(project => {
  //   project.tags.forEach(tag => uniqueTags.add(tag));
  // });

  // Creates set of tags for filtering projects (functional style)
  const uniqueTags = new Set(
    projects.flatMap(project => project.tags)
  );

  return (
    <DelayedSuspense>
    <ProjectsPage
      projects={projects}
      uniqueTags={uniqueTags}
    >
    </ProjectsPage>
  </DelayedSuspense>
  );
}
