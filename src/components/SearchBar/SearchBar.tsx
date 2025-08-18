import SearchIcon from '@/components/icons/SearchIcon'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <input className={styles.input} id="input" type="text" name="location" />
      <label className={styles.label} htmlFor="input">
        <SearchIcon />
        <span>Saint Petersburg</span>
      </label>
    </div>
  )
}
