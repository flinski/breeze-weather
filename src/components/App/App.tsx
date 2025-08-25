import { useEffect } from 'react'
import { useAppState } from '@/contexts/AppContext'

import Header from '@/components/Header'
import Main from '@/components/Main'
import Spinner from '@/components/Spinner'
import ErrorMessage from '@/components/ErrorMessage'
import CurrentWeather from '@/components/CurrentWeather'
import WeatherInfo from '@/components/WeatherInfo'
import HourlyWeather from '@/components/HourlyWeather'
import DailyWeather from '@/components/DailyWeather'
import Footer from '@/components/Footer'

import styles from './App.module.scss'

export default function App() {
  const { geoIsLoading, weatherIsLoading, weatherError, weather, setSettings, setLocation } =
    useAppState()

  useEffect(() => {
    const storedSettings: {
      theme: 'light' | 'dark'
      tempUnits: 'celsius' | 'fahrenheit'
      windUnits: 'm/s' | 'km/h'
      pressureUnits: 'mmHg' | 'hPa'
    } | null = JSON.parse(localStorage.getItem('flinski-breeze-weather-settings') ?? 'null')

    if (storedSettings) {
      setSettings(storedSettings)
      if (storedSettings.theme === 'dark') {
        document.documentElement.classList.add('dark')
      }
    }
  }, [setSettings])

  useEffect(() => {
    const storedLocation: { name: string; latitude: number; longitude: number } | null = JSON.parse(
      localStorage.getItem('flinski-breeze-weather-location') ?? 'null'
    )

    if (storedLocation) {
      setLocation(storedLocation)
    }
  }, [setLocation])

  return (
    <div className={styles.app}>
      <Header />
      {weatherIsLoading || geoIsLoading ? (
        <div className={styles.loader}>
          <Spinner />
        </div>
      ) : weatherError ? (
        <ErrorMessage message={weatherError.message} />
      ) : weather ? (
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
    </div>
  )
}
