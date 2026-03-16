import { Project, Experience } from "@/types";
import fs from "fs";
import { join, extname } from 'path';
import matter from 'gray-matter'; // parses markdown

// Extracts only md files from a directory
function listMDFiles(contentDirectory: string) {
    const files = fs.readdirSync(contentDirectory);
    return files.filter(file => extname(file) === '.md');
}

// Parse frontmatter of md file from path using gray-matter into JS object
function baseExtractContent(fileName: string, contentDirectory: string){
    const fullPath = join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    return { ...data, content };
}

// Tells typescript to treat md extract as type project
function extractContentProject(fileName: string, contentDirectory: string): Project {
    return baseExtractContent(fileName, contentDirectory) as Project;
}

// Tells typescript to treat md extract as type experience
function extractContentExperience(fileName: string, contentDirectory: string): Experience {
    const data = baseExtractContent(fileName, contentDirectory) as Experience;

    // Ensure the "category" field exists for UI tabs requirement
    if (!data.category) {
        throw new Error(`Category not defined in the experience file: ${fileName}`);
    }
    
    return data;
}

// Get all projects sorted by date
export function getAllProjects(): Project[] {
    const contentDirectory = join(process.cwd(), "_content", "projects");
    const files = listMDFiles(contentDirectory);
  
    const contents = files
      .map((file) => extractContentProject(file, contentDirectory))
      .filter((project) => !project.draft) // hide drafts
      .sort((project1, project2) => (project1.date < project2.date ? -1 : 1));
  
    return contents;
  }
  

// Get all experiences sorted by date, with category check
export function getAllExperiences(): Experience[] {
    const contentDirectory = join(process.cwd(), "_content", "exp");
    const files = listMDFiles(contentDirectory);
    
    let contents = files
        .map((file) => extractContentExperience(file, contentDirectory))
        .filter((exp) => !exp.draft)
        .sort((exp1, exp2) => (exp1.date > exp2.date ? -1 : 1));
    
    return contents;
}
