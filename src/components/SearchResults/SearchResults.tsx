// @ts-expect-error Description
import Flag from 'react-world-flags'
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
    const location = { name: name, latitude: lat, longitude: lng }
    setLocation(location)
    localStorage.setItem('flinski-breeze-weather-location', JSON.stringify(location))
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
              <div className={styles.flagWrappar}>
                <Flag className={styles.flag} code={result.country_code} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
