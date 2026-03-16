'use client';
import { Experience } from '@/types';
import { useState } from 'react';
import styles from '@/styles/expv.module.css';
import Markdown from 'react-markdown';

export default function ExperienceArray(props: {
    workArr: Experience[],
    eduArr: Experience[]
}) {
    const { workArr, eduArr } = props;
    const [activeItem, setActiveItem] = useState<number>(-1); // Nothing expanded (list view)
    const [selectedTab, setSelectedTab] = useState<string>('work'); // Index of expanded experience

    const exparr = selectedTab === 'work' ? workArr : eduArr; // If tab is work use workArr else use eduArr

    return <>
        {/* Tabs for switching between Work and Education
        on click set to tab and show default/unexpanded view */}
        <div className={styles.tabContainer}>
            
            <span className={`${styles.tab} ${selectedTab === 'work' && styles.activeTab}`} onClick={() => { setActiveItem(-1); setSelectedTab('work'); }}>
                Work
            </span>
            <span className={`${styles.tab} ${selectedTab === 'education' && styles.activeTab}`} onClick={() => { setActiveItem(-1); setSelectedTab('education'); }}>
                Education
            </span>
        </div>

        <hr></hr>

        {/* Experience List or Details View */}
        {
            activeItem === -1 ?
            <div className={styles.expListContainer}>
                {
                    exparr.map((exp, index) => (
                        <div key={`exp${index}`} className={styles.expContainer}>
                            <div className={styles.expContainerLeft}>
                                <span className={styles.expTitle}>{` ${exp.title},`}<a href={exp.link} target='_blank' rel="noopener noreferrer">{` ${exp.company}.`}</a></span>
                                <span className={styles.expDuration}>{exp.range}</span>
                            </div>
                            <span className={styles.expMaxMin} onClick={() => setActiveItem(index)}>+</span>
                        </div>
                    ))
                }
            </div>
            :
            <div className={styles.expViewContainer}>
                <div className={styles.expContainer}>
                    <div className={styles.expContainerLeft}>
                        <span className={styles.expTitle}>{` ${exparr[activeItem].title},`}<a href={exparr[activeItem].link} target='_blank'>{` ${exparr[activeItem].company}.`}</a></span>
                        <span className={styles.expDuration}>{exparr[activeItem].range}</span>
                    </div>    
                    <span className={styles.expMaxMin} onClick={() => setActiveItem(-1)}>×</span>
                </div>

                <div className={styles.contentDiv}>
                    <Markdown>{exparr[activeItem].content}</Markdown>
                </div>

                <div className={styles.skillUsed}>
                    {exparr[activeItem].skills.map((skill, idx) => (
                        <span key={idx}>{skill}</span>
                    ))}
                </div>
            </div>
        }
    </>;
}