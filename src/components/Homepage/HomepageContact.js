import { forwardRef } from 'react'
// import Zoom from 'react-reveal'
// import infoboxLeft from '../../img/shapes/infobox_left.png'
// import infoboxRight from '../../img/shapes/infobox_right.png'

export const HomepageContact = forwardRef((_, ref) => {
  const placeholderStyles = {
    height: "500px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }

  return (
    <section ref={ref} 
      className="HomepageContact --container" 
      style={placeholderStyles}>
        <h1>Contact</h1>
        <h4>Coming soon!</h4>
    </section>
  )
})