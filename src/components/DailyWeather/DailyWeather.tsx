import type { WeatherType } from '@/api'
import { getMonthDayFromDateString, getWeatherDescription, getWeekFromDateString } from '@/utils'
import styles from './DailyWeather.module.scss'

type DailyWeatherProps = {
  weather: WeatherType
}

export default function DailyWeather({ weather }: DailyWeatherProps) {
  const weatherDaily = Array.from({ length: 7 }, (_, index) => ({
    time: weather.daily.time[index],
    code: weather.daily.weather_code[index],
    tempMax: weather.daily.temperature_2m_max[index],
    tempMin: weather.daily.temperature_2m_min[index],
  }))

  return (
    <div className={`${styles.dailyWeather} widget`}>
      <div className={styles.header}>7-day forecast</div>
      <ul className={styles.list}>
        {weatherDaily.map((day, index) => {
          const weekDay = new Date(day.time).getDay()

          return (
            <li className={styles.item}>
              <div
                className={`${styles.weekDay} ${weekDay === 0 || weekDay === 6 ? 'dayOff' : ''}`}
              >
                {getWeekFromDateString(day.time)}
              </div>
              <div className={styles.monthDay}>
                {index === 0 ? 'Today' : getMonthDayFromDateString(day.time)}
              </div>
              <div className={styles.image}>
                <img
                  src={getWeatherDescription(day.code).day.images[1]}
                  alt={getWeatherDescription(day.code).day.description}
                  title={getWeatherDescription(day.code).day.description}
                />
              </div>
              <div className={styles.highTemp}>{Math.round(day.tempMax)}°</div>
              <div className={styles.space}></div>
              <div className={styles.lowTemp}>{Math.round(day.tempMin)}°</div>
              <div className={styles.image}>
                <img
                  src={getWeatherDescription(day.code).night.images[1]}
                  alt={getWeatherDescription(day.code).night.description}
                  title={getWeatherDescription(day.code).night.description}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
