import type { TFunction } from 'i18next'
import { weatherDescriptions } from './weatherDescriptions'

type WeatherCodeType = keyof typeof weatherDescriptions

export function getWeatherDescription(weatherCode: number) {
  const code = weatherCode as WeatherCodeType

  if (!(code in weatherDescriptions)) {
    throw new Error('Unknown weather conditions')
  }

  return weatherDescriptions[code]
}

export function getPrecipitationDescription(
  precipitationSum: number,
  t: TFunction<'translation', undefined>
) {
  if (precipitationSum === 0) {
    return t('precipitation.no')
  } else if (precipitationSum <= 0.4) {
    return t('precipitation.min')
  } else if (precipitationSum <= 2.0) {
    return t('precipitation.light')
  } else if (precipitationSum <= 10.0) {
    return t('precipitation.significant')
  } else if (precipitationSum <= 20.0) {
    return t('precipitation.heavy')
  } else if (precipitationSum <= 50.0) {
    return t('precipitation.extreme')
  }
  return t('precipitation.dangerous')
}

export function degreesToCompass(degrees: number, t: TFunction<'translation', undefined>) {
  const directions = [
    t('wind_directions.n'),
    t('wind_directions.nne'),
    t('wind_directions.ne'),
    t('wind_directions.ene'),
    t('wind_directions.e'),
    t('wind_directions.ese'),
    t('wind_directions.se'),
    t('wind_directions.sse'),
    t('wind_directions.s'),
    t('wind_directions.ssw'),
    t('wind_directions.sw'),
    t('wind_directions.wsw'),
    t('wind_directions.w'),
    t('wind_directions.wnw'),
    t('wind_directions.nw'),
    t('wind_directions.nnw'),
  ]
  const normalizedDegrees = ((degrees % 360) + 360) % 360
  const index = Math.floor((normalizedDegrees + 11.25) / 22.5) % 16

  return directions[index]
}

export function hPaToMmHg(hPa: number) {
  return hPa * 0.75
}

export function getUVIndexDescription(uvIndex: number, t: TFunction<'translation', undefined>) {
  if (uvIndex < 3) {
    return t('uv_index.low')
  } else if (uvIndex < 6) {
    return t('uv_index.moderate')
  } else if (uvIndex < 8) {
    return t('uv_index.high')
  } else if (uvIndex < 11) {
    return t('uv_index.very_high')
  }
  return t('uv_index.extreme')
}

export function getFormattedTimeFromDateString(dateString: string) {
  const date = new Date(dateString)
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}`
}

export function getWeekFromDateString(dateString: string, t: TFunction<'translation', undefined>) {
  const weekDay = new Date(dateString).getDay()

  switch (weekDay) {
    case 0:
      return t('week.sunday')
    case 1:
      return t('week.monday')
    case 2:
      return t('week.tuesday')
    case 3:
      return t('week.wednesday')
    case 4:
      return t('week.thursday')
    case 5:
      return t('week.friday')
    case 6:
      return t('week.saturday')
    default:
      return t('week.unknown')
  }
}

export function getMonthDayFromDateString(dateString: string) {
  const monthDay = new Date(dateString).getDate()
  return monthDay
}

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32
}

export function kmhToMs(kmh: number): number {
  return kmh / 3.6
}
