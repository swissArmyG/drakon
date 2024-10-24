import { forwardRef } from 'react'
import LazyLoad from 'react-lazy-load';
import logo from '../../img/logo/logo.png'
import { Link } from 'react-router-dom';

export const HomepageContact = forwardRef((_, ref) => {
  const currentYear = new Date().getFullYear();

  return (
    <section ref={ref} 
      className="HomepageContact">
        <div className="--container">

          <div className="--column-left">
            <Link target="_blank" to="/privacy">Privacy Policy</Link>
          </div>

          <div className="--column-center">
            <LazyLoad>
              <img src={logo} alt="POMS logo of the Vitruvian man"/>
            </LazyLoad>
            <h1><em>PeaceofMindSpine</em></h1>
            <h1><em>{currentYear}</em></h1>
          </div>

          <div className="--column-right">
            <p>
            50 West Liberty Street, Suite 880<br/>
            Reno, Nevada 89501<br/>
            {/* info@poms.com<br/>
            +1 975 555 5555 */}
            </p>
          </div>

        </div>
    </section>
  )
})