import { type WeatherType } from '@/api'
import { getPrecipitationDescription, getWeatherDescription } from '@/utils'
import styles from './CurrentWeather.module.scss'

type CurrentWeatherProps = {
  weather: WeatherType
}

export default function CurrentWeather({ weather }: CurrentWeatherProps) {
  const weatherCode = weather.current.weather_code
  const weatherDescription = getWeatherDescription(weatherCode)
  const isDay = Boolean(weather.current.is_day)
  const weatherIcon = weatherDescription[isDay ? 'day' : 'night'].images[1] // light / dark
  const weatherText = weatherDescription[isDay ? 'day' : 'night'].description
  const temp = weather.current.temperature_2m
  const feelTemp = weather.current.apparent_temperature
  const preciptitationSum = weather.daily.precipitation_sum[0]

  return (
    <div className={`${styles.currentWeather} widget`}>
      <div className={styles.header}>Current Weather</div>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src={weatherIcon} alt={weatherText} />
        </div>
        <div className={styles.descriptionAndTemp}>
          <div className={styles.description}>
            {weatherText}. Feels like {Math.round(feelTemp)}°
          </div>
          <div className={styles.temp}>{Math.round(temp)}°</div>
        </div>
      </div>
      <div className={styles.summary}>{getPrecipitationDescription(preciptitationSum)}</div>
    </div>
  )
}
