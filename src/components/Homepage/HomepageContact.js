import { forwardRef } from 'react'
import logo from '../../img/logo/logo.png'
import { Link } from 'react-router-dom';

export const HomepageContact = forwardRef((_, ref) => {
  const currentYear = new Date().getFullYear();

  return (
    <section ref={ref} 
      className="HomepageContact">
        <div className="--container">

          <div className="--column-center">
            <img src={logo} alt="POMS logo of the Vitruvian man"/>
            <h1><em>PeaceofMindSpine</em></h1>
            <h1><em>{currentYear}</em></h1>
          </div>

          <Link target="_blank" to="https://www.2nd.md/privacy/general/">Privacy Policy</Link>

          <div className="--column-right">
            <p>
            Peace of Mind Spine (POMS)<br/>
            5555 Denver, Colorado<br/>
            info@poms.com<br/>
            +1 975 555 5555
            </p>
          </div>

        </div>
    </section>
  )
})