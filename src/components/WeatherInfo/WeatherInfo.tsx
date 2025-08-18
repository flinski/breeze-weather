import WindIcon from '@/components/icons/WindIcon'
import DropletIcon from '@/components/icons/DropletIcon'
import PressureIcon from '@/components/icons/PressureIcon'
import SunriseIcon from '@/components/icons/SunriseIcon'
import SunsetIcon from '@/components/icons/SunsetIcon'
import WavesIcon from '@/components/icons/WavesIcon'
import styles from './WeatherInfo.module.scss'

export default function WeatherInfo() {
  return (
    <div className={`${styles.weatherInfo} widget`}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.info}>
            <WindIcon className={styles.icon} />
            <span className={styles.title}>Wind</span>
          </div>
          <div className={styles.value}>West, 2 m/s</div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <PressureIcon className={styles.icon} />
            <span className={styles.title}>Pressure</span>
          </div>
          <div className={styles.value}>756 mmHg</div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <DropletIcon className={styles.icon} />
            <span className={styles.title}>Humidity</span>
          </div>
          <div className={styles.value}>60%</div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <WavesIcon className={styles.icon} />
            <span className={styles.title}>Ultraviolet</span>
          </div>
          <div className={styles.value}>Low</div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <SunriseIcon className={styles.icon} />
            <span className={styles.title}>Sunrise</span>
          </div>
          <div className={styles.value}>05:27</div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <SunsetIcon className={styles.icon} />
            <span className={styles.title}>Sunset</span>
          </div>
          <div className={styles.value}>19:28</div>
        </li>
      </ul>
    </div>
  )
}
