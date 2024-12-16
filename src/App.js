import { useLocation } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Homepage } from './components/Homepage'
import {
  Anatomy,
  ConfirmEmailChange,
  Notification, 
  PasswordReset,
  // Pricing,
  Privacy
} from './components/Assorted'
import {
  CustomerLogin,
  CustomerRegister
} from './components/Customer'

const App = () => {
  const location = useLocation()
  
  return (
    <section className="App" data-testid="App">
      <Routes location={location}>
        <Route exact path="/auth/dropbox/callback"
          element={<Homepage />} />
        <Route exact path="/" 
          element={<Homepage />} />
          <Route exact path="/password/reset" 
          element={<PasswordReset />} />
          <Route exact path="/login" 
            element={<CustomerLogin />} />
          <Route exact path="/register"
            element={<CustomerRegister />} />
          <Route exact path="/confirm"
            element={<ConfirmEmailChange/> } />
          {/* <Route exact path="/pricing"
            element={<Pricing /> } />  */}
          <Route exact path="/privacy"
            element={<Privacy />} />
          <Route exact path="/anatomy"
            element={<Anatomy />} />
      </Routes>
      <Notification />
      </section>
  );
}

export default App;