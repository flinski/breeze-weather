import { useTranslation } from 'react-i18next'
import { useAppState } from '@/contexts/AppContext'
import type { WeatherType } from '@/api'
import {
  degreesToCompass,
  getFormattedTimeFromDateString,
  getUVIndexDescription,
  hPaToMmHg,
  kmhToMs,
} from '@/utils'

import WindIcon from '@/components/icons/WindIcon'
import ArrowIcon from '@/components/icons/ArrowIcon'
import DropletIcon from '@/components/icons/DropletIcon'
import PressureIcon from '@/components/icons/PressureIcon'
import SunriseIcon from '@/components/icons/SunriseIcon'
import SunsetIcon from '@/components/icons/SunsetIcon'
import WavesIcon from '@/components/icons/WavesIcon'

import styles from './WeatherInfo.module.scss'

type WeatherInfoProps = {
  weather: WeatherType
}

export default function WeatherInfo({ weather }: WeatherInfoProps) {
  const { settings } = useAppState()
  const isKmh = settings.windUnits === 'km/h'
  const isMmHg = settings.pressureUnits === 'mmHg'
  const { t } = useTranslation()

  const windSpeed = weather.current.wind_speed_10m
  const windDirection = weather.current.wind_direction_10m
  const pressure = weather.current.pressure_msl
  const humidity = weather.current.relative_humidity_2m
  const uvIndex = weather.hourly.uv_index[new Date().getHours()]
  const sunrise = weather.daily.sunrise[0]
  const sunset = weather.daily.sunset[0]

  return (
    <div className={`${styles.weatherInfo} widget`}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.info}>
            <WindIcon className={styles.icon} />
            <span className={styles.title}>
              {t('wind')} ({degreesToCompass(windDirection, t)})
            </span>
          </div>
          <div className={styles.value}>
            <div className={styles.windValue}>
              {isKmh ? windSpeed : kmhToMs(windSpeed).toFixed(1)}{' '}
              {settings.windUnits === 'km/h' ? t('wind_units.kmh') : t('wind_units.ms')}
              <ArrowIcon style={{ rotate: `${windDirection + 225}deg` }} />
            </div>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <PressureIcon className={styles.icon} />
            <span className={styles.title}>{t('pressure')}</span>
          </div>
          <div className={styles.value}>
            {isMmHg ? Math.round(hPaToMmHg(pressure)) : Math.round(pressure)}{' '}
            {settings.pressureUnits === 'mmHg' ? t('pressure_units.mmhg') : t('pressure_units.hpa')}
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <DropletIcon className={styles.icon} />
            <span className={styles.title}>{t('humidity')}</span>
          </div>
          <div className={styles.value}>{humidity}%</div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <WavesIcon className={styles.icon} />
            <span className={styles.title}>{t('ultraviolet')}</span>
          </div>
          <div className={styles.value}>{getUVIndexDescription(uvIndex, t)}</div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <SunriseIcon className={styles.icon} />
            <span className={styles.title}>{t('sunrise')}</span>
          </div>
          <div className={styles.value}>{getFormattedTimeFromDateString(sunrise)}</div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <SunsetIcon className={styles.icon} />
            <span className={styles.title}>{t('sunset')}</span>
          </div>
          <div className={styles.value}>{getFormattedTimeFromDateString(sunset)}</div>
        </li>
      </ul>
    </div>
  )
}
