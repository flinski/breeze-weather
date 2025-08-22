import styles from './ErrorMessage.module.scss'

type ErrorMessageProps = {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className={styles.errorMessage}>{message}</div>
}
