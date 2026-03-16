import { Project } from "@/types";
import { useState } from "react";
import ImageSlider from "@/components/_projectpage/imageslider";
import styles from "@/styles/pager.module.css";
import Markdown from "react-markdown";
import ProjectLinks from "@/components/_projectpage/projectlinks";

// Pager component displays a full project page including:
// - project info
// - image/video slider
// - markdown content
// - navigation between projects
export default function Pager(props: {
    project: Project; // project data object
    checkIndex: (direction: -1 | 1) => number | null; // function to check if another project exists in a direction
}) {

    // Stores the index of the currently displayed image in the slider
    const [currentImageIdx, setCurrentImageIdx] = useState<number>(0);

    // Total number of images for the current project
    const n = props.project.images.length;

    // Changes the current image in the slider
    // Uses modulo to wrap around if the index goes out of bounds
    const switchImage = (index: number) => {
        setCurrentImageIdx((index + n) % n);
    };

    // Determine the neighbouring project indexes
    // (projects are sorted by date in ascending order)
    const left = props.checkIndex(1); // previous project
    const right = props.checkIndex(-1); // next project

    // Handles navigation between projects
    const goToDir = (direction: "l" | "r" | "e") => {
        switch (direction) {

            // Navigate to the previous project
            case "l":
                if (left !== null) {
                    setCurrentImageIdx(0); // reset image slider
                    window.location.hash = `${left}`; // update URL hash
                }
                break;

            // Navigate to the next project
            case "r":
                if (right !== null) {
                    setCurrentImageIdx(0); // reset image slider
                    window.location.hash = `${right}`; // update URL hash
                }
                break;

            // Exit the project view and return to main page
            default:
                window.location.hash = "";
        }
    };

    // Handles keyboard navigation
    // Q = exit project
    // ArrowLeft = previous project
    // ArrowRight = next project
    const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key.toLowerCase() === "q") goToDir("e");
        else if (event.key === "ArrowLeft") goToDir("l");
        else if (event.key === "ArrowRight") goToDir("r");
    };

    return (
        <div
            className={styles.pagerMainDiv}

            // Allows keyboard navigation inside this container
            onKeyDown={handleKeydown}

            // Makes the div focusable so keyboard events work
            tabIndex={0}
        >
            {/* Top navigation bar */}
            <div className={styles.navBar}>

                {/* Button to exit the project page */}
                <span onClick={() => goToDir("e")}>Go Back</span>

                {/* Container for project navigation arrows */}
                <div className={styles.arrowContainer}>

                    {/* Left arrow (previous project) */}
                    <div
                        className={styles.leftButton}
                        onClick={() => {
                            goToDir("l");
                        }}
                    >
                        {/* Only show arrow if a previous project exists */}
                        {left !== null && <em></em>}
                    </div>

                    {/* Right arrow (next project) */}
                    <div
                        className={styles.rightButton}
                        onClick={() => {
                            goToDir("r");
                        }}
                    >
                        {/* Only show arrow if a next project exists */}
                        {right != null && <em></em>}
                    </div>
                </div>
            </div>

            {/* Main page body */}
            <div className={styles.pagerBody}>
                <div className={styles.pagerContent}>
                    <article>

                        {/* Project header information */}
                        <header>
                            <h1>{props.project.name}</h1>

                            {/* Short project description */}
                            <p >
                                {props.project.shortDescription}

                                {/* External project links (e.g. GitHub, website) */}
                                <ProjectLinks
                                    links={props.project.links}
                                    classname={styles.projectLinks}
                                />
                            </p>

                            {/* List of technologies/skills used in the project */}
                            <div
                                className={`${styles.contentDiv} ${styles.skillsContainer}`}
                            >
                                {props.project.skills.map((skill, idx) => (
                                    <span key={idx}>{skill}</span>
                                ))}
                            </div>

                            <br />
                        </header>

                        {/* Image / video slider component */}
                        <ImageSlider
                            isManyImg={props.project.images.length > 1}
                            image={props.project.images[currentImageIdx]}
                            totalImages={n}
                            setImage={switchImage}
                            index={currentImageIdx}
                        ></ImageSlider>

                        {/* Project description section rendered from Markdown */}
                        <section>
                            <h2>About</h2>

                            <div className={styles.contentDiv}>
                                <Markdown>{props.project.content}</Markdown>
                            </div>
                        </section>

                    </article>
                </div>
            </div>
        </div>
    );
}