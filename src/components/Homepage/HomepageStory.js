import { forwardRef } from 'react'
import { story, bioA, bioB } from '../../copies/homepage-stories'
import skeleIconLeft from '../../img/shapes/skele_icon_left.png'
import skeleIconMiddle from '../../img/shapes/skele_icon_middle.png'
import skeleIconRight from '../../img/shapes/skele_icon_right.png'
import barBreaker from '../../img/shapes/bar_breaker.png'

export const HomepageStory = forwardRef((_, ref) => {
  return (
    <section className="HomepageStory" ref={ref}>
      <div className="--icon-container">
        <img src={skeleIconLeft} alt="Skeleton left" className="smaller" />
        <img src={skeleIconMiddle} alt="Skeleton middle" className="larger" />
        <img src={skeleIconRight} alt="Skeleton right" className="smaller" />
      </div>
      <div className="--story-container">
        <p className="--story-content">{story}</p>
        <img src={barBreaker} alt="Paragraph break in blocks of colors" />
        <p className="--story-content">{bioA}</p>
        <p className="--story-content">{bioB}</p>
      </div>
    </section>
  )
})