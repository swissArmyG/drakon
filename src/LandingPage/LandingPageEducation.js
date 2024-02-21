import infoboxLeft from "../img/shapes/infobox_left.png"
import infoboxRight from "../img/shapes/infobox_right.png"
import Zoom from "react-reveal"
import { useEffect, useState } from "react"

export const LandingPageEducation = () => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  const getViewportSize = () => {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  
    setViewport({ width, height })
    console.log('width:', width, 'height:', height)
  }

  useEffect(() => {
    getViewportSize()
    window.addEventListener('resize', getViewportSize)

    return () => {
      window.removeEventListener('resize', getViewportSize)
    }
  }, [])

  console.log('viewport', viewport)

  return (
    <section className="LandingPageEducation --container">
      <Zoom>
        <img className="--infobox-left" src={`${infoboxLeft}`} alt={"Info box fades in on scroll. Did you know? The spine is not only a structural support but also an information superhighway. It's the central hub for transmitting signals between the brain and the rest of the body. Orchestrating movements, sensations, and reflexes"} />
        <img className="--infobox-right" src={`${infoboxRight}`} alt={"Info box fades in on scroll. Spine pain? Herniated discs, often caused by wear and tear, can press on nerves, leading to pain, numbness, or weakness in the limbs"} />
      </Zoom>
    </section>
  )
}