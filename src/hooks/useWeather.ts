import { useEffect, useState } from 'react'
import { API_BASE_URL, type ErrorType, type WeatherType } from '@/api'

export function useWeather(latitude: number, longitude: number) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [weather, setWeather] = useState<WeatherType | null>(null)

  useEffect(() => {
    async function fetchWeather() {
      try {
        setIsLoading(true)
        const weatherResponse = await fetch(
          `${API_BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_min,temperature_2m_max,precipitation_sum,sunrise,sunset&hourly=temperature_2m,weather_code,uv_index,is_day&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,is_day&timezone=auto`
        )
        if (!weatherResponse.ok) {
          throw new Error(`Error: ${weatherResponse.statusText} (${weatherResponse.status})`)
        }
        const weatherData: WeatherType | ErrorType = await weatherResponse.json()
        if ('error' in weatherData) {
          throw new Error(`Error: ${weatherData.reason}`)
        }
        setWeather(weatherData)
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

    fetchWeather()
  }, [latitude, longitude])

  return { isLoading, error, weather }
}
