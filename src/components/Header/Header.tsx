import Logo from '@/components/Logo'
import SearchBar from '@/components/SearchBar'
import ThemeToggler from '@/components/ThemeToggler'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.column}>
        <Logo />
      </div>
      <div className={styles.column}>
        <SearchBar />
      </div>
      <div className={styles.column}>
        <ThemeToggler />
      </div>
    </header>
  )
}
