import { Routes, Route, useLocation } from 'react-router-dom'
import { 
  Homepage,
  HomepageEducation,
  HomepagePricing,
  HomepageStory
} from './components/Homepage'

const App = () => {  
  const location = useLocation()
  const { key } = location

  return (
    <section className="App">
      <Routes location={location}>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/education" element={(props) =>  
          <HomepageEducation key={key} {...props} />
        }/>
        <Route exact path="/pricing" element={(props) => 
          <HomepagePricing key={key} {...props} />
        }/>
        <Route exact path="/story" element={(props) => 
          <HomepageStory key={key} {...props} />
        }/>
      </Routes>
    </section>
  );
}

export default App;