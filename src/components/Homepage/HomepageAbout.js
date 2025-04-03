import React, { forwardRef } from 'react'
import { Image } from '../Assorted'
import { about, RAASstats } from '../../copies/drakon-home'
import keyLogo from '../../img/logo/keystodrakon.png'

export const HomepageAbout = forwardRef((_, ref) => {
  const renderStats = () => {
    return RAASstats.stats.map(stat => {
      return <div className="Stat flex row justify-center align-center">
        <Image size="sm" imgSrc={stat.imgSrc}/>
        <div className="flex column align-start">
          <h1>{stat.counter}</h1>
          <span>{stat.label}</span>
        </div>
      </div>
    })
  }

  return (
    <section className="HomepageAbout flex column align-center" ref={ref}>

      <div className="about section-container flex column align-center">
        <h1>{about.title}</h1>
        <div className="flex row justify-center">
          <Image size="m" imgSrc={keyLogo} />
          <p>{about.content}</p>
        </div>
        <span>-{about.credit}</span>
      </div>

      <div className="RAASstats-container section-container">
        <h2>{RAASstats.title}</h2>
        <div className="flex row justify-center">
          {renderStats()}
        </div>
      </div>
    </section>
  )
})