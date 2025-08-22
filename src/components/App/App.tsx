import { useState } from 'react'
import { useWeather } from '@/hooks/useWeather'

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

const defaultLocation = {
  name: 'Berlin',
  latitude: 52.52437,
  longitude: 13.41053,
}

export default function App() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState(defaultLocation)
  const { isLoading, error, weather } = useWeather(location.latitude, location.longitude)

  return (
    <div className={styles.app}>
      <Header query={query} setQuery={setQuery} location={location} setLocation={setLocation} />
      {isLoading ? (
        <div className={styles.loader}>
          <Spinner />
        </div>
      ) : error ? (
        <ErrorMessage message={error.message} />
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
