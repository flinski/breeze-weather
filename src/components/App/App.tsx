import Header from '@/components/Header'
import Main from '@/components/Main'
import CurrentWeather from '@/components/CurrentWeather'
import styles from './App.module.scss'

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Main>
        <CurrentWeather />
      </Main>
    </div>
  )
}
