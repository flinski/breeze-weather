// import MoonIcon from '../icons/MoonIcon'
import SunIcon from '../icons/SunIcon'
import styles from './ThemeToggler.module.scss'

export default function ThemeToggler() {
  return (
    <div className={styles.themeToggler}>
      <button className={`${styles.button} widget`} aria-label="Switch theme">
        <SunIcon />
      </button>
    </div>
  )
}
