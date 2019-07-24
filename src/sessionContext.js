import { createContext } from 'react'

let session = {
  name: 'Aapeli Haanpuu',
  hash: 'fasdfasdf',
  imageUrl: 'aapeli.jpg'
}

const SessionContext = createContext({
  session,
  setSession: (s) => {
    session = {
      ...session,
      ...s
    }
  }
})

export default SessionContext
