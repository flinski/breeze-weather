import { weatherDescriptions } from './weatherDescriptions'

type WeatherCodeType = keyof typeof weatherDescriptions

export function getWeatherDescription(weatherCode: number) {
  const code = weatherCode as WeatherCodeType

  if (!(code in weatherDescriptions)) {
    throw new Error('Unknown weather conditions')
  }

  return weatherDescriptions[code]
}

export function getPrecipitationDescription(precipitationSum: number) {
  if (precipitationSum === 0) {
    return 'No precipitation expected today'
  } else if (precipitationSum <= 0.4) {
    return 'Minimum amount of precipitation'
  } else if (precipitationSum <= 2.0) {
    return 'Light precipitation'
  } else if (precipitationSum <= 10.0) {
    return 'Significant precipitation'
  } else if (precipitationSum <= 20.0) {
    return 'Heavy rainfall'
  } else if (precipitationSum <= 50.0) {
    return 'Extreme precipitation'
  }
  return 'Dangerous amount of precipitation'
}

export function degreesToCompass(degrees: number) {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ]
  const normalizedDegrees = ((degrees % 360) + 360) % 360
  const index = Math.floor((normalizedDegrees + 11.25) / 22.5) % 16

  return directions[index]
}

export function hPaToMmHg(hPa: number) {
  return hPa * 0.75
}

export function getUVIndexDescription(uvIndex: number) {
  if (uvIndex < 3) {
    return 'Low'
  } else if (uvIndex < 6) {
    return 'Moderate'
  } else if (uvIndex < 8) {
    return 'High'
  } else if (uvIndex < 11) {
    return 'Very high'
  }
  return 'Extreme'
}

export function getFormattedTimeFromDateString(dateString: string) {
  const date = new Date(dateString)
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}`
}

export function getWeekFromDateString(dateString: string) {
  const weekDay = new Date(dateString).getDay()

  switch (weekDay) {
    case 0:
      return 'Sunday'
    case 1:
      return 'Monday'
    case 2:
      return 'Tuesday'
    case 3:
      return 'Wednesday'
    case 4:
      return 'Thursday'
    case 5:
      return 'Friday'
    case 6:
      return 'Saturday'
  }
}

export function getMonthDayFromDateString(dateString: string) {
  const monthDay = new Date(dateString).getDate()
  return monthDay
}
