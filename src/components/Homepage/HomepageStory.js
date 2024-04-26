import { forwardRef } from 'react'
import skeleIconLeft from '../../img/shapes/skele_icon_left.png'
import skeleIconMiddle from '../../img/shapes/skele_icon_middle.png'
import skeleIconRight from '../../img/shapes/skele_icon_right.png'
import barBreaker from '../../img/shapes/bar_breaker.png'

export const HomepageStory = forwardRef((_, ref) => {
  const storyParagraphA = "Peace of Mind Spine (POMS) provides a streamlined online platform for patients to receive unbiased evaluations of their spinal conditions. Our aim is to empower patients with knowledge about their treatment options. Led by Dr. Cary R. Templin, a board-certified spinal surgeon with 18 years of experience, our philosophy prioritizes minimally invasive procedures to enhance patients' quality of life."

  const storyParagraphB = "Dr. Templin, who has undergone successful spinal fusion surgery himself, empathizes with patients' pain and disabilities. At POMS, we believe in offering patients independent opinions on their medical care, free from any financial influences. Our mission is to ensure that each patient receives appropriate treament trailored to optimize their quality of life."

  return (
    <section className="HomepageStory" ref={ref}>
      <div className="--icon-container">
        <img src={skeleIconLeft} alt="Skeleton left" className="smaller" />
        <img src={skeleIconMiddle} alt="Skeleton middle" className="larger" />
        <img src={skeleIconRight} alt="Skeleton right" className="smaller" />
      </div>
      <p className="--story-content">{storyParagraphA}</p>
      <img src={barBreaker} alt="Paragraph break in blocks of colors" />
      <p className="--story-content">{storyParagraphB}</p>
    </section>
  )
})