import { Routes, Route, useLocation } from 'react-router-dom'
import { 
  LandingPage,
  LandingPageEducation,
  LandingPagePricing,
  LandingPageStory
} from './LandingPage/'

const App = () => {  
  const location = useLocation()
  const { key } = location

  return (
    <section className="App">
      <Routes location={location}>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/#education" element={(props) =>  
          <LandingPageEducation key={key} {...props} />
        }/>
        <Route exact path="/#pricing" element={(props) => 
          <LandingPagePricing key={key} {...props} />
        }/>
        <Route exact path="/#story" element={(props) => 
          <LandingPageStory key={key} {...props} />
        }/>
      </Routes>
    </section>
  );
}

export default App;