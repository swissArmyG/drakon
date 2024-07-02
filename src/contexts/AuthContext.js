import { 
  createContext, 
  useState 
}  from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [ loginPayload, setLoginPayload ] = useState({
    email: '',
    password: ''
  })
  const [ userData, setUserData ] = useState(undefined)

  return (
    <AuthContext.Provider value={{ 
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