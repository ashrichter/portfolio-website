import styles from '@/styles/homepage.module.css';

export default function Intro() {
    return (
        <section id='intro' className={styles.introDiv}>
            <h1>{"Hi,"}</h1>
            <span>
                <h6>{"I'm "}</h6>
                <h3>{"Ash Richter,"}</h3>
            </span>
            <div className={styles.inlineContainer}>
                <h6>{"a "}</h6>
                <h4>{"Game Developer "}</h4>
                <h6>{"based in "}</h6>
                <h4>{"London."}</h4>
            </div>
        </section>
    );
}
