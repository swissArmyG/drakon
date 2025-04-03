import { forwardRef } from 'react'
// import LazyLoad from 'react-lazy-load';
// import { Link } from 'react-router-dom';
import { Image } from '../Assorted';
import drakonLogo from '../../img/logo/drakon-logo-mark-full-color-rgb-1223px300ppi.png'

export const HomepageContact = forwardRef((_, ref) => {
  const currentYear = new Date().getFullYear();

  return (
    <section ref={ref} 
      className="HomepageContact">
        <div className="--container">

          <div className="--column-left">
            {/* <Link target="_blank" to="/privacy">Privacy Policy</Link> */}
          </div>

          <div className="--column-center">
            <Image imgSrc={drakonLogo} size="m" />
            <h1><em>{currentYear}</em></h1>
          </div>

          <div className="--column-right">
            <p>
              6355 Ward Rd, Suite 306<br/>
              Arvada, CO 80004<br/>
            </p>
          </div>

        </div>
    </section>
  )
})