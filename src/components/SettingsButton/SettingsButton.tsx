import SettingsIcon from '@/components/icons/SettingsIcon'
import styles from './SettingsButton.module.scss'

export default function SettingsButton() {
  return (
    <button className={styles.settingsButton}>
      <SettingsIcon />
    </button>
  )
}
