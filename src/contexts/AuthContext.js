/* eslint-disable react-hooks/exhaustive-deps */
import { 
  createContext,
  // useEffect,
  useState 
}  from 'react'
// import { useNavigate } from 'react-router-dom'
// import { authenticate } from '../api/sessions'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  // const navigate = useNavigate()
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const [ loginPayload, setLoginPayload ] = useState({
    email: '',
    password: ''
  })
  const [ userData, setUserData ] = useState(undefined)

  // useEffect(() => {
  //   const authenticateCallback = async() => {
  //     try {
  //       const { userId, email, authenticated } = await authenticate()
        
  //       if (authenticated) {
  //         setUserData({ id: userId, email })
  //         setIsAuthenticated(authenticated)
  //       } else {
  //         setUserData(undefined)
  //         setIsAuthenticated(false)
  //         navigate("/")
  //       }
        
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }

  //   authenticateCallback()
  // }, [])

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