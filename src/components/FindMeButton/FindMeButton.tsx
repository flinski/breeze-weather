import LocationIcon from '@/components/icons/LocationIcon'
import styles from './FindMeButton.module.scss'

type FindMeButtonProps = {
  setLocation: React.Dispatch<
    React.SetStateAction<{
      name: string
      latitude: number
      longitude: number
    }>
  >
}

export default function FindMeButton({ setLocation }: FindMeButtonProps) {
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      async function fetchCity() {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        )
        const data = await response.json()
        console.log(data)
        setLocation({ name: data.address.city, latitude: latitude, longitude: longitude })
      }

      fetchCity()
    })
  }

  return (
    <button className={styles.findMeButton} onClick={handleClick}>
      <LocationIcon className={styles.icon} />
      <span className={styles.text}>Find me</span>
    </button>
  )
}
