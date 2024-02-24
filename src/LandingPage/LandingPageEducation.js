import { forwardRef } from 'react'
import Zoom from 'react-reveal'
import infoboxLeft from '../img/shapes/infobox_left.png'
import infoboxRight from '../img/shapes/infobox_right.png'

export const LandingPageEducation = forwardRef((_, ref) => {
  return (
    <section ref={ref} className="LandingPageEducation --container">
      <Zoom>
        <img 
          className="LandingPageEducation --infobox-left"
          src={`${infoboxLeft}`} 
          alt={"Info box fades in on scroll. Did you know? The spine is not only a structural support but also an information superhighway. It's the central hub for transmitting signals between the brain and the rest of the body. Orchestrating movements, sensations, and reflexes"} />
        <img 
          className="LandingPageEducation --infobox-right" 
          src={`${infoboxRight}`} 
          alt={"Info box fades in on scroll. Spine pain? Herniated discs, often caused by wear and tear, can press on nerves, leading to pain, numbness, or weakness in the limbs"} />
      </Zoom>
    </section>
  )
})