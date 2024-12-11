import React, { useContext } from 'react'
import { CustomerContext } from '../../contexts';
import { PAGE_VARIABLES } from '../Consultation';

export const ProgressBar = ({ steps, stepsCompleted }) => {
  const { page } = useContext(CustomerContext)

  const mappedArr = Array.from({ length: steps }, (_, index) => {
    const stepCount = index + 1;
    const isCompleted = (stepCount <= stepsCompleted) ? `isCompleted-${stepCount}` : '';
    const stepWidth = 100 / steps
  
    return (
      <React.Fragment key={index}>
        <div className={`--progress-label-container ${isCompleted}`}> 
          <span className="--progress-label">{`${stepCount}`}</span>
        </div>
        <div className={`--progress-indicator ${isCompleted}`} 
          style={{ width: `${stepWidth}%` }} 
        />
      </React.Fragment>
    );
  });

  return <section className="ProgressBar">
    <div className="ProgressBar --container">{mappedArr}</div>
    <span className="--pagination">{`Page ${page} of ${PAGE_VARIABLES.LAST_PAGE}`}</span>
  </section>
};