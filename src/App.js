import { useLocation } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Homepage } from './components/Homepage'
import { 
  Notification, 
  PatientLogin, 
  PasswordRegister, 
  PasswordReset 
} from './components/Assorted'

const App = () => {
  const location = useLocation()
  
  return (
    <section className="App">
      <Routes location={location}>
        <Route exact path="/" 
          element={<Homepage />} />
        <Route exact path="/login" 
          element={<PatientLogin />} />
        <Route exact path="/password/reset" 
          element={<PasswordReset />} />
        <Route exact path="/register"
          element={<PasswordRegister />} />
      </Routes>
      <Notification />
    </section>
  );
}

export default App;