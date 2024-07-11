/* eslint-disable react-hooks/exhaustive-deps */
import { 
  createContext,
  useEffect,
  useState 
}  from 'react'
import { authenticate } from '../api/sessions'
import { readPatientByUserId } from '../api/patients'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)

  const [ loginPayload, setLoginPayload ] = useState({
    email: '',
    password: ''
  })

  const [ userData, setUserData ] = useState(undefined)

  useEffect(() => {
    const authenticateCallback = async() => {
      try {
        const { userId, email, authenticated } = await authenticate()
        
        if (authenticated) {
          setUserData({ id: userId, email })
          setIsAuthenticated(authenticated)
        } else {
          setUserData(undefined)
          setIsAuthenticated(false)
        }
        
      } catch (err) {
        console.error(err)
      }
    }

    authenticateCallback()
  }, [])

  useEffect(() => {
    const userId = userData?.id

    const getPatientProfile = async() => {
      try {
        await readPatientByUserId(userId)
      } catch (err) {
        console.error(err)
      }
    }

    if (userId) {
      getPatientProfile()
    }
  }, [userData?.id])

  return (
    <AuthContext.Provider value={{ 
      loginPayload,
      isAuthenticated,
      setIsAuthenticated,
      setLoginPayload,
      setUserData,
      userData
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }