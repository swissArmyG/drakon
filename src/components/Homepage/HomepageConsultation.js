import React, { useState, useEffect, forwardRef, useContext } from "react"
import { CustomerProfileForm, ProgressBar } from "../Assorted"
import { CustomerContext } from "../../contexts"
import { AdditionalQuestionsForm, ConditionForm, PaneControls } from "../Consultation"
import { PANE_VARIABLES } from "../Consultation"
import spineGraphic from '../../img/shapes/form_spine_graphic.png'

export const HomepageConsultation = forwardRef((_props, ref) => {
  const { FIRST_PANE, SECOND_PANE, THIRD_PANE, LAST_PANE } = PANE_VARIABLES
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
          pane === FIRST_PANE && `Your journey to a healed you begins here… Please begin by answering a few basic questions throughout these brief forms accurately and an associate from POMS will be in touch with you shortly for follow up`
        }
        {
          pane === SECOND_PANE && `You are almost done! We want to understand your pain better to be able to help you on your journey to relief. Please continue filling out our customer questionnaire to share more about what your body has been telling you. Your insights will guide us in identifying the best steps for your care.`
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
          {pane === SECOND_PANE && <ConditionForm />}
          {pane === THIRD_PANE && <AdditionalQuestionsForm />}
          <ProgressBar 
            steps={LAST_PANE} 
            stepsCompleted={stepsCompleted}
          />
          <PaneControls windowWidth={windowSize.width} />
        </div>
    </section>
  )
})