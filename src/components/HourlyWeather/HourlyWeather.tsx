import w01d from '@/assets/images/weather-icons/01d.png'
import styles from './HourlyWeather.module.scss'

export default function HourlyWeather() {
  return (
    <div className={`${styles.hourlyWeather} widget`}>
      <div className={styles.header}>24-hour forecast</div>
      <ul className={styles.list}>
        {Array.from({ length: 24 }, (_, i) => i).map(() => (
          <li className={styles.item}>
            <div className={styles.image}>
              <img src={w01d} alt="" />
            </div>
            <div className={styles.temp}>19°</div>
            <div className={styles.time}>08:00</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
