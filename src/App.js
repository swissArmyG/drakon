import { useLocation } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Homepage } from './components/Homepage'
import {
  ConfirmEmailChange,
  Notification, 
  PasswordReset,
  PatientLogin, 
  PatientRegister
} from './components/Assorted'

const App = () => {
  const location = useLocation()
  
  return (
    <section className="App">
      <Routes location={location}>
        <Route exact path="/" 
          element={<Homepage />} />
        <Route exact path="/password/reset" 
        element={<PasswordReset />} />
        <Route exact path="/login" 
          element={<PatientLogin />} />
        <Route exact path="/register"
          element={<PatientRegister />} />
        <Route exact path="/confirm"
          element={<ConfirmEmailChange/> } />
      </Routes>
      <Notification />
    </section>
  );
}

export default App;