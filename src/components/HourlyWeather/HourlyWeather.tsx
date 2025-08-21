import type { WeatherType } from '@/api'
import styles from './HourlyWeather.module.scss'
import { getFormattedTimeFromDateString, getWeatherDescription } from '@/utils'

type HourlyWeatherProps = {
  weather: WeatherType
}

export default function HourlyWeather({ weather }: HourlyWeatherProps) {
  const currentHours = new Date(weather.current.time).getHours()
  const weatherHourlyTime = weather.hourly.time.slice(currentHours, currentHours + 24)
  const weatherHourlyTemp = weather.hourly.temperature_2m.slice(currentHours, currentHours + 24)
  const weatherHourlyIcon = weather.hourly.weather_code
    .slice(currentHours, currentHours + 24)
    .map((weatherCode) => getWeatherDescription(weatherCode).day.images[1])
  const weatherHourly = Array.from({ length: 24 }, (_, index) => ({
    time: weatherHourlyTime[index],
    temp: weatherHourlyTemp[index],
    icon: weatherHourlyIcon[index],
  }))

  return (
    <div className={`${styles.hourlyWeather} widget`}>
      <div className={styles.header}>Weather today</div>
      <ul className={styles.list}>
        {weatherHourly.map((weather) => (
          <li className={styles.item}>
            <div className={styles.image}>
              <img src={weather.icon} alt="" />
            </div>
            <div className={styles.temp}>{Math.round(weather.temp)}°</div>
            <div className={styles.time}>{getFormattedTimeFromDateString(weather.time)}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
