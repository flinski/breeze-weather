import { useEffect, useState } from 'react'
import type { WeatherType } from '@/api'

import Header from '@/components/Header'
import Main from '@/components/Main'
import CurrentWeather from '@/components/CurrentWeather'
import WeatherInfo from '@/components/WeatherInfo'
import HourlyWeather from '@/components/HourlyWeather'
import DailyWeather from '@/components/DailyWeather'
import Footer from '@/components/Footer'

import styles from './App.module.scss'

export default function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState<WeatherType | null>(null)
  const [location, setLocation] = useState({
    name: 'Berlin',
    latitude: 52.52437,
    longitude: 13.41053,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchWeather() {
      try {
        setIsLoading(true)
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weather_code,temperature_2m_min,temperature_2m_max,precipitation_sum,sunrise,sunset&hourly=temperature_2m,weather_code,uv_index,is_day&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,is_day&timezone=auto`
        )
        const weatherData: WeatherType = await weatherResponse.json()
        console.log(weatherData)
        setWeather(weatherData)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeather()
  }, [location.latitude, location.longitude])

  return (
    <div className={styles.app}>
      <Header query={query} setQuery={setQuery} location={location} setLocation={setLocation} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {weather ? (
            <>
              <Main>
                <CurrentWeather weather={weather} />
                <WeatherInfo weather={weather} />
                <HourlyWeather weather={weather} />
                <DailyWeather weather={weather} />
              </Main>
              <Footer />
            </>
          ) : null}
        </>
      )}
    </div>
  )
}
