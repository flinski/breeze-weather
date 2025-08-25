import { useEffect, useState } from 'react'
import {
  API_GEO_BASE_URL,
  type ErrorType,
  type SearchResultsResponseType,
  type SearchResultsType,
} from '@/api'

export function useSearchResults(query: string, lng: 'en' | 'ru') {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResultsType[] | null>(null)

  useEffect(() => {
    if (query.length === 0) {
      return
    }

    async function fetchSearchResults() {
      try {
        setIsLoading(true)
        const searchResultsResponse = await fetch(
          `${API_GEO_BASE_URL}/search?name=${query}&count=10&language=${lng}&format=json`
        )
        if (!searchResultsResponse.ok) {
          throw new Error(`Error: ${searchResultsResponse.statusText}`)
        }
        const searchResultsData: SearchResultsResponseType | ErrorType =
          await searchResultsResponse.json()
        if ('error' in searchResultsData) {
          throw new Error(`Error: ${searchResultsData.reason}`)
        }
        setSearchResults(searchResultsData.results)
        setError(null)
      } catch (error) {
        console.error(error)
        if (error instanceof Error) {
          setError(error)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [query, lng])

  return { isLoading, error, searchResults, setSearchResults }
}
