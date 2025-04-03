import React, { forwardRef } from 'react'
import { Image } from '../Assorted'
import { about, RAASstats } from '../../copies/drakon-home'

export const HomepageAbout = forwardRef((_, ref) => {
  const renderStats = () => {
    return RAASstats.stats.map(stat => {
      return <div className="flex row justify-center align-center">
        <Image size="sm" />
        <div className="flex column align-center">
          <h1>{stat.counter}</h1>
          <span>{stat.label}</span>
        </div>
      </div>
    })
  }

  return (
    <section className="HomepageAbout section-container flex column align-cener" ref={ref}> 
      <h1>{about.title}</h1>
      <div className="flex row justify-center">
        <Image size="m" />
        <p>{about.content}</p>
      </div>
      <span>-{about.credit}</span>

      <h1>{RAASstats.title}</h1>
      <div className="flex row justify-center">
        {renderStats()}
      </div>
    </section>
  )
})