import { Routes, Route, useLocation } from 'react-router-dom'
import { Homepage } from './components/Homepage'
import {
  Notification
} from './components/Assorted'

const App = () => {
  const location = useLocation()
  
  return (
    <section className="App" data-testid="App">
      <Routes location={location}>
        {/* <Route exact path="/auth/dropbox/callback"
          element={<Homepage />} /> */}
        <Route exact path="/" 
          element={<Homepage />} />
        {/* <Route exact path="/login" 
          element={<CustomerLogin />} />
        <Route exact path="/register"
          element={<CustomerRegister />} />
        <Route exact path="/privacy"
          element={<Privacy />} />
        <Route exact path="/anatomy"
          element={<Anatomy />} /> */}
      </Routes>
      <Notification />
    </section>
  );
}

export default App;