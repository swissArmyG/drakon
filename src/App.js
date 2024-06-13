import { useLocation, useParams } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Homepage } from './components/Homepage'
import { PasswordReset } from './components/Assorted'

const App = () => {
  const location = useLocation()
  const { userId, token } = useParams({})

  return (
    <section className="App">
      <Routes location={location}>
        <Route exact path="/" element={ <Homepage />}/>
        {userId && token && 
          <Route path={`/passwordReset?token=${token}&userId=${userId}`} element={(props) => <PasswordReset {...props}/>}/>}
      </Routes>
    </section>
  );
}

export default App;