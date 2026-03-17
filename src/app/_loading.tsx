import styles from '@/styles/loading.module.css';

export default function Loading() {
  const n = 3;
  const duration = 0.6;

  return (
    <div className={styles.center}>
      {Array.from({ length: n }).map((_, index) => (
        <div
          key={index}
          style={{
            animationDelay: `-${(index / n) * duration}s`,
          }}
          className={styles.wave}
        ></div>
      ))}
    </div>
  );
}