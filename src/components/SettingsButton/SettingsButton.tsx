import { useState } from 'react'

import Settings from '@/components/Settings'
import SettingsIcon from '@/components/icons/SettingsIcon'

import styles from './SettingsButton.module.scss'

export default function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleSettings = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.settingsContainer}>
      <button className={styles.settingsButton} onClick={handleToggleSettings}>
        <SettingsIcon />
      </button>
      {isOpen ? <Settings isOpen={isOpen} onClose={() => setIsOpen(false)} /> : null}
    </div>
  )
}
