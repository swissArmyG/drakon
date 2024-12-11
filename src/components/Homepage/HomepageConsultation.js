import React, { useState, useEffect, forwardRef, useContext } from "react"
import LazyLoad from 'react-lazy-load';
import { ProgressBar } from "../Assorted"
import { CustomerFile, CustomerProfileForm } from "../Customer"
import { CustomerContext } from "../../contexts"
import { AdditionalQuestionsForm, ConditionForm, PageControls } from "../Consultation"
import { PAGE_VARIABLES } from "../Consultation"
import spineGraphic from '../../img/shapes/form_spine_graphic.png'
import { formHeader } from "../../copies/homepage-form-options";

export const HomepageConsultation = forwardRef((_props, ref) => {
  const { FIRST_PAGE, LAST_PAGE } = PAGE_VARIABLES
  const {
    isValidatingForm,
    page,
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
    return <React.Fragment>
      <div className="--header-container">
        <LazyLoad>
          <img src={spineGraphic} alt="A section of a spine" className="--header-logo" />
        </LazyLoad>
        <p className="--header-text">
          {formHeader}
        </p>
      </div>
      <ul>
        <li>A board certified spine surgeon review of your imaging studies.</li>
        <li>An evaluation of your symptoms.</li>
        <li>A recommendation for your surgical procedure, or intervention.</li>
      </ul>
    </React.Fragment>
  }

  const renderRequiredWarning = () => {
    return (isValidatingForm
      && stepsCompleted < page)
      && <span className="--required --ml-10px">
        <em><i>
          <sup>*</sup>
          Please fill out required fields
        </i></em>
      </span>
  }
  
  return (
    <section ref={ref} className="HomepageConsultation">
      <div className="--background-overlay" />
        <div className="--form-container">
          {renderHeader()}
          {renderRequiredWarning()}
          {page === FIRST_PAGE && <CustomerProfileForm />}
          {page === 2 && <ConditionForm />}
          {page >= 3 && <AdditionalQuestionsForm />}
          {page === LAST_PAGE && <CustomerFile />}
          <ProgressBar 
            steps={LAST_PAGE} 
            stepsCompleted={stepsCompleted}
          />
          <PageControls 
            windowWidth={windowSize.width} 
            scrollToFormTop={() => ref.current.scrollIntoView({ behavior: 'smooth' })}  
          />
        </div>
    </section>
  )
})