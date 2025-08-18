import LocationIcon from '@/components/icons/LocationIcon'
import styles from './FindMeButton.module.scss'

export default function FindMeButton() {
  return (
    <button className={styles.findMeButton}>
      <LocationIcon className={styles.icon} />
      <span className={styles.text}>Find me</span>
    </button>
  )
}
