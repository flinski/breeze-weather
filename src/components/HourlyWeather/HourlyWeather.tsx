import { useEffect, useRef, useState } from 'react'
import type { WeatherType } from '@/api'
import { getFormattedTimeFromDateString, getWeatherDescription } from '@/utils'

import PrevIcon from '@/components/icons/PrevIcon'
import NextIcon from '@/components/icons/NextIcon'

import styles from './HourlyWeather.module.scss'

type HourlyWeatherProps = {
  weather: WeatherType
}

export default function HourlyWeather({ weather }: HourlyWeatherProps) {
  const [offset, setOffset] = useState(0)
  const [maxOffset, setMaxOffset] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const itemRef = useRef<HTMLLIElement>(null)

  // const sunrises = weather.daily.sunrise.slice(0, 2)
  // const sunsets = weather.daily.sunset.slice(0, 2)
  const currentHours = new Date(weather.current.time).getHours()
  const hourlyTime = weather.hourly.time.slice(currentHours, currentHours + 24)
  const hourlyTemp = weather.hourly.temperature_2m.slice(currentHours, currentHours + 24)
  const hourlyIsDay = weather.hourly.is_day.slice(currentHours, currentHours + 24)
  const hourlyDescription = weather.hourly.weather_code
    .slice(currentHours, currentHours + 24)
    .map((weatherCode, index) => {
      const isDay = Boolean(hourlyIsDay[index])
      const description = getWeatherDescription(weatherCode)[isDay ? 'day' : 'night']
      return description
    })
  const weatherHourly = Array.from({ length: 24 }, (_, index) => ({
    time: hourlyTime[index],
    temp: hourlyTemp[index],
    description: hourlyDescription[index],
  }))

  useEffect(() => {
    let listWidth
    let itemWidth

    const listRect = listRef.current?.getBoundingClientRect()
    const itemRect = itemRef.current?.getBoundingClientRect()

    if (listRect && itemRect) {
      listWidth = listRect.width
      itemWidth = itemRect.width
    } else {
      listWidth = 1608
      itemWidth = 44
    }

    const numItems = weatherHourly.length
    const gapWidth = 24
    const totalWidth = itemWidth * numItems + gapWidth * (numItems - 1)
    setMaxOffset(-(totalWidth - listWidth))
  }, [weatherHourly.length])

  const handleNext = () => {
    if (!(listRef.current && itemRef.current)) {
      return
    }

    const { width: listWidth } = listRef.current.getBoundingClientRect()
    const { width: itemWidth } = itemRef.current.getBoundingClientRect()
    const numItems = weatherHourly.length
    const gapWidth = 24
    const totalWidth = itemWidth * numItems + gapWidth * (numItems - 1)
    const step = listWidth / 3
    const maxOffset = totalWidth - listWidth

    console.log(listWidth)
    console.log(totalWidth)

    setOffset((curOffset) => {
      const targetOffset = curOffset - step

      return targetOffset < -maxOffset ? -maxOffset : targetOffset
    })
  }

  const handlePrev = () => {
    if (!(listRef.current && itemRef.current)) {
      return
    }

    const { width: listWidth } = listRef.current.getBoundingClientRect()

    setOffset((curOffset) => {
      const indent = curOffset + listWidth / 3

      if (indent > 0) {
        return 0
      }

      return indent
    })
  }

  return (
    <div className={`${styles.hourlyWeather} widget`}>
      <div className={styles.header}>24-hour forecast</div>
      <div className={styles.listWrapper}>
        <ul className={styles.list} style={{ transform: `translateX(${offset}px)` }} ref={listRef}>
          {weatherHourly.map((weather) => (
            <li className={styles.item} ref={itemRef} key={weather.time}>
              <div className={styles.temp}>{Math.round(weather.temp)}°</div>
              <div className={styles.image}>
                <img
                  src={weather.description.images[1]}
                  alt={weather.description.description}
                  title={weather.description.description}
                />
              </div>
              <div className={styles.time}>{getFormattedTimeFromDateString(weather.time)}</div>
            </li>
          ))}
        </ul>
      </div>
      <button
        className={styles.prevButton}
        style={offset >= 0 ? { display: 'none' } : { display: 'inline-flex' }}
        onClick={handlePrev}
      >
        <PrevIcon />
      </button>
      <button
        className={styles.nextButton}
        style={offset <= maxOffset ? { display: 'none' } : { display: 'inline-flex' }}
        onClick={handleNext}
      >
        <NextIcon />
      </button>
    </div>
  )
}
