import styles from './ThemeToggler.module.scss'

export default function ThemeToggler() {
  return (
    <div className={styles.themeToggler}>
      <span className={styles.light}>Light</span>
      <button className={styles.button} aria-label="Switch theme">
        <span className={styles.toggler}></span>
      </button>
      <span className={styles.dark}>Dark</span>
    </div>
  )
}
