import { forwardRef, useState } from 'react'
import LazyLoad from 'react-lazy-load'
import { story, bioA, bioB, bioC } from '../../copies/homepage-stories'
import skeleIconLeft from '../../img/shapes/skele_icon_left.png'
import skeleIconMiddle from '../../img/shapes/skele_icon_middle.png'
import skeleIconRight from '../../img/shapes/skele_icon_right.png'
import barBreaker from '../../img/shapes/bar_breaker.png'

export const HomepageStory = forwardRef((_, ref) => {
  const [isCredentialsOpen, toggleCredentialsOpen] = useState(false)

  return (
    <section className="HomepageStory" ref={ref}>
      {
        isCredentialsOpen &&
        <div></div>
      }
      
      <div className="--icon-container">
        <LazyLoad><img src={skeleIconLeft} alt="Skeleton left" className="smaller" /></LazyLoad>
        <LazyLoad><img src={skeleIconMiddle} alt="Skeleton middle" className="larger" /></LazyLoad>
        <LazyLoad><img src={skeleIconRight} alt="Skeleton right" className="smaller" /></LazyLoad>
      </div>

      <div className="--story-container">
        <p className="--story-content">{story}</p>
      </div>

      <LazyLoad><img src={barBreaker} alt="Paragraph break in blocks of colors" /></LazyLoad>
      
      <div className="--story-container">
        <p className="--story-content">{bioA}</p>
        <p className="--story-content">{bioB}</p>
        <p className="--story-content">{bioC} (Please see <u><em onClick={() => toggleCredentialsOpen(true)}>Dr.Templin Credentials</em></u>)</p>
      </div>
    </section>
  )
})