import w01d from '@/assets/images/weather-icons/w01d.svg'
import styles from './DailyWeather.module.scss'

export default function DailyWeather() {
  return (
    <div className={`${styles.dailyWeather} widget`}>
      <div className={styles.header}>10-day forecast</div>
      <ul className={styles.list}>
        {Array.from({ length: 10 }, (_, i) => i).map(() => (
          <li className={styles.item}>
            <div className={styles.weekDay}>Friday</div>
            <div className={styles.monthDay}>18</div>
            <div className={styles.image}>
              <img src={w01d} alt="" />
            </div>
            <div className={styles.highTemp}>20°</div>
            <div className={styles.space}></div>
            <div className={styles.lowTemp}>17°</div>
            <div className={styles.image}>
              <img src={w01d} alt="" />
            </div>
            <div className={styles.wind}>2 m/s</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
