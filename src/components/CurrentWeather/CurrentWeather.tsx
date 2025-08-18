import w01d from '@/assets/images/weather-icons/w01d.svg'
import styles from './CurrentWeather.module.scss'

export default function CurrentWeather() {
  return (
    <div className={`${styles.currentWeather} widget`}>
      <div className={styles.header}>
        <span className={styles.title}>Current Weather</span>
      </div>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src={w01d} alt="" />
        </div>
        <div className={styles.descriptionAndTemp}>
          <div className={styles.description}>Clear. Feels like +22°</div>
          <div className={styles.temp}>19°</div>
        </div>
      </div>
      <div className={styles.summary}>No precipitation is expected today</div>
    </div>
  )
}
