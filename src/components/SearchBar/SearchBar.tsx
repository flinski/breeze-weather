import LocationIcon from '@/components/icons/LocationIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
  return (
    <div className={`${styles.searchBar} widget`}>
      <button className={styles.searchButton} aria-label="Search location">
        <SearchIcon />
      </button>
      <input className={styles.input} type="text" placeholder="Search location" />
      <button className={styles.locationButton} aria-label="Search your location">
        <LocationIcon />
      </button>
    </div>
  )
}
