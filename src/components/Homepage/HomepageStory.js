import React, { forwardRef, useState } from 'react'
import LazyLoad from 'react-lazy-load'
import { Modal } from '../Assorted/Modal'
import { story, bioA, bioB, bioC } from '../../copies/homepage-stories'
import skeleIconLeft from '../../img/shapes/skele_icon_left.png'
import skeleIconMiddle from '../../img/shapes/skele_icon_middle.png'
import skeleIconRight from '../../img/shapes/skele_icon_right.png'
import barBreaker from '../../img/shapes/bar_breaker.png'

export const HomepageStory = forwardRef((_, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const renderModalContent = () => {
    return <React.Fragment>
      <p>These can also be found on this<a target="_blank" rel="noreferrer" href="https://www.carytemplinmd.com/cary-r-templin-m-d/"> <u>page</u> </a> of his practice</p>
      <em>Education</em>
      <ul>
        <li>Fellowship, Spinal Surgery, University of California, San Diego, CA</li>
        <li>Residency, Northwestern University, Chicago, IL</li>
        <li>Internship, Northwestern University, Chicago, IL</li>
        <li>M.D., University of Cincinnati, Cincinnati, OH</li>
      </ul>
      <em>Board Certification</em>
      <ul>
        <li>American Board of Orthopaedic Surgery</li>
      </ul>
    </React.Fragment>
  }
  return (
    <section className="HomepageStory" ref={ref}> 
      <div className="--icon-container">
        <LazyLoad><img src={skeleIconLeft} alt="Skeleton left" className="smaller" /></LazyLoad>
        <LazyLoad><img src={skeleIconMiddle} alt="Skeleton middle" className="larger" /></LazyLoad>
        <LazyLoad><img src={skeleIconRight} alt="Skeleton right" className="smaller" /></LazyLoad>
      </div>

      <div className="--story-container">
        <p className="--story-content">{story}</p>
      </div>

      <LazyLoad><img src={barBreaker} alt="Paragraph break in blocks of colors" className="bar-breaker" /></LazyLoad>
      <div className="--story-container">
        <p className="--story-content">{bioA}</p>
        <p className="--story-content">{bioB}</p>
        <p className="--story-content">{bioC} (Please see <u onClick={() => setIsModalOpen(true)}>Dr.Templin Credentials</u>)</p>
      </div>

      <Modal
        index={0}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        header="Dr. Templin's Credentials"
      >
        {renderModalContent()}
      </Modal>
    </section>
  )
})