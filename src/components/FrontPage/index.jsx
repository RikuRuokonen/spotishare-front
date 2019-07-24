import React, { useContext } from 'react'
import classNames from 'classnames'
import { Container } from 'reactstrap'
import Navbar from '../Navbar'
import SessionHashInput from './SessionHashInput'
import { Link } from 'react-router-dom'

import styles from './frontPage.module.scss'
import SessionContext from '../../sessionContext'
import CurrentSessionContainer from './CurrentSessionContainer'
import StartNewSessionButton from './StartNewSessionButton'


const FrontPage = () => {
  const { session } = useContext(SessionContext)
  return (
    <React.Fragment>
      <Navbar backButton={false} />
      <Container className={styles.frontPageContainer}>
        <div className={styles.titleContainer}>
          <h1>Start playing</h1>
        </div>
        <div className={styles.container}>
          {session && session.hash && (
            <div className={styles.section}>
              <h2 className={styles.title}>Current session</h2>
              <CurrentSessionContainer session={session} />
            </div>
          )}
          <div className={styles.section}>
            <h2 className={styles.title}>Join a session</h2>
            <SessionHashInput />
          </div>
          <div className={classNames(styles.section, styles.newSessionButtonContainer)}>
            <StartNewSessionButton />
          </div>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default FrontPage
