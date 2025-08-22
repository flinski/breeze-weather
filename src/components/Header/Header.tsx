import FindMeButton from '@/components/FindMeButton'
import SearchBar from '@/components/SearchBar'
import SettingsButton from '@/components/SettingsButton'
import styles from './Header.module.scss'

type HeaderProps = {
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

export default function Header({ query, setQuery, location, setLocation }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.column}>
        <FindMeButton />
      </div>
      <div className={styles.column}>
        <SearchBar
          query={query}
          setQuery={setQuery}
          location={location}
          setLocation={setLocation}
        />
      </div>
      <div className={styles.column}>
        <SettingsButton />
      </div>
    </header>
  )
}
