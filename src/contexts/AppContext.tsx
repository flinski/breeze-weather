import { createContext, useContext, useState, type ReactNode } from 'react'
import type { SearchResultsType, WeatherType } from '@/api'
import { useWeather, useSearchResults } from '@/hooks'

type AppContextType = {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  location: {
    name: string
    latitude: number
    longitude: number
  }
  setLocation: React.Dispatch<React.SetStateAction<AppContextType['location']>>
  geoIsLoading: boolean
  setGeoIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  weatherIsLoading: boolean
  weatherError: Error | null
  weather: WeatherType | null
  searchResultsIsLoading: boolean
  searchResultsError: Error | null
  searchResults: SearchResultsType[] | null
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResultsType[] | null>>
}

const AppContext = createContext<AppContextType | null>(null)

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState({
    name: 'Berlin',
    latitude: 52.52437,
    longitude: 13.41053,
  })
  const [geoIsLoading, setGeoIsLoading] = useState(false)
  const {
    isLoading: weatherIsLoading,
    error: weatherError,
    weather,
  } = useWeather(location.latitude, location.longitude)
  const {
    isLoading: searchResultsIsLoading,
    error: searchResultsError,
    searchResults,
    setSearchResults,
  } = useSearchResults(query)

  return (
    <AppContext.Provider
      value={{
        query,
        setQuery,
        location,
        setLocation,
        geoIsLoading,
        setGeoIsLoading,
        weatherIsLoading,
        weatherError,
        weather,
        searchResultsIsLoading,
        searchResultsError,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppState() {
  const value = useContext(AppContext)

  if (!value) {
    throw new Error('useAppState must be used within an AppProvider')
  }

  return value
}
