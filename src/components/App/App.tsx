import Header from '@/components/Header'
import Main from '@/components/Main'
import CurrentWeather from '@/components/CurrentWeather'
import WeatherInfo from '@/components/WeatherInfo'
// import HourlyWeather from '@/components/HourlyWeather'
// import DailyWeather from '@/components/DailyWeather'
import styles from './App.module.scss'

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Main>
        <CurrentWeather />
        <WeatherInfo />
      </Main>
    </div>
  )
}
