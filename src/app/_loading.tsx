import styles from '@/styles/loading.module.css';

export default function Loading() {
 const n = 3; // Number of animated dots in "wave"
 const duration = 0.6; // Controls animation timing offset

// Previously used [...Array(n)] which creates a sparse array.
// Array.from({ length: n }) creates a dense array directly.
  return (
    <div className={styles.center}>
      {/* {[...Array(n)].map((_, index) => ( */}
      {Array.from({length: n}).map((_, index) => (  
        <div key={index} 
        style={{
          animationDelay: `-${(index/n * duration)}s` // Offset using indexes for diff phase of anim cycle, made neg for no loading time
        }}
        className={styles.wave}></div>
      ))}
    </div>
  );
}