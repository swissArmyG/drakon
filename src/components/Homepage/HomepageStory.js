import { forwardRef } from 'react'
import skeleIconLeft from '../../img/shapes/skele_icon_left.png'
import skeleIconMiddle from '../../img/shapes/skele_icon_middle.png'
import skeleIconRight from '../../img/shapes/skele_icon_right.png'
// import 

export const HomepageStory = forwardRef((_, ref) => {
  const placeholderStyles = {
    height: "1000px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }

  // const story = "Peace of Mind Spine (POMS) provides a streamlined for "

  return (
    <section className="HomepageStory" ref={ref} style={placeholderStyles}>
      {/* <h1>Our Story</h1>
      <h4>Coming soon!</h4> */}
      <div className="--icon-container">
        <img src={skeleIconLeft} alt="Skeleton left" />
        <img src={skeleIconMiddle} alt="Skeleton middle" />
        <img src={skeleIconRight} alt="Skeleton right" />
      </div>
    </section>
  )
})