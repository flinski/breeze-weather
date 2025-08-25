import { useEffect, useRef } from 'react'
import { useAppState } from '@/contexts/AppContext'

import SunIcon from '@/components/icons/SunIcon'
import PreferencesIcon from '@/components/icons/PreferencesIcon'

import styles from './Settings.module.scss'

const isNode = (target: EventTarget | null): target is Node => {
  return target instanceof Node
}

type SettingsProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const settingsRef = useRef<HTMLDivElement>(null)
  const { settings, setSettings } = useAppState()
  const isDark = settings.theme === 'dark'

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        isNode(event.target) &&
        !settingsRef.current.contains(event.target)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleToggleLight = () => {
    setSettings((curSettings) => ({ ...curSettings, theme: 'light' }))
  }

  const handleToggleDark = () => {
    setSettings((curSettings) => ({ ...curSettings, theme: 'dark' }))
  }

  const handleToggleCelsius = () => {
    setSettings((curSettings) => ({ ...curSettings, tempUnits: 'celsius' }))
  }

  const handleToggleFahrenheit = () => {
    setSettings((curSettings) => ({ ...curSettings, tempUnits: 'fahrenheit' }))
  }

  const handleToggleMetersPerSecond = () => {
    setSettings((curSettings) => ({ ...curSettings, windUnits: 'm/s' }))
  }

  const handleToggleKilometersPerHour = () => {
    setSettings((curSettings) => ({ ...curSettings, windUnits: 'km/h' }))
  }

  const handleToggleMmHg = () => {
    setSettings((curSettings) => ({ ...curSettings, pressureUnits: 'mmHg' }))
  }

  const handleToggleHPa = () => {
    setSettings((curSettings) => ({ ...curSettings, pressureUnits: 'hPa' }))
  }

  return (
    <div className={`${styles.settings} widget`} ref={settingsRef}>
      <div className={styles.section}>
        <div className={styles.heading}>
          <SunIcon className={styles.icon} />
          <div className={styles.title}>Theme</div>
        </div>
        <div className={styles.toggle}>
          <button
            className={`${styles.button} ${isDark ? '' : 'active'}`}
            onClick={handleToggleLight}
          >
            Light
          </button>
          <button
            className={`${styles.button} ${isDark ? 'active' : ''}`}
            onClick={handleToggleDark}
          >
            Dark
          </button>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.heading}>
          <PreferencesIcon />
          <div className={styles.title}>Units of measurement</div>
        </div>
        <div className={styles.sectionInner}>
          <div className={styles.toggleWrapper}>
            <div className={styles.label}>Temperature</div>
            <div className={styles.toggle}>
              <button
                className={`${styles.button} ${settings.tempUnits === 'celsius' ? 'active' : ''}`}
                onClick={handleToggleCelsius}
              >
                °C
              </button>
              <button
                className={`${styles.button} ${settings.tempUnits === 'celsius' ? '' : 'active'}`}
                onClick={handleToggleFahrenheit}
              >
                °F
              </button>
            </div>
          </div>
          <div className={styles.toggleWrapper}>
            <div className={styles.label}>Wind</div>
            <div className={styles.toggle}>
              <button
                className={`${styles.button} ${settings.windUnits === 'm/s' ? 'active' : ''}`}
                onClick={handleToggleMetersPerSecond}
              >
                m/s
              </button>
              <button
                className={`${styles.button} ${settings.windUnits === 'm/s' ? '' : 'active'}`}
                onClick={handleToggleKilometersPerHour}
              >
                km/h
              </button>
            </div>
          </div>
          <div className={styles.toggleWrapper}>
            <div className={styles.label}>Pressure</div>
            <div className={styles.toggle}>
              <button
                className={`${styles.button} ${settings.pressureUnits === 'mmHg' ? 'active' : ''}`}
                onClick={handleToggleMmHg}
              >
                mmHg
              </button>
              <button
                className={`${styles.button} ${settings.pressureUnits === 'mmHg' ? '' : 'active'}`}
                onClick={handleToggleHPa}
              >
                hPa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
