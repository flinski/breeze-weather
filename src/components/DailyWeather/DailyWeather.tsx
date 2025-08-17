import w02d from '@/assets/images/weather-icons/02d.png'
import styles from './DailyWeather.module.scss'

export default function DailyWeather() {
  return (
    <div className={`${styles.dailyWeather} widget`}>
      <div className={styles.header}>5-day forecast</div>
      <ul className={styles.list}>
        {Array.from({ length: 5 }, (_, i) => i).map(() => (
          <li className={styles.item}>
            <div className={styles.weekDay}>Friday</div>
            <div className={styles.image}>
              <img src={w02d} alt="" />
            </div>
            <div className={styles.highTemp}>20°</div>
            <div className={styles.lowTemp}>17°</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
