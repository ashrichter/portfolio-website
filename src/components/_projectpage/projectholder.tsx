import Image from "next/image"
import styles from "@/styles/prholder.module.css";
import React from "react";

// ProjectHolder displays a preview card for a project
// It shows the project image, title, duration, short description,
// and a limited list of skills used in the project.
const ProjectHolder= (
    props: {
        name: string, // project title
        duration: string, // project duration (e.g. dates)
        image_src: string, // preview image for the project
        skills: string[], // list of technologies used
        shortDescription: string, // short description shown in overlay
        projectKey: number, // unique project identifier used for navigation
    } ) => {
    
    // Maximum number of skills to display on the card
    // Prevents the UI from becoming overcrowded
    const MAX_SKILLS = 5;

    // Array to store rendered skill <span> elements
    const skillsSpans = new Array<JSX.Element>();

    // Loop through the first n skills and create span elements
    for (let i = 0; i < MAX_SKILLS && i < props.skills.length; i++) {
        skillsSpans.push(
            <span key={i}>{props.skills[i]}</span>
        )
    }

    // If there are more skills than the limit,
    // show a final indicator that additional skills exist
    if (MAX_SKILLS < props.skills.length) {
        skillsSpans.push(
            <span key={"final"} className={styles.lastSpan}>{"& more..."}</span>
        )
    }

    return (
        // Anchor link navigates to the project page using a URL hash
        // Example: #3 -> opens project with key 3
        <a 
            className={styles.projectHolder} 
            href={`#${props.projectKey}`}
        >

            {/* Project preview image */}
            <div className={styles.Image}>
                <Image 
                    src={props.image_src} 
                    alt="da first image" 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={true} // loads the image early for faster rendering
                    unoptimized={true} // disables Next.js image optimization
                />
            </div>

            {/* Project title */}
            <span className={styles.prtitle}>{props.name}</span>

            {/* Project duration */}
            <span className={styles.prduration}>{props.duration}</span>
        
            {/* Overlay that appears on hover */}
            <div className={styles.overlayDiv}>

                {/* Short project description */}
                <span className={styles.ovdTitle}>{props.shortDescription}</span>

                {/* Display limited list of skills */}
                <div className={styles.ovdSkills}>
                    {skillsSpans}
                </div>
            </div>            
            
        </a>
    );
}

// React.memo prevents unnecessary re-renders if props have not changed
// Useful when rendering many project cards in a list
export default React.memo(ProjectHolder);