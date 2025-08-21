import styles from './Footer.module.scss'

export default function Footer() {
  return <div className={styles.footer}>© Breeze Weather {new Date().getFullYear()}</div>
}
