import { createContext, useState, useEffect }  from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  useEffect(() => {
    const checkCookie = () => {
      const accessToken = document.cookie.match(/accessToken=([^;]+)/);
      if (accessToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    console.log(typeof window)

    // Check if we're on the client-side
    if (typeof window !== 'undefined') {
      checkCookie();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }