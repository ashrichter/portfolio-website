import styles from '@/styles/homepage.module.css';
import skillsJSON from '@/../_content/skills.json';

export default function Skills() {

    return (
        // Section container for all skill tags
        <section id="skills" className={styles.skillsDiv}>
            {Object.entries(skillsJSON).map(([skill, data]) => {

                // Decide whether the skill should be a clickable link (<a>)
                // or just a label (<span>) depending on whether a link exists
                const Tag = data.link === '' ? 'span' : 'a';

                return (
                    <Tag
                        key={skill}

                        // Only add link-related attributes if a URL exists
                        {...(data.link && {
                            href: data.link,
                            target: "_blank",
                            rel: "noopener noreferrer"
                        })}

                        // Apply dynamic styling based on the skill's color
                        style={{
                            borderColor: data.color, // Border uses the original skill color
                            color: data.color,       // Text uses the same color
                            
                            // Background uses a darker, semi-transparent version of the color
                            // created by adjusting the RGB values and converting to rgba()
                            backgroundColor: adjustColorToRGBA(data.color, -80, 0.3)
                        }}
                    >
                        {/* Display the skill name */}
                        {skill}
                    </Tag>
                );
            })}
        </section>
    );
}


/*
    Converts a hex color to a darker/lighter RGBA color.

    Parameters:
    hex   → original hex color (e.g. "#61DAFB")
    amount → how much to adjust brightness (-80 makes it darker)
    alpha → transparency value for the background (0–1)

    Returns:
    rgba(r, g, b, alpha) string for use in CSS
*/
function adjustColorToRGBA(hex: string, amount: number, alpha: number) {

    // Extract the RGB components from the hex string
    // "#61DAFB" → "61", "DA", "FB"
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Adjust brightness by adding the amount
    // Clamp values between 0 and 255 to keep them valid RGB values
    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));

    // Return the final rgba() color string used for the background
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}