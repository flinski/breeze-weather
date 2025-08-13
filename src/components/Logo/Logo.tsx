import LogoIcon from '@/components/icons/LogoIcon'
import styles from './Logo.module.scss'

export default function Logo() {
  return (
    <div className={styles.logo}>
      <LogoIcon className={styles.icon} />
      <span className={styles.title}>breeze°</span>
    </div>
  )
}
