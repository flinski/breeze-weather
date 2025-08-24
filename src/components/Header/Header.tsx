import FindMeButton from '@/components/FindMeButton'
import SearchBar from '@/components/SearchBar'
import SettingsButton from '@/components/SettingsButton'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.column}>
        <FindMeButton />
      </div>
      <div className={styles.column}>
        <SearchBar />
      </div>
      <div className={styles.column}>
        <SettingsButton />
      </div>
    </header>
  )
}
