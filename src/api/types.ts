export type WeatherType = {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: {
    time: string
    interval: string
    temperature_2m: string
    relative_humidity_2m: string
    apparent_temperature: string
    weather_code: string
    wind_speed_10m: string
    wind_direction_10m: string
    pressure_msl: string
  }
  current: {
    time: string
    interval: number
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    weather_code: number
    wind_speed_10m: number
    wind_direction_10m: number
    pressure_msl: number
    is_day: number
  }
  hourly_units: { time: string; temperature_2m: string; weather_code: string; uv_index: string }
  hourly: {
    time: string[]
    temperature_2m: number[]
    weather_code: number[]
    uv_index: number[]
  }
  daily_units: {
    time: string
    weather_code: string
    temperature_2m_min: string
    temperature_2m_max: string
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_min: number[]
    temperature_2m_max: number[]
    precipitation_sum: number[]
    sunrise: string[]
    sunset: string[]
  }
}
