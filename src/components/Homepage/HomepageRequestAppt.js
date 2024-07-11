import React, { useState, useEffect, forwardRef, useContext } from "react"
import { PatientProfileForm, ProgressBar } from "../Assorted"
import { PatientContext } from "../../contexts"
import { ConditionForm, PaneControls } from "../Consultation"
import { PANE_VARIABLES } from "../Consultation"
import spineGraphic from '../../img/shapes/form_spine_graphic.png'

export const HomepageRequestAppt = forwardRef((_props, ref) => {
  const { FIRST_PANE, LAST_PANE } = PANE_VARIABLES

  const {
    pane,
    stepsCompleted
  } = useContext(PatientContext)

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
      <p className="--header-text">Please send us your details electronically to make an appointment with us. Use the online form below. An associate from <em>PeaceOfMindSpine.com</em> (POMS) will contact you soon.</p>
    </div>
  }
  
  return (
    <section ref={ref} className="HomepageRequestAppt">
      <div className="--background-overlay" />
        <div className="--form-container">
          {renderHeader()}
          {pane === FIRST_PANE && <ConditionForm />}
          {pane === LAST_PANE && <PatientProfileForm />}
          <ProgressBar 
            steps={2} 
            stepsCompleted={stepsCompleted}
          />
          <PaneControls windowWidth={windowSize.width}/>
        </div>
    </section>
  )
})