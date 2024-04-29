import React from 'react'

export const ProgressBar = ({ steps, stepsCompleted }) => {
  const mappedArr = Array.from({ length: steps }, (_, index) => {
    const stepCount = index + 1;
    const isCompleted = (stepCount <= stepsCompleted) ? `isCompleted-${stepCount}` : '';
    const stepWidth = 100 / steps
  
    return (
      <React.Fragment>
        <div className={`--progress-label-container ${isCompleted}`}> 
          <span className="--progress-label">{`${stepCount}`}</span>
        </div>
        <div className={`--progress-indicator ${isCompleted}`} 
          style={{ width: `${stepWidth}%` }} 
        />
      </React.Fragment>
    );
  });

  return <div className="ProgressBar">{mappedArr}</div>;
};
