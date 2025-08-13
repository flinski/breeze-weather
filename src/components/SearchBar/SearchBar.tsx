import LocationIcon from '@/components/icons/LocationIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <button className={styles.searchButton}>
        <SearchIcon />
      </button>
      <input className={styles.input} type="text" placeholder="Search location" />
      <button className={styles.locationButton}>
        <LocationIcon />
      </button>
    </div>
  )
}
