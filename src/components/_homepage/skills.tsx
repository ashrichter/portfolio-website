'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/homepage.module.css';
import skillsJSON from '@/../_content/skills.json';

export default function Skills() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => setIsLight(root.classList.contains('light-theme'));

    // Initial check
    updateTheme();

    // Watch for class changes on <html>
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className={styles.skillsDiv}>
      {Object.entries(skillsJSON).map(([skill, data]) => {
        const Tag = data.link === '' ? 'span' : 'a';

        // Flip colors in light mode with adjustable transparency
        const textColor = isLight
          ? hexToRGBA(lightenColor(data.color, -100), 0.9
        ) // darkened text
          : data.color;

        const bgColor = isLight
          ? hexToRGBA(data.color, 0.4) // light mode transparency
          : hexToRGBA(lightenColor(data.color, -80), 0.3); // dark mode transparency

        return (
          <Tag
            key={skill}
            data-color={data.color}
            {...(data.link && { href: data.link, target: '_blank', rel: 'noopener noreferrer' })}
            style={{
              '--skill-color': textColor,
              '--skill-bg': bgColor
            } as React.CSSProperties}
          >
            {skill}
          </Tag>
        );
      })}
    </section>
  );
}

// Helpers
function hexToRGBA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function lightenColor(color: string, amount: number) {
  return color.replace(/[\da-fA-F]{2}/g, match => {
    const num = parseInt(match, 16) + amount;
    return Math.min(255, Math.max(0, num)).toString(16).padStart(2, '0');
  });
}