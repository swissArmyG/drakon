import { 
  createContext, 
  useCallback, 
  useEffect, 
  useState 
}  from 'react'
import { authenticate } from '../api/sessions'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [ loginPayload, setLoginPayload ] = useState({
    email: '',
    password: ''
  })
  const [ userData, setUserData ] = useState({})
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)

  const authenticateCallback = useCallback(async () => {
    try {
      const { authenticated } = await authenticate()
      setIsAuthenticated(authenticated)
    } catch (err) {
      setIsAuthenticated(false)
    }
    return userData
  }, [userData])

  useEffect(() => {
    authenticateCallback()
  }, [authenticateCallback])

  const logout = () => {
    setIsAuthenticated(false)
    setUserData({})
  }

  return (
    <AuthContext.Provider value={{ 
      authenticate,
      isAuthenticated,
      logout,
      loginPayload,
      setLoginPayload,
      setUserData,
      userData
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }