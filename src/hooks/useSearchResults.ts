import { useEffect, useState } from 'react'
import type { SearchResultsResponseType, SearchResultsType } from '@/api'

export function useSearchResults(query: string) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResultsType[] | null>(null)

  useEffect(() => {
    if (query.length === 0) {
      return
    }

    async function fetchSearchResults() {
      try {
        setIsLoading(true)
        const searchResultsResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`
        )
        const searchResultsData: SearchResultsResponseType = await searchResultsResponse.json()
        console.log('searchResultsData:', searchResultsData)
        setSearchResults(searchResultsData.results)
        setError(null)
      } catch (error) {
        console.error(error)
        if (error instanceof Error) {
          setError(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  return { isLoading, error, searchResults, setSearchResults }
}
