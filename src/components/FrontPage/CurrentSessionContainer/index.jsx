import React from 'react'
import styles from '../currentSessionContainer.module.scss'
import ArrowIcon from '../../../icons/ArrowIcon'

const CurrentSessionContainer = ({ session }) => (
  <div className={styles.currentSession}>
    <div className={styles.currentSessionImage}>
      <img src={session.imageUrl} />
    </div>
    <div className={styles.currentSessionInfo}>
      <p className={styles.name}>
        {session.name}
      </p>
      <p className={styles.sessionHash}>
        {session.hash}
      </p>
    </div>
    <div className={styles.iconContainer}>
      <ArrowIcon className={styles.icon} />
    </div>
  </div>
)

export default CurrentSessionContainer
