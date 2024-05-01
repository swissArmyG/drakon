import { Routes, Route, useLocation } from 'react-router-dom'
import { 
  Homepage,
  HomepageStory,
  HomepageRequestAppt,
  HomepageContact
} from './components/Homepage'

const App = () => { 
  const location = useLocation()
  const { key } = location

  return (
    <section className="App">
      <Routes location={location}>
        <Route exact path="/" element={<Homepage />}/>
        <Route exact path="/story" 
          element={(props) =>  
            <HomepageStory key={key} {...props} />
          }
        />
        <Route exact path="/request-appointment" 
          element={(props) => 
            <HomepageRequestAppt key={key} {...props} />
          }
        />  
        <Route exact path="/contact" 
          element={(props) => 
            <HomepageContact key={key} {...props} />
          }
        />
      </Routes>
    </section>
  );
}

export default App;