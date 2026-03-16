'use client';

import { useState } from 'react';
import email from '@/../_content/email.json';
import styles from '@/styles/homepage.module.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email); // Copies email to clipboard
      setCopied(true);  // Displays "Copied!" msg
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <section id="contact" className={styles.contactDiv}>
      <p>
        Send me an{' '}
        <img
          src="/svgs/email.svg"
          alt="email icon"
          className={styles.mailIcon}
        />{' '}
        at
      </p>

      <button
        type="button"
        className={styles.emailLink}
        onClick={handleCopy}
        aria-label="Copy email address"
      >
        <div className={styles.emailWrapper}>
          <h3>{email}</h3>
          {copied && (<span className={styles.copied}>Copied!</span>)}
        </div>
      </button>

      {/* Opens cv in new tab */}

      {/* <a
        href="/cv.pdf"
        className={styles.resumeBtn}
        target="_blank"
        rel="noopener noreferrer"
      >
        View My CV
      </a> */}
    </section>
  );
}