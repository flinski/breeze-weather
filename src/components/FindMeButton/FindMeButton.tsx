import { useAppState } from '@/contexts/AppContext'
import LocationIcon from '@/components/icons/LocationIcon'
import styles from './FindMeButton.module.scss'

export default function FindMeButton() {
  const { setLocation, setGeoIsLoading } = useAppState()

  const handleClick = () => {
    setGeoIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        async function fetchCity() {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            )
            const data = await response.json()
            console.log(data)
            setLocation({ name: data.address.city, latitude: latitude, longitude: longitude })
          } finally {
            setGeoIsLoading(false)
          }
        }

        fetchCity()
      },
      (error) => {
        console.error(error)
        setGeoIsLoading(false)
      }
    )
  }

  return (
    <button className={styles.findMeButton} onClick={handleClick}>
      <LocationIcon className={styles.icon} />
      <span className={styles.text}>Find me</span>
    </button>
  )
}
