import type { SearchResultsType } from '@/api'
import styles from './SearchResults.module.scss'

type SearchResultsProps = {
  searchResults: SearchResultsType[]
  setLocation: React.Dispatch<
    React.SetStateAction<{
      name: string
      latitude: number
      longitude: number
    }>
  >
}

export default function SearchResults({ searchResults, setLocation }: SearchResultsProps) {
  const handleClick = (name: string, lat: number, lng: number) => {
    setLocation({ name: name, latitude: lat, longitude: lng })
  }

  return (
    <div className={`${styles.searchResults} widget`}>
      <ul className={styles.list}>
        {searchResults.map((result) => (
          <li className={styles.item} key={result.id}>
            <div
              className={styles.result}
              onMouseDown={() => handleClick(result.name, result.latitude, result.longitude)}
            >
              <div className={styles.locationAndContry}>
                <div className={styles.location}>{result.name}</div>
                <div className={styles.country}>{result.country}</div>
              </div>
              <div className={styles.flag}>{result.country_code}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
