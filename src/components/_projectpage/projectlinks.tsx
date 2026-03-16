import { useEffect, useState } from "react";
import styles from '../../styles/pager.module.css'; // Pager.module.css

export default function ProjectLinks(props: {
    links: { [key: string]: string };
    classname: string;
}) {
    const [svgs, setSvgs] = useState<{ [key: string]: string }>({});

    // Fetch SVG content dynamically
    useEffect(() => {
        const fetchSvgs = async () => {
            const svgContent: { [key: string]: string } = {};
            for (const key of Object.keys(props.links)) {
                try {
                    const response = await fetch(`/svgs/${key}.svg`);
                    if (response.ok) {
                        svgContent[key] = await response.text();
                    } else {
                        console.error(`Failed to load SVG: ${key}`);
                    }
                } catch (error) {
                    console.error(`Error loading SVG: ${key}`, error);
                }
            }
            setSvgs(svgContent);
        };

        fetchSvgs();
    }, [props.links]);

    return (
        <div className={props.classname}>
    {Object.entries(props.links).map(([key, link]) => (
        <a key={key} href={link} target="_blank" rel="noopener noreferrer">
            <div className={`project-svg ${key}`}>
                <span
                    className={key === 'github' ? styles.projectLinksDiv: styles.projectLinksDivDemo}
                    dangerouslySetInnerHTML={{ __html: svgs[key] || "" }}
                />
            </div>
        </a>
    ))}
</div>

    );
}
