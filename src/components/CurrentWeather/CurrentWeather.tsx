import w02d from '@/assets/images/weather-icons/02d.png'
import styles from './CurrentWeather.module.scss'

export default function CurrentWeather() {
  return (
    <div className={`${styles.currentWeather} widget`}>
      <div className={styles.header}>
        <span className={styles.title}>Current Weather</span>
        <select className={styles.select}>
          <option>Celsius (°C)</option>
          <option>Fahrenheit (°F)</option>
        </select>
      </div>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src={w02d} alt="" />
        </div>
        <div className={styles.descriptionAndTemp}>
          <div className={styles.description}>Cloudy</div>
          <div className={styles.temp}>
            <span className={styles.tempNum}>19</span>
            <span className={styles.tempDegree}>°C</span>
          </div>
        </div>
        <div className={styles.timezoneAndCoords}>
          <span className={styles.timezone}>Saint Petersburg</span>
          <span className={styles.coords}>H:23° L:16°</span>
        </div>
      </div>
      <div className={styles.summary}>Expect a day of partly cloudy with rain</div>
    </div>
  )
}
