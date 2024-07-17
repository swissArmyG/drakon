import React, { useState, useEffect, forwardRef, useContext } from "react"
import { ProgressBar } from "../Assorted"
import { CustomerProfileForm } from "../Customer"
import { CustomerContext } from "../../contexts"
import { AdditionalQuestionsForm, ConditionForm, PaneControls } from "../Consultation"
import { PANE_VARIABLES } from "../Consultation"
import spineGraphic from '../../img/shapes/form_spine_graphic.png'

export const HomepageConsultation = forwardRef((_props, ref) => {
  const { FIRST_PANE,LAST_PANE } = PANE_VARIABLES
  const {
    pane,
    stepsCompleted
  } = useContext(CustomerContext)

  const [ isMobileDevice, setIsMobileDevice ] = useState(false)
  const [ windowSize, setWindowSize ] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: !isMobileDevice ? window.innerWidth : window.width,
        height: !isMobileDevice ? window.innerHeight : window.height,
      });
      setIsMobileDevice(/Mobi/i.test(navigator.userAgent)
    )}

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileDevice, windowSize.width]);

  const renderHeader = () => {
    return <div className="--header-container">
      <img src={spineGraphic} alt="A section of a spine" className="--header-logo" />
      <p className="--header-text">
        { 
          (pane === FIRST_PANE || pane < 4) && `Your journey to a healed you begins here… Please begin by answering a few basic questions throughout these brief forms accurately and an associate from POMS will be in touch with you shortly for follow up`
        }
        {
          (pane > 3 && pane < LAST_PANE) && `You are almost done! We want to understand your pain better to be able to help you on your journey to relief. Please continue filling out our customer questionnaire to share more about what your body has been telling you. Your insights will guide us in identifying the best steps for your care.`
        }
        {
          pane === LAST_PANE && `Your journey to clarity and relief is just a few clicks away! To upload your MRI scans, please use the secure upload form provided on our site below. By sharing your MRI, you’re giving us permission to have our expert affiliates and partners review your results for a thorough second opinion. Ensure all files are clearly labeled with your name and contact information for accurate processing.`
        }
      </p>
    </div>
  }
  
  return (
    <section ref={ref} className="HomepageConsultation">
      <div className="--background-overlay" />
        <div className="--form-container">
          {renderHeader()}
          {pane === FIRST_PANE && <CustomerProfileForm />}
          {pane === 2 && <ConditionForm />}
          {pane >= 3 && <AdditionalQuestionsForm />}
          <ProgressBar 
            steps={LAST_PANE} 
            stepsCompleted={stepsCompleted}
          />
          <PaneControls windowWidth={windowSize.width} />
        </div>
    </section>
  )
})