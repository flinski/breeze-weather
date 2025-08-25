import { useAppState } from '@/contexts/AppContext'

import SearchIcon from '@/components/icons/SearchIcon'
import SearchResults from '@/components/SearchResults'

import styles from './SearchBar.module.scss'

export default function SearchBar() {
  const { query, setQuery, location, setLocation, searchResults, setSearchResults } = useAppState()

  const handleBlur = () => {
    setQuery('')
    setSearchResults(null)
  }

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        id="input"
        type="text"
        name="location"
        autoComplete="off"
        size={1}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={handleBlur}
      />
      <label className={styles.label} htmlFor="input">
        <SearchIcon />
        <span>{location.name}</span>
      </label>
      {searchResults && searchResults.length > 0 ? (
        <SearchResults searchResults={searchResults.slice(0, 5)} setLocation={setLocation} />
      ) : null}
    </div>
  )
}
