import LazyLoad from 'react-lazy-load';

export const Image = ({ logoPath, size }) => {
  const sizeConfig = {
    sm: {
      width: '100px',
      height: '50px',
    },
    m: {
      width: '100px',
      heigt: '100px'
    },
    l: {
      width: '300px',
      height: '300px',
    },
  }

  return (
    <LazyLoad>
      {/* <img
        src={`${logoPath}`}
        className="logo"
        alt="Peace of Mind Spine.com logo, with a Vitruvian man in front of the beach at sunrise"
      /> */}
      <div style={{
        ...sizeConfig[size],
        border: '1px solid #FFF',
        textAlign: 'center',
        marginRight: '10px'
      }}><i><span>"Customize Image Here"</span></i></div>
    </LazyLoad>
  )
}