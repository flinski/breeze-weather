import { useSearchResults } from '@/hooks'

import SearchIcon from '@/components/icons/SearchIcon'
import SearchResults from '@/components/SearchResults'

import styles from './SearchBar.module.scss'

type SearchBarProps = {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  location: {
    name: string
    latitude: number
    longitude: number
  }
  setLocation: React.Dispatch<
    React.SetStateAction<{
      name: string
      latitude: number
      longitude: number
    }>
  >
}

export default function SearchBar({ query, setQuery, location, setLocation }: SearchBarProps) {
  const { searchResults, setSearchResults } = useSearchResults(query)

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
