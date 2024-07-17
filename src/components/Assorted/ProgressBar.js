import React, { useContext } from 'react'
import { CustomerContext } from '../../contexts';
import { PANE_VARIABLES } from '../Consultation';

export const ProgressBar = ({ steps, stepsCompleted }) => {
  const { pane } = useContext(CustomerContext)

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

  return <React.Fragment>
    <div className="ProgressBar">{mappedArr}</div>
    <span className="--pagination">{`Page ${pane} of ${PANE_VARIABLES.LAST_PANE}`}</span>
  </React.Fragment>
};