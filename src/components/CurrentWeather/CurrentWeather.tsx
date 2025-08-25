import { useTranslation } from 'react-i18next'
import { useAppState } from '@/contexts/AppContext'
import { type WeatherType } from '@/api'
import { celsiusToFahrenheit, getPrecipitationDescription, getWeatherDescription } from '@/utils'
import styles from './CurrentWeather.module.scss'

type CurrentWeatherProps = {
  weather: WeatherType
}

export default function CurrentWeather({ weather }: CurrentWeatherProps) {
  const { settings } = useAppState()
  const isCelsius = settings.tempUnits === 'celsius'
  const { t } = useTranslation()

  const weatherCode = weather.current.weather_code
  const weatherDescription = getWeatherDescription(weatherCode)
  const isDay = Boolean(weather.current.is_day)

  const weatherIcon = weatherDescription[isDay ? 'day' : 'night'].images[1] // light / dark
  const weatherText = weatherDescription[isDay ? 'day' : 'night'].description
  const weatherTextKey = `weather.${weatherCode}.${isDay ? 'day' : 'night'}`
  const weatherTextTranslation = t(weatherTextKey)

  const temp = weather.current.temperature_2m
  const feelTemp = weather.current.apparent_temperature
  const preciptitationSum = weather.daily.precipitation_sum[0]

  return (
    <div className={`${styles.currentWeather} widget`}>
      <div className={styles.header}>{t('current_weather')}</div>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src={weatherIcon} alt={weatherText} />
        </div>
        <div className={styles.descriptionAndTemp}>
          <div className={styles.description}>
            {weatherTextTranslation}. {t('feels_like')}{' '}
            {isCelsius ? Math.round(feelTemp) : Math.round(celsiusToFahrenheit(feelTemp))}°
          </div>
          <div className={styles.temp}>
            {isCelsius ? Math.round(temp) : Math.round(celsiusToFahrenheit(temp))}°
          </div>
        </div>
      </div>
      <div className={styles.summary}>{getPrecipitationDescription(preciptitationSum, t)}</div>
    </div>
  )
}
