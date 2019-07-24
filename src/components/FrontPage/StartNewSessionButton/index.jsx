import React from 'react'
import styles from '../startNewSessionButton.module.scss'
import { Link } from 'react-router-dom'

const StartNewSessionButton = () => (
  <Link>
    <button className={styles.newSessionButton}>
      Start a new session
    </button>
  </Link>
)

export default StartNewSessionButton
