import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppState } from '@/contexts/AppContext'

import SunIcon from '@/components/icons/SunIcon'
import PreferencesIcon from '@/components/icons/PreferencesIcon'
import LanguagesIcon from '@/components/icons/LanguagesIcon'

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
  const { t, i18n } = useTranslation()

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

  useEffect(() => {
    localStorage.setItem('flinski-breeze-weather-settings', JSON.stringify(settings))
  }, [settings])

  const handleToggleLight = () => {
    setSettings((curSettings) => ({ ...curSettings, theme: 'light' }))
    document.documentElement.classList.remove('dark')
  }

  const handleToggleDark = () => {
    setSettings((curSettings) => ({ ...curSettings, theme: 'dark' }))
    document.documentElement.classList.add('dark')
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

  const handleChangeLanguage = (lng: 'en' | 'ru') => {
    setSettings((curSettings) => ({
      ...curSettings,
      language: lng === 'en' ? 'english' : 'russian',
    }))
    i18n.changeLanguage(lng)
  }

  return (
    <div className={`${styles.settings} widget`} ref={settingsRef}>
      <div className={styles.section}>
        <div className={styles.heading}>
          <SunIcon className={styles.icon} />
          <div className={styles.title}>{t('theme')}</div>
        </div>
        <div className={styles.toggle}>
          <button
            className={`${styles.button} ${isDark ? '' : 'active'}`}
            onClick={handleToggleLight}
          >
            {t('theme_color.light')}
          </button>
          <button
            className={`${styles.button} ${isDark ? 'active' : ''}`}
            onClick={handleToggleDark}
          >
            {t('theme_color.dark')}
          </button>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.heading}>
          <PreferencesIcon />
          <div className={styles.title}>{t('units')}</div>
        </div>
        <div className={styles.sectionInner}>
          <div className={styles.toggleWrapper}>
            <div className={styles.label}>{t('temperature')}</div>
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
            <div className={styles.label}>{t('wind')}</div>
            <div className={styles.toggle}>
              <button
                className={`${styles.button} ${settings.windUnits === 'm/s' ? 'active' : ''}`}
                onClick={handleToggleMetersPerSecond}
              >
                {t('ms')}
              </button>
              <button
                className={`${styles.button} ${settings.windUnits === 'm/s' ? '' : 'active'}`}
                onClick={handleToggleKilometersPerHour}
              >
                {t('kmh')}
              </button>
            </div>
          </div>
          <div className={styles.toggleWrapper}>
            <div className={styles.label}>{t('pressure')}</div>
            <div className={styles.toggle}>
              <button
                className={`${styles.button} ${settings.pressureUnits === 'mmHg' ? 'active' : ''}`}
                onClick={handleToggleMmHg}
              >
                {t('mmhg')}
              </button>
              <button
                className={`${styles.button} ${settings.pressureUnits === 'mmHg' ? '' : 'active'}`}
                onClick={handleToggleHPa}
              >
                {t('hpa')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.heading}>
          <LanguagesIcon />
          <div className={styles.title}>{t('language')}</div>
        </div>

        <div className={styles.toggle}>
          <button
            className={`${styles.button} ${settings.language === 'english' ? 'active' : ''}`}
            onClick={() => handleChangeLanguage('en')}
          >
            {t('english')}
          </button>
          <button
            className={`${styles.button} ${settings.language === 'english' ? '' : 'active'}`}
            onClick={() => handleChangeLanguage('ru')}
          >
            {t('russian')}
          </button>
        </div>
      </div>
    </div>
  )
}
